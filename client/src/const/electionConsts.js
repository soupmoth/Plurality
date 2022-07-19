//voting types
export const PLURALITY = 'PLURALITY';
export const RUNOFF = 'RUNOFF'
export const LOSER_TAKES_ALL = "LOSER_TAKES_ALL" //loser wins if they had non-zero votes

//election types
export const REGION = "region"
export const COUNTY_AND_BUROUGH = "county_name"
export const COUNTRY = "country"
export const NATION = "NATION"
export const INDIVIDUAL = "INDIVIDUAL"


export const DEFAULT = {
    tacticalVoteProportion: 0.25,
    noOfMPsPerConst: 1,
    typeOfVote: PLURALITY,
    grouping: INDIVIDUAL,
    partyPollRates: [],
}

export const STARTING_SEATS = {
    total: 18,
    party: {
        con: 0,
        brexit: 0,     
        ni: 18,
        snp: 0,
        other: 0,
        pc: 0,
        ld: 0,
        green: 0,
        lab: 0,
    }
}

export const POLITICAL_DISTANCE = (leaning) => {

    const leaningOptions = {
        "far-left": 1,
    "left": 2,
    "centre-left": 3,
    "centre": 4,
    "centre-right": 5,
    "right": 6,
    "far-right": 7
    }

    return leaningOptions[leaning]
    
}

export const darkenPartyColours = (hex, lum) => {

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}