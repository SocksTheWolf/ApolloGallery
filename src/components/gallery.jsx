import { Hono } from "hono";
import { serveStatic } from 'hono/cloudflare-pages';
import { main } from "./gallery/galleryListing";
import { admin } from "./admin";
import { handleGalleryRoute } from "./gallery/gallerySingle";
import { handleGetImage } from "../utils/getImg";
import { translationMiddleware } from "../utils/localeMiddleware";
import { cache } from '../utils/cacheMiddleware';


export const gallery = new Hono({ strict: true });

// Serve static files from dist directory -> put files into public/static
gallery.use('/static/*', serveStatic({ root: './dist' }));

// To handle static files if the gallery is set to the base root, add static bindings to each root assumed file
// I am not aware of a way in hono to automatically generate this pathing.
const staticFileServe = ["favicon.ico", "favicon-32x32.png", "favicon-16x16.png", "meta-card.png", "apple-touch-icon.png", 
  "android-chrome-192x192.png", "android-chrome-manifest-512x512.png", "site.webmanifest", "404.html"];
staticFileServe.forEach((item) => {
  gallery.use(`/${item}`, serveStatic({path:`./${item}`}));
});

// galleryly the translation middleware to all routes
gallery.use('*', translationMiddleware);

gallery.get("/img/:p1/:p2/:p3", handleGetImage);

gallery.route('/admin', admin);

gallery.use('/*', cache());

gallery.get('/test', (c) => {                            //temporary endpoint
  return c.text(c.t() +"  "+ new Date().toISOString())
})

gallery.get("/", main);

gallery.get("/:galleryTableName", handleGalleryRoute);
