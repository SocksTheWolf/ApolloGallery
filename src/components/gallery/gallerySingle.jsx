import { Layout } from "./layout";
import {
  getGalleriesFromD1,
  getIndywidualGalleryFromD1wApproved,
} from "../../utils/db";
import { html } from "hono/html";

export const Gallery = ({ gallery, images, c }) => (
  <Layout title={gallery.GalleryName} c={c}>
    <section>
      <div className="container">
      <div style="width: 100%; padding: 0px; max-width: 1200px;">
        <a href="./" className="back-link">
          ← {c.t("back_link")}
        </a>
        <h1 className="gallery-title">{gallery.GalleryName}</h1>

        {gallery.TextField && (
          <p className="gallery-description">{gallery.TextField}</p>
        )}
      </div>
      </div>
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
                      c.env.IMGT == "true"
                        ? `/cdn-cgi/image/f=auto,q=80/gallery/img/${image.path}`
                        : `img/${image.path}`
                    }
                    data-pswp-width={image.width}
                    data-pswp-height={image.height}
                    target="_blank"
                  >
                    <img
                      src={
                        c.env.IMGT == "true"
                          ? `/cdn-cgi/image/f=auto,q=75,w=433/gallery/img/${image.path}`
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
    </section>

    {html`
      <script type="module" src="/static/js/initPhotoSwipe.js"></script>
      <script type="module" src="/static/js/mansory.js"></script>
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
