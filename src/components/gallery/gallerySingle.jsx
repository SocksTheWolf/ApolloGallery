import { Layout } from "./layout";
import { getGalleryPath } from "../../utils/galleryPath";
import {
  getGalleriesFromD1,
  getIndywidualGalleryFromD1wApproved,
} from "../../utils/db";
import { html } from "hono/html";

export const Gallery = ({ gallery, images, c }) => (
  <Layout title={gallery.GalleryName} c={c} desc={gallery.TextField}>
    <section>
      <article>
      <header>
        <h2 className="gallery-title">{gallery.GalleryName}</h2>
      </header>
      <div class="grid gallery-info gallery-date">
        {gallery.PartyDate && (
          <small class="float-date">{c.t("party_date_label")}: {gallery.PartyDate}</small>
        )}
        <span></span>
        <span></span>
        {gallery.Tags && (
          <small>{c.t("tags_label")}: {gallery.Tags}</small>
        )}
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
            <p className="text-muted">{c.t("no_images_message")}</p>
          </div>
        ) : (
          <div id="masonry-container">
            {images.map((image) => (
              <div class="masonry-item">
                <div class="masonry-item-content">
                  <div class="placeholder"></div>
                  <a
                    href={
                      c.env.IMGT === "true"
                        ? `/cdn-cgi/image/f=auto,q=80${getGalleryPath(c)}img/${image.path}`
                        : `img/${image.path}`
                    }
                    data-pswp-width={image.width}
                    data-pswp-height={image.height}
                    target="_blank"
                  >
                    <img
                      src={
                        c.env.IMGT === "true"
                          ? `/cdn-cgi/image/f=auto,q=75,w=433${getGalleryPath(c)}img/${image.path}`
                          : `img/${image.path}`
                      }
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
      <script src="https://unpkg.com/imagesloaded@5/imagesloaded.pkgd.min.js"></script>
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
