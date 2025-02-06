import { _usefulLinks } from "./_footerItems";

export const _navItems = [
    {
        label: "Home",
        url: "/home",
    },
    {
        label: "Matches",
        url: "/matches",
        subItems: [
        ]
    },
    {
        label: "Tournaments",
        url: "/tournaments",
        subItems: [
        ]
    },
    {
        label: "News",
        url: "/news"
    }
];

export const _loggedInUserItems = [
    ..._navItems,
    {
        label: "Watchlist",
        url: "/watchlist"
    },
    ..._usefulLinks
];

export const _loggedInAdminItems = [
    {label: "Dashboard", url: "/dashboard"},
    ..._loggedInUserItems.filter((item) => item.label !== "Home").filter((item) => item.label !== "Watchlist"),
]

export const _entriesItems = [
    ...[..._navItems, ..._usefulLinks].filter((item) => item.label !== "Home").filter((item) => item.label !== "About Us").filter((item) => item.label !== "Fixtures"),
    {label: "Subnews", url: "/subnews"}
]

