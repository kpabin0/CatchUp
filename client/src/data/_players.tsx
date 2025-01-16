// This file contain the fallback methods with data incase of fetch failure

export function getFallbackPlayers()
{
    const playerCount = 10
    const playerArray = Array(playerCount).fill(0).map((_, index) => index + 1)

    return playerArray.map((ind) => {
        return {
            name: "Player ",
            role: "Role ",
            runs: ind,
            wickets: ind,
            fours: ind,
            sixes: ind,
            ballsFaced: ind
        }
    })
}