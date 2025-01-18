// This file contain the fallback methods with data incase of fetch failure

import { getArray } from "./utils"

export function getFallbackMatches()
{
    const matchCount = 5
    const tempMatch = getArray(matchCount)
  
    return tempMatch.map((ind) => {
      return {
        matchid: ind,
        tournamentid: ind,
        teamid_1: ind,
        teamid_2: (ind + ind) % 10,
        extras_1: ind,
        extras_2: 2 * ind + 1,
        venueid: ind
      }
    })
}
