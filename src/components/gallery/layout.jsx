import { html } from 'hono/html';
import { SocialMetaTags } from '../utils/metaTags';
import { ThemeSwitcher } from '../utils/themeSwitcher';
import { PreloadAssets } from '../utils/preloader';
import { getPicoCSS } from '../../utils/getPicoCSS';

export const Layout = (props) => {
  const c = props.c;
  const prefetchType = props.prefetch;
  const desc = props.desc || c.env.DESCRIPTION;
  const gallery_table_name = props.gallery_table_name || null;
  return (
    html`
    <!DOCTYPE html>
    <html data-theme="dark" lang=${c.t()}>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <title>${props.title}</title>
        ${<SocialMetaTags title={props.title} desc={desc} url={c.req.url} c={c} gallery_table_name={gallery_table_name} />}
        ${<PreloadAssets type={prefetchType} c={c} />}
        <link rel="stylesheet" href="/static/gallery.css" />
        <link rel="stylesheet" href="${getPicoCSS(c)}" />
        <link rel="stylesheet" href="/static/photoswipe.css" />
        <script type='text/javascript' src='https://storage.ko-fi.com/cdn/widget/Widget_2.js'></script>
      </head>
      <body class="container">
        <header>
        <nav class="header-nav">
          <ul>
            <li><h2><a href="." class="contrast">${c.env.PAGE_TITLE}</a></h2></li>
          </ul>
          <ul>
          <li data-placement="bottom" data-tooltip="Support this site and the dog!"><script src="/static/js/kofi.js"></script></li>
          <li></li>
          <li>
            ${<ThemeSwitcher c={c} />}
          </li>
          </ul>
        </nav>
        </header>
        <main>
          ${props.children}
        </main>
        <footer>
        <hr />
        <center>
          <small>
            &copy; ${new Date().getFullYear()} ${c.env.COPYRIGHT} -  
            <a href="admin">Admin Panel</a>
          </small>
        </center>
        </footer>
        <script src="https://unpkg.com/vanilla-back-to-top@7.2.1/dist/vanilla-back-to-top.min.js"></script>
        <script>addBackToTop({
          diameter: 56,
          backgroundColor: 'rgb(220, 88, 48)',
          textColor: '#fff'
        })</script>
      </body>
    </html>`
  );
};
