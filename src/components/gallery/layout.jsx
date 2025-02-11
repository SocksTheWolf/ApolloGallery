import { html, raw } from 'hono/html';
import { SocialMetaTags } from './metaTags';
import { ThemeSwitcher } from '../utils/themeSwitcher';

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
        <script type='text/javascript' src='https://storage.ko-fi.com/cdn/widget/Widget_2.js'></script>
        <SocialMetaTags />
      </head>
      <body class="container">
        <header>
        <nav class="header-nav">
          <ul>
            <li><h2><a href="." class="contrast">{c.env.PAGE_TITLE}</a></h2></li>
          </ul>
          <ul>
          <li data-placement="bottom" data-tooltip="Support this site and the dog!"><script src="/static/js/kofi.js"></script></li>
          <li></li>
          <li>
            <ThemeSwitcher c={c} />
          </li>
          </ul>
        </nav>
        </header>
        <main>
          {props.children}
        </main>
        <footer>
        <hr />
        <center>
          <small>
            &copy; {new Date().getFullYear()} {c.env.COPYRIGHT} -  
            <a href="admin">Admin Panel</a>
          </small>
        </center>
        </footer>
      </body>
    </html>
  );
};
