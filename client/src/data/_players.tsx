// This file contain the fallback methods with data incase of fetch failure

import { getArray } from "./utils"

const playerCount = 40

export function getFallbackPlayers()
{
    const playerArray = getArray(playerCount)

    return playerArray.map((ind) => {
        return {
            playerid: ind,
            teamid: ind % 10,
            name: "Player " + ind.toString(),
            img: "https://w1.pngwing.com/pngs/386/684/png-transparent-face-icon-user-icon-design-user-profile-share-icon-avatar-black-and-white-silhouette.png",
            role: "Role " + ind.toString(),
            dob: new Date().toLocaleDateString('en-US', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            }),
            phone: "98xxxxxxx" + ind.toString(),
            address: "address " + ind.toString()
        }
    })
}

export function getFallbackPlayersStats()
{
    const statsArray = getArray(3)
    const playerArray = getArray(playerCount)

    return statsArray.map((i) => {
        return playerArray.map((ind) => {
            return {
                playerid: ind,
                matchid: ind,
                balls_played: ind * i,
                balls_bowled: ind * i,
                runs: ind + i,
                runs_concieved: ind + i,
                wickets: ind,
                sixes: ind * i + i,
                fours: ind * i + i,
                playing_status: ind % 2 === 0 ? true : false
            }
        })
    })

}