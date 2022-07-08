import React, {useEffect, useState} from 'react';
import {Container, AppBar, Typography, Grow, Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux';

import {getPosts} from './actions/posts'

import Posts from './components/Posts/Posts'
import Form from './components/Form/Form'

import plurality from './images/plurality.jpg'
import useStyles from './styles';
import SimulationPage from './components/Simulation/SimulationPage';

const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch, currentId])

    return (
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position='static' color = "inherit">
                <Typography className={classes.heading} variant = "h2" align = "center">Plurality</Typography>
                <img className={classes.image} src={plurality} alt = "plurality" height="100"/>
            </AppBar>
            
            <SimulationPage/>
        </Container>
        
    );
}

export default App;