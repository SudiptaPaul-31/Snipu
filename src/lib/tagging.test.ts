// Simple test file to verify tagging functionality
import { getUniqueTags, getSnippetsByTag, searchSnippets } from './mockData';

describe('Tagging Functionality', () => {
  test('should get unique tags from snippets', () => {
    const tags = getUniqueTags();
    expect(tags).toBeDefined();
    expect(Array.isArray(tags)).toBe(true);
    expect(tags.length).toBeGreaterThan(0);
    
    // Check for some expected tags
    expect(tags).toContain('React');
    expect(tags).toContain('JavaScript');
    expect(tags).toContain('Python');
  });

  test('should filter snippets by tag', () => {
    const reactSnippets = getSnippetsByTag('React');
    expect(reactSnippets).toBeDefined();
    expect(Array.isArray(reactSnippets)).toBe(true);
    
    // All returned snippets should have the React tag
    reactSnippets.forEach(snippet => {
      expect(snippet.tags).toContain('React');
    });
  });

  test('should search snippets by tag', () => {
    const searchResults = searchSnippets('React');
    expect(searchResults).toBeDefined();
    expect(Array.isArray(searchResults)).toBe(true);
    
    // Should find snippets with React in title, description, or tags
    const hasReactTag = searchResults.some(snippet => 
      snippet.tags.some(tag => tag.toLowerCase().includes('react'))
    );
    expect(hasReactTag).toBe(true);
  });

  test('should handle case-insensitive tag search', () => {
    const lowercaseResults = getSnippetsByTag('react');
    const uppercaseResults = getSnippetsByTag('React');
    
    expect(lowercaseResults.length).toBe(uppercaseResults.length);
  });
});

// Export for potential use in other test files
export { getUniqueTags, getSnippetsByTag, searchSnippets };
