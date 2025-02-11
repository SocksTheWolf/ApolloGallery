import { setAsThumbnail } from "../../utils/db";

export const setAsThumb = async (c) => {
  const { imagePath, galleryTableName } = c.req.query();

  try {
    // Update the thumbnail to this one
    const success = await setAsThumbnail(c, galleryTableName, imagePath);

    return c.html(`
        <button 
          class="btn btn-secondary btn-sm"
          hx-post="../admin/api/setAsThumb?imagePath=${encodeURIComponent(imagePath)}&galleryTableName=${galleryTableName}"
          hx-target="this"
        >
          ${success ? (
            `<i class="bi bi-check-circle me-2"></i>${c.t("current_thumb")}`
          ) : (
            `<i class="bi bi-x-circle me-2"></i>${c.t("set_as_thumb")}`
          )}
        </button>
      `);
  } catch (error) {
    return c.html(
      <div className="alert alert-danger">
        {error.message}
      </div>
    );
  }
};
