import { Layout } from "./layoutHTMX";

export const newgallery = (c) => {
  return c.html(
    <Layout title={c.t("title")} c={c}>
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="../admin">{c.t("admin_panel_breadcrumb")}</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {c.t("breadcrumb_new_gallery")}
          </li>
        </ol>
      </nav>

      <div className="card bg-light">
        <div className="card-header bg-success text-white">
          <h2 className="mb-0">{c.t("card_header")}</h2>
        </div>
        <div className="card-body">
          <form hx-post="" hx-target="#update_result">
            <div className="row mb-3">
              <div className="col-12">
                <label htmlFor="galleryName" className="form-label">
                  <i className="bi bi-folder me-2"></i>
                  {c.t("gallery_name_label")}
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="GalleryName"
                  id="galleryName"
                  placeholder={c.t("gallery_name_placeholder")}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-12">
                <label
                  htmlFor="galleryTableName"
                  className="form-label text-muted"
                >
                  <i className="bi bi-database me-2"></i>
                  {c.t("gallery_table_name_label")}
                </label>
                <input
                  required
                  type="text"
                  className="form-control form-control-sm bg-light"
                  name="GalleryTableName"
                  id="galleryTableName"
                  placeholder={c.t("gallery_table_name_placeholder")}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-12">
                <label htmlFor="textField" className="form-label">
                  <i className="bi bi-text-paragraph me-2"></i>
                  {c.t("description_label")}
                </label>
                <textarea
                  className="form-control"
                  name="TextField"
                  id="textField"
                  rows="3"
                  placeholder={c.t("description_placeholder")}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="location" className="form-label">
                  <i className="bi bi-geo-alt me-2"></i>
                  {c.t("location_label")}
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="Location"
                  id="location"
                  placeholder={c.t("location_placeholder")}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="tags" className="form-label">
                  <i className="bi bi-tags me-2"></i>
                  {c.t("tags_label")}
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="Tags"
                  id="tags"
                  placeholder={c.t("tags_placeholder")}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-12">
                <label htmlFor="coverImage" className="form-label">
                  <i className="bi bi-image me-2"></i>
                  {c.t("cover_image_label")}
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="CoverImage"
                  id="coverImage"
                  placeholder={c.t("cover_image_placeholder")}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="partyDate" className="form-label">
                  <i className="bi bi-calendar-event me-2"></i>
                  {c.t("party_date_label")}
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
                  <i className="bi bi-calendar2-check me-2"></i>
                  {c.t("publication_date_label")}
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
                  <i className="bi bi-eye me-2"></i>
                  {c.t("gallery_visibility_label")}
                </label>
                <select
                  className="form-select"
                  name="GalleryIsPublic"
                  id="galleryIsPublic"
                >
                  <option value="TRUE">
                    {c.t("gallery_visibility_public")}
                  </option>
                  <option selected value="FALSE">
                    {c.t("gallery_visibility_private")}
                  </option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="password" className="form-label">
                  <i className="bi bi-key me-2"></i>
                  {c.t("password_label")}
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="Password"
                  id="password"
                  placeholder={c.t("password_placeholder")}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="reviewers" className="form-label">
                  <i className="bi bi-people me-2"></i>
                  {c.t("reviewers_label")}
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="Reviewers"
                  id="reviewers"
                  placeholder={c.t("reviewers_placeholder")}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="imagesOrder" className="form-label">
                  <i className="bi bi-sort-alpha-down me-2"></i>
                  {c.t("images_order_label")}
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="ImagesOrder"
                  id="imagesOrder"
                  placeholder={c.t("images_order_placeholder")}
                />
              </div>
            </div>

            <div className="row">
              <div className="col">
                <button type="submit" className="btn btn-success">
                  <i className="bi bi-save me-2"></i>
                  {c.t("save_gallery_button")}
                </button>
              </div>
            </div>

            <div id="update_result" className="mt-3"></div>
          </form>
        </div>
      </div>
      <script type="module" src="/static/js/newgallery.js"></script>
    </Layout>
  );
};

export default newgallery;
