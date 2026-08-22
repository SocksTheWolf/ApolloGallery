import { Hono } from "hono";
import { serveStatic } from 'hono/cloudflare-pages';
import { trimTrailingSlash } from 'hono/trailing-slash';
import { cache } from '../utils/cacheMiddleware';
import { handleGetImage } from "../utils/getImg";
import { translationMiddleware } from "../utils/localeMiddleware";
import { generateSitemap } from '../utils/sitemapMiddleware';
import { workerRouter } from '../utils/workerHelpers';
import { admin } from "./admin";
import { main } from "./gallery/galleryListing";
import { handleGalleryRoute } from "./gallery/gallerySingle";

export const gallery = new Hono({ strict: true });

/**** CONFIGS ****/
// If we're a workers project, then we don't need the cf-worker endpoint, this flag will disable it.
const enableCFWorkerEndpoint = false;

// To handle static files if the gallery is the base root, add static bindings to each root assumed file
const staticFileServe = ["favicon.ico", "favicon-96x96.png", "apple-touch-icon.png",
  "web-app-manifest-192x192.png", "web-app-manifest-512x512.png", "site.webmanifest",
  "meta-card.png", "404.html", "robots.txt"];
/*****************/

// Serve static files from dist directory -> put files into public/static
gallery.use('/static/*', serveStatic({ root: './dist' }));

staticFileServe.forEach((item) => {
  gallery.use(`/${item}`, serveStatic({path:`./${item}`}));
});

if (enableCFWorkerEndpoint) {
  // Endpoint for cloudflare workers to potentially interface with.
  gallery.get("/cf-worker", async (c) => {
    const workerAction = c.req.header('Action');
    const workerKey = c.req.header('WorkerKey');
    return await workerRouter(c, workerKey, workerAction);
  });
}

// the translation middleware to all routes
gallery.use('*', translationMiddleware);

// Handle image lookups
gallery.get("/img/:p1/:p2/:p3", handleGetImage);

// Fix up admin paths properly
gallery.use('/admin/', trimTrailingSlash());
gallery.route('/admin', admin);

// Main application interface
gallery.use('/*', cache());
gallery.get("/", main);
gallery.get("/sitemap.xml", generateSitemap);

gallery.get("/:galleryTableName", handleGalleryRoute);
