import { Hono } from "hono";
import { basicAuth } from "hono/basic-auth";
import { galleriesList } from "./admin/galleries";
import { handleSingleGallery } from "./admin/singleGallery";
import { newgallery } from "./admin/newGallery";
import { removeAllFilesFromR2 } from "../utils/clearR2Bucket"; //tool endpoint to clear r2 bucket
import { handlePostNewGallery } from "./admin/newGalleryPost";
import { editSingleGallery } from "./admin/singleGalleryEditPost";
import { imageUploader } from "./admin/singleGalleryUploaderPost";
import { deleteSingleGallery } from "./admin/singleGalleryDelete";
import { deleteImage } from "./admin/deleteImage";
import { toggleApproval } from "./admin/toggleImageApproval";
import { manualPurge } from "./admin/manualPurge";
import { cachePurgeAll } from '../utils/cachePurge';
import { secureHeaders } from 'hono/secure-headers';
import { setAsThumb } from "./admin/setAsThumb";

export const admin = new Hono({ strict: false });

admin.use(
  basicAuth({
    verifyUser: (username, password, c) => {
      return (
        username === String(c.env.USERNAME) &&
        password === String(c.env.PASSWORD)
      );
    },
  })
);

admin.use(secureHeaders());

admin.get("/", galleriesList);

admin.get("/new-gallery", newgallery);

admin.get("/deleteallimageslonglinktonotenteraccidentally", (c) => {
  return c.text(
    "This endpoint is intentionally left blank to prevent accidental deletion",
    { status: 403 }
  );
});

admin.get("/purge", async (c) => {   
  const removedKeys = await cachePurgeAll(c);                      
  return c.html(`<h3>${c.t('all_cache_purged')} </h3><div>${removedKeys.join('<br>')}</div><a href="./">${c.t('go_home')}</a>`)
});

admin.post("/new-gallery", handlePostNewGallery);

admin.delete("/api/deleteImage", deleteImage); //api

admin.post("/api/toggleApproval", toggleApproval); //api

admin.post("/api/setAsThumb", setAsThumb); //api

admin.get("/:galleryTableName", handleSingleGallery);

admin.post("/:galleryTableName", editSingleGallery); //api

admin.post("/:galleryTableName/upload", imageUploader); //api

admin.delete("/:galleryTableName/delete", deleteSingleGallery); //api

admin.post("/:galleryTableName/purge", manualPurge); //api