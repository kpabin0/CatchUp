// This file contain the fallback methods with data incase of fetch failure

export function getFallbackPlayers()
{
    const playerCount = 10
    const playerArray = Array(playerCount).fill(0).map((_, index) => index + 1)

    return playerArray.map((ind) => {
        return {
            name: "Player ",
            img: "https://w1.pngwing.com/pngs/386/684/png-transparent-face-icon-user-icon-design-user-profile-share-icon-avatar-black-and-white-silhouette.png",
            role: "Role ",
            runs: ind,
            wickets: ind,
            fours: ind,
            sixes: ind,
            ballsFaced: ind
        }
    })
}