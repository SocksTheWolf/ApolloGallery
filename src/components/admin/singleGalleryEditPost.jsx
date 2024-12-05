import { updateGalleryOnD1 } from "../../utils/db";

export const editSingleGallery = async (c) => {
  const payload = await c.req.formData();
  const formObject = {};
  payload.forEach((value, key) => {
    formObject[key] = value;
  });

  try {
    const messages = await updateGalleryOnD1(c, formObject);
    if (!messages.success) {
      throw new Error(messages.message);
    }
    return c.html(
      <b>Galeria została pomyślnie uaktualniona <a href={`./${c.req.param("galeryTableName")}`}>Odśwież</a></b>
    );
  } catch (error) {
    return c.html(
      <div className="alert alert-danger">
        {error.message}
      </div>
    );
  }
}
