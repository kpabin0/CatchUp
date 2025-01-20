// This file contain the fallback methods with data incase of fetch failure

import { getArray } from "./utils"

export function getFallbackMatches()
{
    const matchCount = 5
    const tempMatch = getArray(matchCount)
  
    return tempMatch.map((ind) => {
      return {
        team_1: {
          name: "Fallback - " + ind.toString(),
          runs: ind * 2,
          wickets: ind,
          over: ind/2,
        },
        team_2: {
          name: "Fallback - " + (ind + 1).toString(),
          runs: ind * 4,
          wickets: ind,
          over: ind/2 - 0.2,
        },
        isLive: ind % 2 === 1 ? true : false
      }
    })
}
