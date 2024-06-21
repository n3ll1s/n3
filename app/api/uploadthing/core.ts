import { toast } from "react-toastify";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
    image: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        // .middleware(() => handleAuth())
        .onUploadComplete(() => { }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;