import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {Grid, Card, CardActionArea, CardContent, CardMedia, Paper, Typography} from '@material-ui/core';

import useStyles from './styles.js';

import * as eConsts from '../../const/electionConsts.js'

import Banner from '../../images/Banner.png'
import VS from '../../images/VotingSystems.png'
import GVS from '../../images/GoodVotingSystem.png'
import SW from '../../images/SpoilerWall.png'
import { generateArticlePreview, getArticleData } from "../../const/Articles.js";


const Home = () => {
    const classes = useStyles();

    console.log("hi")

    const articlePreviews = []

    for (let i = 1; i <= 3; i++) {
        articlePreviews.push(generateArticlePreview(getArticleData(i), classes, i))
        
    }

    return (
        <div>
            
            <Card className={classes.card}>
                <CardActionArea component={Link} to={"/simulation"} >
                    <CardMedia className={classes.mediaMain} image={Banner} title={"Simulate!"} />
                    <CardContent backgroundColor="red" >
                        <Typography align="center" variant="h5">Simulate a British election with different voting systems!</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <br/>
            <Paper className={classes.paper}>
            <Typography variant="h4">
                What is this?
            </Typography>
            <br/>
            <Typography variant="body1">
                Plurality is a project dedicated to demonstrating the potential of Electoral Reform in the United Kingdom.
                We believe strongly in the Single Transferrable Vote and reforming the system to fit that desire. 
                When originally developing this project, it started as a curiousity, "what would previous elections 
                and these polls look like under alternative systems?" From our findings, STV is nearly just as proportional as Party-List Proportional Representation, and yet allows us to fully express our political preferences  
                at the ballot box, and maintain the individual MPs and the locality of First Past the Post. But we wouldn't mind either, as both would make 
                votes matter.
                <br/>
                <br/>
                Please take a look at the simulation that has been built, and play around with the many settings and make your own ideal 
                set of parameters for a new Electoral System! Or read the articles that have been written to appease my unhealthy obsession 
                with electoral systems over the past summer.
            </Typography>
        </Paper>
            <br/>
            <Grid container spacing={3}>
                {articlePreviews}
            </Grid>
        </div>
    );
}


export default Home