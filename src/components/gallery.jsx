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

// galleryly the translation middleware to all routes
gallery.use('*', translationMiddleware);

gallery.get("/img/:p1/:p2/:p3", handleGetImage);

gallery.use('/admin/', trimTrailingSlash())
gallery.route('/admin', admin);

gallery.use('/*', cache());

gallery.get("/", main);

gallery.get("/:galleryTableName", handleGalleryRoute);
