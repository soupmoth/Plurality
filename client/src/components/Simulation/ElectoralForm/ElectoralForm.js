import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

import { CircularProgress, Button, Typography, Paper, Slider, Grid, ButtonGroup, TextField, Container } from "@material-ui/core";

import useStyles from './styles.js';

import PartySlider from "./PartySlider/PartySlider.js";

import * as eConsts from '../../../const/electionConsts.js'


const ElectoralForm = ({electionParams, setElectionParams, setSeatData}) => {
    //the find here searches for a post with the same id as the current focused id, returning
    //null if nothing is found.
    const classes = useStyles();
    const parties = useSelector((state) => state.parties)
    
    const [voteType, setVoteType] = useState(eConsts.DEFAULT.typeOfVote) 
    const [constituencyType, setConstituencyType] = useState(eConsts.DEFAULT.grouping) 
    const [tacticalVoting, setTacticalVoting] = useState(eConsts.DEFAULT.tacticalVoteProportion) 
    const [partyPercentages, setPartyPercentages] = useState([])
    const [partyPercentageManual, setPartyPercentageManual] = useState(false)
    const [MPMode, setMPMode] = useState(eConsts.DEFAULT.MPGroupingMode)
    const [MPSeats, setMPSeats] = useState(eConsts.DEFAULT.MPsPerGroup)

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
                let percent = parseFloat((parties[i].nVotePercent).replace('%',''))/100
                partyPercent.push({pID: parties[i].partyID, pName: parties[i].name, votePercent: percent, startingVotePercent: percent})
            }
        }
        console.log(partyPercent)
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
        var proportionOfWeight = 1-niPercent

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
                    party.votePercent = proportionOfWeight*(parsePercentage(party.votePercent)/totalWeighting)
                    party.startingVotePercent = proportionOfWeight*(parsePercentage(party.votePercent)/totalWeighting)
            }
        });

        return pPercentages
    }

    const parsePercentage = (value) => {
        if (typeof value === 'string') {
            var parsed = parseFloat(value)
            console.log(parsed)
            if (Number.isNaN(parsed)) {
                parsed = 0.1
            }
            if (!partyPercentageManual) {
                return parsed
            }
            else {
                return parsed/100
            }

        }
        return value
    }

    const correctPolling = () => {
        var temp = partyPercentages.slice()

        console.log(temp)

        //do this twice to first give priority to all changed fields, then again to ensure that the result adds up to 100%
        temp = correction(temp)
        

        console.log(temp)
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

    const setIndividual = () => {
        setConstituencyType(eConsts.INDIVIDUAL)
    }
    const setCounty = () => {
        setConstituencyType(eConsts.COUNTY_AND_BUROUGH)
    }
    const setRegion = () => {
        setConstituencyType(eConsts.REGION)
    }
    const setCountry = () => {
        setConstituencyType(eConsts.COUNTRY)
    }
    const setNationwide = () => {
        setConstituencyType(eConsts.NATION)
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
        return type == constituencyType
    }

    //ELECTION TYPES
    const setPlurality = () => {
        setVoteType(eConsts.PLURALITY)
    }

    const setRunOff = () => {
        switch (constituencyType) {
            case eConsts.COUNTRY:
            case eConsts.NATION:
                setConstituencyType(eConsts.REGION)
            default: 
                break;
        }
        setVoteType(eConsts.RUNOFF)
    }

    const setLoserTakesAll = () => {
        setVoteType(eConsts.LOSER_TAKES_ALL)
    }

    const getElectionDetails = () => {
        switch (voteType) {
            case eConsts.PLURALITY:
                return "Plurality gives each voter a single vote, seats are given to the candidate/party who receives the biggest vote. In a multimember constituency, these are awarded as proportionally as possible."
            case eConsts.RUNOFF:
                return "In Runoff, each voter ranks the candidates in order of preference. If their preferred candidate loses, their vote is counted for their next choice. In a multimember constituency, if a candidate wins, their wasted votes" +
                " are allocated to the next choices of every voter based on the excess of votes. A candidate wins if they have a majority in a single member constituency (called AV), or if they reach a threshold in a multi member constituency (called STV), or if they're" +
                " the last man standing with one seat remaining."
            default:
                return "Westminister goes insane and votes in a landslide 650-0 vote that the biggest loser wins, and hides it from the public! A bit of fun data visualisation to see the weakest party in each constituency. Works with Multimember constituencies!"
        }
    }

    const isElectionType = (type) => {
        return type == voteType
    }

    const isMPMode = (type) => {
        return type == MPMode
    }

    const resetSettings = () => {
        setElectionParams(eConsts.DEFAULT)
    }

    const generateResults = () => {
        setElectionParams({
            tacticalVoteProportion: tacticalVoting,
            MPGroupingMode: MPMode,
            MPsPerGroup: MPSeats,
            typeOfVote: voteType,
            grouping: constituencyType,
            partyPollRates: partyPercentages
        })
    }

    function tacticalValueText(value) {
        return `${Math.round(value*100)}%`;
    }

    console.log(partyPercentages);
    if (partyPercentages == []) {
        updateParties(partyPercentages)
    } 

    function percentValue(value) {
        if (typeof value === 'string') {
            return value
        }
        return `${Math.round(value*1000)/10}`;
    }
    
    return (
        !partyPercentages === null ? <CircularProgress /> : (<div>
            <Paper className={classes.paper}>
                <Typography variant="h4">Polling Rate</Typography>
                <Typography variant="body1">This polling rate, while reported on the national level, will only effect constituencies where these parties chose to run.
                    It's important to note that this is polling rates <b>before any changes made to the voting system.</b> Keep this in mind when picking your rates, as otherwise this can lead to surprising results! How the citizens voted overall is revealed after a
                    generated election below the Electoral Map.</Typography>
                <br/>
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
                                    partyPercentages.map((pPerc) => {
                                        switch (pPercent.pID) {
                                            case "sdlp":
                                            case "dup":
                                            case "sf":
                                            case "alliance":
                                            case "uup":
                                                percent += pPerc.votePercent
                                                break;
                                            default:
                                        }

                                    })
                                    return (
                                        <Grid item xs={3}>
                                            <Container sx={{ width: 300 }}>
                                                <TextField name="ni" variant="filled"  label="ni" fullWidth value = {percentValue(pPercent.votePercent)} disabled={true} />
                                            </Container>
                                        </Grid>
                                        )
                                default:
                                    return (
                                        <Grid item xs={3}>
                                            <Container sx={{ width: 300 }} color={`${getColour(pPercent.pID).primaryColour}`}>
                                                <TextField name={pPercent.pID} variant="filled"  label={pPercent.pID} fullWidth value = {percentValue(pPercent.votePercent)} onChange= {(e) => handlePercentageChange(e.target.name, e.target.value)} />
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
                                        <Grid item xs={3}>
                                            <PartySlider pPercent={pPercent} partyPercentages={partyPercentages} setPartyPercentages={setPartyPercentages} key={pPercent.pID} />
                                        </Grid>
                                        )
                            }
                        }
                        
                    })}
                </Grid>
                <ButtonGroup fullWidth variant="contained" aria-label="outlined primary button group">
                    <Button color="primary" size="large" onClick={correctPolling}> SUBMIT POLLS </Button>
                    <Button color="primary" size="large" onClick={defaultPolling}> RETURN TO DEFAULT </Button>
                    <Button color="primary" size="large" onClick={toggleManualPolling}> {partyPercentageManual ? `Sliders` : `Manual`} </Button>
                </ButtonGroup>
            </Paper>
            <Paper className={classes.paper}>
                <Typography variant="h4">Constituency Type</Typography>
                <Typography variant="body1">A constituency type is how constituencies are joined together in order to create Multimember constituencies.</Typography>
                <br/>
                <Typography variant="body1">{getConstituencyDetails()}</Typography>
                <ButtonGroup fullWidth variant="contained" aria-label="outlined primary button group">
                    <Button color={isConstituencyType(eConsts.INDIVIDUAL) ? "secondary" : "primary"} size="large" onClick={setIndividual}> Individual </Button>
                    <Button color={isConstituencyType(eConsts.COUNTY_AND_BUROUGH) ? "secondary" : "primary"} size="large" onClick={setCounty}> Counties/Buroughs </Button>
                    <Button color={isConstituencyType(eConsts.REGION) ? "secondary" : "primary"} size="large" onClick={setRegion}> Regions </Button>
                    <Button color={isConstituencyType(eConsts.COUNTRY) ? "secondary" : "primary"} size="large" disabled={isElectionType(eConsts.RUNOFF)} onClick={setCountry}> Countries </Button>
                    <Button color={isConstituencyType(eConsts.NATION) ? "secondary" : "primary"} size="large" disabled={isElectionType(eConsts.RUNOFF)} onClick={setNationwide}> Nationwide </Button>
                </ButtonGroup>
            </Paper>
            <Paper className={classes.paper}>
                <Typography variant="h4">Voting Type</Typography>
                <Typography variant="body1">This determines how a citizen may choose to cast their vote.</Typography>
                <br/>
                <Typography variant="body1">{getElectionDetails()}</Typography>
                <ButtonGroup fullWidth variant="contained" aria-label="outlined primary button group">
                    <Button color={isElectionType(eConsts.PLURALITY) ? "secondary" : "primary"} size="large" onClick={setPlurality}> Plurality </Button>
                    <Button color={isElectionType(eConsts.RUNOFF) ? "secondary" : "primary"} size="large" onClick={setRunOff}> Runoff </Button>
                    <Button color={isElectionType(eConsts.LOSER_TAKES_ALL) ? "secondary" : "primary"} size="large" onClick={setLoserTakesAll}> LOSER TAKES ALL </Button>
                </ButtonGroup>
            </Paper>
            <Paper className={classes.paper}>
                <Typography variant="h6">Settings</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={1} />
                    <Grid item xs={4}>
                        <Typography variant="h6">Tactical Voting Percent</Typography>
                        <br/>
                        <br/>
                        <Slider
                            value={tacticalVoting}
                            onChange={handleTacticalChange}
                            aria-label="Always visible"
                            getAriaValueText={tacticalValueText}
                            valueLabelFormat={tacticalValueText}
                            valueLabelDisplay="on"
                            min={0}
                            step={0.001}
                            max={1}
                        />
                        <Typography variant="body1">Tactical voting is the proportion of people who vote for one of the two biggest parties in a constituency to keep the other out. Under a proportional system, these votes will be reallocated.</Typography>
                    </Grid>
                    <Grid item xs={2} />
                    <Grid item xs={4}>
                        <Typography variant="h6">MP Mode and Number</Typography>
                        <br/>
                        <ButtonGroup fullWidth variant="contained" aria-label="outlined primary button group">
                            <Button color={isMPMode(eConsts.NO_CHANGE) ? "secondary" : "primary"} size="large" onClick={(e) => setMPMode(eConsts.NO_CHANGE)}> Off </Button>
                            <Button color={isMPMode(eConsts.ALTER) ? "secondary" : "primary"} size="large" onClick={(e) => setMPMode(eConsts.ALTER)}> Alter </Button>
                            <Button color={isMPMode(eConsts.LIMIT) ? "secondary" : "primary"} size="large" onClick={(e) => setMPMode(eConsts.LIMIT)}> Limit </Button>
                        </ButtonGroup>
                        <br/>
                        <br/>
                        <br/>
                        
                        <Slider
                            defaultValue={eConsts.DEFAULT.MPsPerGroup}
                            value={MPSeats}
                            valueLabelDisplay="on"
                            valueLabelFormat={MPSeats}
                            onChange={handleMPSeatsChange}
                            min={1}
                            step={1}
                            max={10}
                        />
                    </Grid>
                    <Grid item xs={1} />
                </Grid>
            </Paper>
            <Button variant="contained" color="primary" size="large" onClick={generateResults} fullWidth> GENERATE </Button>
        </div>
        )
    );
}


export default ElectoralForm