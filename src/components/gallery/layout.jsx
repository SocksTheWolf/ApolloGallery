import { html } from 'hono/html'


export const Layout = (props) => {
  const c = props.c;
  const desc = props.desc || c.env.DESCRIPTION;
  return (
    html`<!doctype html>
    <html lang=${c.t()}>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
        <title>${props.title}</title>
        ${<SocialMetaTags title={props.title} desc={desc} url={c.req.url} />}
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
