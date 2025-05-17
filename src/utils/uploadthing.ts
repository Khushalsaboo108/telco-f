import { UTApi } from "uploadthing/server";

export const utapi = new UTApi();

export const deleteFile = async (imageKey: string) => {
  try {
    await utapi.deleteFiles(imageKey);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
