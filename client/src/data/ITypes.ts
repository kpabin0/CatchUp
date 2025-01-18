// This file contains the global interface for ts used in this project

export interface IVenue {
    venueid: number,
    name: string,
    seats: number,
    location: string
};

export interface ITournament {
    tournamentid: number,
    name: string,
    start: string,
    end: string
};

export interface ITeam {
    teamid: number,
    name: string,
    description?: string
};

export interface IMatch {
    matchid: number,
    tournamentid: number,
    teamid_1: number,
    teamid_2: number,
    extras_1: number,
    extras_2: number,
    venueid: number
};

export interface IPersonalInfo {
    name: string,
    img? : string,
    dob?: string,
    phone?: string,
    address?: string
};

export interface IPlayer extends IPersonalInfo {
    playerid: number,
    teamid: number,
    role: string
};

export interface IPlayerStats {
    playerid: number,
    matchid: number,
    balls_played: number,
    balls_bowled: number,
    runs: number,
    runs_concieved: number,
    wickets: number,
    sixes: number,
    fours: number,
    playing_status: boolean
};


// Other Helpful interfaces
export interface INews {
    title: string,
    img?: string,
    description: string
};

export interface ISubNews {
    title: string,
    url?: string,
    description: string
};


export interface ITournamentInfo   {
    name: string,
    start: string,
    end: string,
    venue: string,
    description: string,
};