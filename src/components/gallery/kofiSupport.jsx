import { html } from "hono/html";
import { getEnvVar } from "../../utils/envVars";

export const KofiSupport = (props) => {
    const c = props.c;
    const kofiUsername = getEnvVar(c.env, "KOFI_USERNAME");
    // This installation is not using this feature.
    if (kofiUsername === null)
        return;

    // everything in the li is going to get injected with the kofi data upon load.
    // the original script will also be deleted, which is neat.
    return (
        <li id="kofi-btn" aria-busy="true" data-placement="bottom" data-tooltip={c.t("kofi_tooltip")}>
        <script type='text/javascript' src='https://storage.ko-fi.com/cdn/widget/Widget_2.js'></script>
        <script>
        {html`
            kofiwidget2.init('${c.t("kofi_label")}', 'var(--pico-color)', '${kofiUsername}');
            window.addEventListener('load', function (){
                const kofiButton = document.getElementById("kofi-btn");
                kofiButton.removeAttribute("aria-busy");
                kofiButton.innerHTML = kofiwidget2.getHTML();
            });
        `}
        </script>
        </li>
    );
};