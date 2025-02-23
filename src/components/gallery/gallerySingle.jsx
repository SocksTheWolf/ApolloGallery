import { Layout } from "./layout";
import { getImageWithTransforms } from "../../utils/galleryPath";
import {
  getGalleriesFromD1,
  getIndywidualGalleryFromD1wApproved,
} from "../../utils/db";
import { html } from "hono/html";

export const Gallery = ({ gallery, images, c }) => (
  <Layout title={gallery.GalleryName} c={c} prefetch="single" desc={gallery.TextField} gallery_table_name={gallery.GalleryTableName}>
    <section>
      <article>
      <header>
        <h2>{gallery.GalleryName}</h2>
      </header>
      <div class="grid gallery-info gallery-tiny-info">
        {gallery.PartyDate && (
          <small class="gallery-date-single">{c.t("party_date_label")}: {gallery.PartyDate}</small>
        )}
        <span class="gallery-info-spacing"></span>
        <span class="gallery-info-spacing"></span>
        {gallery.Tags && (
          <small class="gallery-tags-single">{c.t("tags_label")}: {gallery.Tags}</small>
        )}
        <span class="gallery-info-spacing"></span>
      </div><hr />
      {gallery.TextField && (
        <p className="gallery-description">{gallery.TextField}</p>
      )}
      <footer>
      <a href="./" class="secondary">
          ← {c.t("back_link")}
        </a>
      </footer>
      </article>
      <article>
      <div id="mansory-wraper">
        {images.length === 0 ? (
          <div>
            <p>{c.t("no_images_message")}</p>
          </div>
        ) : (
          <div id="masonry-container">
            {images.map((image) => (
              <div class="masonry-item">
                <div class="masonry-item-content">
                  <div class="placeholder"></div>
                  <a
                    href={getImageWithTransforms(c, image.path, "full")}
                    data-pswp-width={image.width}
                    data-pswp-height={image.height}
                    target="_blank"
                  >
                    <img
                      src={getImageWithTransforms(c, image.path, "gallery-thumb")}
                      alt={image.name}
                      loading="lazy"
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      </article>
    </section>

    {html`
      <script type="module" src="https://unpkg.com/imagesloaded@5/imagesloaded.pkgd.min.js"></script>
      <script type="module" src="/static/js/initPhotoSwipe.js"></script>
      <script type="module" src="/static/js/masonry.js"></script>
    `}
  </Layout>
);

export async function handleGalleryRoute(c) {
  const galleryTableName = c.req.param("galleryTableName");
  const { results: galleries } = await getGalleriesFromD1(c);
  const gallery = galleries.find(
    (g) => g.GalleryTableName === galleryTableName
  );

  if (!gallery) return c.notFound();

  const { results: images } = await getIndywidualGalleryFromD1wApproved(
    c,
    galleryTableName
  );

  return c.html(<Gallery gallery={gallery} images={images || []} c={c} />);
}
