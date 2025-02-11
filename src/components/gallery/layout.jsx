import { html, raw } from 'hono/html';
import { SocialMetaTags } from './metaTags';

export const Layout = (props) => {
  const c = props.c;
  return (
    <html data-theme="auto" lang={c.t()}>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <title>{props.title}</title>
        <link rel="stylesheet" href="/static/gallery.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@yohns/picocss@2.2.10/css/pico.orange.min.css" />
        <link rel="stylesheet" href="/static/photoswipe.css" />
        <SocialMetaTags />
      </head>
      <body class="container">
        <header>
        <nav>
          <ul>
            <li><h2><a href="." class="contrast">{c.env.PAGE_TITLE}</a></h2></li>
          </ul>
          <ul>
          <li>
            <label data-tooltip={c.t("light_or_dark_mode")}>
              <input name="color-mode-toggle" role="switch" type="checkbox" value="1" />
            </label>
          </li>
          </ul>
        </nav>
        </header>
        <main>
          {props.children}
        </main>
        <script src="/static/js/SwitchColorMode.js"></script>
        <footer>
        <hr />
        <center>
          <small>
            &copy; {new Date().getFullYear()} {c.env.COPYRIGHT} -  
            <a href="admin">Admin Panel</a> -  
            <a data-tooltip="Help keep this website running and a puppy real happy" target="_blank" href="https://ko-fi.com/socksthewolf">Tip</a>
          </small>
        </center>
        </footer>
      </body>
    </html>
  );
};
