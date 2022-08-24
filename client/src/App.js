import React, { useEffect, useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux';

import { getConstituencies, getParties } from './actions/simulation'

import Header from './images/Header.png'
import useStyles from './styles';
import SimulationPage from './components/Simulation/SimulationPage';
import Home from './components/Home/Home';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout';

const App = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getConstituencies());
        dispatch(getParties())
    }, [dispatch])

    return (

        <Container maxWidth="lg">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <Layout/>
                    }>
                        <Route index element={<Home />} />
                        <Route path="simulation" element={<SimulationPage />} />
                        <Route path="articles" element={<ArticlesPage/>}/>
                        <Route path="articles/" element={
                            <Article/>
                        }/>
                    </Route>
                </Routes>
            </BrowserRouter>

        </Container>

    );
}

export default App;