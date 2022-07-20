import React, {useEffect, useState} from 'react';
import {Container, AppBar, Typography, Grow, Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux';

import {getConstituencies, getParties} from './actions/simulation'

import Header from './images/Header.png'
import useStyles from './styles';
import SimulationPage from './components/Simulation/SimulationPage';

const App = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getConstituencies());
        dispatch(getParties())
    }, [])

    return (
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position='static' color = "inherit">
                <img className={classes.image} src={Header} alt = "plurality" height="125"/>
            </AppBar>
            
            <SimulationPage/>
        </Container>
        
    );
}

export default App;