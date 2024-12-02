import { addImageToIndywidualGallery } from "./db"

export const imageUploader = async (c) => {
    const galleryName = c.req.param("galeryTableName");
    const formData = await c.req.parseBody();
    const file = formData['file'];
    const width = formData['width'];
    const height = formData['height'];
    const hash = formData['hash'];

    if (!(file instanceof File)) {
        return c.text('Invalid file', 400);
    }

    const fileBuffer = await file.arrayBuffer();
    const fullName = file.name;
    const ext = fullName.split('.').pop();
    const orgName = fullName.split('.').shift();
    const newName = orgName + "_" + hash.toString().slice(0, 10);
    const path = `galleries/${galleryName}/${newName}.${ext}`;

    try {
        const { success } = await addImageToIndywidualGallery(c, galleryName, orgName, width, height, hash, path);
        if (!success) {
            throw new Error("Błąd podczas zapisu do bazy danych");
        }

        const r2Response = await c.env.R2.put(path, fileBuffer);
        return c.json({
            'image': {
                'url': r2Response.key
            },
            'DB': {
                'success': true,
                'error': null
            }
        });
    } catch (error) {
        return c.json({
            'image': {
                'url': null
            },
            'DB': {
                'success': false,
                'error': error.message
            }
        });
    }
}