import { html } from 'hono/html';

export const FooterScripts = () => {
    return html`
        <script src="/static/js/back-to-top.min.js"></script>
        <script>addBackToTop({
          diameter: 56,
          backgroundColor: 'var(--pico-primary-background)',
          textColor: 'var(--pico-color)'
        })</script>
    `;
};