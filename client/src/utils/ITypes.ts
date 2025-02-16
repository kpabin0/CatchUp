// This file contains the global interface for ts used in this project

interface INavbase
{
    label: string,
    url: string,
    icon?: any,
    style?: string,
}

export interface INavItem extends INavbase {
    subItems?: INavbase[]
};

export interface ISideNavItem extends INavItem {

}

// Following are the interface that is used in postgresql table
export interface IVenue {
    venueid: number,
    name: string,
    seats: number,
    location: string
};

export interface ITournament {
    tournamentid: number,
    name: string,
    start_date: string,
    end_date: string
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
    img?: string,
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


export interface ITournamentInfo {
    name: string,
    start_date: string,
    end_date: string,
    venue: string,
    description: string,
};

export interface IPersonCard {
    name: string,
    img?: string,
    post: string,
};


export interface IMatchForm {
    matchid: number,
    team_1: string,
    team_2: string,
    date: string,
    venue: string,
};

// forms interface here

export interface ITournamentForm {
    tournamentid?: number,
    name: string,
    start_date: string,
    end_date: string
};

export interface ITeamForm {
    teamid?: number,
    name: string,
    description: string
};

export interface IVenueForm {
    venueid?: number,
    name: string,
    seats: number,
    location: string
};

export interface INewsForm {
    newsid?: number,
    title: string,
    img?: string,
    description: string
};

export interface ISubNewsForm {
    subnewsid?: number,
    title: string,
    description: string
};

export interface IPlayerForm extends IPlayer {
    
}


// For view specifics in the webpage 
export interface ITeamMatchView {
    name: string,
    runs: number,
    wickets: number,
    over: number,
}

export interface IMatchHighlightView {
    team_1: ITeamMatchView,
    team_2: ITeamMatchView,
    isLive: boolean
    date?: string
};

export interface IBatsmanStats {
    balls_played: number,
    runs: number,
    sixes: number,
    fours: number,
};

export interface IBowlerStats {
    balls_bowled: number,
    runs_concieved: number,
    wickets: number
    maiden?: number,
    extras?: number
};

export interface IPlayerBatsmanScore extends IBatsmanStats {
    name: string,
    description: string
};

export interface ITeamBatsmanScore {
    batters: IPlayerBatsmanScore[]
};

export interface IPlayerBowlerScore extends IBowlerStats {
    name: string
};

export interface ITeamBowlerScore {
    bowlers: IPlayerBowlerScore[]
};


export interface IInnings extends ITeamBatsmanScore, ITeamBowlerScore {
    
};

export interface IMatchView extends IMatchHighlightView {
    innnings_1: IInnings,
    innnings_2: IInnings
};


export interface IFixture extends IMatchHighlightView {

};


export interface ITournamentPointsTable {
    team_name: string,
    matches_played: number,
    matches_won: number,
    matches_tied: number,
    points: number
};
