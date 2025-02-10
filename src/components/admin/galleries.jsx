import { Layout } from "./adminLayout";
import { getGalleriesFromD1 } from "../../utils/db";

const GalleriesLayout = ({ galleries, c }) => {
  return (
    <Layout title={c.t("admin_panel_title")} c={c} breadcrumb="admin_panel_breadcrumb">
      <div className="card">
        <div className="card-header bg-light" style={{ display: "flex", justifyContent: "space-between" }}>
          <h2 className="mb-0">{c.t("galleries_list_title")}</h2>
          <a href="admin/new-gallery" className="btn btn-success">
            <i className="bi bi-plus-circle me-2"></i>
            {c.t("create_gallery_button")}
          </a>
        </div>
        <div className="card-body">
          {galleries.length > 0 ? (
            <div className="list-group">
              {galleries.map((gallery, index) => (
                <a
                  href={"admin/" + String(gallery.GalleryTableName)}
                  className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                  key={index}
                >
                  {gallery.GalleryName}
                  {gallery.PartyDate && (
                    <span className="badge bg-primary rounded-pill">
                      {gallery.PartyDate}
                    </span>
                  )}
                </a>
              ))}
            </div>
          ) : (
            <div className="alert alert-info" role="alert">
              {c.t("no_galleries_message")}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export const galleriesList = async (c) => {
  const { success, results } = await getGalleriesFromD1(c);

  if (!success) {
    throw new Error(
      "Error while connecting to database, check your connection and try again"
    );
  }

  try {
    const galleries = results.map((result) => ({
      GalleryTableName: result.GalleryTableName,
      GalleryName: result.GalleryName,
      PartyDate: result.PartyDate,
    }));
    return c.html(<GalleriesLayout galleries={galleries} c={c} />);
  } catch (error) {
    return c.html(
      <div className="alert alert-danger">
        {c.t("error_loading_galleries_message")}: {error.message}
      </div>
    );
  }
};
