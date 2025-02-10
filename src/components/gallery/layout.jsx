import { html } from 'hono/html'
import { SocialMetaTags } from "../utils/metaTags"

export const Layout = (props) => {
  const c = props.c;
  const desc = props.desc || c.env.DESCRIPTION;
  return (
    html`<!doctype html>
    <html data-theme="auto" lang="${c.t()}">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
        <title>${props.title}</title>
        ${<SocialMetaTags title={props.title} desc={desc} url={c.req.url} />}
        <link rel="stylesheet" href="/static/style.css" />
        <link rel="stylesheet" href="/static/gallery.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@yohns/picocss@2.2.10/css/pico.min.css" />
        <link rel="stylesheet" href="/static/photoswipe.css" />
      </head>
      <body>
        <header class="container">
        <nav>
          <ul>
          <li><h2>${c.env.PAGE_TITLE}</h2></li>
          </ul>
          <ul>
          <li>
            <label data-tooltip="Toggle Light or Dark Mode">
              <input name="color-mode-toggle" role="switch" type="checkbox" value="1" aria-label="Toggle Light or Dark Mode">
            </label>
          </li>
          </ul>
        </nav>
        </header>
        <main class="container">
          ${props.children}
        </main>
        <script src="/static/js/SwitchColorMode.js"></script>
      </body>
    </html>`
  );
};
