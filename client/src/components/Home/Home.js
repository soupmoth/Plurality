import React, { useEffect, useState } from "react";

import {Grid, Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';

import useStyles from './styles.js';

import * as eConsts from '../../const/electionConsts.js'

import Banner from '../../images/Banner.png'


const Home = () => {
    const classes = useStyles();

    return (
        <Card className={classes.card}> 
            <CardMedia className={classes.mediaMain} image={Banner} title = {"Scrotum"} />
            <CardContent>
                <Typography className={classes.title} size="large" variant="h4">Simulate a British election with different voting systems!</Typography>
            </CardContent>
        </Card>
    );
}


export default Home