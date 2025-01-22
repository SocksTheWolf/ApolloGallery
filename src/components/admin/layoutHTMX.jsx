import { html } from 'hono/html'

export const Layout = (props) => {
  const c = props.c;
  return (
    html`<!doctype html>
    <html lang=${c.t()}>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${props.title}</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
        <link rel="stylesheet" href="/static/style.css" />
        <script src="https://unpkg.com/htmx.org@1.9.12"></script>
      </head>
      <body>
      <div
        class="nav nav-pills mb-4 container"
        style="justify-content: space-between;"
      >
        <h1>${c.t("admin_panel_title")}</h1>
        <div class="nav">
          <a class="nav-link" href=${"http://" + (c.req.header("Host") + "/gallery/")}>
            ${c.t("public_view")}
          </a>
          <a
            class="nav-link"
            href=${"http://logout@" + (c.req.header("Host") + "/gallery/admin")}
          >
            ${c.t("logout")}
          </a>
        </div>
      </div>
        
        <main class="container">
          <div class="row">
            <div class="col-12">
              ${props.children}
            </div>
          </div>
        </main>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>`
  );
};
