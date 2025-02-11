export const getGalleryPath = (c) => {
    if (c.env.GALLERY_PATH === "/" || c.env.GALLERY_PATH === "") {
        return "/"
    }
    return `/${c.env.GALLERY_PATH}/`;
};

export const getImagePath = (c, img) => {
    return `${getGalleryPath(c)}img/${img}`;
};