import { createGallery, checkIfExistGalleryOnD1 } from "../../utils/db";
import { cachePurgeHome } from '../../utils/cachePurge';


export const handlePostNewGallery = async (c) => {
  const payload = await c.req.formData();
  const formObject = {};
  payload.forEach((value, key) => {
    formObject[key] = value;
  });

  try {
    const response = await checkIfExistGalleryOnD1(c, formObject.GalleryTableName);
    if (response.results.length > 0) {
      throw new Error(c.text("gallery_already_exists"));
    }

    const createResponse = await createGallery(c, formObject);
    for (const singleCreated of createResponse) {
      if (!singleCreated.success) {
        throw new Error(`${c.text("gallery_save_error")}: ${JSON.stringify(singleCreated)}`);
      }
    }
    await cachePurgeHome(c);
    c.header('hx-redirect', `${formObject.GalleryTableName}`);
    return c.text("gallery_saved");
  } catch (error) {
    return c.html(
      <div className="alert alert-danger">
        {error.message}
      </div>
    );
  }
}
