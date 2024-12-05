export const getGalleriesFromD1 = async (c) => {
    return await c.env.DB.prepare("SELECT * FROM Galleries ORDER BY PartyDate DESC").all();
};

export const getGalleriesFromD1wGalleryIsPublic = async (c) => {
  try {
    // Attempt to fetch data from the Galleries table
    const galleries = await c.env.DB.prepare('SELECT * FROM Galleries WHERE GalleryIsPublic = "TRUE" ORDER BY PartyDate DESC').all();
    return galleries;
  } catch (error) {
    console.error("Error fetching galleries:", error.message);

    // Define SQL to create the Galleries table if it doesn't exist
    const createTableSQL = `
        CREATE TABLE IF NOT EXISTS Galleries (
          GalleryName TEXT,
          GalleryTableName TEXT PRIMARY KEY,
          TextField TEXT,
          CoverImage TEXT,
          PartyDate DATE,
          PublicationDate DATETIME,
          GalleryIsPublic BOOLEAN
        );
      `;

    try {
      // Attempt to create the Galleries table
      await c.env.DB.prepare(createTableSQL).run();
      return "The Galleries table in database did not exist and has been created. Please reload the page";
    } catch (createError) {
      console.error("Error creating the Galleries table:", createError.message);
      return "An error occurred while creating the Galleries table.";
    }
  }
};

export const updateGalleryOnD1 = async (c, formObject) => {
  return await c.env.DB.prepare(
    "UPDATE Galleries SET GalleryName = ?1,TextField = ?3, CoverImage = ?4, PartyDate = ?5,PublicationDate = ?6,GalleryIsPublic = ?7 WHERE GalleryTableName = ?2;"
  )
    .bind(
      formObject.GalleryName,
      formObject.GalleryTableName,
      formObject.TextField,
      formObject.CoverImage,
      formObject.PartyDate,
      formObject.PublicationDate,
      formObject.GalleryIsPublic
    )
    .all();
};

export const createGallery = async (c, formObject) => {
  return await c.env.DB.batch([
    c.env.DB.prepare(
      "INSERT INTO Galleries (GalleryName, GalleryTableName, TextField, CoverImage, PartyDate, PublicationDate, GalleryIsPublic) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)"
    ).bind(
      formObject.GalleryName,
      formObject.GalleryTableName,
      formObject.TextField,
      formObject.CoverImage,
      formObject.PartyDate,
      formObject.PublicationDate,
      formObject.GalleryIsPublic
    ),
    c.env.DB.prepare(
      `CREATE TABLE IF NOT EXISTS ${formObject.GalleryTableName} (approved BOOLEAN, width INTEGER, height INTEGER, name TEXT, hash TEXT, path TEXT PRIMARY KEY)`
    ),
  ]);
};

export const addImageToIndywidualGallery = async (
  c,
  GalleryTableName,
  name,
  width,
  height,
  hash,
  path
) => {
  return c.env.DB.prepare(
    `INSERT INTO ${GalleryTableName} (approved, name, width, height, hash, path) VALUES (TRUE, ?1, ?2, ?3, ?4, ?5)`
  )
    .bind(name, width, height, hash, path)
    .all();
};

export const getIndywidualGalleryFromD1 = async (c, gallery) => {
  return await c.env.DB.prepare(`SELECT * FROM ${gallery}`).all();
};

export const getIndywidualGalleryFromD1wApproved = async (c, gallery) => {
  return await c.env.DB.prepare(`SELECT * FROM ${gallery} where approved = TRUE`).all();
};

export const deleteGalleryInBothPlaces = async (c, GalleryTableName) => {
  return await c.env.DB.batch([
    c.env.DB.prepare("DELETE FROM Galleries  WHERE GalleryTableName = ?1").bind(
      GalleryTableName
    ),
    c.env.DB.prepare(`DROP TABLE IF EXISTS ${GalleryTableName}`),
  ]);
};

export const checkIfExistGalleryOnD1 = async (c, GalleryTableName) => {
  return c.env.DB.prepare(
    "SELECT GalleryTableName FROM Galleries WHERE GalleryTableName = ?1"
  )
    .bind(GalleryTableName)
    .all();
};


export const toggleImageApproval = async (c, GalleryTableName, imagePath) => {
  try {
    const response = await c.env.DB.prepare(
      `SELECT approved FROM ${GalleryTableName} WHERE path = ?1`
    )
      .bind(imagePath)
      .all();
    const previousApproval = response.results[0].approved;

    const newApprovedState = !previousApproval;

    await c.env.DB.prepare(
      `UPDATE ${GalleryTableName} SET approved = ?1 WHERE path = ?2`
    )
      .bind(newApprovedState, imagePath)
      .all();

    return newApprovedState;
  } catch (error) {
    console.error("Error toggling image approval:", error.message);
    return false;
  }
};

export const deleteImageFromGallery = async (
  c,
  GalleryTableName,
  imagePath
) => {
  try {
    await c.env.DB.prepare(`DELETE FROM ${GalleryTableName} WHERE path = ?1`)
      .bind(imagePath)
      .all();

    return true;
  } catch (error) {
    console.error("Error deleting image:", error.message);
    return false;
  }
};
