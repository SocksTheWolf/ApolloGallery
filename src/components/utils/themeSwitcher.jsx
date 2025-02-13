export const ThemeSwitcher = (props) => {
    const c = props.c;
    return (
      <label data-placement="left" data-tooltip={c.t("light_or_dark_mode")}>
        <input name="color-mode-toggle" role="switch" type="checkbox" value="1" />
        <script type="module" src="/static/js/SwitchColorMode.js"></script>
      </label>
    );
};