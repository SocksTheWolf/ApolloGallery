import { html } from 'hono/html';

export const FooterScripts = () => {
    return html`
        <script type="module" src="/static/js/SwitchColorMode.js"></script>
    `;
};