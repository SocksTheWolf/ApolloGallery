import { html } from 'hono/html'

export const SocialMetaTags = () => {
    return html`
        <meta name="title" content="Apollo's Gallery" />
        <meta name="description" content="Cute Shiba Inu pictures daily! Check out his amazing adventures and sign up for updates!" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://apollo.dog" />
        <meta property="og:title" content="Apollo's Gallery" />
        <meta property="og:description" content="Cute Shiba Inu pictures daily! Check out his amazing adventures and sign up for updates!" />
        <meta property="og:image" content="https://apollo.dog/web-app-manifest-192x192.png" />
        
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://apollo.dog" />
        <meta property="twitter:title" content="Apollo's Gallery" />
        <meta property="twitter:description" content="Cute Shiba Inu pictures daily! Check out his amazing adventures and sign up for updates!" />
        <meta property="twitter:image" content="https://apollo.dog/web-app-manifest-192x192.png" />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />`;
};