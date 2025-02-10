import { Hono } from "hono";
import { serveStatic } from 'hono/cloudflare-pages';
import { gallery } from "./components/gallery";
import { appendTrailingSlash } from 'hono/trailing-slash'

const app = new Hono({ strict: true });

//-----------------to use in root------------------------------------------+
// app.use('/gallery', appendTrailingSlash())  <------ REMOVE THIS LINE    |
// app.route('/', gallery);                                                |
//-------------------------------------------------------------------------+

/**
// Run from /gallery
app.use('/gallery', appendTrailingSlash())
app.route('/gallery/', gallery);
/*/
// Run from root
app.route('/', gallery);
//*/

app.use('/*', serveStatic({ root: './dist' }));

export default app;