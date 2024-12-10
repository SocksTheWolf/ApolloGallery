export const Layout = (props) => {
  const c = props.c;
  return (
    <html lang="pl">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{props.title}</title>
        {/* Bootstrap CSS */}
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
        <link rel="stylesheet" href="/static/style.css" />
        <script src="https://unpkg.com/htmx.org@1.9.12"></script>
      </head>
      <body>
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
          <div className="container">
            <a className="navbar-brand" href="../admin">Admin Panel</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="../">Public view</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href={'http://logout@' + (c.req.header('Host') + '/admin')}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        
        <main className="container">
          <div className="row">
            <div className="col-12">
              {props.children}
            </div>
          </div>
        </main>

        {/* Bootstrap JS Bundle with Popper */}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>
  );
};
