import { Hono } from "hono";
import { serveStatic } from 'hono/cloudflare-pages';
import { main } from "./gallery/galleryListing";
import { admin } from "./admin";
import { handleGalleryRoute } from "./gallery/gallerySingle";
import { handleGetImage } from "../utils/getImg";
import { translationMiddleware } from "../utils/localeMiddleware";
import { cache } from '../utils/cacheMiddleware';
import { trimTrailingSlash } from 'hono/trailing-slash'


export const gallery = new Hono({ strict: true });

// Serve static files from dist directory -> put files into public/static
gallery.use('/static/*', serveStatic({ root: './dist' }));

// To handle static files if the gallery is the base root, add static bindings to each root assumed file
gallery.use('/favicon.ico', serveStatic({ path: './favicon.ico' }));
gallery.use('/favicon-16x16.png', serveStatic({ path: './favicon-16x16.png' }));
gallery.use('/favicon-32x32.png', serveStatic({ path: './favicon-32x32.png' }));
gallery.use('/apple-touch-icon.png', serveStatic({ path: './apple-touch-icon.png' }));
gallery.use('/android-chrome-192x192.png', serveStatic({ path: './android-chrome-192x192.png' }));
gallery.use('/android-chrome-512x512.png', serveStatic({ path: './android-chrome-512x512.png' }));
gallery.use('/sitemap.xml', serveStatic({ path: './sitemap.xml' }));
gallery.use('/robots.txt', serveStatic({ path: './robots.txt' }));

// galleryly the translation middleware to all routes
gallery.use('*', translationMiddleware);

gallery.get("/img/:p1/:p2/:p3", handleGetImage);

gallery.use('/admin/', trimTrailingSlash())
gallery.route('/admin', admin);

gallery.use('/*', cache());

gallery.get("/", main);

gallery.get("/:galleryTableName", handleGalleryRoute);
