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
    //
    // some safari blockers will block the kofi script directly so have a fallback, 
    // eventually copy the original script and host it locally
    // to prevent problems
    return (
        <li id="kofi-btn" aria-busy="true" data-placement="bottom" data-tooltip={c.t("kofi_tooltip")}>
        <script type='text/javascript' src='https://storage.ko-fi.com/cdn/widget/Widget_2.js'></script>
        <script>
        {html`
            const kofiButton = document.getElementById("kofi-btn");
            window.addEventListener('load', function (){
                kofiButton.removeAttribute("aria-busy");
                 let replaceHTML = "";
                 try {
                     kofiwidget2.init('${c.t("kofi_label")}', 'var(--pico-color)', '${kofiUsername}');
                     replaceHTML = kofiwidget2.getHTML();
                 } catch {
                     replaceHTML = "<a href='https://ko-fi.com/${kofiUsername}' target='_blank'><button>${c.t('kofi_label')}</button></a>";
                 }
                kofiButton.innerHTML = replaceHTML;
            });
        `}
        </script>
        </li>
    );
};