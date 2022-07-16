import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

import { createTheme, ThemeProvider, TextField, Button, Typography, Paper, Slider, Grid, Box, Container } from "@material-ui/core";

import useStyles from './styles.js';

import * as eConsts from '../../../../const/electionConsts.js'



const PartySlider = ({pPercent, partyPercentages, setPartyPercentages}) => {
    var newPP = null
    const parties = useSelector((state) => state.parties)
    
    const getColour = (pID) => {
        console.log(pID)
        const result = parties.find(party => party.partyID === pID)
        return result
      };


    const handleChange = (event, newValue) => {
        newPP = partyPercentages.slice()
        newPP.map((party) => {
            if (party.pID === pPercent.pID) {
                party.votePercent = newValue
            }
        })
        setPartyPercentages(newPP);
      };

    const findMax = (startingPercent) => {
        if (startingPercent > 0.1) {
            return 1
        }
        return 3*pPercent.startingVotePercent+0.02
    };

    function percentValue(value) {
        return `${Math.round(value*1000)/10}%`;
    }


    return (
        <Container sx={{ width: 300 }}>
        <Typography variant="h6">{`${pPercent.pName}`}</Typography>
            <br/>
            <br/>
            <Slider 
                value={pPercent.votePercent} 
                onChange={handleChange} 
                aria-label="Always visible"
                getAriaValueText={percentValue}
                valueLabelFormat={percentValue}
                valueLabelDisplay="auto"
                min={0}
                step={0.0001}
                max={findMax(pPercent.startingVotePercent)}
                style={{color: `${getColour(pPercent.pID).primaryColour}`}}
            />
         </Container>

    );
}


export default PartySlider