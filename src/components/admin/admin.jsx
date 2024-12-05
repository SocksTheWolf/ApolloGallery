import { Hono } from "hono";
import { galleriesList } from "./galleries";
import { handleSingleGallery } from "./singleGallery";
import { newGalery } from "./newGallery";
import { removeAllFilesFromR2 } from "../../utils/clearR2Bucket";    //tool endpoint to clear r2 bucket
import { handlePostNewGallery } from "./newGalleryPost";
import { editSingleGallery } from "./singleGalleryEditPost";
import { imageUploader } from "./singleGalleryUploaderPost";
import { deleteSingleGallery } from "./singleGalleryDelete";
import { deleteImage } from "./deleteImage";
import { toggleApproval } from "./toggleImageApproval";

export const admin = new Hono({ strict: false });

admin.get("/", galleriesList);

admin.get("/new-gallery", newGalery);

admin.get("/deleteallimageslonglinktonotenteraccidentally", (c) => {
 return c.text("This endpoint is intentionally left blank to prevent accidental deletion", { status: 403 });
});

admin.post("/new-gallery", handlePostNewGallery);

admin.delete("/api/deleteImage", deleteImage);  //api

admin.post("/api/toggleApproval", toggleApproval);  //api

admin.get("/:galeryTableName", handleSingleGallery);

admin.post("/:galeryTableName", editSingleGallery); //api

admin.post("/:galeryTableName/upload", imageUploader);  //api

admin.delete("/:galeryTableName/delete", deleteSingleGallery);  //api
