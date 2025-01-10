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
        <!-- Preload CSS files -->
        <link rel="preload" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" as="style" />
        <link rel="preload" href="/static/style.css" as="style" />
        <link rel="preload" href="/static/photoswipe.css" as="style" />
        
        <!-- Actually load the CSS files -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/static/style.css" />
        <link rel="stylesheet" href="/static/photoswipe.css" />
      </head>
      <body>
        <header>
          <div class="container">
            <h1>Pineapple Gallery</h1>
          </div>
        </header>
        <main class="container">${props.children}</main>
      </body>
    </html>`
  );
};
