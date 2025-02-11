import { html } from 'hono/html'

export const PreloadAssets = () => {
    return html`
        <link rel="preload" href="https://cdn.jsdelivr.net/npm/@yohns/picocss@2.2.10/css/pico.orange.min.css" as="style" />
        <link rel="preload" href="/static/js/SwitchColorMode.js" as="script" />
        <link rel="preload" href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css" as="style" />
        <link rel="preload" href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js" as="script" />
        <link rel="preload" href="/static/js/main-carousel.js" as="script" />
        <link rel="prefetch" href="https://unpkg.com/imagesloaded@5/imagesloaded.pkgd.min.js" />
        <link rel="prefetch" src="/static/js/initPhotoSwipe.js" />
        <link rel="prefetch" src="/static/js/masonry.js" />
    `;
};