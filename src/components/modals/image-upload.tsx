import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImagePlus, X } from "lucide-react";
import '@/styles/fonts.css';

interface ImageUploadProps {
  currentImage?: string;
  onChange: (imageUrl: string) => void;
  className?: string;
}

export function ImageUpload({ currentImage, onChange, className }: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState(currentImage);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setPreviewUrl(imageUrl);
        onChange(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreviewUrl(undefined);
    onChange('');
  };

  return (
    <div className={className}>
      <Label className="text-xs font-nord-book text-[#383244]/70 mb-2 block">
        Picture (128x128)
      </Label>
      
      <div className="relative w-32 h-32 bg-white/50 rounded-lg overflow-hidden">
        {previewUrl ? (
          <>
            <img 
              src={previewUrl} 
              alt="Persona" 
              className="w-full h-full object-cover"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1 right-1 h-6 w-6 bg-white/80 hover:bg-white"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer hover:bg-white/60 transition-colors">
            <ImagePlus className="h-8 w-8 text-[#383244]/50" />
            <span className="text-xs font-fougie text-[#383244]/50 mt-2">
              Upload Image
            </span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        )}
      </div>
    </div>
  );
}