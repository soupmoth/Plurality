import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Grid, CircularProgress, LinearProgress} from '@material-ui/core'

import { TextField, Button, Typography, Paper, styled } from "@material-ui/core";

import useStyles from './styles.js';

import * as eConsts from '../../const/electionConsts.js'


const Home = () => {
    const classes = useStyles();

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
            <Typography variant="h1">among us</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h6">among us</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h6">among us</Typography>
            </Grid>
        </Grid>
    );
}


export default Home