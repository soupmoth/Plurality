import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { TextField, Button, Typography, Paper } from "@material-ui/core";

import useStyles from './styles.js';

import * as eConsts from '../../../const/electionConsts.js'


const ElectoralForm = ({electionParams, setElectionParams, setSeatData}) => {
    //the find here searches for a post with the same id as the current focused id, returning
    //null if nothing is found.
    const classes = useStyles();
    
    const [voteType, setVoteType] = useState(eConsts.DEFAULT.typeOfVote) 
    

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
            tacticalVoteProportion: 0.25,
            noOfMPsPerConst: 1,
            typeOfVote: voteType,
            grouping: eConsts.INDIVIDUAL,
        })
        setSeatData(eConsts.STARTING_SEATS)
    }

    return (
        <div>
            <Paper className={classes.paper}>
                <Typography variant="h6">Voting Type</Typography>
                <Button variant="contained" color = "primary" size ="large" onClick={setPlurality}> Plurality </Button>
                <Button variant="contained" color = "secondary" size ="large" onClick={setRunOff}> Runoff </Button>
                <Button variant="contained" color = "primary" size ="large" onClick={setLoserTakesAll}> LOSER TAKES ALL </Button>

            </Paper>
            <Button variant="contained" color = "primary" size ="large" onClick={generateResults} fullWidth> GENERATE </Button>
        </div>
    );
}


export default ElectoralForm