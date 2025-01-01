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
      throw new Error("Galeria o takiej nazwie/ścieżce już istnieje");
    }

    const createResponse = await createGallery(c, formObject);
    for (const singleCreated of createResponse) {
      if (!singleCreated.success) {
        throw new Error("Błąd podczas zapisu: " + JSON.stringify(singleCreated));
      }
    }
    cachePurgeHome(c);
    c.header('hx-redirect', `/admin/${formObject.GalleryTableName}`);
    return c.text("Zapisano w bazie danych");
  } catch (error) {
    return c.html(
      <div className="alert alert-danger">
        {error.message}
      </div>
    );
  }
}
