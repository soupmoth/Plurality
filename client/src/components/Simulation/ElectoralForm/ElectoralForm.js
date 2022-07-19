import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

import { CircularProgress, Button, Typography, Paper, Slider, Grid } from "@material-ui/core";

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

    useEffect(() => {
        updateParties()
    }, [parties])

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
                    niPercent += party.startingVotePercent
                    break;
                default:
                    totalWeighting += party.votePercent
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
                    party.votePercent = party.startingVotePercent
                    break;
                default:
                        party.votePercent = proportionOfWeight*(party.votePercent/totalWeighting)
                        party.startingVotePercent = proportionOfWeight*(party.votePercent/totalWeighting)
            }
        });

        return pPercentages
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
        setPartyPercentageManual(!partyPercentageManual)
    }

    //TACTICAL VOTING

    const handleTacticalChange = (event, newValue) => {
        setTacticalVoting(newValue);
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

    const resetSettings = () => {
        setElectionParams(eConsts.DEFAULT)
    }


    const generateResults = () => {
        setElectionParams({
            tacticalVoteProportion: tacticalVoting,
            noOfMPsPerConst: 1,
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

    console.log(partyPercentages);
    
    return (
        !partyPercentages === null ? <CircularProgress/>: (<div>
            <Paper className={classes.paper}>
                <Typography variant="h3">Polling Rate</Typography>
                <Typography variant="body1">This polling rate, while reported on the national level, will only effect constituencies where these parties chose to ran. For this reason, these values can never be at 0%, after all, a candidate will vote for themselves!
                It's important to note that this is polling rates <b>before any changes made to the voting system.</b> Keep this in mind when picking your rates, as otherwise this can lead to surprising results! How the citizens voted overall is revealed after a
                generated election below the Electoral Map.</Typography>
                <br/>
                <Typography variant="h6">The smallest possible value is 0.1%</Typography>
                <Grid container spacing={{ xs: 1, md:  2}}>
                    {partyPercentages.map((pPercent) => (
                        <Grid item xs={4}>
                            <PartySlider pPercent={pPercent} partyPercentages={partyPercentages} setPartyPercentages={setPartyPercentages} key={pPercent.pID}/> 
                        </Grid>
                ))}
                </Grid>
                <Button variant="contained" color = "primary" size ="large" onClick={correctPolling}> SUBMIT POLLS </Button>
                <Button variant="contained" color = "primary" size ="large" onClick={defaultPolling}> RETURN TO DEFAULT </Button>
                <Button variant="contained" color = "primary" size ="large" onClick={toggleManualPolling}> {partyPercentageManual ? `Sliders` : `Manual`} </Button>
            </Paper>
            <Paper className={classes.paper}>
                <Typography variant="h6">Constituency Type</Typography>
                <Typography variant="body1">A constituency type is how constituencies are joined together in order to create Multimember constituencies.</Typography>
                <br></br>
                <Typography variant="body1">{getConstituencyDetails()}</Typography>
                <Button variant="contained" color = {isConstituencyType(eConsts.INDIVIDUAL) ? "secondary" : "primary"} size ="large" onClick={setIndividual}> Individual </Button>
                <Button variant="contained" color = {isConstituencyType(eConsts.COUNTY_AND_BUROUGH) ? "secondary" : "primary"} size ="large" onClick={setCounty}> Counties and Buroughs </Button>
                <Button variant="contained" color = {isConstituencyType(eConsts.REGION) ? "secondary" : "primary"}size ="large" onClick={setRegion}> Regions </Button>
                <Button variant="contained" color = {isConstituencyType(eConsts.COUNTRY) ? "secondary" : "primary"} size ="large" onClick={setCountry}> Countries </Button>
                <Button variant="contained" color = {isConstituencyType(eConsts.NATION) ? "secondary" : "primary"} size ="large" onClick={setNationwide}> Nationwide </Button>
            </Paper>
            <Paper className={classes.paper}>
                <Typography variant="h6">Voting Type</Typography>
                <Typography variant="body1">This determines how a citizen may choose to cast their vote.</Typography>
                <br></br>
                <Typography variant="body1">{getElectionDetails()}</Typography>
                <Button variant="contained" color = {isElectionType(eConsts.PLURALITY) ? "secondary" : "primary"} size ="large" onClick={setPlurality}> Plurality </Button>
                <Button variant="contained" color = {isElectionType(eConsts.RUNOFF) ? "secondary" : "primary"} size ="large" onClick={setRunOff}> Runoff </Button>
                <Button variant="contained" color = {isElectionType(eConsts.LOSER_TAKES_ALL) ? "secondary" : "primary"} size ="large" onClick={setLoserTakesAll}> LOSER TAKES ALL </Button>

            </Paper>
            <Paper className={classes.paper}>
                <Typography variant="h6">Settings</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={1}/>
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
                    <Grid item xs={2}/>
                    <Grid item xs={4}>
                        <Typography variant="h6">we dont do that around here</Typography>
                        <br/>
                        <br/>
                        <Slider 
                            defaultValue={0.5} 
                            min={0}
                            step={0.01}
                            max={1}
                            />
                    </Grid>
                    <Grid item xs={1}/>
                </Grid>
            </Paper>
            <Button variant="contained" color = "primary" size ="large" onClick={generateResults} fullWidth> GENERATE </Button>
        </div>
        )
    );
}


export default ElectoralForm