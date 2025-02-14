import { setAsThumbnail } from "../../utils/db";
import { cachePurgeHome } from "../../utils/cachePurge" 

export const setAsThumb = async (c) => {
  const { imagePath, galleryTableName } = c.req.query();

  try {
    // Update the thumbnail to this one
    const success = await setAsThumbnail(c, galleryTableName, imagePath);

    // Clear out the cache appropriately
    if (success)
      await cachePurgeHome(c);

    return c.html(`
        <i hx-swap-oob="outerHTML:.bi-star-fill"><i class="bi bi-star"></i></i>
        <div 
          class="admin-card-thumb"
           data-tooltip=${success ? (c.t("current_thumb")) : (c.t("set_as_thumb"))} 
           data-placement="left"
          hx-post="../admin/api/setAsThumb?imagePath=${encodeURIComponent(imagePath)}&galleryTableName=${galleryTableName}"
          hx-target="this"
        >
          ${success ? (
            `<i class="bi bi-star-fill"></i>`
          ) : (
            `<i class="bi bi-star"></i>`
          )}
        </div>
      `);
  } catch (error) {
    return c.html(
      <div className="alert alert-danger">
        {error.message}
      </div>
    );
  }
};
