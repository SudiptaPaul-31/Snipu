#[starknet::contract]
pub mod SnippetStorage {
    use core::array::ArrayTrait;
    use core::starknet::storage::Map;
    use starknet::storage::{
        StorageMapReadAccess, StorageMapWriteAccess, StoragePathEntry, StoragePointerReadAccess,
        StoragePointerWriteAccess,
    };
    use crate::interfaces::isnippet_storage::ISnippetStorage;

    use starknet::storage::{StorageMapReadAccess, StorageMapWriteAccess};
    use starknet::{
        ContractAddress, contract_address_const, get_block_timestamp, get_caller_address,
    };

    const ERR_NOT_AUTHORIZED: felt252 = 'Not authorized';
    const ERR_SNIPPET_NOT_FOUND: felt252 = 'Snippet not found';
    const ERR_SNIPPET_EXISTS: felt252 = 'Snippet ID already exists';
    const ERR_INVALID_REACTION: felt252 = 'Invalid reaction';

    #[storage]
    struct Storage {
        owner: ContractAddress,
        user_snippets: Map<ContractAddress, felt252>,
        snippet_store: Map<felt252, felt252>,
        snippet_owner: Map<felt252, ContractAddress>,
        user_snippet_count: Map<ContractAddress, u32>,
        user_snippet_ids: Map<(ContractAddress, u32), felt252>,
        user_snippet_index: Map<(ContractAddress, felt252), u32>,
        comments: Map<(felt252, u32), (ContractAddress, felt252, felt252)>,
        snippet_ipfs_cid: Map<felt252, felt252>,
        snippet_reactions: Map<
            (felt252, ContractAddress), u8,
        >, // <snippet_id, user_address> -> reaction type 1 - like, 2 - dislike
        snippet_reactions_storage: Map<felt252, ReactionDetails>, // <snippet_id> -> ReactionDetails
        comments_count: Map<felt252, u32>,
        version_count: Map<felt252, u32>,
        versions: Map<(felt252, u32), felt252>,
    }

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress) {
        assert(owner != contract_address_const::<0>(), 'Owner cannot be zero');
    }

    #[derive(Drop, starknet::Event)]
    pub struct SnippetVersionAdded {
    snippet_id: felt252,
    snippet_hash: felt252,
    timestamp: u64,
    }


    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        SnippetStored: SnippetStored,
        SnippetAdded: SnippetAdded,
        SnippetRemoved: SnippetRemoved,
        SnippetUpdated: SnippetUpdated,
        CommentAdded: CommentAdded,
        SnippetReacted: SnippetReacted,
        SnippetDisliked: SnippetDisliked,
        SnippetVersionAdded: SnippetVersionAdded,
    }

    #[derive(Drop, starknet::Event)]
    struct SnippetStored {
        user: ContractAddress,
        snippet_hash: felt252,
    }

    #[derive(Drop, starknet::Event)]
    struct SnippetAdded {
        snippet_id: felt252,
        snippet: felt252,
    }

    #[derive(Drop, starknet::Event)]
    struct SnippetRemoved {
        snippet_id: felt252,
    }

    #[derive(Drop, starknet::Event)]
    struct SnippetUpdated {
        snippet_id: felt252,
        new_snippet: felt252,
    }

    #[derive(Drop, starknet::Event)]
    pub struct CommentAdded {
        pub snippet_id: felt252,
        pub sender: ContractAddress,
        pub timestamp: felt252,
        pub content: felt252,
    }

    #[derive(Drop, starknet::Event)]
    pub struct SnippetReacted {
        pub snippet_id: felt252,
        pub sender: ContractAddress,
        pub timestamp: u64,
        pub reaction: u8,
    }

    #[derive(Drop, starknet::Event)]
    pub struct SnippetDisliked {
        pub snippet_id: felt252,
        pub sender: ContractAddress,
        pub timestamp: u64,
    }

    #[derive(Drop, Serde, starknet::Store)]
    pub struct ReactionDetails {
        pub like: u256,
        pub dislike: u256,
    }

    #[abi(embed_v0)]
    pub impl SnippetStorageImpl of ISnippetStorage<ContractState> {
        fn store_snippet(ref self: ContractState, snippet_hash: felt252) {
            let caller = get_caller_address();
            self.user_snippets.write(caller, snippet_hash);
            self.emit(SnippetStored { user: caller, snippet_hash: snippet_hash });
        }

        fn get_snippet(self: @ContractState, user: ContractAddress) -> felt252 {
            self.user_snippets.read(user)
        }

        fn get_snippet_by_id(self: @ContractState, snippet_id: felt252) -> felt252 {
            self.snippet_store.read(snippet_id)
        }

        fn add_snippet(ref self: ContractState, snippet_id: felt252, snippet: felt252) {
            let caller = get_caller_address();
            assert(self.snippet_store.read(snippet_id) == 0, ERR_SNIPPET_EXISTS);
            self.snippet_store.write(snippet_id, snippet);
            self.snippet_owner.write(snippet_id, caller);

            let count = self.user_snippet_count.read(caller);
            self.user_snippet_ids.write((caller, count), snippet_id);
            self.user_snippet_index.write((caller, snippet_id), count);
            self.user_snippet_count.write(caller, count + 1);
            self.emit(SnippetAdded { snippet_id: snippet_id, snippet: snippet });
        }

        fn remove_snippet(ref self: ContractState, snippet_id: felt252) {
            let owner = self.snippet_owner.read(snippet_id);
            let caller = get_caller_address();
            assert(owner == caller, ERR_NOT_AUTHORIZED);
            assert(self.snippet_store.read(snippet_id) != 0, ERR_SNIPPET_NOT_FOUND);

            let count = self.user_snippet_count.read(owner);
            let index = self.user_snippet_index.read((owner, snippet_id));
            let last_snippet_id = self.user_snippet_ids.read((owner, count - 1));
            self.user_snippet_ids.write((owner, index), last_snippet_id);
            self.user_snippet_index.write((owner, last_snippet_id), index);
            self.user_snippet_count.write(owner, count - 1);

            self.snippet_store.write(snippet_id, 0);
            self.snippet_owner.write(snippet_id, contract_address_const::<0>());
            self.emit(SnippetRemoved { snippet_id: snippet_id });
        }

        fn update_snippet(ref self: ContractState, snippet_id: felt252, new_snippet: felt252) {
            let owner = self.snippet_owner.read(snippet_id);
            let caller = get_caller_address();
            assert(owner == caller, ERR_NOT_AUTHORIZED);
            assert(self.snippet_store.read(snippet_id) != 0, ERR_SNIPPET_NOT_FOUND);
            self.snippet_store.write(snippet_id, new_snippet);
            self.emit(SnippetUpdated { snippet_id: snippet_id, new_snippet: new_snippet });
        }

        fn add_comment(ref self: ContractState, snippet_id: felt252, content: felt252) {
            let caller = get_caller_address();
            let timestamp: felt252 = get_block_timestamp().into(); // Convert u64 to felt252
            assert(self.snippet_store.read(snippet_id) != 0, ERR_SNIPPET_NOT_FOUND);
            let count = self.comments_count.read(snippet_id) + 1;
            self.comments.write((snippet_id, count), (caller, timestamp, content));
            self.comments_count.write(snippet_id, count);
            self
                .emit(
                    CommentAdded {
                        snippet_id: snippet_id,
                        sender: caller,
                        timestamp: timestamp,
                        content: content,
                    },
                );
        }

        fn get_comments(
            self: @ContractState, snippet_id: felt252,
        ) -> Array<(ContractAddress, felt252, felt252)> {
            let mut comments = array![];
            let count = self.comments_count.read(snippet_id);
            for i in 0..count {
                let comment = self.comments.read((snippet_id, i + 1));
                comments.append(comment);
            };
            comments
        }

        fn get_user_snippets(self: @ContractState, user: ContractAddress) -> Array<felt252> {
            let count = self.user_snippet_count.read(user);
            let mut snippets = ArrayTrait::new();
            let mut i = 0;
            loop {
                if i >= count {
                    break;
                }
                let snippet_id = self.user_snippet_ids.read((user, i));
                snippets.append(snippet_id);
                i += 1;
            }
            snippets
        }

        fn store_snippet_ipfs_cid(ref self: ContractState, snippet_id: felt252, ipfs_cid: felt252) {
            let owner = self.snippet_owner.read(snippet_id);
            let caller = get_caller_address();
            assert(owner == caller, ERR_NOT_AUTHORIZED);
            assert(self.snippet_store.read(snippet_id) != 0, ERR_SNIPPET_NOT_FOUND);
            self.snippet_ipfs_cid.write(snippet_id, ipfs_cid);
        }

        fn get_snippet_ipfs_cid(self: @ContractState, snippet_id: felt252) -> felt252 {
            self.snippet_ipfs_cid.read(snippet_id)
        }

        fn is_snippet_owner(self: @ContractState, snippet_id: felt252) -> bool {
            let caller = get_caller_address();
            let owner = self.snippet_owner.read(snippet_id);
            owner == caller
        }

        fn react_snippet(ref self: ContractState, snippet_id: felt252) {
            let caller = get_caller_address();

            let user_current_reaction = self.get_user_reaction(snippet_id);

            let like = 1;

            let dislike = 2;

            assert(self.snippet_store.read(snippet_id) != 0, ERR_SNIPPET_NOT_FOUND);

            let snippet_reaction = self.snippet_reactions.entry((snippet_id, caller));

            let mut reaction_details: ReactionDetails = self
                .snippet_reactions_storage
                .read(snippet_id);

            let mut reaction = 0;

            match user_current_reaction {
                // new reaction
                0 => {
                    reaction_details.like += 1;
                    reaction = like;
                },
                // liked and wants to dislike
                1 => {
                    reaction_details.like -= 1;
                    reaction_details.dislike += 1;
                    reaction = dislike;
                },
                // dislike and wants to like
                2 => {
                    reaction_details.like += 1;
                    reaction_details.dislike -= 1;
                    reaction = like;
                },
                _ => {},
            }
            self.snippet_reactions_storage.write(snippet_id, reaction_details);
            snippet_reaction.write(reaction);

            self
                .emit(
                    SnippetReacted {
                        snippet_id: snippet_id,
                        sender: caller,
                        timestamp: get_block_timestamp(),
                        reaction: reaction,
                    },
                );
        }

        fn get_reaction_count(self: @ContractState, snippet_id: felt252) -> u256 {
            let reaction_details: ReactionDetails = self.snippet_reactions_storage.read(snippet_id);
            reaction_details.like + reaction_details.dislike
        }

        fn get_reactions(self: @ContractState, snippet_id: felt252) -> ReactionDetails {
            self.snippet_reactions_storage.read(snippet_id)
        }

        fn get_user_reaction(self: @ContractState, snippet_id: felt252) -> u8 {
            let caller = get_caller_address();
            self.snippet_reactions.entry((snippet_id, caller)).read()
        }

        fn remove_snippet_reaction(ref self: ContractState, snippet_id: felt252) {
            let caller = get_caller_address();

            let user_current_reaction = self.get_user_reaction(snippet_id);

            assert(self.snippet_store.read(snippet_id) != 0, ERR_SNIPPET_NOT_FOUND);

            let snippet_reaction = self.snippet_reactions.entry((snippet_id, caller));

            let mut reaction_details: ReactionDetails = self
                .snippet_reactions_storage
                .read(snippet_id);

            let mut reaction = 0;

            match user_current_reaction {
                // new reaction
                0 => {},
                // likes and wants to remove like
                1 => { reaction_details.like -= 1; },
                // dislike and wants to remove dislike
                2 => { reaction_details.dislike -= 1; },
                _ => {},
            }
            self.snippet_reactions_storage.write(snippet_id, reaction_details);
            snippet_reaction.write(reaction);

            self
                .emit(
                    SnippetDisliked {
                        snippet_id: snippet_id, sender: caller, timestamp: get_block_timestamp(),
                    },
                );
        }
        fn add_version(ref self: ContractState, snippet_id: felt252, snippet_hash: felt252) {
            let caller = get_caller_address();
            let owner = self.snippet_owner.read(snippet_id);
            assert(owner == caller, ERR_NOT_AUTHORIZED);
            assert(self.snippet_store.read(snippet_id) != 0, ERR_SNIPPET_NOT_FOUND);

            let count = self.version_count.read(snippet_id);
            self.versions.write((snippet_id, count), snippet_hash);
            self.version_count.write(snippet_id, count + 1);

            self.emit(SnippetVersionAdded {
                snippet_id,
                snippet_hash,
                timestamp: get_block_timestamp(),
            });
        }
        fn get_versions(self: @ContractState, snippet_id: felt252) -> Array<felt252> {
            let count = self.version_count.read(snippet_id);
            let mut versions = ArrayTrait::new();
            let mut i = 0;
            loop {
                if i >= count {
                    break versions;
                }
                let version_hash = self.versions.read((snippet_id, i));
                versions.append(version_hash);
                i += 1;
            }
        }
    }
}
