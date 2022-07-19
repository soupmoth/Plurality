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


    const [seats, setSeatData] = useState(eConsts.STARTING_VOTES)
    const [electionData, setElectionData] = useState(null)
    const [electionParams, setElectionParams] = useState(eConsts.DEFAULT) 

    //runs every time Election Params are updated or on first load
    useEffect(() => {
        setSeatData(eConsts.STARTING_VOTES)
        setElectionData(null)
      }, [electionParams]);

    console.log(electionParams)

    return (
        !constituencies.length || !parties.length ? <CircularProgress /> : (
            <div>

                <ElectoralForm electionParams={electionParams} setElectionParams={setElectionParams} setSeatData={setSeatData} />
                <br />

                <Grid container spacing={2}>
                    <Grid item xs={5}><ElectoralSeats seats={seats} parties={parties} /></Grid>
                    <Grid item xs={7}>
                        <Paper className={classes.paper}>
                            <ElectoralMap electionParams={electionParams} seats={seats} setSeatData={setSeatData} electionData={electionData} setElectionData={setElectionData} />
                        </Paper>
                    </Grid>
                </Grid>



            </div>
        )
    );
}


export default SimulationPage