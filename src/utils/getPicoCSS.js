export const getPicoCSS = (c) => {
    const cssBasePath = "https://cdn.jsdelivr.net/npm/@yohns/picocss@2.2.10/css/";
    const colorSchemeSetting = (c !== null) ? (c.env.COLOR_SCHEME || "").trim() : "";
    if (colorSchemeSetting !== "") {
        return `${cssBasePath}pico.${colorSchemeSetting}.min.css`;
    }
    return `${cssBasePath}pico.min.css`;
};