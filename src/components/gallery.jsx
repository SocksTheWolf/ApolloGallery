import { Hono } from "hono";
import { serveStatic } from 'hono/cloudflare-pages';
import { main } from "./gallery/galleryListing";
import { admin } from "./admin";
import { handleGalleryRoute } from "./gallery/gallerySingle";
import { handleGetImage } from "../utils/getImg";
import { translationMiddleware } from "../utils/localeMiddleware";
import { cache } from '../utils/cacheMiddleware';
import { trimTrailingSlash } from 'hono/trailing-slash'
import { workerRouter } from '../utils/workerHelpers';

export const gallery = new Hono({ strict: true });

// Serve static files from dist directory -> put files into public/static
gallery.use('/static/*', serveStatic({ root: './dist' }));

// To handle static files if the gallery is the base root, add static bindings to each root assumed file
const staticFileServe = ["favicon.ico", "favicon-96x96.png", "apple-touch-icon.png", 
    "web-app-manifest-192x192.png", "web-app-manifest-512x512.png", "site.webmanifest", "404.html", "robots.txt"];
staticFileServe.forEach((item) => {
    gallery.use(`/${item}`, serveStatic({path:`./${item}`}));
});

// Endpoint for cloudflare workers to potentially interface with.
gallery.get("/cf-worker", async (c) => {
    const workerAction = c.req.header('Action');
    const workerKey = c.req.header('WorkerKey');
    return await workerRouter(c, workerKey, workerAction);
});

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

gallery.get("/:galleryTableName", handleGalleryRoute);
