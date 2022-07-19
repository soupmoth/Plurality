import React, { useState, useEffect } from "react";

import "./styles.js"
import { useSelector } from "react-redux";

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { CircularProgress, Button, Typography, Paper, Slider, Container, Grid, Box } from "@material-ui/core";

import * as eConsts from '../../../const/electionConsts.js'

import useStyles from './styles.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ElectoralSeats = ({seats, parties}) => {
  const classes = useStyles();

    function findPartyName(pID) {
      try {
        if (pID == "ni") {
          return "Northern Ireland"
        }
        return parties.find(party => party.partyID == pID).name
      }
      catch (error) {
        console.log(error)
        return "ERROR"
      }
    }

    function findPartyColour(pID, flip) {
      try {
        if (pID == "ni") {
          if (flip == true) {
            return parties.find(party => party.partyID == "green").primaryColour
          }
          return parties.find(party => party.partyID == "green").secondaryColour
        }
        if (flip == true) {
          return parties.find(party => party.partyID == pID).secondaryColour
        }
        return parties.find(party => party.partyID == pID).primaryColour
      }
      catch (error) {
        console.log(error)
        return "ERROR"
      }
    }

    


    const getLabels = () => {
      var labels = []
      for (const key in seats.party) {
        labels.push(findPartyName(key))
      }
      return labels
    }

    const getData = () => {
      var data = []
      for (const key in seats.party) {
        data.push(seats.party[key])
      }
      return data
    }

    const getPartyColours = (flip) => {
      var colours = []
      for (const key in seats.party) {
        colours.push(findPartyColour(key, flip))
      }
      return colours
    }


    const data = {
      labels: getLabels(),
      datasets: [{
        label: 'Seats',
        data: getData(),
        backgroundColor: getPartyColours(false),
        borderColor: getPartyColours(false).map((c) => {
          return eConsts.darkenPartyColours(c, -0.5)
        }),
        hoverOffset: 4,
        borderWidth: 3
      }]
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Seats Won',
        },
      },
    };

  return (
      <Paper classes={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={1} />
          <Grid item xs={5}>
            <Typography variant="h6">Total Seats Won</Typography>
            <Pie
              options={options}
              data={data}
            />
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h6">Total National Vote</Typography>
            <Pie
              options={options}
              data={data}
            />
          </Grid>
          <Grid item xs={1} />
        </Grid>
      </Paper>
  )

}

export default ElectoralSeats;