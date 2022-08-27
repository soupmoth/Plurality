import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { Box, Typography, Paper } from '@material-ui/core';

import useStyles from './styles.js';

import ReactMarkdown from "react-markdown"
import { useParams } from "react-router-dom";

import { getArticleData, VOTING_SYSTEMS } from "../../../const/Articles.js";

const Article = () => {
    const classes = useStyles();
    const { id } = useParams()

    const articleData = getArticleData(id)

    return (
        <Paper className={classes.paper}> 
            <Box component="img" sx={{ justifyContent: "flex-end", minWidth: 5,  width: '100%' }} src={articleData.image}>
                
            </Box>

            <Typography align="center" variant="h1">{articleData.title}</Typography>

            <Typography><ReactMarkdown>{articleData.body}</ReactMarkdown></Typography>
        </Paper>
    );
}

export default Article