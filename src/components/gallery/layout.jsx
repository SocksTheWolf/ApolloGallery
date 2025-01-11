import { html } from 'hono/html'

{/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" /> */}

export const Layout = (props) => {
  const c = props.c;
  return (
    html`<!doctype html>
    <html lang=${c.t()}>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${props.title}</title>

        <link rel="stylesheet" href="/static/style.css" />
        <link rel="stylesheet" href="/static/photoswipe.css" />
      </head>
      <body>
        <header>
          <div class="container">
            <h1>${c.env.PAGE_TITLE}</h1>
          </div>
        </header>
        <main>${props.children}</main>
      </body>
    </html>`
  );
};
