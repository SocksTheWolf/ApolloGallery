import { html, raw } from 'hono/html';
import { makeGalleryURL } from '../../utils/galleryPath';
import { getPicoCSS } from '../../utils/getPicoCSS';
import { FooterScripts } from '../utils/footerScripts';
import { ThemeSwitcher } from '../utils/themeSwitcher';

export const Layout = (props) => {
  const c = props.c;
  const {pathname} = new URL(c.req.url);
  const headerURL = (pathname === "/admin") ? "./" : makeGalleryURL(c, `admin`);
  const renderBreadcrumb = (latest) => {
    if (latest != null && latest !== "admin_panel_breadcrumb") {
      return `<li><a href="${makeGalleryURL(c, `admin`)}">${c.t("admin_panel_breadcrumb")}</a></li><li>${latest}</li>`;
    }
    else if (latest == null) {
      return null;
    }
  };

  const breadcrumb = renderBreadcrumb(props.breadcrumb);
  return (
    html`<!doctype html>
    <html data-theme="auto" lang="${c.t()}">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${props.title}</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
        <link rel="stylesheet" href="${getPicoCSS(c)}" />
        <link rel="stylesheet" href="/static/css/gallery.css" />
        <link rel="stylesheet" href="/static/css/admin.css" />
        <script src="https://unpkg.com/htmx.org@1.9.12"></script>
      </head>
      <body>
      <header class="container adminHeader">
        <nav>
        <ul>
          <li><h1><a href=${headerURL} class="contrast">${c.t("admin_panel_title")}</a></h1></li>
        </ul>
        <ul>
        <li>
          <a
            href=${makeGalleryURL(c, `admin/optimize`)}>
              ${c.t("optimize_tables")}
          </a>
        </li>
        <li>
          <a
            href=${makeGalleryURL(c, `admin/purge`)}>
              ${c.t("purge-cache")}
          </a>
        </li>
        <li>
          <a
            href=${makeGalleryURL(c, `admin`, "logout@")}>
              ${c.t("logout")}
            </a>
        </li>
        <li>
        ${(<ThemeSwitcher c={c} />)}
        </li>
        </ul>
        </nav><br />
        ${breadcrumb != null ? (
          <section class="breadcrumbs">
          <nav aria-label="breadcrumb">
          <ul>
              <small>{raw(breadcrumb)}</small>
          </ul>
          </nav>
          </section>
        ) : (
          <br />
        )}
      </header>
      <main class="container">
        ${props.children}
      </main>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
      </body>
      ${<FooterScripts />}
    </html>`
  );
};
