export const getGalleryPath = (c) => {
    if (c.env.GALLERY_PATH === "/" || c.env.GALLERY_PATH === "") {
        return "/"
    }
    return `/${c.env.GALLERY_PATH}/`;
};