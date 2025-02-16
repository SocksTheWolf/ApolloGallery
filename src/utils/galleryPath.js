export const getGalleryPath = (c) => {
    // Make sure we handle any potentially invalid settings.
    const pathSetting = (c.env.GALLERY_PATH[0] === '/') ? c.env.GALLERY_PATH.substring(1) : c.env.GALLERY_PATH;
    
    if (pathSetting === "/" || pathSetting === "") {
        return "/"
    }
    return `/${pathSetting}/`;
};

export const isRawImagePath = (img) => (img.length > 4 && img.substring(0, 4) === "img/");
export const getImagePathRaw = (img) => (isRawImagePath(img)) ? img : `img/${img}`;

export const getImagePath = (c, img) => {
    if (img === getImagePathRaw(img)) {
        return `${getGalleryPath(c)}${img}`;
    }
    return `${getGalleryPath(c)}${getImagePathRaw(img)}`;
};

export const getImageWithTransforms = (c, img, location="main", format="auto") => {
    // Covers already have the most of the image path applied to them (they store the raws)
    const baseImgLocation = getImagePath(c, img);
    if (c.env.IMGT === "false" || location === "original") {
        return baseImgLocation;
    }
    let cloudFlareBase = `/cdn-cgi/image/f=${format},metadata=copyright`;
    switch (location)
    {
        // thumbnails for sliders
        case "slider-thumb":
            cloudFlareBase += ",q=60,w=70,h=70";
        break;
        // Thumbnail for images in a gallery
        case "gallery-thumb":
        // Used for the image gallery cover images
        case "cover":
            cloudFlareBase += ",q=70,w=433,h=200,fit=scale-down";
        break;
        // Used for the global slider
        case "slider":
        // Full sized images
        case "main":
        case "full":
            cloudFlareBase += ",q=85";
        break;
    }
    return cloudFlareBase + baseImgLocation;
};