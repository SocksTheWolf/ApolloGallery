import { deleteImageFromGallery } from "../../utils/db";
import { cachePurgeSingle } from "../../utils/cachePurge";

export const deleteImage = async (c) => {
  const { imagePath, galleryTableName } = c.req.query();

  try {
    // Delete the image from the database
    const result = await deleteImageFromGallery(c, galleryTableName, imagePath);

    // Delete the image from R2
    await c.env.R2.delete(imagePath);

    // Clear the cache for this gallery
    await cachePurgeSingle(c, galleryTableName);

    // Return a blank response to remove the card from the DOM
    return c.text("");
  } catch (error) {
    return c.html(
      <div className="alert alert-danger">
        {error.message}
      </div>
    );
  }
};
