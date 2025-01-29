import { _otherLinks } from "./_footerItems";

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
    },
    {
        label: "Fixtures",
        url: "/fixtures"
    }
];

export const _loggedInUserItems = [
    ..._navItems,
    {
        label: "Watchlist",
        url: "/watchlist"
    },
    ..._otherLinks
];

export const _loggedInAdminItems = [
    ..._loggedInUserItems.filter((item) => item.label !== "Home").filter((item) => item.label !== "Watchlist"),

]

