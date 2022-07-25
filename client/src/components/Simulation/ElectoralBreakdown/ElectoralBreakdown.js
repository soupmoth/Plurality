import React, { useState, useEffect, useRef } from "react";

import "./styles.js"
import { useSelector } from "react-redux";

import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

import { CircularProgress, Button, Typography, Paper, LinearProgress, Container, Grid, Box } from "@material-ui/core";

import * as eConsts from '../../../const/electionConsts.js'

import useStyles from './styles.js';

ChartJS.register(LinearScale, BarElement, Title, CategoryScale, Tooltip, Legend, annotationPlugin);

const ElectoralBreakdown = ({breakdownConstituency, electionData, electionParams, parties}) => {
    const classes = useStyles();
    const [data, setData] = useState(null)
    const [round, setRound] = useState(0)

    useEffect(() => {
      if (breakdownConstituency == "" || electionData == null) {
        return null
      }

      
      var roundOfInterest = null
      //get the group which the selected constituency lies within
      electionData.forEach(eData => {
        if (eData.constituencies.find(e => e.constituency == breakdownConstituency)) {
          roundOfInterest = eData.rounds[round].results
        }
      });

      setData(getRoundData(roundOfInterest))
    }, [electionData, breakdownConstituency])

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

    const getRoundData = (roundOfInterest) => {
      var datasets = []
      var roundOfInterest = null
      
      
      electionData.forEach(eData => {
        if (eData.constituencies.find(e => e.constituency == breakdownConstituency)) {
          roundOfInterest = eData.rounds[round].results //TODO: implement pagination for this!
        }
      });


      var rawLabels = []
      var rawData = []

      //find out the max many MPs are running per party
      var maxAmount = 0
      parties.forEach(party => {
        var key = party.partyID
        var newArray = roundOfInterest.filter(e => e.pName == key)
        if (newArray.length > 0) {
          rawLabels.push(key)
          if (maxAmount < newArray.length) {
            maxAmount = newArray.length
            
          }
        }
      });
      for (let i = 0; i < maxAmount; i++) {
        rawData.push([])
      }
      rawLabels.forEach(party => {
        var key = party
        var newArray = roundOfInterest.filter(e => e.pName == key)
        for (let i = 0; i < maxAmount; i++) {
          if (i < newArray.length) {
            rawData[i].push(newArray[i].vCount)
          }
          else {
            rawData[i].push(0)
          }
        }
      });
      var datasetNumber = 0
      rawData.forEach(d => {
        datasetNumber++
        datasets.push({
          label: `${datasetNumber}`,
          data: d,
          backgroundColor: getPartyColours(rawLabels, false),
          borderColor: getPartyColours(rawLabels, false).map((c) => {
            return eConsts.darkenPartyColours(c, -0.5)
          }),
          hoverOffset: 4,
        })
      })
      return {
        labels: rawLabels,
        datasets: datasets
      }
    }

    const getPartyColours = (rawLabels, flip) => {
      var colours = []
      rawLabels.forEach(l => {
        colours.push(findPartyColour(l, flip))
      })
      return colours
    }

    const getThreshold = () => {
      if (electionParams == null || electionData == null) {
        return 0
      }
      if (electionParams.typeOfVote == eConsts.RUNOFF) {
        var p = 0
        electionData.forEach(eData => {
          if (eData.constituencies.find(e => e.constituency == breakdownConstituency)) {
            p = 1/eData.constituencies.length
          }
        });
        if (p == 1) {
          p = 0.5
        }
        return p;
      }
      return 0;
    }

    const getOffset = (value) => {
      return 0.9*value
    }

    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
          position: 'top',
        },
        title: {
          display: true,
          text: 'Round 1',
        },
        annotation: {
          annotations: {
            line1: {
              type: 'line',
              yMin: () => getThreshold(),
              yMax: () => getThreshold(),
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 2,
            },
            line2: {
              type: 'label',
              yValue: () => getOffset(getThreshold()),
              shadowOffsetX: 3,
              shadowOffsetY: 3,
              xAdjust: 100,
              xValue: "con",
              backgroundColor: 'rgba(245,245,245)',
              content: ["Conservative Win"],
              font: {
                size: 18
              },
              callout: {
                enabled: true,
                side: 10
              }
            }
          },
        }
      },
    };

      

    

  return (
    !data ? <Paper className={classes.paper}>
            <LinearProgress color="success" />
        </Paper> : (
      <Paper classes={classes.paper}>
        <Grid container spacing={2}> 
          <Grid item xs={8}>
              <Bar
                options={options}
                data={data}
              />
          </Grid>
        
        </Grid>
            
      </Paper>
  ))

}

export default ElectoralBreakdown;