import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

import { CircularProgress, Button, Typography, Paper, Slider, Grid, ButtonGroup, TextField, Container, Tooltip, IconButton } from "@material-ui/core";
import questionMark from '../../../images/p.png'

import useStyles from './styles.js';

import PartySlider from "./PartySlider/PartySlider.js";

import * as eConsts from '../../../const/electionConsts.js'


const ElectoralForm = ({ electionParams, setElectionParams, setSeatData }) => {
    const classes = useStyles();
    const parties = useSelector((state) => state.parties)

    const [voteType, setVoteType] = useState(eConsts.DEFAULT.typeOfVote)
    const [constituencyType, setConstituencyType] = useState(eConsts.DEFAULT.grouping)
    const [tacticalVotingMode, setTacticalVotingMode] = useState(eConsts.DEFAULT.tacticalVoteMode)
    const [tacticalVoting, setTacticalVoting] = useState(eConsts.DEFAULT.tacticalVoteProportion)
    const [partyPercentages, setPartyPercentages] = useState([])
    const [partyPercentageManual, setPartyPercentageManual] = useState(false)
    const [MPMode, setMPMode] = useState(eConsts.DEFAULT.MPGroupingMode)
    const [MPSeats, setMPSeats] = useState(eConsts.DEFAULT.MPsPerGroup)
    const [autoCorrect, setAutoCorrect] = useState(true)

    useEffect(() => {
        updateParties(partyPercentages)
    }, [parties])

    const getColour = (pID) => {
        const result = parties.find(party => party.partyID === pID)
        return result
    };

    const updateParties = () => {
        let partyPercent = []
        if (parties !== null) {
            for (let i = 0; i < parties.length; i++) {
                let percent = parseFloat((parties[i].nVotePercent).replace('%', '')) / 100
                partyPercent.push({ pID: parties[i].partyID, pName: parties[i].name, votePercent: percent, startingVotePercent: percent })
            }
        }
        setPartyPercentages(partyPercent)
    }

    //polling
    const correction = (pPercentages) => {
        var totalWeighting = 0
        var niPercent = 0

        pPercentages.forEach(party => {
            switch (party.pID) {
                case "sdlp":
                case "dup":
                case "sf":
                case "alliance":
                case "uup":
                    niPercent += parsePercentage(party.startingVotePercent)
                    break;
                default:
                    totalWeighting += parsePercentage(party.votePercent)
            }
        });
        var proportionOfWeight = 1 - niPercent

        pPercentages.forEach(party => {
            switch (party.pID) {
                case "sdlp":
                case "dup":
                case "sf":
                case "alliance":
                case "uup":
                    party.votePercent = parsePercentage(party.startingVotePercent)
                    break;
                default:
                    party.votePercent = proportionOfWeight * (parsePercentage(party.votePercent) / totalWeighting)
                    party.startingVotePercent = proportionOfWeight * (parsePercentage(party.votePercent) / totalWeighting)
            }
        });

        return pPercentages
    }

    const parsePercentage = (value) => {
        if (typeof value === 'string') {
            var parsed = parseFloat(value)
            if (Number.isNaN(parsed)) {
                parsed = 0.1
            }
            if (!partyPercentageManual) {
                return parsed
            }
            else {
                return parsed / 100
            }

        }
        return value
    }

    const correctPolling = () => {
        var temp = partyPercentages.slice()

        //do this twice to first give priority to all changed fields, then again to ensure that the result adds up to 100%
        if (autoCorrect) {
            temp = correction(temp)
        }
        else {
            temp.map(p => {
                p.startingVotePercent = p.votePercent
            })
        }

        setPartyPercentages(temp)
    }

    const defaultPolling = () => {
        setPartyPercentages([])
        updateParties(partyPercentages)
    }

    const toggleManualPolling = () => {
        defaultPolling()
        setPartyPercentageManual(!partyPercentageManual)
    }

    const handlePercentageChange = (pID, newValue) => {
        var newPP = partyPercentages.slice()
        console.log(newValue)
        newPP.map((party) => {
            if (party.pID === pID) {
                party.votePercent = newValue
            }
        })
        setPartyPercentages(newPP);
    };

    //TACTICAL VOTING

    const handleTacticalChange = (event, newValue) => {
        setTacticalVoting(newValue);
    };

    const handleMPSeatsChange = (event, newValue) => {
        setMPSeats(newValue);
    };

    //MULTIMEMBER CONSTITUENCY TYPES

    const setConstType = (constType) => {
        setConstituencyType(constType)
        if (MPSeats > getMPSeatMax(constType)) {
            setMPSeats(getMPSeatMax(constType))
        }
    }

    const getConstituencyDetails = () => {
        switch (constituencyType) {
            case eConsts.INDIVIDUAL:
                return "Individual Constituencies represent the current system"
            case eConsts.COUNTY_AND_BUROUGH:
                return "County constituencies use the county and burough groupings provided by the UK government."
            case eConsts.REGION:
                return "Region constituencies join all lesser constituencies in one region into one big constituency."
            case eConsts.COUNTRY:
                return "All constituencies within a country is joined together for three large constituencies"
            default:
                return "All constituencies are joined together, resulting in the Proportional Representation system"
        }
    }

    const isConstituencyType = (type) => {
        return type === constituencyType
    }

    //ELECTION TYPES
    const setElectionType = (electType) => {
        if (electType === eConsts.RUNOFF) {
            switch (constituencyType) {
                case eConsts.NATION:
                    setConstituencyType(eConsts.COUNTRY)
                default:
                    break;
            }
        }
        setVoteType(electType)
    }

    const getElectionDetails = () => {
        switch (voteType) {
            case eConsts.PLURALITY:
                return "Plurality gives each voter a single vote, seats are given to the candidate/party who receives the biggest vote. In a multimember constituency, these are awarded as proportionally as possible."
            case eConsts.RUNOFF:
                return "In Runoff, each voter ranks the candidates in order of preference. If no clear majority is found, then the biggest loser's voters' next choices are counted instead. "
            default:
                return "Westminister goes insane and votes in a landslide 649-0 vote that the biggest loser wins, and hides it from the public! A bit of fun data visualisation to see the weakest party in each constituency. Kinda works with small Multimember constituencies!"
        }
    }

    const isElectionType = (type) => {
        return type === voteType
    }

    const isMPMode = (type) => {
        return type === MPMode
    }

    const isTacticalVotingMode = (type) => {
        return type === tacticalVotingMode
    }

    const isPreset = (preset) => {
        return (preset.typeOfVote == voteType && preset.grouping == constituencyType && preset.tacticalVoteMode == tacticalVotingMode &&
            preset.tacticalVoteProportion == tacticalVoting && preset.MPGroupingMode == MPMode && preset.MPsPerGroup == MPSeats)
    }

    const resetSettings = () => {
        setVoteType(eConsts.DEFAULT.typeOfVote)
        setConstituencyType(eConsts.DEFAULT.grouping)
        setTacticalVotingMode(eConsts.DEFAULT.tacticalVoteMode)
        setTacticalVoting(eConsts.DEFAULT.tacticalVoteProportion)
        defaultPolling()
        setPartyPercentageManual(false)
        setMPMode(eConsts.DEFAULT.MPGroupingMode)
        setMPSeats(eConsts.DEFAULT.MPsPerGroup)
    }

    const generateResults = () => {
        setElectionParams({
            tacticalVotingMode: tacticalVotingMode,
            tacticalVoteProportion: tacticalVoting,
            MPGroupingMode: MPMode,
            MPsPerGroup: MPSeats,
            typeOfVote: voteType,
            grouping: constituencyType,
            partyPollRates: partyPercentages
        })
    }

    const setPreset = (preset) => {
        setVoteType(preset.typeOfVote)
        setConstituencyType(preset.grouping)
        setTacticalVotingMode(preset.tacticalVoteMode)
        setTacticalVoting(preset.tacticalVoteProportion)
        setMPMode(preset.MPGroupingMode)
        setMPSeats(preset.MPsPerGroup)
    }

    function tacticalValueText(value) {
        return `${Math.round(value * 100)}%`;
    }

    if (partyPercentages == []) {
        updateParties(partyPercentages)
    }

    function percentValue(value) {
        if (typeof value === 'string') {
            return value
        }
        return `${Math.round(value * 1000) / 10}`;
    }

    const getMPSeatMax = (constType) => {
        switch (constType) {
            case eConsts.NATION:
                return 632
            case eConsts.COUNTRY:
                return 158
            case eConsts.REGION:
                return 50
            case eConsts.COUNTY_AND_BUROUGH:
                return 25
            default:
                return 10;
        }
    }

    const getMPModeFlavourText = () => {
        switch (MPMode) {
            case eConsts.NO_CHANGE:
                return "For 'No Change', this slider is ignored."
            case eConsts.ALTER:
                return "This slider sets the number of MPs in each group to the same size."
            case eConsts.LIMIT:
                return "This slider sets the limit of MPs per group, and breaks a group up into smaller pieces to fit this. This does not respect geographic adjacency or proximity as a limitation of the design."
        }

    };

    const getTacticalVotingFlavourText = () => {
        switch (tacticalVotingMode) {
            case eConsts.OFF:
                return "Tactical voting is never adjusted for, and this slider is ignored."
            case eConsts.PREDICATE:
                return "Under a system which feels proportional to a voter, this proportion will have votes from the top two parties in a constituency group be reallocated."
            case eConsts.ALWAYS:
                return "The proportion chosen by the slider will always flow away from the top two parties in a constituency group."
        }

    };

    const getPresetDetails = () => {
        if (isPreset(eConsts.PRESET_FPTP)) {
            return "Plurality, or First Past the Post is the current electoral model of the United Kingdom. It is also used by America, Belarus, and Canada"
        }
        else if (isPreset(eConsts.PRESET_AV)) {
            return "The Alternative Vote was the proposed system in the 2011 Referendum. You rank the votes, and losers have the second choices counted until a clear majority is found. It is used by Australia"
        }
        else if (isPreset(eConsts.PRESET_PARTY_LIST)) {
            return "The Party-List is a standard method of proportional representation. Votes are cast for parties, and seats in the House of Commons are rewarded proportionally. It is used across Europe"
        }
        else if (isPreset(eConsts.PRESET_STV)) {
            return "The Single Transferable Vote is a form of Proportional Representation using ranked-choice voting. It's like AV, but rewards several seats, and winners have their excess votes reallocated. It is designed so every vote was responsible for electing a candidate in some form. This is the proposed model by the Plurality project"
        }
        else {
            return "The current settings have deviated from the basic presets described here."
        }
    };

    return (
        !partyPercentages == null ? <CircularProgress /> : (<div>
            <Paper className={classes.paper}>
                <Typography variant="h4">Presets 
                    <Tooltip title="These presets will automatically set the parameters of the election to set types.">
                        <IconButton>
                            <img className={classes.image} src={questionMark} alt = "questionMark" height="24"/>
                        </IconButton>
                    </Tooltip>  
                </Typography>
                <br />
                <Typography variant="body1">{getPresetDetails()}</Typography>
                <br />
                <Grid container justifyContent="center" spacing={1} columns={20}>
                    <Grid item md={6} sm={6} xs={12}>
                    <Button fullWidth  color={isPreset(eConsts.PRESET_FPTP) ? "secondary" : "primary"} size="large" variant="contained" onClick={(e) => setPreset(eConsts.PRESET_FPTP)}> Plurality </Button>
                    </Grid>
                    <Grid item md={6} sm={6} xs={12}>
                    <Button fullWidth  color={isPreset(eConsts.PRESET_AV) ? "secondary" : "primary"} size="large" variant="contained" onClick={(e) => setPreset(eConsts.PRESET_AV)}> Alternative Vote </Button>
                    </Grid>
                    <Grid item md={6} sm={6} xs={12}>
                    <Button fullWidth  color={isPreset(eConsts.PRESET_PARTY_LIST) ? "secondary" : "primary"} size="large" variant="contained" onClick={(e) => setPreset(eConsts.PRESET_PARTY_LIST)}> Party List </Button>
                    </Grid>
                    <Grid item md={6} sm={6} xs={12}>
                    <Button fullWidth variant="contained" color={isPreset(eConsts.PRESET_STV) ? "secondary" : "primary"} size="large"  onClick={(e) => setPreset(eConsts.PRESET_STV)}> Single Transferable Vote </Button>
                    </Grid>
                </Grid>
            </Paper>
            <br />
            <Paper className={classes.paper}>
                <Typography variant="h4">Polling Rate</Typography>
                <Typography variant="body1">This polling rate, while reported on the national level, will only effect constituencies where these parties chose to run.
                    It's important to note that this is polling rates <b>before any changes made to the voting system.</b> Keep this in mind when picking your rates, as otherwise this can lead to surprising results!</Typography>
                <br />
                <Grid container spacing={{ xs: 1, md: 2 }}>
                    {
                        partyPercentages.map((pPercent) => {
                            if (partyPercentageManual) {
                                switch (pPercent.pID) {
                                    case "sdlp":
                                        break;
                                    case "dup":
                                        break;
                                    case "sf":
                                        break;
                                    case "alliance":
                                        break;
                                    case "uup":
                                        var percent = 0
                                        return (
                                            <Grid item md={3} xs={6}>
                                                <Container sx={{ width: 300 }}>
                                                    <TextField name="ni" variant="filled" label="ni" fullWidth value={percentValue(pPercent.votePercent)} disabled={true} />
                                                </Container>
                                            </Grid>
                                        )
                                    default:
                                        return (
                                            <Grid item md={3} xs={6}>
                                                <Container sx={{ width: 300 }} color={`${getColour(pPercent.pID).primaryColour}`}>
                                                    <TextField name={pPercent.pID} variant="filled" label={pPercent.pID} fullWidth value={percentValue(pPercent.votePercent)} onChange={(e) => handlePercentageChange(e.target.name, e.target.value)} />
                                                </Container>
                                            </Grid>
                                        )
                                }
                            }
                            else {
                                switch (pPercent.pID) {
                                    case "sdlp":
                                    case "dup":
                                    case "sf":
                                    case "alliance":
                                    case "uup":
                                        break;
                                    default:
                                        return (
                                            <Grid item md={3} xs={6}>
                                                <PartySlider pPercent={pPercent} partyPercentages={partyPercentages} setPartyPercentages={setPartyPercentages} key={pPercent.pID} />
                                            </Grid>
                                        )
                                }
                            }

                        })}
                </Grid>
                <Grid container justifyContent="center" spacing={1}>
                    <Grid item md={3} sm={6} xs={12}>
                    <Button fullWidth color="primary" size="large" variant="contained" onClick={correctPolling}>SUBMIT POLLS</Button>
                    </Grid>
                    <Grid item md={3} sm={6} xs={12}>
                    <Button fullWidth color="primary" size="large" variant="contained" onClick={defaultPolling}> DEFAULT </Button>
                    </Grid>
                    <Grid item md={3} sm={6} xs={12}>
                    <Button fullWidth  color={autoCorrect ? "primary" : "secondary"} size="large" variant="contained" onClick={(e) => setAutoCorrect(!autoCorrect)}> {autoCorrect ? `Don't Correct` : `Correct`} </Button>
                    </Grid>
                    <Grid item md={3} sm={6} xs={12}>
                    <Button fullWidth color={partyPercentageManual ? "secondary" : "primary"} size="large" variant="contained" onClick={toggleManualPolling}> {partyPercentageManual ? `Sliders` : `Manual`} </Button>
                    </Grid>
                </Grid>
            </Paper>
            <br />
            <Paper className={classes.paper}>
                <Typography variant="h4">Grouping Type 
                
                    <Tooltip title="A grouping type is how constituencies are joined together in order to create Multimember constituencies (or do nothing).">
                        <IconButton>
                            <img className={classes.image} src={questionMark} alt = "questionMark" height="24"/>
                        </IconButton>
                    </Tooltip>  
                </Typography>
                <br />
                <Typography variant="body1">{getConstituencyDetails()}</Typography>
                <Grid container justifyContent="center" spacing={1} columns={20}>
                    <Grid item md={4} sm={4} xs={6}>
                    <Button fullWidth  color={isConstituencyType(eConsts.INDIVIDUAL) ? "secondary" : "primary"} size="large" variant="contained" onClick={(e) => setConstType(eConsts.INDIVIDUAL)}> Individual </Button>
                    </Grid>
                    <Grid item md={4} sm={4} xs={6}>
                    <Button fullWidth  color={isConstituencyType(eConsts.COUNTY_AND_BUROUGH) ? "secondary" : "primary"} size="large" variant="contained" onClick={(e) => setConstType(eConsts.COUNTY_AND_BUROUGH)}> Counties </Button>
                    </Grid>
                    <Grid item md={4} sm={4} xs={6}>
                    <Button fullWidth  color={isConstituencyType(eConsts.REGION) ? "secondary" : "primary"} size="large" variant="contained" onClick={(e) => setConstType(eConsts.REGION)}> Regions </Button>
                    </Grid>
                    <Grid item md={6} sm={6} xs={6}>
                    <Button fullWidth variant="contained" color={isConstituencyType(eConsts.COUNTRY) ? "secondary" : "primary"} size="large"  onClick={(e) => setConstType(eConsts.COUNTRY)}> Countries </Button>
                    </Grid>
                    <Grid item md={6} sm={6} xs={12}>
                    <Button fullWidth  color={isConstituencyType(eConsts.NATION) ? "secondary" : "primary"} size="large" variant="contained" disabled={isElectionType(eConsts.RUNOFF)} onClick={(e) => setConstType(eConsts.NATION)}> Nationwide </Button>
                    </Grid>
                </Grid>
            </Paper>
            <br />
            <Paper className={classes.paper}>
                <Typography variant="h4">Voting Type <Tooltip title="This determines how a citizen can cast their vote and how it is counted.">
                        <IconButton>
                            <img className={classes.image} src={questionMark} alt = "questionMark" height="24"/>
                        </IconButton>
                    </Tooltip>  
                    </Typography> 
                <br />
                <Typography variant="body1">{getElectionDetails()}</Typography>
                <Grid container justifyContent="center" spacing={1} columns={20}>
                    <Grid item md={4} sm={6} xs={6}>
                    <Button fullWidth variant="contained" color={isElectionType(eConsts.PLURALITY) ? "secondary" : "primary"} size="large" onClick={(e) => setElectionType(eConsts.PLURALITY)}> Plurality </Button>
                    </Grid>
                    <Grid item md={4} sm={6} xs={6}>
                    <Button fullWidth variant="contained" color={isElectionType(eConsts.RUNOFF) ? "secondary" : "primary"} size="large" onClick={(e) => setElectionType(eConsts.RUNOFF)}> Runoff </Button>
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                    <Button fullWidth variant="contained" color={isElectionType(eConsts.LOSER_TAKES_ALL) ? "secondary" : "primary"} size="large" onClick={(e) => setElectionType(eConsts.LOSER_TAKES_ALL)}> LOSER TAKES ALL </Button>
                    </Grid>
                </Grid>
            </Paper>
            <br />
            <Paper className={classes.paper}>
                <Typography variant="h4">Settings</Typography>
                
                <Grid container spacing={5}>
                    <Grid item md={6} xs={12}>
                        <Typography variant="h6">MP Mode and Number <Tooltip title="An MP mode is how constituency groups decide on how many MPs it should be represented by.">
                        <IconButton>
                            <img className={classes.image} src={questionMark} alt = "questionMark" height="24"/>
                        </IconButton>
                    </Tooltip>  </Typography>
                        <br />
                        <br />
                        <Slider
                            defaultValue={eConsts.DEFAULT.MPsPerGroup}
                            value={MPSeats}
                            aria-label="Always visible"
                            disabled={isMPMode(eConsts.NO_CHANGE)}
                            valueLabelDisplay="on"
                            valueLabelFormat={MPSeats}
                            onChange={handleMPSeatsChange}
                            min={1}
                            step={1}
                            max={getMPSeatMax(constituencyType)}
                        />
                        <ButtonGroup fullWidth variant="contained" aria-label="outlined primary button group">
                            <Button color={isMPMode(eConsts.NO_CHANGE) ? "secondary" : "primary"} size="large" onClick={(e) => setMPMode(eConsts.NO_CHANGE)}> Off </Button>
                            <Button color={isMPMode(eConsts.ALTER) ? "secondary" : "primary"} size="large" onClick={(e) => setMPMode(eConsts.ALTER)}> Alter </Button>
                            <Button color={isMPMode(eConsts.LIMIT) ? "secondary" : "primary"} size="large" onClick={(e) => setMPMode(eConsts.LIMIT)}> Limit </Button>
                        </ButtonGroup>
                        <br />
                        <br />
                        <Typography variant="body1">{getMPModeFlavourText()} </Typography>

                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Typography variant="h6">Tactical Voting Percent <Tooltip title="Tactical voting is the proportion of people who vote for one of the two biggest parties in a constituency to keep the other out.">
                        <IconButton>
                            <img className={classes.image} src={questionMark} alt = "questionMark" height="24"/>
                        </IconButton>
                    </Tooltip>  </Typography>
                        <br />
                        <br />
                        <Slider
                            value={tacticalVoting}
                            onChange={handleTacticalChange}
                            aria-label="Always visible"
                            disabled={isTacticalVotingMode(eConsts.OFF)}
                            getAriaValueText={tacticalValueText}
                            valueLabelFormat={tacticalValueText}
                            valueLabelDisplay="on"
                            min={0}
                            step={0.001}
                            max={1}
                        />
                        <ButtonGroup fullWidth variant="contained" aria-label="outlined primary button group">
                            <Button color={isTacticalVotingMode(eConsts.OFF) ? "secondary" : "primary"} size="large" onClick={(e) => setTacticalVotingMode(eConsts.OFF)}> Off </Button>
                            <Button color={isTacticalVotingMode(eConsts.PREDICATE) ? "secondary" : "primary"} size="large" onClick={(e) => setTacticalVotingMode(eConsts.PREDICATE)}> Conditional </Button>
                            <Button color={isTacticalVotingMode(eConsts.ALWAYS) ? "secondary" : "primary"} size="large" onClick={(e) => setTacticalVotingMode(eConsts.ALWAYS)}> Always </Button>
                        </ButtonGroup>
                        <br />
                        <br />
                        <Typography variant="body1">{getTacticalVotingFlavourText()}</Typography>
                    </Grid>
                    
                </Grid>
            </Paper>
            <br />
            <ButtonGroup fullWidth variant="contained" aria-label="outlined primary button group">
                <Button color="secondary" size="large" onClick={generateResults} > GENERATE </Button>
                <Button color="primary" size="large" onClick={resetSettings} > RESET </Button>
            </ButtonGroup>
        </div>
        )
    );
}


export default ElectoralForm