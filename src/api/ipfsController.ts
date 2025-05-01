// src/api/ipfsController.ts

import { Request, Response } from 'express';
import { IPFSService } from '../services/ipfsService';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const WEB3_STORAGE_TOKEN = process.env.WEB3_STORAGE_TOKEN || '';

// Database model interface (example)
interface SnippetModel {
  _id?: string;
  title: string;
  content: string;
  language: string;
  tags: string[];
  ipfsCid?: string;
  created: Date;
  updated: Date;
}

// This would be your actual database interface
class SnippetRepository {
  // Mock implementation - replace with your actual database logic
  async saveSnippet(snippet: Partial<SnippetModel>): Promise<SnippetModel> {
    const now = new Date();
    // This is just a placeholder, implement with your actual database
    const savedSnippet: SnippetModel = {
      _id: Math.random().toString(36).substring(2, 15),
      title: snippet.title || 'Untitled',
      content: snippet.content || '',
      language: snippet.language || 'text',
      tags: snippet.tags || [],
      ipfsCid: snippet.ipfsCid,
      created: now,
      updated: now
    };
    
    console.log('Saved snippet to database:', savedSnippet);
    return savedSnippet;
  }
}

export class IPFSController {
  private ipfsService: IPFSService;
  private snippetRepository: SnippetRepository;
  
  constructor() {
    // Validate environment
    if (!WEB3_STORAGE_TOKEN) {
      console.error('WEB3_STORAGE_TOKEN environment variable is not set');
    }
    
    this.ipfsService = new IPFSService(WEB3_STORAGE_TOKEN);
    this.snippetRepository = new SnippetRepository();
  }
  
  /**
   * Upload a snippet to IPFS and save reference in database
   */
  uploadSnippet = async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, content, language, tags } = req.body;
      
      // Validate required fields
      if (!title || !content) {
        res.status(400).json({
          success: false,
          error: 'Title and content are required'
        });
        return;
      }
      
      // Prepare snippet data
      const snippetData = {
        title,
        content,
        language: language || 'text',
        tags: Array.isArray(tags) ? tags : tags?.split(',').map((tag: string) => tag.trim()) || []
      };
      
      // Upload to IPFS
      const ipfsResult = await this.ipfsService.uploadSnippet({
        ...snippetData,
        metadata: {
          timestamp: new Date().toISOString(),
          source: 'api-upload'
        }
      });
      
      if (!ipfsResult.success || !ipfsResult.cid) {
        res.status(500).json({
          success: false,
          error: ipfsResult.error || 'Failed to upload to IPFS'
        });
        return;
      }
      
      // Save to database with IPFS reference
      const savedSnippet = await this.snippetRepository.saveSnippet({
        ...snippetData,
        ipfsCid: ipfsResult.cid
      });
      
      res.status(201).json({
        success: true,
        snippet: savedSnippet,
        ipfsCid: ipfsResult.cid,
        ipfsLinks: {
          dweb: `https://dweb.link/ipfs/${ipfsResult.cid}`,
          gateway: `https://ipfs.io/ipfs/${ipfsResult.cid}`
        }
      });
    } catch (error) {
      console.error('Error in uploadSnippet controller:', error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      });
    }
  };
  
  /**
   * Retrieve a snippet from IPFS by CID
   */
  retrieveSnippet = async (req: Request, res: Response): Promise<void> => {
    try {
      const { cid } = req.params;
      
      if (!cid) {
        res.status(400).json({
          success: false,
          error: 'CID parameter is required'
        });
        return;
      }
      
      // Retrieve from IPFS
      const snippetData = await this.ipfsService.retrieveSnippet(cid);
      
      if (!snippetData) {
        res.status(404).json({
          success: false,
          error: 'Snippet not found on IPFS'
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        snippet: snippetData
      });
    } catch (error) {
      console.error('Error in retrieveSnippet controller:', error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      });
    }
  };
}

// Express routes setup
// src/routes/ipfsRoutes.ts

import express from 'express';
import { IPFSController } from '../api/ipfsController';

const router = express.Router();
const ipfsController = new IPFSController();

// Route for uploading snippets to IPFS
router.post('/snippets/upload', ipfsController.uploadSnippet);

// Route for retrieving snippets from IPFS by CID
router.get('/snippets/ipfs/:cid', ipfsController.retrieveSnippet);

export default router;