import { html, raw } from 'hono/html'
import { getPicoCSS } from '../../utils/getPicoCSS';
import { isEnvVarSet } from '../../utils/envVars';

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

const Slider = new PageAssetDefinition(["/static/js/main-carousel.js", "https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js", ], 
 ["https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css"]);

const Gallery = new PageAssetDefinition([
    "https://unpkg.com/imagesloaded@5/imagesloaded.pkgd.min.js", "/static/js/initPhotoSwipe.js", "/static/js/masonry.js"]);

export const PreloadAssets = (props) => {
    const prefetchType = props.type || "";
    const ctx = props.c;
    let prefetchCode = "";
    switch (prefetchType)
    {
        // gallery listings
        case "listing":
            prefetchCode = Slider.applyPreload() + Gallery.applyPrefetch();
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

    // Preload the kofi fonts if we're using kofi support
    if (isEnvVarSet(ctx.env, "KOFI_USERNAME"))
        prefetchCode += "<link rel='preload' href='https://fonts.googleapis.com/css?family=Quicksand:400,700' as='style' />";

    return html`
        <link rel="preload" href="${getPicoCSS(ctx)}" as="style" />
        <link rel="preload" href="https://storage.ko-fi.com/cdn/widget/Widget_2.js" as="script" />
        <link rel="preload" href="/static/js/back-to-top.min.js" as="script" />
        <link rel="modulepreload" href="/static/js/SwitchColorMode.js" as="script" />
        ${raw(prefetchCode)}
    `;
};