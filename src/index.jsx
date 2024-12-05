import { Hono } from "hono";
import { serveStatic } from 'hono/cloudflare-pages';
import { main } from "./galleryListing";
import { admin } from "./admin/admin";
import { handleGalleryRoute } from "./gallery";
import { handleGetImage } from "./getimg";
import { translationMiddleware } from "./locale-middleware";

const app = new Hono({ strict: false });

// Apply the translation middleware to all routes
app.use('*', translationMiddleware);

// Serve static files from dist directory -> put files into public/static
app.use('/static/*', serveStatic({ root: './dist' }));

app.get("/img/*", handleGetImage);

app.get("/", main);

app.route('/admin', admin);

app.get("/:galleryTableName", handleGalleryRoute);

export default app;
