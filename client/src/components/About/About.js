import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {Grid, Card, CardActionArea, CardContent, CardMedia, Button, Typography, Paper} from '@material-ui/core';

import useStyles from './styles.js';

import * as eConsts from '../../const/electionConsts.js'

import Banner from '../../images/Banner.png'
import VS from '../../images/VotingSystems.png'
import GVS from '../../images/GoodVotingSystem.png'
import SW from '../../images/SpoilerWall.png'
import { generateArticlePreview, getArticleCount, getArticleData, METHODOLOGY, PROPOSALS } from "../../const/Articles.js";


const About = () => {
    const classes = useStyles();

    console.log("hi")



    return (
        <div>
        <Paper className={classes.paper}>
            <Typography variant="h4">
                About Plurality
            </Typography>
            <br/>
            <Typography variant="body1">
                Plurality originally started as a curiosity driven project. I originally wondered about what different elections 
                would look like under alternative electoral systems, then started about how I could actually visualise the effects
                of these systems and play around with the map like other sites which let you input polls to predict election results. 
                Then this naturally led me to thinking about what those polls would look like under alternative systems too!
                <br/>
                <br/>
                As you can see, it was originally just a fun project to satisfy the curiosity of a bored student over the summer. 
                But the project grew with ambition, and I wanted an excuse to talk about the research I did, the findings I made, and the
                opinions I have. I had a very weird obsession with electoral systems and this was my (un)healthy coping mechanism.
                <br/>
                <br/>
                Regardless of that, I do wish to have this project be a positive argument for Electoral Reforms. I believe strongly in
                STV, and I believe that this project highlights the flaws of British Democracy and how we could improve it.
                <br/>
                <br/>
                But I didn't know if the simulation itself would be convincing enough! It was a very sandboxy experience so I wanted
                to try and direct that by writing some articles. I'm no expert, but people close to me are almost that so it's only 90%
                amateur hour!
                <br/>
                <br/>
                I know I also tried to keep an air of professionalism elsewhere so it might be confusing why I forgoed that here. Well it's because
                I wanted to make my arguments with much more broader appeal. That's honestly the only reason.
                <br/>
                <br/>
                </Typography>
                <Typography variant="h4">
                Contact:
                </Typography>
            <Typography variant="body1">
                <b>Email Address:</b> soupmothstudios@gmail.com.
                <br/>
                This project is also open source, so if you wish to laugh at my horrible coding choices, like how I hardcoded the articles
                into the javascript bundle and made no easy ways to edit them and import them, <b><a href="https://github.com/soupmoth/Plurality" target="_blank">just click here to view my Github!</a></b> (listen this is my first time making a website)
                
            </Typography>
        </Paper>
        <br></br>
        <br></br>
        <Grid container spacing={3} justifyContent="center">
                {generateArticlePreview(getArticleData(METHODOLOGY), classes, METHODOLOGY)}
                {generateArticlePreview(getArticleData(PROPOSALS), classes, PROPOSALS)}
        </Grid>

        </div>
    );
}


export default About