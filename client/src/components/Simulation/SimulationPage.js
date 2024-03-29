import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Grid, LinearProgress} from '@material-ui/core'

import { Paper } from "@material-ui/core";

import useStyles from './styles.js';

import ElectoralMap from "./ElectoralMap/ElectoralMap.js"
import ElectoralSeats from "./ElectoralSeats/ElectoralSeats.js";
import ElectoralForm from "./ElectoralForm/ElectoralForm.js"
import ElectoralBreakdown from "./ElectoralBreakdown/ElectoralBreakdown.js"

import * as eConsts from '../../const/electionConsts.js'


const SimulationPage = () => {
    const classes = useStyles();

    const constituencies = useSelector((state) => state.constituencies)
    const parties = useSelector((state) => state.parties)


    const [seats, setSeatData] = useState(eConsts.STARTING_VOTES)
    const [electionData, setElectionData] = useState(null)
    const [electionParams, setElectionParams] = useState(eConsts.DEFAULT) 
    const [breakdownConstituency, setBreakdownConstituency] = useState([])

    //runs every time Election Params are updated or on first load
    useEffect(() => {
        setSeatData(eConsts.STARTING_VOTES)
        setElectionData(null)
      }, [electionParams]);

    console.log(electionParams)

    return (
        !constituencies.length || !parties.length ? <Paper className={classes.paper}>
            <LinearProgress color="success" />
        </Paper> : (
            <div>

                <ElectoralForm electionParams={electionParams} setElectionParams={setElectionParams} setSeatData={setSeatData} />
                <br />
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item md={5} xs = {12}>
                            <ElectoralSeats seats={seats} parties={parties} />
                        </Grid>
                        <Grid item md={7} xs = {12}>
                            <ElectoralMap electionParams={electionParams} seats={seats} setSeatData={setSeatData} electionData={electionData} setElectionData={setElectionData} setBreakdownConstituency={setBreakdownConstituency} />
                        </Grid>
                    </Grid>

                    

                </Paper>

                <br />
                <br />

                <ElectoralBreakdown breakdownConstituency={breakdownConstituency} electionData={electionData} electionParams={electionParams} parties={parties}></ElectoralBreakdown>

                <br />
                <br />

            </div>
        )
    );
}


export default SimulationPage