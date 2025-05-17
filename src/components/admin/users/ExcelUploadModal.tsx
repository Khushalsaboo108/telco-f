"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { bulkUserRegistration } from "@/app/actions/user.action";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

interface ExcelUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExcelUploadModal: React.FC<ExcelUploadModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
      toast.error("Please upload only Excel files (.xlsx or .xls)");
      return;
    }

    setSelectedFile(file);
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await bulkUserRegistration(formData);
      if (response) {
        toast.success("Users imported successfully");
        setSelectedFile(null);
        onClose();
      }
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to import users");
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
    },
    multiple: false,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Excel File</DialogTitle>
        </DialogHeader>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive ? "border-primary bg-primary/10" : "border-gray-300"}
            ${selectedFile ? "border-green-500 bg-green-50" : ""}`}
        >
          <input {...getInputProps()} />
          {uploading ? (
            <p>Uploading...</p>
          ) : selectedFile ? (
            <div>
              <p className="text-green-600">
                Selected file: {selectedFile.name}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Click or drag another file to replace
              </p>
            </div>
          ) : isDragActive ? (
            <p>Drop the Excel file here...</p>
          ) : (
            <div>
              <p>Drag and drop an Excel file here, or click to select</p>
              <p className="text-sm text-gray-500 mt-2">
                Supports .xlsx and .xls files
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={!selectedFile || uploading}>
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExcelUploadModal;
