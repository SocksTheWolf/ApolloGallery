import { getGalleriesFromD1wGalleryIsPublic } from "./db";
import { makeGalleryURL } from "./galleryPath";

export const generateSitemap = async (c) => {
  const publicGalleries = await getGalleriesFromD1wGalleryIsPublic(c);
  const { results: galleries } = publicGalleries;
  let sitemapOutput = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

  // If we have valid galleries, add them
  if (galleries.length > 0) {
    galleries.map(gallery => {
      sitemapOutput += `<url>
        <loc>${makeGalleryURL(c, gallery.GalleryTableName)}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>`
    });
  }

  // otherwise just dump the base gallery path.
  sitemapOutput += `<url>
      <loc>${makeGalleryURL(c)}</loc>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
  </url></urlset>`;

  return c.text(sitemapOutput, 200, {'Content-Type': 'application/xml'});
};
