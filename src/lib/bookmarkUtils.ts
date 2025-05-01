export const getLocalBookmarks = (): number[] => {
    if (typeof window === 'undefined') return [];
    try {
      return JSON.parse(localStorage.getItem('bookmarks') || '[]');
    } catch (error) {
      console.error('Error reading bookmarks from localStorage:', error);
      return [];
    }
  };

  export const saveLocalBookmark = (snippetId: number, isBookmarked: boolean): void => {
    if (typeof window === 'undefined') return;
    try {
      const bookmarks = getLocalBookmarks();
      const newBookmarks = isBookmarked
        ? [...bookmarks, snippetId]
        : bookmarks.filter(id => id !== snippetId);
      localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
    } catch (error) {
      console.error('Error saving bookmark to localStorage:', error);
    }
  };

  export const syncBookmarksWithServer = async (walletAddress: string): Promise<void> => {
    const localBookmarks = getLocalBookmarks();
    try {
      const response = await fetch('/api/bookmarks/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress,
          bookmarks: localBookmarks,
        }),
      });

      if (!response.ok) throw new Error('Failed to sync bookmarks');

      const { bookmarks } = await response.json();
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } catch (error) {
      console.error('Error syncing bookmarks:', error);
    }
  };