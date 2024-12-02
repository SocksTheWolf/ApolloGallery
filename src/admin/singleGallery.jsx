import { Layout } from "./layoutHTMX";
import { 
  getGalleriesFromD1,  
  getIndywidualGalleryFromD1, 
} from "./db"

const SingleGalery = (props) => {
  return (
    <Layout title={"Edycja: " + props.gallery.GalleryName} >
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="../admin">admin</a></li>
          <li className="breadcrumb-item active" aria-current="page">{props.gallery.GalleryName}</li>
        </ol>
      </nav>

      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Edycja galerii: {props.gallery.GalleryName}</h2>
        </div>
        <div className="card-body">
          <form hx-post="" hx-target="#update_result">
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="galleryName" className="form-label">Nazwa galerii</label>
                <input
                  type="text"
                  className="form-control"
                  name="GalleryName"
                  id="galleryName"
                  value={props.gallery.GalleryName}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="galleryTableName" className="form-label">Nazwa tabeli galerii</label>
                <input
                  type="text"
                  className="form-control"
                  readOnly
                  name="GalleryTableName"
                  id="galleryTableName"
                  value={props.gallery.GalleryTableName}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="textField" className="form-label">Opis</label>
                <input
                  type="text"
                  className="form-control"
                  name="TextField"
                  id="textField"
                  value={props.gallery.TextField}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="coverImage" className="form-label">Zdjęcie okładkowe</label>
                <input
                  type="text"
                  className="form-control"
                  name="CoverImage"
                  id="coverImage"
                  value={props.gallery.CoverImage}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="partyDate" className="form-label">Data imprezy</label>
                <input
                  required 
                  type="date"
                  className="form-control"
                  name="PartyDate"
                  id="partyDate"
                  value={props.gallery.PartyDate}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="publicationDate" className="form-label">Data publikacji</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="PublicationDate"
                  id="publicationDate"
                  value={props.gallery.PublicationDate}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="galleryIsPublic" className="form-label">Widoczność galerii</label>
                <select
                  className="form-select"
                  name="GalleryIsPublic"
                  id="galleryIsPublic"
                  value={props.gallery.GalleryIsPublic}
                >
                  <option value={props.gallery.GalleryIsPublic}>
                    {props.gallery.GalleryIsPublic === "TRUE" ? "Publiczna" : "Prywatna"}
                  </option>
                  <option value="TRUE">Publiczna</option>
                  <option value="FALSE">Prywatna</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <button type="submit" className="btn btn-primary me-2">
                  <i className="bi bi-save me-2"></i>Zapisz zmiany
                </button>
                <button 
                  hx-confirm={`Czy na pewno chcesz usunąć galerię ${props.gallery.GalleryName}?`} 
                  className="btn btn-danger" 
                  hx-target="#update_result" 
                  hx-delete={props.gallery.GalleryTableName + "/delete"}
                >
                  <i className="bi bi-trash me-2"></i>Usuń galerię
                </button>
              </div>
            </div>

            <div id="update_result" className="mt-3"></div>
          </form>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header bg-secondary text-white">
          <h3 className="mb-0">Dodaj zdjęcia</h3>
        </div>
        <div className="card-body">
          <form className="mb-3">
            <div className="input-group">
              <input 
                type="file" 
                className="form-control" 
                accept="image/png, image/jpeg" 
                multiple 
                id="fileInput" 
                name="file"
              />
              <button id="submit" className="btn btn-primary">
                <i className="bi bi-upload me-2"></i>Wyślij zdjęcia
              </button>
            </div>
          </form>

          <div className="progress mb-3">
            <div 
              id="progress-bar" 
              className="progress-bar" 
              role="progressbar" 
              style={{width: "0%"}} 
              aria-valuenow="0" 
              aria-valuemin="0" 
              aria-valuemax="100"
            >
              0%
            </div>
          </div>

          <div className="mb-3">
            <span>Postęp: </span>
            <span id="curent-counter">0</span> z <span id="max-counter">0</span>
          </div>

          <ul id="upload-error" className="list-group"></ul>
        </div>
      </div>

      <div className="card">
        <div className="card-header bg-info text-white">
          <h3 className="mb-0">Zdjęcia w galerii</h3>
        </div>
        <div className="card-body">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {props.images.map((image, index) => (
              <div key={index} className="col">
                <div className="card h-100">
                  <img 
                    src={`../getimg/${image.path}`} 
                    className="card-img-top" 
                    alt={image.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{image.name}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <script type="module" src="/static/js/singlegallery.js"></script>
    </Layout>
  );
};


export const handleSingleGallery = async (c) => {
  const galeryTableName = c.req.param("galeryTableName");
  const { results } = await getGalleriesFromD1(c);
  const galery = results.find(
      (elem) => elem.GalleryTableName === galeryTableName
  ) || { id: 0, name: "string" };

  const indResponse = await getIndywidualGalleryFromD1(c, galeryTableName);
  return c.html(<SingleGalery gallery={galery} images={indResponse.results} />);
}