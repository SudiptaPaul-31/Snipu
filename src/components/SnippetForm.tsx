"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TagInput } from "@/components/ui/tag-input";
import { createSnippet } from "@/actions";
import { useFormState } from "react-dom";
import { getUniqueTags } from "@/lib/mockData";

// Initial state for form
const initialState = {
  message: "",
};

export default function SnippetForm({ userId }: { userId: string }) {
  const [state, formAction] = useFormState(createSnippet, initialState);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  
  const availableTags = getUniqueTags();

  const handleSubmit = async (formData: FormData) => {
    setIsUploading(true);
    setUploadError(null);

    try {
      // Add tags and description to form data
      formData.set("tags", tags.join(","));
      formData.set("description", description);
      
      await formAction(formData);
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : "Failed to upload snippet",
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      {/* Display server-side errors */}
      {state.message && (
        <div className="p-3 bg-red-500/20 border border-red-500 rounded text-red-200 mb-4">
          {state.message}
        </div>
      )}

      {/* Display client-side upload errors */}
      {uploadError && (
        <div className="p-3 bg-red-500/20 border border-red-500 rounded text-red-200 mb-4">
          {uploadError}
        </div>
      )}

      {/* Form fields */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-200"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="mt-1 block w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label
          htmlFor="code"
          className="block text-sm font-medium text-gray-200"
        >
          Code
        </label>
        <textarea
          id="code"
          name="code"
          rows={10}
          className="mt-1 block w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        ></textarea>
      </div>

      <div>
        <label
          htmlFor="language"
          className="block text-sm font-medium text-gray-200"
        >
          Language
        </label>
        <select
          id="language"
          name="language"
          className="mt-1 block w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="JavaScript">JavaScript</option>
          <option value="TypeScript">TypeScript</option>
          <option value="Python">Python</option>
          <option value="Rust">Rust</option>
          <option value="Go">Go</option>
          <option value="Java">Java</option>
          <option value="C++">C++</option>
          <option value="C#">C#</option>
          <option value="PHP">PHP</option>
          <option value="Ruby">Ruby</option>
          <option value="Swift">Swift</option>
          <option value="Kotlin">Kotlin</option>
          <option value="Dart">Dart</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-200 mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-1 block w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Describe what this code snippet does..."
        />
      </div>

      <div>
        <label
          htmlFor="tags"
          className="block text-sm font-medium text-gray-200 mb-2"
        >
          Tags
        </label>
        <TagInput
          tags={tags}
          onTagsChange={setTags}
          placeholder="Add related topics..."
          maxTags={8}
          suggestions={availableTags}
        />
        <p className="mt-1 text-xs text-gray-400">
          Add tags to help others discover your snippet
        </p>
      </div>

      {/* Hidden field for author ID */}
      <input type="hidden" name="authorId" value={userId} />

      {/* Submit button with loading state */}
      {isUploading ? (
        <Button disabled className="bg-blue-600/50 w-full">
          <span className="animate-pulse">Uploading to IPFS...</span>
        </Button>
      ) : (
        <Button type="submit" className="w-full">
          Save Snippet
        </Button>
      )}
    </form>
  );
}
