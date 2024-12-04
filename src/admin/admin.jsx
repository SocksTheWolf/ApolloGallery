import { Hono } from "hono";
import { galleriesList } from "./galleries";
import { handleSingleGallery } from "./singleGallery";
import { newGalery } from "./newGallery";
import { removeAllFilesFromR2 } from "./clearR2Bucket";
import { handlePostNewGallery } from "./newGallery_POST";
import { editSingleGallery } from "./singleGalleryEdit_POST";
import { imageUploader } from "./singleGalleryUploader_POST";
import { deleteSingleGallery } from "./singleGallery_DELETE";
import { deleteImage } from "./deleteImage";
import { toggleApproval } from "./toggleImageApproval";

export const admin = new Hono({ strict: false });

admin.get("/", galleriesList);

admin.get("/new-gallery", newGalery);

admin.get("/deleteallimageslonglinktonotenteraccidentally", removeAllFilesFromR2);

admin.post("/new-gallery", handlePostNewGallery);

admin.delete("/api/deleteImage", deleteImage);  //api

admin.post("/api/toggleApproval", toggleApproval);  //api

admin.get("/:galeryTableName", handleSingleGallery);

admin.post("/:galeryTableName", editSingleGallery); //api

admin.post("/:galeryTableName/upload", imageUploader);  //api

admin.delete("/:galeryTableName/delete", deleteSingleGallery);  //api

