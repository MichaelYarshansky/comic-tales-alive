
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';

interface PhotoUploadProps {
  onPhotoSelect: (file: File, url: string) => void;
  currentPhoto?: string;
}

const PhotoUpload = ({ onPhotoSelect, currentPhoto }: PhotoUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      onPhotoSelect(file, url);
    }
  };

  const handleRemovePhoto = () => {
    onPhotoSelect(null as any, '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      {currentPhoto ? (
        <div className="relative">
          <img
            src={currentPhoto}
            alt="Uploaded photo"
            className="w-full h-48 object-cover rounded-lg border-4 border-blue-300"
          />
          <Button
            onClick={handleRemovePhoto}
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="w-full h-48 border-4 border-dashed border-blue-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
        >
          <Upload className="h-12 w-12 text-blue-400 mb-2" />
          <p className="text-lg font-semibold text-blue-600">Click to upload photo</p>
          <p className="text-sm text-gray-500">JPG, PNG, or GIF</p>
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;
