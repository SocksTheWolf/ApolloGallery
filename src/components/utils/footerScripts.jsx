import { html } from 'hono/html';

export const FooterScripts = () => {
    return html`
        <script type="text/javascript" src="/static/js/thirdparty/back-to-top.min.js"></script>
        <script type="text/javascript">addBackToTop({
          diameter: 56,
          backgroundColor: 'var(--pico-primary-background)',
          textColor: 'var(--pico-color)'
        })</script>
    `;
};