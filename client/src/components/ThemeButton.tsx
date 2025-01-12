interface IThemeButton {
    label : string,
    style? : string,
    callback? : () => void 
};

const ThemeButton = ({label, style, callback} : IThemeButton) => {
  return (
    <button
        onClick={callback ? () => callback() : () => {}}
        className={"bg-theme hover:bg-theme-alt p-2 px-4 text-white rounded-md transition-all duration-200 " + (style ? style : "")}
    >
        {label}
    </button>
  )
}

export default ThemeButton