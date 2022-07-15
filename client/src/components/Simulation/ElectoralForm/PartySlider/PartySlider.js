import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

import { TextField, Button, Typography, Paper, Slider, Grid, Box, Container } from "@material-ui/core";

import useStyles from './styles.js';

import * as eConsts from '../../../../const/electionConsts.js'


const PartySlider = ({pPercent, partyPercentages, setPartyPercentages}) => {

    //TACTICAL VOTING

    var newPP

    const handleChange = (event, newValue) => {
        newPP = partyPercentages.slice()
        newPP.map((party) => {
            if (party.pID === pPercent.pID) {
                party.votePercent = newValue
            }
        })
        setPartyPercentages(newPP);
      };

    function percentValue(value) {
        return `${Math.round(value*100)}%`;
    }

    console.log(partyPercentages)

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
                valueLabelDisplay="on"
                min={0}
                step={0.001}
                max={3*pPercent.startingVotePercent}
         />
         </Container>
    );
}


export default PartySlider