import { updateGalleryOnD1 } from "../../utils/db";
import { cachePurgeHome, cachePurgeSingle } from '../../utils/cachePurge';

export const editSingleGallery = async (c) => {
  const galleryTableName = c.req.param("galleryTableName")
  const payload = await c.req.formData();
  const formObject = {
    GalleryTableName: galleryTableName
  };
  payload.forEach((value, key) => {
    formObject[key] = value;
  });

  try {
    const messages = await updateGalleryOnD1(c, formObject);
    if (!messages.success) {
      throw new Error(messages.message);
    }

    await cachePurgeSingle(c, galleryTableName);
    await cachePurgeHome(c);
    
    return c.html(
      <b>{c.t('gallery_updated')} <a href={`./${galleryTableName}`}>{c.t('refresh')}</a></b>
    );
  } catch (error) {
    return c.html(
      <div className="alert alert-danger">
        {error.message}
      </div>
    );
  }
}
