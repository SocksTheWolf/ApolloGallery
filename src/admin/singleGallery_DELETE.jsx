import {
    getIndywidualGalleryFromD1, 
    deleteGalleryInBothPlaces, 
} from "./db"

export const deleteSingleGallery = async (c) => {
    try {
        const { results: images } = await getIndywidualGalleryFromD1(c, c.req.param("galeryTableName"));
        const response = await deleteGalleryInBothPlaces(c, c.req.param("galeryTableName"));
        
        for (const resp of response) {
            if (!resp.success) {
                throw new Error("Błąd podczas usuwania: " + JSON.stringify(resp));
            }
        }

        if (images) {
            for (const image of images) {
                await c.env.R2.delete(image.path);
            }
        }

        return c.html('<b>Galeria została pomyślnie usunięta <a href="./">POWRÓT</a></b>');
    } catch (error) {
        return c.html(
            <div className="alert alert-danger">
                {error.message}
            </div>);
    }
}