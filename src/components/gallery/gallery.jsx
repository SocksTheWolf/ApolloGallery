import { Layout } from "../layout";
import {
  getGalleriesFromD1,
  getIndywidualGalleryFromD1wApproved,
} from "../../utils/db";
import { html } from 'hono/html'

export const Gallery = ({ gallery, images, c }) => (
  <Layout title={gallery.GalleryName} c={c}>
    <div className="container py-4">
      <a href="/" className="back-link">
        ← {c.t("back_link")}
      </a>
      <h1 className="gallery-title">{gallery.GalleryName}</h1>

      {gallery.TextField && (
        <p className="gallery-description">{gallery.TextField}</p>
      )}

      <div
        id="gallery-pswp"
        className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4"
      >
        {images.length === 0 ? (
          <div className="no-images-container text-center py-5">
            <p className="text-muted">{c.t("no_images_message")}</p>
          </div>
        ) : (
          images.map((image) => (
            <div className="col" key={image.path}>
              <div className="gallery-image-container">
                <a
                  href={(c.env.IMGT == "true")?(`/cdn-cgi/image/f=auto,q=80/img/${image.path}`):(`/img/${image.path}`)}
                  data-pswp-width={image.width}
                  data-pswp-height={image.height}
                  target="_blank"
                >
                  <img
                    src={(c.env.IMGT == "true")?(`/cdn-cgi/image/f=auto,q=75,w=433/img/${image.path}`):(`/img/${image.path}`)}
                    alt={image.name}
                    className="gallery-image img-fluid"
                    loading="lazy"
                  />
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    {html`<script type="module">
      import PhotoSwipeLightbox from '/static/js/photoswipe-lightbox.esm.min.js';
      const lightbox = new PhotoSwipeLightbox({
      gallery: '#gallery-pswp',
      children: 'a',
      pswpModule: () => import('/static/js/photoswipe.esm.min.js')
    });
    lightbox.on('uiRegister', function() {
      lightbox.pswp.ui.registerElement({
        name: 'download-button',
        order: 8,
        isButton: true,
        tagName: 'a',

        // SVG with outline
        html: {
          isCustomSVG: true,
          inner: '<path d="M20.5 14.3 17.1 18V10h-2.2v7.9l-3.4-3.6L10 16l6 6.1 6-6.1ZM23 23H9v2h14Z" id="pswp__icn-download"/>',
          outlineID: 'pswp__icn-download'
        },

        onInit: (el, pswp) => {
          el.setAttribute('download', '');
          el.setAttribute('target', '_blank');
          el.setAttribute('rel', 'noopener');

          pswp.on('change', () => {
            const specialUrl = pswp.currSlide.data.src
            el.href = specialUrl.substring(specialUrl.indexOf('/img/'));
          });
        }
      });
    });
    lightbox.init();
    </script>`}
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
