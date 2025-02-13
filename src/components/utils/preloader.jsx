import { html, raw } from 'hono/html'

class PageAssetDefinition {
    constructor(scripts, styles=null) {
        this.scripts = (scripts !== null) ? scripts : [];
        this.styles = (styles !== null) ? styles : [];
    }
    applyPreload() {
        let outputStr = "";
        this.scripts.forEach((el) => {
            outputStr += `<link rel="modulepreload" href="${el}" as="script" />\n`;
        });
        this.styles.forEach((el) => {
            outputStr += `<link rel="preload" href="${el}" as="style" />\n`;
        });
        return outputStr;
    }
    applyPrefetch() {
        let outputStr = "";
        this.scripts.forEach((el) => {
            outputStr += `<link rel="prefetch" href="${el}" />\n`;
        });
        this.styles.forEach((el) => {
            outputStr += `<link rel="prefetch" href="${el}" />\n`;
        });
        return outputStr;
    }
}

const Gallery = new PageAssetDefinition([
    "https://unpkg.com/imagesloaded@5/imagesloaded.pkgd.min.js", "/static/js/initPhotoSwipe.js", "/static/js/masonry.js"]);

export const PreloadAssets = (props) => {
    const prefetchType = props.type || "";
    let prefetchCode = "";
    switch (prefetchType)
    {
        // gallery listings
        case "listing":
            prefetchCode = Gallery.applyPrefetch();
        break;
        // single gallery page
        case "single":
            prefetchCode = Gallery.applyPreload();
        break;
        // no extra prefetching needed.
        case "none":
        default:
        break;
    }

    return html`
        <link rel="preload" href="https://cdn.jsdelivr.net/npm/@yohns/picocss@2.2.10/css/pico.amber.min.css" as="style" />
        <link rel="modulepreload" href="/static/js/SwitchColorMode.js" as="script" />
        ${raw(prefetchCode)}
    `;
};