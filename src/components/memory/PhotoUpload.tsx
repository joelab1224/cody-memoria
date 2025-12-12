'use client';

import * as React from 'react';
import { Upload, X, Loader2, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface PhotoUploadProps {
  onAvatarCreated: (data: { avatarId: string; imageUrl: string }) => void;
  initialImageUrl?: string;
  className?: string;
}

export function PhotoUpload({ onAvatarCreated, initialImageUrl, className }: PhotoUploadProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [preview, setPreview] = React.useState<string | null>(initialImageUrl || null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      await handleFile(files[0]);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await handleFile(files[0]);
    }
  };

  const handleFile = async (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Image must be less than 10MB');
      return;
    }

    setError(null);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload and create avatar
    await createAvatar(file);
  };

  const createAvatar = async (file: File) => {
    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', file);
      // Generate a display name from the file name or use a timestamp
      const displayName = file.name.replace(/\.[^/.]+$/, '').slice(0, 50) || `Avatar ${Date.now()}`;
      formData.append('displayName', displayName);

      const response = await fetch('/api/anam/avatar', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create avatar');
      }

      const data = await response.json();
      onAvatarCreated({
        avatarId: data.id,
        imageUrl: preview || '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create avatar');
      setPreview(null);
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setPreview(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn('w-full', className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {!preview ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            'relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors',
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50'
          )}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
            <p className="mb-2 text-sm text-muted-foreground">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG or WEBP (MAX. 10MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="relative w-full">
          <div className="relative aspect-square max-w-sm mx-auto rounded-lg overflow-hidden border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            {isUploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="flex flex-col items-center text-white">
                  <Loader2 className="w-8 h-8 animate-spin mb-2" />
                  <p className="text-sm">Creating avatar...</p>
                </div>
              </div>
            )}
          </div>
          {!isUploading && (
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-2 right-2"
              onClick={removeImage}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-destructive text-center">{error}</p>
      )}

      <div className="mt-4 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-start gap-3">
          <ImageIcon className="w-5 h-5 text-muted-foreground mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-1">Photo Tips:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Use a clear, front-facing photo</li>
              <li>Good lighting helps create a better avatar</li>
              <li>Neutral expression works best</li>
              <li>Avoid photos with multiple people</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
