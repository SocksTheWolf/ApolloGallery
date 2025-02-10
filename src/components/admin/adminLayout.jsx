import { html, raw } from 'hono/html'

export const Layout = (props) => {
  const c = props.c;
  const renderBreadcrumb = (latest) => {
    if (latest != null && latest !== "admin_panel_breadcrumb") {
      return `<li><a href="./">${c.t("admin_panel_breadcrumb")}</a></li><li>${latest}</li>`;
    }
    else if (latest == null) {
      return null;
      //return `<li>${c.t("admin_panel_breadcrumb")}</li>`;
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
        <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" /> -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@yohns/picocss@2.2.10/css/pico.min.css" />
        <link rel="stylesheet" href="/static/gallery.css" />
        <script src="https://unpkg.com/htmx.org@1.9.12"></script>
      </head>
      <body>
      <header class="container">
        <nav>
        <ul>
          <li><h1>${c.t("admin_panel_title")}</h1></li>
        </ul>
        <ul>
        <li>
          <a class="nav-link" href=${"http://" + (c.req.header("Host") + "/gallery/")}>
            ${c.t("public_view")}
          </a>
        </li>
        <li>
          <a
            class="nav-link"
            href=${"http://logout@" + (c.req.header("Host") + "/gallery/admin")}>
              ${c.t("logout")}
            </a>
        </li>
        <li>
        <label data-tooltip="Toggle Light or Dark Mode">
          <input name="color-mode-toggle" role="switch" type="checkbox" value="1" aria-label="Toggle Light or Dark Mode">
        </label>
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
        <div class="row">
          <div class="col-12">
            ${props.children}
          </div>
        </div>
      </main>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        <script src="/static/js/SwitchColorMode.js"></script>
      </body>
    </html>`
  );
};
