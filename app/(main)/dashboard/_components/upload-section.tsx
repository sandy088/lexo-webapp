"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useUploadStore } from "@/store/is-upload-store";

export function UploadSection() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { setIsUpload } = useUploadStore();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      // Check file type
      if (
        selectedFile.type === "application/pdf" ||
        selectedFile.type.startsWith("image/")
      ) {
        setFile(selectedFile);
      } else {
        toast.error("Invalid file type. Please upload a PDF or image file.");
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    maxFiles: 1,
  });

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return prev + 5;
        });
      }, 200);

      // Convert file to base64
      const base64 = await fileToBase64(file);

      // Send to API
      const response = await fetch("http://localhost:3000/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contractBase64: base64,
        }),
      });

      console.log("Response:", response);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API error (${response.status}):`, errorText);
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        throw new Error("Failed to analyze contract");
      }

      const data = await response.json();

      // Store the result in localStorage for the results page
      localStorage.setItem("contractAnalysis", JSON.stringify(data));
      localStorage.setItem("contractFileName", file.name);

      console.log("Analysis result:", data);

      // Navigate to results page
      setTimeout(() => {
        // router.push("/results");
        setIsUpload(true);
        toast.success("Contract analyzed successfully!");
      }, 500);
    } catch (error) {
      console.error("Error analyzing contract:", error);
      setUploadProgress(0);
      toast.error("Failed to analyze contract. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const getFileIcon = () => {
    if (!file) return null;

    if (file.type === "application/pdf") {
      return <FileText className="h-6 w-6 text-primary" />;
    } else if (file.type.startsWith("image/")) {
      return <ImageIcon className="h-6 w-6 text-primary" />;
    }

    return null;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <Card className="border-dashed bg-card shadow min-w-xl">
      <CardContent className="p-6">
        {!file ? (
          <div
            {...getRootProps()}
            className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center hover:bg-muted/50 transition-colors cursor-pointer ${
              isDragActive
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25"
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
              <Upload className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {isDragActive ? "Drop your file here" : "Upload your contract"}
            </h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-md">
              Drag and drop your PDF or image file here, or click to browse
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
              <span className="flex items-center rounded-full bg-muted px-3 py-1">
                <FileText className="mr-1 h-3 w-3" /> PDF
              </span>
              <span className="flex items-center rounded-full bg-muted px-3 py-1">
                <ImageIcon className="mr-1 h-3 w-3" /> PNG
              </span>
              <span className="flex items-center rounded-full bg-muted px-3 py-1">
                <ImageIcon className="mr-1 h-3 w-3" /> JPG
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between rounded-lg border bg-card p-4">
              <div className="flex items-center space-x-4">
                {getFileIcon()}
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRemoveFile}
                disabled={isUploading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {isUploading ? (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Analyzing contract...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>
                    {uploadProgress < 30
                      ? "Converting document..."
                      : uploadProgress < 70
                        ? "Analyzing clauses..."
                        : "Generating results..."}
                  </span>
                </div>
              </div>
            ) : (
              <Button className="w-full" onClick={handleUpload}>
                <Upload className="mr-2 h-4 w-4" /> Analyze Contract
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
