import { Hono } from "hono";
import { serveStatic } from 'hono/cloudflare-pages';
import { gallery } from "./components/gallery";

const staticFiles = new Hono({ strict: true });
const galleryApp = new Hono({ strict: true });

galleryApp.route('/', gallery);
staticFiles.use('/*', serveStatic({ root: './dist' }));
staticFiles.use('/404', serveStatic({ path: './dist/404.html' }));
galleryApp.route(`/*`, staticFiles);

// Handle not found displaying a similar style of webpage
galleryApp.notFound(async (c) => {
    // Rebuild the url so we can fetch the 404 file specifically
    const {origin} = new URL(c.req.url);
    // Fetch it off our app, which will serve us back the 404 html file.
    const get404 = await staticFiles.fetch(new Request(`${origin}/404`, c.env.req), c.env);
    // Serve the result to the user.
    if (get404) {
        return c.html(await get404.text(), 404);
    } else {
        return c.text("404 Not Found", 404);
    }
});

// Custom worker path system to handle dynamic pathing based off a path location variable
// rather than hardcoded routes
export default {
    async fetch (req, env, ctx) {
        const {pathname} = new URL(req.url);
        const galPath = env.GALLERY_PATH;
        // Handle path separation
        if (galPath !== "" && galPath !== "/") {
            const subStr = pathname.substring(1, galPath.length + 1);
            // If the paths match, serve up the gallery.
            if (subStr === galPath) {
                const newURL = req.url.replace(`/${galPath}`, "");
                //console.log(`modifying...${newURL}`);
                // We modify the reroute request but bring in all other initial options as well (this is a clone with a new url)
                const rerouteRequest = new Request(newURL, req);
                return await galleryApp.fetch(rerouteRequest, env, ctx);
            } else {
                // Otherwise, we serve up the static files, this will also handle 404s for us.
                return await staticFiles.fetch(req, env, ctx);
            }
        }
        // otherwise, this app runs on the base directory, so serve everything
        // This can cause some oddities when you visit // of your directory, serve at root and you have an index.html, and may be unintentional.
        // If you have cloudflare's normalize url to origin, this shouldn't be an issue
        return await galleryApp.fetch(req, env, ctx);
    },
};