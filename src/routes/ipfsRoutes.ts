import express from 'express';
import { IPFSController } from '../api/ipfsController';

const router = express.Router();
const ipfsController = new IPFSController();

// Route for uploading snippets to IPFS
router.post('/snippets/upload', ipfsController.uploadSnippet);

// Route for retrieving snippets from IPFS by CID
router.get('/snippets/ipfs/:cid', ipfsController.retrieveSnippet);

export default router;