"use client";
import { IChapter } from "@/types/course";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Video, Pencil, PlusCircle, Loader2, Cloud } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { updateChapter } from "@/app/actions/course.action";

interface VideoValidationResult {
  isValid: boolean;
  error?: string;
}

const ACCEPTED_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/quicktime",
];

const MAX_FILE_SIZE = 500 * 1024 * 1024;

const formSchema = z.object({
  videoUrl: z.string().min(1, { message: "Video is required" }),
});

export function ChapterVideoForm({
  initialData,
  sectionId,
  chapterId,
}: {
  initialData: IChapter | null;
  sectionId: string;
  chapterId: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoUrl: initialData?.videoUrl || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  console.log("initial data::", initialData);

  const validateVideoFile = (file: File): VideoValidationResult => {
    if (!file) {
      return {
        isValid: false,
        error: "Please select a video file",
      };
    }

    // Check file type
    if (!ACCEPTED_VIDEO_TYPES.includes(file.type)) {
      return {
        isValid: false,
        error: `Invalid file type. Please upload a video file (${ACCEPTED_VIDEO_TYPES.map(
          (type) => type.split("/")[1]
        ).join(", ")})`,
      };
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return {
        isValid: false,
        error: "Video file must be less than 100MB",
      };
    }

    return {
      isValid: true,
    };
  };

  const handleVideoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validationResult = validateVideoFile(file);
    if (!validationResult.isValid) {
      // toast.error(validationResult.error);
      event.target.value = "";
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/course/current-course/${sectionId}/chapter/${chapterId}`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      await onSubmit({ videoUrl: data.url });
    } catch (error) {
      toast.error("Failed to upload video");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      toast.success("Chapter video updated");
      toggleEdit();
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to update chapter video");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter Video
        <Button onClick={toggleEdit} variant="ghost" disabled={isUploading}>
          {isEditing ? (
            "Cancel"
          ) : !initialData?.videoUrl ? (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a Video
            </>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Video
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <div>
          {!initialData?.videoUrl ? (
            <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
              <Video className="h-10 w-10 text-slate-500" />
            </div>
          ) : (
            <div className="relative aspect-video mt-2">
              <iframe
                className="w-full rounded-md h-full"
                src={initialData.videoUrl}
              >
                Your browser does not support the iframe tag.
              </iframe>
            </div>
          )}
        </div>
      )}

      {isEditing && (
        <div className="mt-4">
          <div className="bg-white rounded-lg border-2 border-dashed border-slate-300 p-8">
            <div className="flex flex-col items-center justify-center gap-4">
              <Cloud className="h-10 w-10 text-slate-500" />
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm font-medium">
                  Choose a file or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  Video ({Math.round(100)}MB)
                </p>
              </div>
              <input
                id="video-upload"
                type="file"
                accept={ACCEPTED_VIDEO_TYPES.join(",")}
                onChange={handleVideoUpload}
                disabled={isUploading}
                className="hidden"
              />
              <Button
                disabled={isUploading}
                variant="default"
                onClick={() => document.getElementById("video-upload")?.click()}
              >
                Choose File
              </Button>
            </div>
          </div>

          {isUploading && (
            <div className="flex items-center justify-center mt-4">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              <p className="text-sm">Uploading video...</p>
            </div>
          )}

          <div className="text-xs text-muted-foreground mt-4">
            Accepted formats: MP4, WebM, OGG, QuickTime. Maximum file size:
            100MB
          </div>
        </div>
      )}

      {initialData?.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Videos can take a few minutes to process. Refresh the page if video
          does not appear.
        </div>
      )}
    </div>
  );
}
