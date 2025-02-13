import { Layout } from "./adminLayout";
import { getGalleriesFromD1 } from "../../utils/db";

const GalleriesLayout = ({ galleries, c }) => {
  return (
    <Layout title={c.t("admin_panel_title")} c={c}>
      <article>
        <header>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3 className="mb-0">{c.t("galleries_list_title")}</h3>
          <a href="admin/new-gallery" className="btn btn-success">
            <i className="bi bi-plus-circle"></i>
            {c.t("create_gallery_button")}
          </a>
        </div>
        </header>

        {galleries.length > 0 ? (
          <table class="striped">
          <thead>
            <tr>
              <th>
              {c.t("gallery_name_label")}
              </th>
              <th>
              Date
              </th>
            </tr>
          </thead>
          <tbody>
              {galleries.map((gallery, index) => (
                <tr>
                <td><a
                  href={"admin/" + String(gallery.GalleryTableName)}
                  className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                  key={index}>
                  {gallery.GalleryName}</a></td>
                <td>
                  {gallery.PartyDate && (
                    <span className="badge bg-primary rounded-pill">
                      {gallery.PartyDate}
                    </span>
                  )}
                </td>
                </tr>
              ))}
            </tbody>
          </table>
          ) : (
            <div className="alert alert-info" role="alert">
              {c.t("no_galleries_message")}
            </div>
          )}
      </article>
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
