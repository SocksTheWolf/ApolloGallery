import { Layout } from "./layoutHTMX";
import translate from "./translate";

export const newGalery = (c) => {
  
  const t = (text) => {
    return translate(c, text);
  };

  return c.html(
    <Layout title={t("title")}>
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="../admin">{t("breadcrumb_admin")}</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {t("breadcrumb_new_gallery")}
          </li>
        </ol>
      </nav>

      <div className="card">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">{t("card_header")}</h2>
        </div>
        <div className="card-body">
          <form hx-post="" hx-target="#update_result">
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="galleryName" className="form-label">
                  {t("gallery_name_label")}
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="GalleryName"
                  id="galleryName"
                  placeholder={t("gallery_name_placeholder")}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="galleryTableName" className="form-label">
                  {t("gallery_table_name_label")}
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  name="GalleryTableName"
                  id="galleryTableName"
                  placeholder={t("gallery_table_name_placeholder")}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="textField" className="form-label">
                  {t("description_label")}
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="TextField"
                  id="textField"
                  placeholder={t("description_placeholder")}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="coverImage" className="form-label">
                  {t("cover_image_label")}
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="CoverImage"
                  id="coverImage"
                  placeholder={t("cover_image_placeholder")}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="partyDate" className="form-label">
                  {t("party_date_label")}
                </label>
                <input
                  required
                  type="date"
                  className="form-control"
                  name="PartyDate"
                  id="partyDate"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="publicationDate" className="form-label">
                  {t("publication_date_label")}
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="PublicationDate"
                  id="publicationDate"
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="galleryIsPublic" className="form-label">
                  {t("gallery_visibility_label")}
                </label>
                <select
                  className="form-select"
                  name="GalleryIsPublic"
                  id="galleryIsPublic"
                >
                  <option value="TRUE">{t("gallery_visibility_public")}</option>
                  <option selected value="FALSE">
                    {t("gallery_visibility_private")}
                  </option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <button type="submit" className="btn btn-primary">
                  <i className="bi bi-save me-2"></i>
                  {t("save_gallery_button")}
                </button>
              </div>
            </div>

            <div id="update_result" className="mt-3"></div>
          </form>
        </div>
      </div>
      <script type="module" src="../static/js/newgallery.js"></script>
    </Layout>
  );
};
