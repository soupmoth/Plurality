import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {Grid, Card, CardActionArea, CardContent, CardMedia, Button, Typography} from '@material-ui/core';

import useStyles from './styles.js';

import * as eConsts from '../../const/electionConsts.js'

import Banner from '../../images/Banner.png'
import { getArticleCount, getArticleData } from "../../const/Articles.js";


const ArticlesPage = () => {
    const classes = useStyles();

    const ArticleComponents = []
    
    for (var i = 0; i < getArticleCount(); i++) {
        var articleData = getArticleData(i+1)
        try {
            ArticleComponents.push((
                <Grid key= {articleData.title} item xs={4}>
                    <Card className={classes.smallCard}>
                        <CardActionArea component={Link} to={`/articles/${i+1}`} >
                            <CardMedia className={classes.media} image={articleData.image} title={articleData.title} />
                            <CardContent backgroundColor="red" >
                                <Typography align="center" variant="h5">{articleData.title}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))
        }
        catch {
            articleData = getArticleData("ERROR")
            console.log("HI")
            ArticleComponents.push((
                <Grid item xs={4}>
                    <Card className={classes.smallCard}>
                        <CardActionArea component={Link} to={`/articles/${i+1}`} >
                            <CardMedia className={classes.media} image={articleData.image} title={articleData.title} />
                            <CardContent backgroundColor="red" >
                                <Typography align="center" variant="h5">{articleData.title}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))
            break
        }
    }

    return (
        <Grid container spacing={3}>
            {ArticleComponents}
        </Grid>
    );
}


export default ArticlesPage