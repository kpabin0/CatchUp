export const _navItems = [
    {
        label: "Home",
        url: "/home",
    },
    {
        label: "Matches",
        url: "/matches"
    },
    {
        label: "Tournaments",
        url: "/tournaments",
        subItems: [
            {
                label: "Nepal Premier League",
                url: "/npl"
            },
            {
                label: "Elite Cup",
                url: "/elitecup"
            },
            {
                label: "Jay Nepal Cup",
                url: "/jaynepalcup"
            }
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

