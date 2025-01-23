import { updateGalleryOnD1 } from "../../utils/db";
import { cachePurgeHome, cachePurgeSingle } from '../../utils/cachePurge';

export const editSingleGallery = async (c) => {
  const galeryTableName = c.req.param("galeryTableName")
  const payload = await c.req.formData();
  const formObject = {
    GalleryTableName: galeryTableName
  };
  payload.forEach((value, key) => {
    formObject[key] = value;
  });

  try {
    const messages = await updateGalleryOnD1(c, formObject);
    if (!messages.success) {
      throw new Error(messages.message);
    }

    await cachePurgeSingle(c, galeryTableName);
    await cachePurgeHome(c);
    
    return c.html(
      <b>Galeria została pomyślnie uaktualniona <a href={`./${galeryTableName}`}>Odśwież</a></b>
    );
  } catch (error) {
    return c.html(
      <div className="alert alert-danger">
        {error.message}
      </div>
    );
  }
}
