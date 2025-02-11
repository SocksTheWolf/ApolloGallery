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
gallery.use('/favicon.ico', serveStatic({ path: './favicon.ico' }));
gallery.use('/meta-card.png', serveStatic({ path: './meta-card.png' }));
gallery.use('/favicon.svg', serveStatic({ path: './favicon.svg' }));
gallery.use('/favicon-96x96.png', serveStatic({ path: './favicon-96x96.png' }));
gallery.use('/apple-touch-icon.png', serveStatic({ path: './apple-touch-icon.png' }));
gallery.use('/web-app-manifest-192x192.png', serveStatic({ path: './web-app-manifest-192x192.png' }));
gallery.use('/web-app-manifest-512x512.png', serveStatic({ path: './web-app-manifest-512x512.png' }));
gallery.use('/site.webmanifest', serveStatic({ path: './site.webmanifest' }));
gallery.use('/404.html', serveStatic({ path: './404.html' }));

// galleryly the translation middleware to all routes
gallery.use('*', translationMiddleware);

gallery.get("/img/:p1/:p2/:p3", handleGetImage);

gallery.use('/admin/', trimTrailingSlash())
gallery.route('/admin', admin);

// Endpoint for cloudflare workers to potentially interface with.
gallery.get("/cf-worker", async (c) => {
    const workerAction = c.req.header('Action');
    const workerKey = c.req.header('WorkerKey');
    return await workerRouter(c, workerKey, workerAction);
});

gallery.use('/*', cache());

gallery.get("/", main);

gallery.get("/:galleryTableName", handleGalleryRoute);
