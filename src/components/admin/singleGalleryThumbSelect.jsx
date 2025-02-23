import { setAsThumbnail } from "../../utils/db";
import { cachePurgeHome } from "../../utils/cachePurge";

export const setAsThumb = async (c) => {
  const { imagePath, galleryTableName } = c.req.query();

  try {
    // Update the thumbnail to this one
    const success = await setAsThumbnail(c, galleryTableName, imagePath);

    // Clear out the cache appropriately
    if (success)
      await cachePurgeHome(c);

    return c.html(`
        <span hx-swap-oob="innerHTML:#selected-thumb"><i class="bi bi-pin"></i>${c.t("set_as_thumb")}</span>
        <button 
          class="btn btn-secondary btn-sm"
          hx-post="../admin/api/setAsThumb?imagePath=${encodeURIComponent(imagePath)}&galleryTableName=${galleryTableName}"
          hx-target="this"
        >
          ${success ? (
            `<span id="selected-thumb"><i class="bi bi-pin-angle-fill"></i>${c.t("current_thumb")}</span>`
          ) : (
            `<span><i class="bi bi-pin"></i>${c.t("set_as_thumb")}</span>`
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
