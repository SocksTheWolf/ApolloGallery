import { Hono } from "hono";
import { serveStatic } from 'hono/cloudflare-pages'
import { main } from "./main";
import { admin } from "./admin/admin";
import { handleGalleryRoute } from "./gallery";
import { handleGetImage } from "./getimg";

const app = new Hono({ strict: false });

// Serve static files from dist directory -> put files into public/static
app.use('/static/*', serveStatic({ root: './dist' }));

app.get("/getimg/*", handleGetImage);

app.get("/", main);

app.route('/admin', admin);

app.get("/:galleryTableName", handleGalleryRoute);

export default app;
