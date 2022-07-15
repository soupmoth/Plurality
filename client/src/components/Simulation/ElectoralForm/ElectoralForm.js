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

    useEffect(() => {
        updateParties()
    }, [parties])

    const updateParties = () => {
        let partyPercent = []
        if (parties !== null) {
            for (let i = 0; i < parties.length; i++) {
                console.log(((parties)))
                partyPercent.push({pID: parties[i].partyID, pName: parties[i].name, votePercent: parseFloat((parties[i].nVotePercent).replace('%',''))/100})
            }
        }
        setPartyPercentages(partyPercent)
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

    const resetSettings = () => {
        setElectionParams(eConsts.DEFAULT)
    }

    const generateResults = () => {
        setElectionParams({
            tacticalVoteProportion: tacticalVoting,
            noOfMPsPerConst: 1,
            typeOfVote: voteType,
            grouping: constituencyType,
        })
        setSeatData(eConsts.STARTING_SEATS)
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
                <Typography variant="h6">This polling rate, while reported on the national level, will only effect constituencies where these parties chose to ran. For this reason, these values can never be at 0%, after all, a candidate will vote for themselves!</Typography>
                <br/>
                <Typography variant="h6">The smallest possible value is 0.01%</Typography>
                <Grid container spacing={{ xs: 1, md:  2}}>
                    {partyPercentages.map((pPercent) => (
                        <Grid item xs={4}>
                            <PartySlider pPercent={pPercent} partyPercentages={partyPercentages} setPartyPercentages={setPartyPercentages} key={pPercent.pID}/> 
                        </Grid>
                ))}
                </Grid>
            </Paper>
            <Paper className={classes.paper}>
                <Typography variant="h6">Constituency Type</Typography>
                <Button variant="contained" color = "primary" size ="large" onClick={setIndividual}> Individual </Button>
                <Button variant="contained" color = "secondary" size ="large" onClick={setCounty}> Counties and Buroughs </Button>
                <Button variant="contained" color = "primary" size ="large" onClick={setRegion}> Regions </Button>
                <Button variant="contained" color = "secondary" size ="large" onClick={setCountry}> Countries </Button>
                <Button variant="contained" color = "primary" size ="large" onClick={setNationwide}> Nationwide </Button>
            </Paper>
            <Paper className={classes.paper}>
                <Typography variant="h6">Voting Type</Typography>
                <Button variant="contained" color = "primary" size ="large" onClick={setPlurality}> Plurality </Button>
                <Button variant="contained" color = "secondary" size ="large" onClick={setRunOff}> Runoff </Button>
                <Button variant="contained" color = "primary" size ="large" onClick={setLoserTakesAll}> LOSER TAKES ALL </Button>

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