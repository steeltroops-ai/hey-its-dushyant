'use client';

import { useState, useRef, ChangeEvent } from 'react';
import Image from 'next/image';

interface PhotoUploadProps {
  onUpload: (file: File, metadata: { caption?: string; location?: string; date?: string }) => void;
  isUploading: boolean;
}

export default function PhotoUpload({ onUpload, isUploading }: PhotoUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedFile) {
      onUpload(selectedFile, {
        caption: caption || undefined,
        location: location || undefined,
        date: date || undefined,
      });
      
      // Reset form
      setSelectedFile(null);
      setPreview(null);
      setCaption('');
      setLocation('');
      setDate('');
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreview(null);
    setCaption('');
    setLocation('');
    setDate('');
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Upload a Photo</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* File Input */}
        <div className="space-y-2">
          <label htmlFor="photo" className="block text-sm font-medium">
            Select Photo
          </label>
          <input
            type="file"
            id="photo"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
            required
          />
        </div>
        
        {/* Preview */}
        {preview && (
          <div className="relative h-48 rounded-md overflow-hidden">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-contain"
            />
          </div>
        )}
        
        {/* Caption */}
        <div className="space-y-2">
          <label htmlFor="caption" className="block text-sm font-medium">
            Caption (optional)
          </label>
          <input
            type="text"
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-input bg-background"
            placeholder="Add a caption for this photo"
          />
        </div>
        
        {/* Location */}
        <div className="space-y-2">
          <label htmlFor="location" className="block text-sm font-medium">
            Location (optional)
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-input bg-background"
            placeholder="Where was this photo taken?"
          />
        </div>
        
        {/* Date */}
        <div className="space-y-2">
          <label htmlFor="date" className="block text-sm font-medium">
            Date (optional)
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-input bg-background"
          />
        </div>
        
        {/* Buttons */}
        <div className="flex space-x-3 pt-2">
          <button
            type="submit"
            disabled={!selectedFile || isUploading}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isUploading ? 'Uploading...' : 'Upload Photo'}
          </button>
          
          {selectedFile && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-muted text-muted-foreground px-4 py-2 rounded-md hover:bg-muted/80 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
