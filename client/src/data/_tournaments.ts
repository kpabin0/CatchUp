// This file contain the fallback methods with data incase of fetch failure

import { getArray } from "./utils"

const tourCount = 3

export function getFallbackTournaments()
{
    const tempTour = getArray(tourCount)

    return tempTour.map((ind) => {
        return {
            team_name: "Fallback - " + ind.toString(),
            matches_played: ind*4,
            matches_won: ind*2,
            matches_tied: ind,
            points: ind*3 % 10
        }
    })
}

export function getFallbackTournamentsInfo()
{
    const tempTour = getArray(tourCount)

    return tempTour.map((ind) => {
        return {
        name: "Fallback Tournament Name " + ind.toString(),
        start_date: new Date().toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }),
        end_date: new Date().toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }),
        venue: "Venue " + ind.toString(),
        description: "This is description of the tournament. Currently fallback is active have to replace with ..." + ind.toString()
        }
    })
}