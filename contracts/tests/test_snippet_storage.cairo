use core::array::ArrayTrait;
use snforge_std::{
    ContractClassTrait, DeclareResultTrait, EventSpyAssertionsTrait, declare, spy_events,
    start_cheat_block_timestamp, start_cheat_caller_address, stop_cheat_caller_address,
};
use snippet_storage::interfaces::isnippet_storage::{
    ISnippetStorageDispatcher, ISnippetStorageDispatcherTrait,
};
use snippet_storage::snippet_storage::SnippetStorage::{Event, SnippetDisliked, SnippetReacted};
use starknet::{ContractAddress, contract_address_const, get_block_timestamp};

// Helper to initialize contract with default owner
fn init_contract() -> ISnippetStorageDispatcher {
    let owner = contract_address_const::<12345>();
    let contract_class = declare("SnippetStorage").unwrap().contract_class();
    let (contract_address, _) = contract_class.deploy(@array![owner.into()]).unwrap();
    ISnippetStorageDispatcher { contract_address }
}

// Helper addresses
fn user_a() -> ContractAddress {
    contract_address_const::<67890>()
}
fn user_b() -> ContractAddress {
    contract_address_const::<54321>()
}
fn user_c() -> ContractAddress {
    contract_address_const::<999999>()
}

//Helper function to check if an array contains a value
fn array_contains<T, +Drop<T>, +PartialEq<T>, +Copy<T>>(arr: @Array<T>, value: T) -> bool {
    let mut i = 0;
    while i < arr.len() {
        if *arr.at(i) == value {
            return true;
        }
        i += 1;
    }
    false
}

#[test]
fn test_constructor_rejects_zero_address() {
    let contract_class = declare("SnippetStorage").unwrap().contract_class();
    let zero_address = contract_address_const::<0>();
    let deploy_result = contract_class.deploy(@array![zero_address.into()]);
    match deploy_result {
        Result::Ok(_) => assert(false, 'Deployment should have failed'),
        Result::Err(panic_data) => {
            assert(*panic_data.at(0) == 'Owner cannot be zero', 'Incorrect panic data');
        },
    }
}

#[test]
fn test_store_and_retrieve_snippet() {
    let contract = init_contract();
    let snippet_hash = 42;
    start_cheat_caller_address(contract.contract_address, user_a());
    contract.store_snippet(snippet_hash);
    stop_cheat_caller_address(contract.contract_address);
    let stored_hash = contract.get_snippet(user_a());
    assert(stored_hash == snippet_hash, 'Stored hash mismatch');
}

#[test]
fn test_snippet_lifecycle() {
    let contract = init_contract();
    let snippet_id = 1;
    let initial_content = 100;
    let updated_content = 200;
    contract.add_snippet(snippet_id, initial_content);
    assert(contract.get_snippet_by_id(snippet_id) == initial_content, 'Add failed');
    contract.update_snippet(snippet_id, updated_content);
    assert(contract.get_snippet_by_id(snippet_id) == updated_content, 'Update failed');
    contract.remove_snippet(snippet_id);
    assert(contract.get_snippet_by_id(snippet_id) == 0, 'Remove failed');
}

#[test]
fn test_event_functionality() {
    let contract = init_contract();
    let snippet_id = 5;
    let content = 500;
    let updated_content = content + 1;
    start_cheat_caller_address(contract.contract_address, user_b());
    contract.store_snippet(content);
    assert(contract.get_snippet(user_b()) == content, 'Store snippet failed');
    contract.add_snippet(snippet_id, content);
    assert(contract.get_snippet_by_id(snippet_id) == content, 'Add snippet failed');
    contract.update_snippet(snippet_id, updated_content);
    assert(contract.get_snippet_by_id(snippet_id) == updated_content, 'Update snippet failed');
    contract.remove_snippet(snippet_id);
    assert(contract.get_snippet_by_id(snippet_id) == 0, 'Remove snippet failed');
    stop_cheat_caller_address(contract.contract_address);
}

#[test]
fn test_multiple_users() {
    let contract = init_contract();
    let hash_a = 111;
    let hash_b = 222;
    start_cheat_caller_address(contract.contract_address, user_a());
    contract.store_snippet(hash_a);
    start_cheat_caller_address(contract.contract_address, user_b());
    contract.store_snippet(hash_b);
    assert(contract.get_snippet(user_a()) == hash_a, 'User A data corrupted');
    assert(contract.get_snippet(user_b()) == hash_b, 'User B data corrupted');
}

#[test]
fn test_get_user_snippets() {
    let contract = init_contract();
    let user = user_a();
    start_cheat_caller_address(contract.contract_address, user);
    contract.add_snippet(1, 100);
    contract.add_snippet(2, 200);
    contract.add_snippet(3, 300);
    let snippets = contract.get_user_snippets(user);
    assert(snippets.len() == 3, 'Incorrect number of snippets');
    assert(*snippets.at(0) == 1, 'Snippet ID 0 mismatch');
    assert(*snippets.at(1) == 2, 'Snippet ID 1 mismatch');
    assert(*snippets.at(2) == 3, 'Snippet ID 2 mismatch');
    contract.add_snippet(4, 400);
    let snippets = contract.get_user_snippets(user);
    assert(snippets.len() == 4, 'Incorrect number after adding');
    assert(*snippets.at(3) == 4, 'Snippet ID 3 mismatch');
    contract.remove_snippet(2);
    let snippets = contract.get_user_snippets(user);
    assert(snippets.len() == 3, 'Incorrect number after removing');
    let expected_ids = array![1, 3, 4];
    let mut i = 0;
    while i < snippets.len() {
        let id = *snippets.at(i);
        assert(array_contains(@expected_ids, id), 'Unexpected snippet ID');
        i += 1;
    }
    stop_cheat_caller_address(contract.contract_address);
}

#[test]
fn test_multiple_users_snippets() {
    let contract = init_contract();
    let user1 = user_a();
    let user2 = user_b();
    start_cheat_caller_address(contract.contract_address, user1);
    contract.add_snippet(1, 100);
    contract.add_snippet(2, 200);
    start_cheat_caller_address(contract.contract_address, user2);
    contract.add_snippet(3, 300);
    contract.add_snippet(4, 400);
    let user1_snippets = contract.get_user_snippets(user1);
    assert(user1_snippets.len() == 2, 'User1 should have 2 snippets');
    assert(*user1_snippets.at(0) == 1, 'User1 snippet 0 mismatch');
    assert(*user1_snippets.at(1) == 2, 'User1 snippet 1 mismatch');
    let user2_snippets = contract.get_user_snippets(user2);
    assert(user2_snippets.len() == 2, 'User2 should have 2 snippets');
    assert(*user2_snippets.at(0) == 3, 'User2 snippet 0 mismatch');
    assert(*user2_snippets.at(1) == 4, 'User2 snippet 1 mismatch');
    stop_cheat_caller_address(contract.contract_address);
}

#[test]
fn test_is_snippet_owner_positive() {
    let contract = init_contract();
    let snippet_id = 42;
    let content = 123;

    // Store a snippet as user_a
    start_cheat_caller_address(contract.contract_address, user_a());
    contract.add_snippet(snippet_id, content);

    // Check if user_a is the owner (should return true)
    let is_owner = contract.is_snippet_owner(snippet_id);
    assert(is_owner == true, 'Should be the owner');
    stop_cheat_caller_address(contract.contract_address);
}

#[test]
fn test_is_snippet_owner_negative() {
    let contract = init_contract();
    let snippet_id = 42;
    let content = 123;

    // Store a snippet as user_a
    start_cheat_caller_address(contract.contract_address, user_a());
    contract.add_snippet(snippet_id, content);
    stop_cheat_caller_address(contract.contract_address);

    // Check if user_b is the owner (should return false)
    start_cheat_caller_address(contract.contract_address, user_b());
    let is_owner = contract.is_snippet_owner(snippet_id);
    assert(is_owner == false, 'Should not be the owner');
    stop_cheat_caller_address(contract.contract_address);
}


#[test]
fn test_react_snippetp() {
    let contract = init_contract();
    let snippet_id = 42;
    let content = 123;

    start_cheat_caller_address(contract.contract_address, user_a());
    contract.add_snippet(snippet_id, content);
    stop_cheat_caller_address(contract.contract_address);

    start_cheat_caller_address(contract.contract_address, user_b());
    contract.react_snippet(snippet_id);
    stop_cheat_caller_address(contract.contract_address);

    let reaction_count = contract.get_reaction_count(snippet_id);
    assert(reaction_count == 1, 'aReaction count should be 1');

    let reactions = contract.get_reactions(snippet_id);
    assert(reactions.like == 1, 'bReaction count should be 1');
    assert(reactions.dislike == 0, 'cReaction count should be 0');

    start_cheat_caller_address(contract.contract_address, user_a());
    contract.react_snippet(snippet_id);
    contract.react_snippet(snippet_id);
    stop_cheat_caller_address(contract.contract_address);

    let reaction_count = contract.get_reaction_count(snippet_id);
    assert(reaction_count == 2, 'fReaction count should be 2');

    let reactions = contract.get_reactions(snippet_id);
    assert(reactions.like == 1, 'dReaction count should be 1');
    assert(reactions.dislike == 1, 'eReaction count should be 1');

    start_cheat_caller_address(contract.contract_address, user_c());
    contract.react_snippet(snippet_id);
    stop_cheat_caller_address(contract.contract_address);

    let reaction_count = contract.get_reaction_count(snippet_id);
    assert(reaction_count == 3, 'fReaction count should be 2');

    let reactions = contract.get_reactions(snippet_id);
    assert(reactions.like == 2, 'dReaction count should be 1');
    assert(reactions.dislike == 1, 'eReaction count should be 1');

    start_cheat_caller_address(contract.contract_address, user_a());
    let user_a_reaction = contract.get_user_reaction(snippet_id);
    assert(user_a_reaction == 1, ' incorrect reaction');
    stop_cheat_caller_address(contract.contract_address);

    start_cheat_caller_address(contract.contract_address, user_b());
    let user_b_reaction = contract.get_user_reaction(snippet_id);
    assert(user_b_reaction == 2, ' incorrect reaction');
    stop_cheat_caller_address(contract.contract_address);

    start_cheat_caller_address(contract.contract_address, user_c());
    let user_c_reaction = contract.get_user_reaction(snippet_id);
    assert(user_c_reaction == 1, ' incorrect reaction');
    stop_cheat_caller_address(contract.contract_address);
}

#[test]
#[should_panic(expected: 'Snippet not found')]
fn test_react_snippet_should_panic_if_snippet_not_found() {
    let contract = init_contract();
    let snippet_id = 42;

    start_cheat_caller_address(contract.contract_address, user_b());
    contract.react_snippet(snippet_id);
    stop_cheat_caller_address(contract.contract_address);
}


#[test]
fn test_react_snippet_event_emmitted() {
    let contract = init_contract();
    let snippet_id = 42;
    let content = 123;

    let mut spy_events = spy_events();

    // Store a snippet as user_a
    start_cheat_caller_address(contract.contract_address, user_a());
    contract.add_snippet(snippet_id, content);
    stop_cheat_caller_address(contract.contract_address);

    start_cheat_block_timestamp(contract.contract_address, get_block_timestamp());
    start_cheat_caller_address(contract.contract_address, user_b());
    contract.react_snippet(snippet_id);
    stop_cheat_caller_address(contract.contract_address);

    let event_snippet_reacted = SnippetReacted {
        snippet_id: snippet_id, sender: user_b(), timestamp: get_block_timestamp(), reaction: 1,
    };

    spy_events
        .assert_emitted(
            @array![(contract.contract_address, Event::SnippetReacted(event_snippet_reacted))],
        )
}

#[test]
fn test_remove_snippet_reaction() {
    let contract = init_contract();
    let snippet_id = 42;
    let content = 123;

    start_cheat_caller_address(contract.contract_address, user_b());
    contract.add_snippet(snippet_id, content);
    stop_cheat_caller_address(contract.contract_address);

    start_cheat_caller_address(contract.contract_address, user_a());
    contract.react_snippet(snippet_id);
    stop_cheat_caller_address(contract.contract_address);

    start_cheat_caller_address(contract.contract_address, user_c());
    contract.react_snippet(snippet_id);
    stop_cheat_caller_address(contract.contract_address);

    start_cheat_caller_address(contract.contract_address, user_a());
    let user_a_reaction = contract.get_user_reaction(snippet_id);
    assert(user_a_reaction == 1, ' incorrect reaction');
    stop_cheat_caller_address(contract.contract_address);

    let reaction_count = contract.get_reaction_count(snippet_id);
    assert(reaction_count == 2, 'aReaction count should be 1');

    let reactions = contract.get_reactions(snippet_id);
    assert(reactions.like == 2, 'bReaction count should be 1');
    assert(reactions.dislike == 0, 'cReaction count should be 0');

    // remove reaction
    start_cheat_caller_address(contract.contract_address, user_a());
    contract.remove_snippet_reaction(snippet_id);
    stop_cheat_caller_address(contract.contract_address);

    start_cheat_caller_address(contract.contract_address, user_a());
    let user_a_reaction = contract.get_user_reaction(snippet_id);
    assert(user_a_reaction == 0, ' incorrect reaction');
    stop_cheat_caller_address(contract.contract_address);

    let reaction_count = contract.get_reaction_count(snippet_id);
    assert(reaction_count == 1, 'aReaction count should be 1');

    let reactions = contract.get_reactions(snippet_id);
    assert(reactions.like == 1, 'bReaction count should be 1');
    assert(reactions.dislike == 0, 'cReaction count should be 0');
}

#[test]
#[should_panic(expected: 'Snippet not found')]
fn test_remove_snippet_reaction_should_panic_if_snippet_not_foung() {
    let contract = init_contract();

    start_cheat_caller_address(contract.contract_address, user_a());
    contract.remove_snippet_reaction(1);
    stop_cheat_caller_address(contract.contract_address);
}


#[test]
fn test_remove_snippet_reaction_successful_event_emit() {
    let contract = init_contract();
    let snippet_id = 42;
    let content = 123;

    let mut spy_events = spy_events();

    start_cheat_caller_address(contract.contract_address, user_b());
    contract.add_snippet(snippet_id, content);
    stop_cheat_caller_address(contract.contract_address);

    start_cheat_caller_address(contract.contract_address, user_a());
    contract.react_snippet(snippet_id);
    stop_cheat_caller_address(contract.contract_address);

    start_cheat_caller_address(contract.contract_address, user_c());
    contract.react_snippet(snippet_id);
    stop_cheat_caller_address(contract.contract_address);

    start_cheat_caller_address(contract.contract_address, user_a());
    let user_a_reaction = contract.get_user_reaction(snippet_id);
    assert(user_a_reaction == 1, ' incorrect reaction');
    stop_cheat_caller_address(contract.contract_address);

    let reaction_count = contract.get_reaction_count(snippet_id);
    assert(reaction_count == 2, 'aReaction count should be 1');

    let reactions = contract.get_reactions(snippet_id);
    assert(reactions.like == 2, 'bReaction count should be 1');
    assert(reactions.dislike == 0, 'cReaction count should be 0');

    // remove reaction
    start_cheat_caller_address(contract.contract_address, user_a());
    contract.remove_snippet_reaction(snippet_id);
    stop_cheat_caller_address(contract.contract_address);

    let event_snippet_disliked = SnippetDisliked {
        snippet_id: snippet_id, sender: user_b(), timestamp: get_block_timestamp(),
    };

    spy_events
        .assert_emitted(
            @array![(contract.contract_address, Event::SnippetDisliked(event_snippet_disliked))],
        )
}
