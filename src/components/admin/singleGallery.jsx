import { Layout } from "./layoutHTMX";
import { getGalleriesFromD1, getIndywidualGalleryFromD1 } from "../../utils/db";

const Singlegallery = (props) => {
  const c = props.c; // Ensure the context is passed correctly

  return (
    <Layout title={c.t("editing") + props.gallery.GalleryName} c={c}>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="../admin">{c.t("admin_panel_breadcrumb")}</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {props.gallery.GalleryName}
          </li>
        </ol>

      <div className="card mb-4 bg-light">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">{c.t("editing_gallery")}{props.gallery.GalleryName}</h2>
        </div>
        <div className="card-body">
          <form hx-post="" hx-target="#update_result">
            <div className="row mb-3">
              <div className="col-12">
                <label htmlFor="galleryName" className="form-label">
                  {c.t("gallery_name_label")}
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="GalleryName"
                  id="galleryName"
                  value={props.gallery.GalleryName}
                  placeholder={c.t("gallery_name_placeholder")}
                />
                <div className="form-text text-muted">
                  {c.t("gallery_table_name_label")}: {props.gallery.GalleryTableName}
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-12">
                <label htmlFor="textField" className="form-label">
                  {c.t("description_label")}
                </label>
                <textarea
                  className="form-control"
                  name="TextField"
                  id="textField"
                  rows="3"
                  value={props.gallery.TextField}
                  placeholder={c.t("description_placeholder")}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="location" className="form-label">
                  {c.t("location_label")}
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="Location"
                  id="location"
                  value={props.gallery.Location}
                  placeholder={c.t("location_placeholder")}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="tags" className="form-label">
                  {c.t("tags_label")}
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="Tags"
                  id="tags"
                  value={props.gallery.Tags}
                  placeholder={c.t("tags_placeholder")}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-12">
                <label htmlFor="coverImage" className="form-label">
                  {c.t("cover_image_label")}
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="CoverImage"
                  id="coverImage"
                  value={props.gallery.CoverImage}
                  placeholder={c.t("cover_image_placeholder")}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="partyDate" className="form-label">
                  {c.t("party_date_label")}
                </label>
                <input
                  required
                  type="date"
                  className="form-control"
                  name="PartyDate"
                  id="partyDate"
                  value={props.gallery.PartyDate}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="publicationDate" className="form-label">
                  {c.t("publication_date_label")}
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="PublicationDate"
                  id="publicationDate"
                  value={props.gallery.PublicationDate}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="galleryIsPublic" className="form-label">
                  {c.t("gallery_visibility_label")}
                </label>
                <select
                  className="form-select"
                  name="GalleryIsPublic"
                  id="galleryIsPublic"
                  defaultValue={props.gallery.GalleryIsPublic}
                  key={props.gallery.GalleryIsPublic}
                >
                  <option value="TRUE" selected={props.gallery.GalleryIsPublic === "TRUE"}>{c.t("gallery_visibility_public")}</option>
                  <option value="FALSE" selected={props.gallery.GalleryIsPublic === "FALSE"}>{c.t("gallery_visibility_private")}</option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="password" className="form-label">
                  {c.t("password_label")}
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="Password"
                  id="password"
                  value={props.gallery.Password}
                  placeholder={c.t("password_placeholder")}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="reviewers" className="form-label">
                  {c.t("reviewers_label")}
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="Reviewers"
                  id="reviewers"
                  value={props.gallery.Reviewers}
                  placeholder={c.t("reviewers_placeholder")}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="imagesOrder" className="form-label">
                  {c.t("images_order_label")}
                </label>
                <select
                  className="form-select"
                  name="ImagesOrder"
                  id="imagesOrder"
                  defaultValue={props.gallery.ImagesOrder || "original"}
                  key={props.gallery.ImagesOrder || "original"}
                >
                  <option value="original" selected={props.gallery.ImagesOrder === "original"}>{c.t("images_order_original")}</option>
                  <option value="name_asc" selected={props.gallery.ImagesOrder === "name_asc"}>{c.t("images_order_name_asc")}</option>
                  <option value="name_desc" selected={props.gallery.ImagesOrder === "name_desc"}>{c.t("images_order_name_desc")}</option>
                  <option value="created_asc" selected={props.gallery.ImagesOrder === "created_asc"}>{c.t("images_order_created_asc")}</option>
                  <option value="created_desc" selected={props.gallery.ImagesOrder === "created_desc"}>{c.t("images_order_created_desc")}</option>
                  <option value="modified_asc" selected={props.gallery.ImagesOrder === "modified_asc"}>{c.t("images_order_modified_asc")}</option>
                  <option value="modified_desc" selected={props.gallery.ImagesOrder === "modified_desc"}>{c.t("images_order_modified_desc")}</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-md-10">
                <button type="submit" className="btn btn-primary me-2">
                  <i className="bi bi-save me-2"></i>
                  {c.t("save_gallery_button")}
                </button>
                <button
                  hx-confirm={`${c.t("confirm_gallery_delete")} ${props.gallery.GalleryName}?`}
                  className="btn btn-danger"
                  hx-target="#update_result"
                  hx-delete={props.gallery.GalleryTableName + "/delete"}
                >
                  <i className="bi bi-trash me-2"></i>
                  {c.t("delete_gallery_button")}
                </button>
                <button
                  className="btn btn-link"
                  hx-post={props.gallery.GalleryTableName + "/purge"}
                  hx-swap="outerHTML"
                  hx-target="this"
                >
                  <i className="bi bi-arrow-clockwise me-2"></i>
                  {c.t("purge-cache")}
                </button>
              </div>
            </div>

            <div id="update_result" className="mt-3"></div>
          </form>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header bg-secondary text-white">
          <h3 className="mb-0">{c.t("add_images_title")}</h3>
        </div>
        <div className="card-body">
          <form className="mb-3">
            <div className="input-group">
              <input
                type="file"
                className="form-control"
                accept="image/png, image/jpeg"
                multiple
                id="fileInput"
                name="file"
              />
              <button id="submit" className="btn btn-primary">
                <i className="bi bi-upload me-2"></i>
                {c.t("upload_images_button")}
              </button>
            </div>
          </form>

          <div className="progress mb-3">
            <div
              id="progress-bar"
              className="progress-bar"
              role="progressbar"
              style={{ width: "0%" }}
              aria-valuenow="0"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              0%
            </div>
          </div>

          <div className="mb-3">
            <span>{c.t("progress_label")}</span>
            <span id="current-counter">0</span> z{" "}
            <span id="max-counter">0</span>
          </div>

          <ul id="upload-error" className="list-group"></ul>
        </div>
      </div>

      <div className="card">
        <div className="card-header bg-info text-white">
          <h3 className="mb-0">{c.t("images_in_gallery_title")}</h3>
        </div>
        <div className="card-body">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {props.images.map((image, index) => (
              <div
                key={index}
                className="col"
                hx-target="this"
                hx-swap="outerHTML"
              >
                <div className="card h-100">
                  <img
                    src={`../img/${image.path}`}
                    className="card-img-top"
                    loading="lazy"
                    alt={image.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{image.name}</h5>
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-danger btn-sm"
                        hx-confirm={`Czy na pewno chcesz usunąć zdjęcie ${image.name}?`}
                        hx-delete={`../admin/api/deleteImage?imagePath=${encodeURIComponent(
                          image.path
                        )}&galleryTableName=${props.gallery.GalleryTableName}`}
                      >
                        <i className="bi bi-trash me-2"></i>
                        {c.t("delete_image_button")}
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        hx-post={`../admin/api/toggleApproval?imagePath=${encodeURIComponent(
                          image.path
                        )}&galleryTableName=${props.gallery.GalleryTableName}`}
                        hx-target="this"
                      >
                        {image.approved ? (
                          <>
                            <i className="bi bi-check-circle me-2"></i>
                            {c.t("approved_label")}
                          </>
                        ) : (
                          <>
                            <i className="bi bi-x-circle me-2"></i>
                            {c.t("unapproved_label")}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <script type="module" src="/static/js/singlegallery.js"></script>
    </Layout>
  );
};

export const handleSingleGallery = async (c) => {
  const galleryTableName = c.req.param("galleryTableName");
  const { results } = await getGalleriesFromD1(c);
  const gallery = results.find(
    (elem) => elem.GalleryTableName === galleryTableName
  ) || { id: 0, name: "string" };

  const indResponse = await getIndywidualGalleryFromD1(c, galleryTableName);
  return c.html(
    <Singlegallery gallery={gallery} images={indResponse.results} c={c} />
  );
};
