import { toggleImageApproval } from "../../utils/db";

export const toggleApproval = async (c) => {
  const { imagePath, galleryTableName } = c.req.query();

  try {
    const newApproval = await toggleImageApproval(c, galleryTableName, imagePath);

    return c.html(`
      <button 
        class="btn btn-secondary btn-sm"
        hx-post="../admin/api/toggleApproval?imagePath=${encodeURIComponent(imagePath)}&galleryTableName=${galleryTableName}"
        hx-target="this"
      >
        ${newApproval ? (
          `<i class="bi bi-check-circle me-2"></i>${c.t('approved_label')}`
        ) : (
          `<i class="bi bi-x-circle me-2"></i>${c.t('unapproved_label')}`
        )}
      </button>
    `);
  } catch (error) {
    return c.html(
      `<div className="alert alert-danger">
        ${error.message}
      </div>`
    );
  }
};
