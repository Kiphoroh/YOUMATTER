import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

interface AddStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStory: (media: string) => void;
}

export const AddStoryModal: React.FC<AddStoryModalProps> = ({ isOpen, onClose, onAddStory }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('File is too large. Max 5MB.');
        return;
      }
      setError('');
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const cleanUp = () => {
    setSelectedFile(null);
    setPreview(null);
    setError('');
  };
  
  const handlePost = () => {
    if (preview) {
      onAddStory(preview);
      cleanUp();
    }
  };
  
  const handleClose = () => {
    cleanUp();
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create a New Story">
      <div className="flex flex-col items-center">
        <div className="w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center bg-gray-50 dark:bg-gray-700/50 mb-4">
          {preview ? (
            <img src={preview} alt="Preview" className="max-h-full max-w-full object-contain" />
          ) : (
            <label htmlFor="story-upload" className="cursor-pointer text-center text-gray-500 dark:text-gray-400 p-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <p>Click to upload an image</p>
              <p className="text-xs">PNG, JPG, GIF up to 5MB</p>
            </label>
          )}
          <input id="story-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </div>
        {error && <p className="text-sm text-error mb-2">{error}</p>}
        <Button onClick={handlePost} disabled={!selectedFile} fullWidth>
          Post Story
        </Button>
      </div>
    </Modal>
  );
};
