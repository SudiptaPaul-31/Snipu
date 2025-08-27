use snippet_storage::snippet_storage::SnippetStorage::ReactionDetails;
use starknet::ContractAddress;

#[starknet::interface]
pub trait ISnippetStorage<TContractState> {
    fn store_snippet(ref self: TContractState, snippet_hash: felt252);
    fn get_snippet(self: @TContractState, user: ContractAddress) -> felt252;
    fn get_snippet_by_id(self: @TContractState, snippet_id: felt252) -> felt252;
    fn add_snippet(ref self: TContractState, snippet_id: felt252, snippet: felt252);
    fn remove_snippet(ref self: TContractState, snippet_id: felt252);
    fn update_snippet(ref self: TContractState, snippet_id: felt252, new_snippet: felt252);
    fn add_comment(ref self: TContractState, snippet_id: felt252, content: felt252);
    fn get_comments(
        self: @TContractState, snippet_id: felt252,
    ) -> Array<(ContractAddress, felt252, felt252)>;
    fn get_user_snippets(self: @TContractState, user: ContractAddress) -> Array<felt252>;
    fn store_snippet_ipfs_cid(ref self: TContractState, snippet_id: felt252, ipfs_cid: felt252);
    fn get_snippet_ipfs_cid(self: @TContractState, snippet_id: felt252) -> felt252;
    fn is_snippet_owner(self: @TContractState, snippet_id: felt252) -> bool;

    fn react_snippet(ref self: TContractState, snippet_id: felt252);
    fn remove_snippet_reaction(ref self: TContractState, snippet_id: felt252);

    fn get_reaction_count(self: @TContractState, snippet_id: felt252) -> u256;
    fn get_reactions(self: @TContractState, snippet_id: felt252) -> ReactionDetails;
    fn get_user_reaction(self: @TContractState, snippet_id: felt252) -> u8;
    fn add_version(ref self: TContractState, snippet_id: felt252, snippet_hash: felt252);
    fn get_versions(self: @TContractState, snippet_id: felt252) -> Array<felt252>;
}
