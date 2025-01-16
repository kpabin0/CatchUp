// This file contain the fallback methods with data incase of fetch failure

export function getFallbackMatches()
{
    const matchCount = 5
    const statsCount = 3
    const tempMatch = Array(matchCount).fill(0).map((_, index) => index + 1)
    const stats = Array(statsCount).fill(0).map((_, index) => index + 1)
  
    return tempMatch.map((ind) => {
      return {
        date: new Date().toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
        time: new Date().getHours().toString(),
        venue: "Venue " + ind.toString(),
        stats: stats.map((ind) => {
                  return {
                    runs: ind,
                    wickets: ind,
                    fours: ind,
                    sixes: ind,
                    extras: ind,
                    balls: ind
                  }
                })
      }
    })
}
