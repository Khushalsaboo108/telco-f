"use client";

import { IShortChapter } from "@/types/course";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapter: IShortChapter | null;
}

export const VideoModal = ({ isOpen, onClose, chapter }: VideoModalProps) => {
  if (!chapter) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full md:max-w-[80vw] md:max-h-[70vh]">
        <DialogHeader className="h-fit">
          <DialogTitle>{chapter.title}</DialogTitle>
        </DialogHeader>
        <div className="py-4 sm:h-screen sm:max-h-[60vh]">
          {chapter.videoUrl && (
            <div className=" w-full h-full">
              <iframe
                src={chapter.videoUrl}
                className="w-full h-full"
                allowFullScreen
                title={chapter.title}
              />
            </div>
          )}

          {chapter.description && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-sm text-muted-foreground">
                {chapter.description}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
