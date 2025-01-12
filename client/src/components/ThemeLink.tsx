import { Link } from "react-router-dom"

interface IThemeLink {
    label : string,
    style? : string,
    url?: string
};

const ThemeLink = ({label, style, url} : IThemeLink) => {
  return (
    <Link
        to={url ? url : "#"}
        className={"bg-theme hover:bg-theme-alt p-2 px-4 text-white rounded-md transition-all duration-200 " + (style ? style : "")}
    >
        {label}
    </Link>
  )
}

export default ThemeLink