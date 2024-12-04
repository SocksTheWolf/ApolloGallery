import { toggleImageApproval } from "./db";

export const toggleApproval = async (c) => {
  const { imagePath, galleryTableName } = c.req.query();

  try {
    const newApproval = await toggleImageApproval(c, galleryTableName, imagePath);

    return c.html(`
      <button 
        className="btn btn-secondary btn-sm"
        hx-post="/admin/api/toggleApproval?imagePath=${encodeURIComponent(imagePath)}&galleryTableName=${galleryTableName}"
        hx-target="this"
      >
        ${newApproval ? (
          '<i className="bi bi-check-circle me-2"></i>Zatwierdzone'
        ) : (
          '<i className="bi bi-x-circle me-2"></i>Nie zatwierdzone'
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
