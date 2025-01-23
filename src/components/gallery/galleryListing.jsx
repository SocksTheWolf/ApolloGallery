import { Layout } from "./layout";
import { getGalleriesFromD1wGalleryIsPublic } from "../../utils/db";

export const main = async (c) => {
  const galleriesResponse = await getGalleriesFromD1wGalleryIsPublic(c);

  // in case of error or while initial run
  if (typeof galleriesResponse === 'string') {
    console.log(galleriesResponse);
    return c.text(galleriesResponse);
  }

  const { results: galleries } = galleriesResponse;

  return c.html(
    <Layout title={c.t("gallery_list_title")} c={c}>
      <section>
      <div className="container">
      {galleries.length == 0 ? (
        <div className="no-images-container text-center py-5">
          <p className="text-muted">
            {c.t("no_galleries_message")}
            <a href="./admin">{c.t("admin_link")}</a>
            {c.t("create_gallery_message")}
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
                    {new Date(gallery.PartyDate).toLocaleDateString(c.t("date_locale"))}
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      )}
     </div>
     </section>
    </Layout>
  );
};
