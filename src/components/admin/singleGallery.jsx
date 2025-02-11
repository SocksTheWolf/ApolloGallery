import { Layout } from "./adminLayout";
import { getGalleriesFromD1, getIndywidualGalleryFromD1 } from "../../utils/db";
import { GalleryForm } from "./galleryForm";

const Singlegallery = (props) => {
  const c = props.c; // Ensure the context is passed correctly
  const title = `${c.t("editing_gallery")}<b>${props.gallery.GalleryName}</b>`;

  return (
    <Layout title={c.t("editing") + props.gallery.GalleryName} c={c} breadcrumb={props.gallery.GalleryName}>
      <GalleryForm c={c} title={title} gallery={props.gallery} />
      <fieldset class="grid">
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
      </fieldset>

      <details>
        <summary role="button" class="contrast">{c.t("add_images_title")}</summary>
        <article>
          <header><h3>{c.t("add_images_title")}</h3></header>
          <form className="mb-3">
              <fieldset class="grid">
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  multiple
                  id="fileInput"
                  name="file"
                />
                <button id="submit" className="btn btn-primary">
                  <i className="bi bi-upload me-2"></i>
                  {c.t("upload_images_button")}
                </button>
              </fieldset>
            </form>
            <br />
            <progress
              id="progress-bar"
              className="progress-bar"
              role="progressbar"
              value="0"
              min="0"
              max="100" />
            <br />
            <ul id="upload-error" className="list-group"></ul>
            <footer>
              <span>{c.t("progress_label")} </span>
              <span id="current-counter">0</span> / {" "}
              <span id="max-counter">0</span>
            </footer>

            
        </article>
      </details>

      <hr />
      <details>
        <summary role="button" class="contrast">{c.t("images_in_gallery_title")}</summary>
        <article class="container">
          <header>
            <h3>{c.t("images_in_gallery_title")}</h3>
          </header>
          <div class="grid">
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
                        hx-confirm={`${c.t("deletion_of_image_confirm")} ${image.name}?`}
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
        </article>
      </details>
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
