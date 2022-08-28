import React, { useEffect, useState } from "react";



import {Grid, Card, CardActionArea, CardContent, CardMedia, Button, Typography} from '@material-ui/core';

import useStyles from './styles.js';

import * as eConsts from '../../const/electionConsts.js'

import Banner from '../../images/Banner.png'
import { getArticleCount, getArticleData, generateArticlePreview } from "../../const/Articles.js";


const ArticlesPage = () => {
    const classes = useStyles();

    const ArticleComponents = []
    
    for (var i = 0; i < getArticleCount(); i++) {
        var articleData = getArticleData(i+1)
        ArticleComponents.push(generateArticlePreview(articleData, classes, i+1))
    }

    return (
        <Grid container spacing={3}>
            {ArticleComponents}
        </Grid>
    );
}


export default ArticlesPage