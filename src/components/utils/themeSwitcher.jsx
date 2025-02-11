export const ThemeSwitcher = (props) => {
    const c = props.c;
    return (
      <label data-placement="bottom" data-tooltip={c.t("light_or_dark_mode")}>
        <input name="color-mode-toggle" role="switch" type="checkbox" value="1" />
        <script src="/static/js/SwitchColorMode.js"></script>
      </label>
    );
};