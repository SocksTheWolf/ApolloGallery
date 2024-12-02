import { Layout } from "./layout";
import { getGalleriesFromD1 } from "./admin/db";

export const main = async (c) => {
  const galleriesResponse = await getGalleriesFromD1(c);

  // in case of error or while initial run
  if (typeof galleriesResponse === 'string') {
    console.log(galleriesResponse);
    return c.text(galleriesResponse);
  }

  const { results: galleries } = galleriesResponse;

  return c.html(
    <Layout title="Pineapple Gallery">
      {galleries.length == 0 ? (
        <div className="no-images-container text-center py-5">
          <p className="text-muted">
            No galleries have been created yet. Go to{" "}
            <a href="/admin">/admin</a> to create your first gallery
          </p>
        </div>
      ) : (
        <div className="galleries-grid">
          {galleries.map((gallery) => (
            <a
              href={"./" + gallery.GalleryTableName}
              className="gallery-card"
              key={gallery.GalleryTableName}
            >
              {gallery.CoverImage !== "" ? (
                <img
                  src={gallery.CoverImage}
                  alt={gallery.GalleryName}
                  className="gallery-card-image"
                />
              ) : (
                <img
                  src="https://placehold.co/433x200.jpg"
                  alt="No image"
                  className="gallery-card-image"
                />
              )}
              <div className="gallery-content">
                <h2 className="gallery-name">{gallery.GalleryName}</h2>
                {gallery.PartyDate && (
                  <div className="gallery-date">
                    {new Date(gallery.PartyDate).toLocaleDateString("pl-PL")}
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      )}
    </Layout>
  );
};
