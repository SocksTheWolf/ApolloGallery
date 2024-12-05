import { Layout } from "./layout";
import { getGalleriesFromD1, getIndywidualGalleryFromD1wApproved } from "./admin/db";

export const Gallery = ({ gallery, images }) => (
  <Layout title={gallery.GalleryName}>
    <div className="container py-4">
      <a href="/" className="back-link">
        ← Powrót
      </a>
      <h1 className="gallery-title">{gallery.GalleryName}</h1>

      {gallery.TextField && (
        <p className="gallery-description">{gallery.TextField}</p>
      )}

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {images.length === 0 ? (
          <div className="no-images-container text-center py-5">
            <p className="text-muted">No images have been uploaded yet</p>
          </div>
        ) : (
          images.map((image) => (
            <div className="col" key={image.path}>
              <div className="gallery-image-container">
                <img
                  src={`/img/${image.path}`}
                  alt={image.name}
                  className="gallery-image img-fluid"
                  loading="lazy"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
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

  return c.html(<Gallery gallery = {gallery} images={images || []} />);
}
