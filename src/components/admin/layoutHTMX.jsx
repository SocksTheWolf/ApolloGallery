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
        <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
          <div class="container">
            <a class="navbar-brand" href="admin">Admin Panel</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link" href="../">Public view</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href=${'http://logout@' + (c.req.header('Host') + '/admin')}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        
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
