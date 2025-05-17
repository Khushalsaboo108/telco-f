import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  courseImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ metadata, file }) => {
    // This code RUNS ON YOUR SERVER after upload

    console.log("file url", file.url);
    console.log("file", file);

    // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
    return { file: file.url };
  }),
  chapterAttachment: f([
    "image",
    "pdf",
    "text",
    "video",
    "audio",
  ]).onUploadComplete(async ({ metadata, file }) => {
    // This code RUNS ON YOUR SERVER after upload
    console.log("Attachment complete for userId:");

    console.log("file url", file.url);

    // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
    return { file: file.url };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
