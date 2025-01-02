import { deleteGalleryInBothPlaces, getIndywidualGalleryFromD1 } from "../../utils/db";
import { cachePurgeHome, cachePurgeSingle } from '../../utils/cachePurge';


export const deleteSingleGallery = async (c) => {
  try {
    const galeryTableName = c.req.param("galeryTableName")
    const { results: images } = await getIndywidualGalleryFromD1(c, galeryTableName);
    const response = await deleteGalleryInBothPlaces(c, galeryTableName);

    for (const resp of response) {
      if (!resp.success) {
        throw new Error("Błąd podczas usuwania: " + JSON.stringify(resp));
      }
    }

    if (images) {
      for (const image of images) {
        await c.env.R2.delete(image.path);
      }
    }

    await cachePurgeHome(c);
    await cachePurgeSingle(c, galeryTableName);

    return c.html('<b>Galeria została pomyślnie usunięta <a href="./">POWRÓT</a></b>');
  } catch (error) {
    return c.html(
      <div className="alert alert-danger">
        {error.message}
      </div>
    );
  }
}
