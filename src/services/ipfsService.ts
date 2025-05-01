// src/services/ipfsService.ts

import { Web3Storage } from 'web3.storage';
import { Blob } from 'web3.storage';

/**
 * Interface for IPFS upload response
 */
interface IPFSUploadResponse {
  success: boolean;
  cid?: string;
  error?: string;
}

/**
 * Interface for snippet data to be uploaded
 */
interface SnippetData {
  title: string;
  content: string;
  language: string;
  tags?: string[];
  metadata?: Record<string, any>;
}

/**
 * Service for handling IPFS operations
 */
export class IPFSService {
  private client: Web3Storage;
  
  /**
   * Initialize the IPFS service with API token
   * @param token - Web3.Storage API token
   */
  constructor(token: string) {
    if (!token) {
      throw new Error('Web3.Storage token is required');
    }
    this.client = new Web3Storage({ token });
  }
  
  /**
   * Upload a snippet to IPFS
   * @param snippet - The snippet data to upload
   * @returns Promise resolving to the upload response
   */
  async uploadSnippet(snippet: SnippetData): Promise<IPFSUploadResponse> {
    try {
      // Validate snippet
      if (!snippet.title || !snippet.content) {
        return {
          success: false,
          error: 'Snippet must have a title and content'
        };
      }
      
      // Prepare snippet data as JSON
      const snippetJSON = JSON.stringify(snippet);
      
      // Create a blob from the JSON string
      const blob = new Blob([snippetJSON], { type: 'application/json' });
      
      // Create a File object from the blob
      const files = [
        new File([blob], `${snippet.title.replace(/\s+/g, '-')}.json`, { type: 'application/json' })
      ];
      
      // Upload to IPFS via Web3.Storage
      const cid = await this.client.put(files, {
        wrapWithDirectory: false,
        maxRetries: 3
      });
      
      return {
        success: true,
        cid
      };
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
  
  /**
   * Retrieve content from IPFS by CID
   * @param cid - The Content Identifier
   * @returns Promise resolving to the retrieved snippet data or null
   */
  async retrieveSnippet(cid: string): Promise<SnippetData | null> {
    try {
      const res = await this.client.get(cid);
      
      if (!res || !res.ok) {
        throw new Error('Failed to retrieve snippet from IPFS');
      }
      
      const files = await res.files();
      
      if (files.length === 0) {
        throw new Error('No files found in the IPFS response');
      }
      
      const file = files[0];
      const content = await file.text();
      
      return JSON.parse(content) as SnippetData;
    } catch (error) {
      console.error('Error retrieving from IPFS:', error);
      return null;
    }
  }
}

