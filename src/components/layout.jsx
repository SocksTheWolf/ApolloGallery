export const Layout = (props) => {
  const c = props.c; // Ensure the context is passed correctly

  return (
    <html lang="pl">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{props.title}</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="/static/style.css" />
        <link rel="stylesheet" href="/static/photoswipe.css" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <header>
          <div className="container">
            <h1>Pineapple Gallery</h1>
          </div>
        </header>
        <main className="container">{props.children}</main>
      </body>
    </html>
  );
};
