import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {Grid, Card, CardActionArea, CardContent, CardMedia, Button, Typography} from '@material-ui/core';

import useStyles from './styles.js';

import * as eConsts from '../../const/electionConsts.js'

import Banner from '../../images/Banner.png'
import VS from '../../images/VotingSystems.png'
import GVS from '../../images/GoodVotingSystem.png'
import SW from '../../images/SpoilerWall.png'


const ArticlesPage = () => {
    const classes = useStyles();

    return (
        <Grid container spacing={3}>
            <Grid item xs={4}>
                <Card className={classes.smallCard}>
                    <CardActionArea component={Link} to={"/articles/1"} >
                        <CardMedia className={classes.media} image={VS} title={"Simulate!"} />
                        <CardContent backgroundColor="red" >
                            <Typography align="center" variant="h5">Simulate a British election with different voting systems!</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card className={classes.smallCard}>
                    <CardActionArea component={Link} to={"/articles/2"} >
                        <CardMedia className={classes.media} image={GVS} title={"Simulate!"} />
                        <CardContent backgroundColor="red" >
                            <Typography align="center" variant="h5">Simulate a British election with different voting systems!</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card className={classes.smallCard}>
                    <CardActionArea component={Link} to={"/articles/3"} >
                        <CardMedia className={classes.media} image={SW} title={"Simulate!"} />
                        <CardContent backgroundColor="red" >
                            <Typography align="center" variant="h5">Simulate a British election with different voting systems!</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        </Grid>
    );
}


export default ArticlesPage