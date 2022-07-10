//voting types
export const PLURALITY = 'PLURALITY';
export const RUNOFF = 'RUNOFF'
export const LOSER_TAKES_ALL = "LOSER_TAKES_ALL" //loser wins if they had non-zero votes

//election types
export const REGION = 'REGION'
export const COUNTY_AND_BUROUGH = 'CAB'
export const NATION = "NATION"
export const INDIVIDUAL = "INDIVIDUAL"


export const DEFAULT = {
    tacticalVoteProportion: 0.25,
    noOfMPsPerConst: 1,
    typeOfVote: PLURALITY,
    grouping: INDIVIDUAL,
}

export const STARTING_SEATS = {
    total: 18,
    party: {
        con: 0,
        lab: 0,
        ld: 0,
        brexit: 0,
        green: 0,
        snp: 0,
        pc: 0,
        ni: 18,
        other: 0
    }
}