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
        label: "Teams",
        url: "/teams",
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
        label: "Venues",
        url: "/venues",
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
    }
];

export const _loggedInAdminItems = [
    ..._navItems,
]

