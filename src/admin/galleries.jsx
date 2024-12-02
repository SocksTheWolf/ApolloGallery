import { Layout } from "./layoutHTMX";
import { getGalleriesFromD1 } from "./db";

const GalleriesLayout = ({ galleries }) => {
  return (
    <Layout title="Admin panel">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active" aria-current="page">admin</li>
        </ol>
      </nav>

      <div className="card">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Galleries list</h2>
        </div>
        <div className="card-body">
          {galleries.length > 0 ? (
            <div className="list-group">
              {galleries.map((gallery, index) => (
                <a 
                  href={"/admin/" + String(gallery.GalleryTableName)} 
                  className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                  key={index}
                >
                  {gallery.GalleryName}
                  {gallery.PartyDate && (
                    <span className="badge bg-primary rounded-pill">{gallery.PartyDate}</span>
                  )}
                </a>
              ))}
            </div>
          ) : (
            <div className="alert alert-info" role="alert">
              Brak galerii. Dodaj pierwszą galerię!
            </div>
          )}
        </div>
        <div className="card-footer">
          <a href="/admin/new-gallery" className="btn btn-success">
            <i className="bi bi-plus-circle me-2"></i>DODAJ NOWĄ GALERIĘ
          </a>
        </div>
      </div>
    </Layout>
  );
};

export const galleriesList = async (c) => {
  const { success, results } = await getGalleriesFromD1(c);

  if (!success) {
    throw new Error("Błąd podczas pobierania danych z bazy. Sprawdź połączenie i spróbuj ponownie.");
  }

  try {
    const galleries = results.map((result) => ({
        GalleryTableName: result.GalleryTableName,
        GalleryName: result.GalleryName,
        PartyDate: result.PartyDate,
      }));
    return c.html(<GalleriesLayout galleries={galleries} />);
  } catch (error) {
    return c.html(
        <div className="alert alert-danger">
            Błąd podczas ładowania galerii: {error.message}
        </div>
    );
  }
};
