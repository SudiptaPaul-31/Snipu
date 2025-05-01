// src/components/SnippetUploader.tsx

import React, { useState } from 'react';
import { IPFSService } from '../services/ipfsService';

// Adjust the token for your environment
// In production, you should store this in environment variables
const WEB3_STORAGE_TOKEN = process.env.REACT_APP_WEB3_STORAGE_TOKEN || '';

interface SnippetUploaderProps {
  onUploadSuccess?: (cid: string) => void;
}

const SnippetUploader: React.FC<SnippetUploaderProps> = ({ onUploadSuccess }) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [language, setLanguage] = useState<string>('javascript');
  const [tags, setTags] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadResult, setUploadResult] = useState<{ success: boolean; cid?: string; error?: string } | null>(null);

  // Initialize IPFS service
  const ipfsService = new IPFSService(WEB3_STORAGE_TOKEN);

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !content) {
      setUploadResult({
        success: false,
        error: 'Please provide both title and content for the snippet'
      });
      return;
    }
    
    try {
      setIsUploading(true);
      
      // Prepare the snippet data
      const snippetData = {
        title,
        content,
        language,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        metadata: {
          createdAt: new Date().toISOString()
        }
      };
      
      // Upload to IPFS
      const result = await ipfsService.uploadSnippet(snippetData);
      
      setUploadResult(result);
      
      if (result.success && result.cid && onUploadSuccess) {
        onUploadSuccess(result.cid);
      }
    } catch (error) {
      console.error('Error in upload handler:', error);
      setUploadResult({
        success: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      });
    } finally {
      setIsUploading(false);
    }
  };

//   return (
//     <div className="snippet-uploader">
//       <h2>Upload Code Snippet to IPFS</h2>
      
//       <form onSubmit={handleUpload}>
//         <div className="form-group">
//           <label htmlFor="title">Title</label>
//           <input 
//             type="text"
//             id="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Snippet title"
//             required
//           />
//         </div>
        
//         <div className="form-group">
//           <label htmlFor="language">Language</label>
//           <select 
//             id="language"
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//           >
//             <option value="javascript">JavaScript</option>
//             <option value="typescript">TypeScript</option>
//             <option value="python">Python</option>
//             <option value="java">Java</option>
//             <option value="csharp">C#</option>
//             <option value="solidity">Solidity</option>
//             <option value="go">Go</option>
//             <option value="rust">Rust</option>
//             <option value="php">PHP</option>
//             <option value="ruby">Ruby</option>
//             <option value="html">HTML</option>
//             <option value="css">CSS</option>
//           </select>
//         </div>
        
//         <div className="form-group">
//           <label htmlFor="tags">Tags (comma separated)</label>
//           <input 
//             type="text"
//             id="tags"
//             value={tags}
//             onChange={handleTagsChange}
//             placeholder="e.g. function, utility, web3"
//           />
//         </div>
        
//         <div className="form-group">
//           <label htmlFor="content">Code Snippet</label>
//           <textarea 
//             id="content"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             placeholder="Paste your code here..."
//             rows={10}
//             required
//           />
//         </div>
        
//         <button 
//           type="submit"
//           disabled={isUploading || !title || !content}
//         >
//           {isUploading ? 'Uploading...' : 'Upload to IPFS'}
//         </button>
//       </form>
      
//       {uploadResult && (
//         <div className={`upload-result ${uploadResult.success ? 'success' : 'error'}`}>
//           {uploadResult.success ? (
//             <>
//               <h3>Upload Successful!</h3>
//               <p>Your snippet has been uploaded to IPFS.</p>
//               <p>Content Identifier (CID): <strong>{uploadResult.cid}</strong></p>
//               <p>You can access your snippet using the following gateway URLs:</p>
//               <ul>
//                 <li>
//                   <a 
//                     href={`https://dweb.link/ipfs/${uploadResult.cid}`} 
//                     target="_blank" 
//                     rel="noopener noreferrer"
//                   >
//                     dweb.link
//                   </a>
//                 </li>
//                 <li>
//                   <a 
//                     href={`https://ipfs.io/ipfs/${uploadResult.cid}`} 
//                     target="_blank" 
//                     rel="noopener noreferrer"
//                   >
//                     ipfs.io
//                   </a>
//                 </li>
//               </ul>
//             </>
//           ) : (
//             <>
//               <h3>Upload Failed</h3>
//               <p>Error: {uploadResult.error}</p>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SnippetUploader;