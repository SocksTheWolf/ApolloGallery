import { deleteGalleryInBothPlaces, getIndywidualGalleryFromD1 } from "../../utils/db";
import { cachePurgeHome, cachePurgeSingle } from '../../utils/cachePurge';


export const deleteSingleGallery = async (c) => {
  try {
    const galleryTableName = c.req.param("galleryTableName")
    const { results: images } = await getIndywidualGalleryFromD1(c, galleryTableName);
    const response = await deleteGalleryInBothPlaces(c, galleryTableName);

    for (const resp of response) {
      if (!resp.success) {
        throw new Error(c.t("delete_error") + JSON.stringify(resp));
      }
    }

    if (images) {
      for (const image of images) {
        await c.env.R2.delete(image.path);
      }
    }

    await cachePurgeHome(c);
    await cachePurgeSingle(c, galleryTableName);

    return c.html(`<b>${c.t('gallery_deleted')} <a href="../admin">${c.t('return')}</a></b>`);
  } catch (error) {
    return c.html(
      <div className="alert alert-danger">
        {error.message}
      </div>
    );
  }
}
