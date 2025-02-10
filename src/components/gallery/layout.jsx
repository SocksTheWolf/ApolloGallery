import { html } from 'hono/html'

export const Layout = (props) => {
  const c = props.c;
  return (
    html`<!doctype html>
    <html data-theme="auto" lang="${c.t()}">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
        <title>${props.title}</title>
        <link rel="stylesheet" href="/static/gallery.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@yohns/picocss@2.2.10/css/pico.min.css" />
        <link rel="stylesheet" href="/static/photoswipe.css" />
      </head>
      <body class="container">
        <header>
        <nav>
          <ul>
          <li><h2><a href="." class="contrast">${c.env.PAGE_TITLE}</h2></a></li>
          </ul>
          <ul>
          <li>
            <label data-tooltip="${c.t("light_or_dark_mode")}">
              <input name="color-mode-toggle" role="switch" type="checkbox" value="1">
            </label>
          </li>
          </ul>
        </nav>
        </header>
        <main>
          ${props.children}
        </main>
        <script src="/static/js/SwitchColorMode.js"></script>
        <footer>
        <hr />
        <center>
          <small>
            &copy; ${new Date().getFullYear()} ${c.env.COPYRIGHT} - 
              <a href="admin" class="secondary">Admin Login</a>
          </small>
        </center>
        </footer>
      </body>
    </html>`
  );
};
