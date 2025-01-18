// This file contain the fallback methods with data incase of fetch failure


export function getFallbackTournament()
{
    const tourCount = 5
    const statsCount = 3
    const tempTour = Array(tourCount).fill(0).map((_, index) => index + 1)
    const stats = Array(statsCount).fill(0).map((_, index) => index + 1)

    return tempTour.map((ind) => {
        return {
        name: "Fallback Tournament " + ind.toString(),
        start: new Date().toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }),
        end: new Date().toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }),
        venue: "Venue " + ind.toString(),
        stats: stats.map((ind) => {
                    return {
                    day: ind.toString(),
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

export function getFallbackTournamentInfo()
{
    const tourInfoCount = 5
    const tempTour = Array(tourInfoCount).fill(0).map((_, index) => index + 1);

    return tempTour.map((ind) => {
        return {
        name: "Fallback Tournament Name " + ind.toString(),
        start: new Date().toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }),
        end: new Date().toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }),
        venue: "Venue " + ind.toString(),
        description: "This is description of the tournament. Currently fallback is active have to replace with ..." + ind.toString()
        }
    })
}