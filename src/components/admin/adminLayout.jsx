import { html, raw } from 'hono/html'
import { getGalleryPath } from '../../utils/galleryPath';
import { ThemeSwitcher } from '../utils/themeSwitcher';
import { getPicoCSS } from '../../utils/getPicoCSS';

export const Layout = (props) => {
  const c = props.c;

  // TODO: Auto resolve the URL and then strip any trailing characters automatically from links rendered to return this to dynamic
  const makeURL = (path,prefix="") => {
    const {protocol, host} = new URL(c.req.url);
    return `${protocol}//${prefix}${host}${path}`;
  };
  
  const {pathname} = new URL(c.req.url);
  const headerURL = (pathname === "/admin") ? "./" : makeURL(`${getGalleryPath(c)}admin`);
  const renderBreadcrumb = (latest) => {
    if (latest != null && latest !== "admin_panel_breadcrumb") {
      return `<li><a href="${makeURL(`${getGalleryPath(c)}admin`)}">${c.t("admin_panel_breadcrumb")}</a></li><li>${latest}</li>`;
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
        <link rel="stylesheet" href="/static/gallery.css" />
        <link rel="stylesheet" href="/static/admin.css" />
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
            href=${makeURL(`${getGalleryPath(c)}admin/purge`)}>
              ${c.t("purge-cache")}
          </a>
        </li>
        <li>
          <a
            href=${makeURL(`${getGalleryPath(c)}admin`, "logout@")}>
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
    </html>`
  );
};
