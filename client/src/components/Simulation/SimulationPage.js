import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Grid, CircularProgress} from '@material-ui/core'

import { TextField, Button, Typography, Paper, styled } from "@material-ui/core";

import useStyles from './styles.js';

import ElectoralMap from "./ElectoralMap/ElectoralMap.js"
import ElectoralSeats from "./ElectoralSeats/ElectoralSeats.js";
import ElectoralForm from "./ElectoralForm/ElectoralForm.js"

import * as eConsts from '../../const/electionConsts.js'


const SimulationPage = () => {
    const classes = useStyles();

    const constituencies = useSelector((state) => state.constituencies)
    const parties = useSelector((state) => state.parties)


    const [seats, setSeatData] = useState(eConsts.STARTING_SEATS)
    const [electionData, setElectionData] = useState(null)
    const [electionParams, setElectionParams] = useState(eConsts.DEFAULT) 

    //runs every time Election Params are updated or on first load
    useEffect(() => {
        setElectionData(null)
      }, [electionParams]);

    console.log(electionParams)

    return (
        !constituencies.length || !parties.length ? <CircularProgress/>: (
            <div>
                <div><ElectoralSeats seats={seats} parties={parties} /></div>
                <br />
                <ElectoralForm electionParams={electionParams} setElectionParams={setElectionParams} setSeatData={setSeatData}/>
                <br />
                <div><Paper className={classes.paper}><ElectoralMap electionParams={electionParams} seats={seats} setSeatData={setSeatData} electionData={electionData} setElectionData={setElectionData}/></Paper></div>
            </div>
        )
    );
}


export default SimulationPage