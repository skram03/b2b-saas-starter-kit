"use client";

import React, { useState } from "react";
import { UploadCloud, CheckCircle2, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploaderProps {
  onUploadComplete: (url: string) => void;
  acceptedTypes?: string;
  maxSizeMB?: number;
}

export function FileUploader({
  onUploadComplete,
  acceptedTypes = "image/*,application/pdf",
  maxSizeMB = 5,
}: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > maxSizeMB * 1024 * 1024) {
        alert(`File size exceeds maximum limit of ${maxSizeMB}MB`);
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    setUploadProgress(20);

    try {
      // Simulated upload progress (replace with actual Supabase Storage call)
      setTimeout(() => setUploadProgress(60), 300);
      setTimeout(() => {
        setUploadProgress(100);
        setIsUploading(false);
        const mockUrl = `https://storage.nexusb2b.app/${Date.now()}-${file.name}`;
        onUploadComplete(mockUrl);
      }, 700);
    } catch (error) {
      console.error("Upload error", error);
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full">
      {!file ? (
        <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-border rounded-lg cursor-pointer bg-muted/20 hover:bg-muted/40 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
            <p className="mb-1 text-sm text-foreground">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">
              Max size {maxSizeMB}MB (PDF, PNG, JPG)
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            accept={acceptedTypes}
            onChange={handleFileChange}
          />
        </label>
      ) : (
        <div className="p-4 border rounded-lg bg-card flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium truncate max-w-[200px]">
                {file.name}
              </span>
            </div>
            {!isUploading && uploadProgress !== 100 && (
              <button
                onClick={() => setFile(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {isUploading && (
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}

          {uploadProgress === 100 ? (
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
              <CheckCircle2 className="h-4 w-4" /> Uploaded successfully
            </div>
          ) : (
            <Button
              size="sm"
              onClick={handleUpload}
              disabled={isUploading}
              className="w-full"
            >
              {isUploading ? "Uploading..." : "Confirm Upload"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
