import { Hono } from "hono";
import { serveStatic } from 'hono/cloudflare-pages';
import { main } from "./gallery/galleryListing";
import { admin } from "./admin";
import { handleGalleryRoute } from "./gallery/gallerySingle";
import { handleGetImage } from "../utils/getImg";
import { translationMiddleware } from "../utils/localeMiddleware";
import { cache } from '../utils/cacheMiddleware';
import { cachePurgeAll } from '../utils/cachePurge';


export const gallery = new Hono({ strict: true });

// Serve static files from dist directory -> put files into public/static
gallery.use('/static/*', serveStatic({ root: './dist' }));

// galleryly the translation middleware to all routes
gallery.use('*', translationMiddleware);

gallery.get("/img/:p1/:p2/:p3", handleGetImage);

gallery.route('/admin', admin);

gallery.get('/purge', async (c) => {   
  const removedKeys = await cachePurgeAll(c);                      
  return c.html(`<h3>${c.t('all_cache_purged')} </h3><div>${removedKeys.join('<br>')}</div><a href="./">${c.t('go_home')}</a>`)
})

gallery.use('/*', cache());

gallery.get('/test', (c) => {                            //temporary endpoint
  return c.text(c.t() +"  "+ new Date().toISOString())
})

gallery.get("/", main);

gallery.get("/:galleryTableName", handleGalleryRoute);
