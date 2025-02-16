export const ThemeSwitcher = (props) => {
  const c = props.c;
  return (
    <label id="theme-switcher" data-placement="left" data-tooltip={c.t("light_or_dark_mode")} role="switch">
      <script type="module" src="/static/js/SwitchColorMode.js"></script>
    </label>
  );
};
