import React, { useState, useEffect } from "react";

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

import { Button, Typography, Paper, ButtonGroup, Grid } from "@material-ui/core";

import * as eConsts from '../../../const/electionConsts.js'

import useStyles from './styles.js';

ChartJS.register(LinearScale, BarElement, Title, CategoryScale, Tooltip, Legend, annotationPlugin);

const ElectoralBreakdown = ({ breakdownConstituency, electionData, electionParams, parties }) => {
  const classes = useStyles();

  const [data, setData] = useState(null)
  const [rounds, setRounds] = useState(null)
  const [round, setRound] = useState(0)

  useEffect(() => {
    if (!(breakdownConstituency == "" || electionData == null)) {
      electionData.forEach(eData => {
        if (eData.constituencies.find(e => e.constituency == breakdownConstituency)) {
          setRounds(eData.rounds)
        }
      });
    }

    setData(null)
    setRound(0)
  }, [electionData, breakdownConstituency])

  useEffect(() => {
    if (rounds != null) {
      console.log(rounds[round])
      setData(getRoundData())
    }
  }, [round])

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

  const getRoundData = () => {
    var datasets = []
    var roundOfInterest = rounds[round].results


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
    if (electionParams.typeOfVote === eConsts.RUNOFF) {
      var p = 0
      electionData.forEach(eData => {
        if (eData.constituencies.find(e => e.constituency == breakdownConstituency)) {
          p = 1 / rounds[round].seatTotal
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
    return 0.1 * value
  }

  const getAdjustOffset = (value) => {
    return -100
  }

  const getParty = () => {
    return rounds[round].target
  }

  const getVerdictText = () => {
    var pID = getParty()
    var pName = parties.find(party => party.partyID == pID).name

    if (pName == "Other") {
      pName = "An Independant"
    }

    switch (rounds[round].reason) {
      case eConsts.R_DEFAULT:
      case eConsts.R_SURPASS:
        return `${pName} wins a seat!`
      case eConsts.R_LOSS:
        return `${pName} loses an MP!`
      default:
        return "ERROR"
    }
  }

  const pluralCheck = (value, flip) => {
    if (value == 1 && flip) {
      return ""
    }
    if (value != 1 && !flip) {
      return ""
    }
    return "s"
  }

  const getVerdictFlavour = () => {
    var pID = getParty()
    var pName = parties.find(party => party.partyID == pID).name

    if (pName == "Other") {
      pName = "An Independant"
    }

    switch (rounds[round].reason) {
      case eConsts.R_DEFAULT:
        return `This seat is won as ${rounds[round].results.length} seat${pluralCheck(rounds[round].results.length, true)} remain to be filled and ${rounds[round].results.length} candidate${pluralCheck(rounds[round].results.length, true)} remain${pluralCheck(rounds[round].results.length, false)}`
      case eConsts.R_SURPASS:
        return `${pName} wins a seat as an MP's votes surpasses the threshold! Its excess votes are reallocated if more seats remain to be filled`
      case eConsts.R_LOSS:
        return `One of ${pName}'s MPs is eliminated from unpopularity, and has its votes reallocated!`
      default:
        return "ERROR"
    }
  }

  const findPosition = () => {
    var rawLabels = []

    //find out the max many MPs are running per party
    parties.forEach(party => {
      var key = party.partyID
      var newArray = rounds[round].results.filter(e => e.pName == key)
      if (newArray.length > 0) {
        rawLabels.push(key)
      }
    });

    if (rawLabels.length == 1) {
      return "middle"
    }

    var pID = getParty()

    if (rawLabels.indexOf(pID) == rawLabels.length - 1) {
      return "end"
    }
    else if (rawLabels.indexOf(pID) == 0) {
      return "start"
    }
    return "middle"
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
        text: `Round ${round + 1}`,
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
            position: () => findPosition(),
            yAdjust: () => getAdjustOffset(getThreshold()),
            xValue: () => getParty(),
            backgroundColor: () => eConsts.darkenPartyColours(findPartyColour(getParty()), 0.1),
            content: () => getVerdictText(),
            font: {
              size: 20
            },
            callout: {
              enabled: true,
              position: "bottom"
            }
          }
        },
      }
    },
  };



  const shiftPage = (shift) => {
    var rnd = round + shift;
    if ((rnd >= rounds.length) || (rnd < 0)) {
      rnd = rnd - shift
    }
    setRound(rnd)
  }

  const shiftPageToInterest = (shift) => {
    var rnd = null;
    if (shift == 1) {
      rnd = rounds.length - 1
    }
    else {
      rnd = 0
    }

    //find next winner 
    for (let i = round + shift; (i < rounds.length) && (i >= 0); i += shift) {
      console.log(i)
      if (rounds[i].reason == eConsts.R_SURPASS || rounds[i].reason == eConsts.R_DEFAULT) {
        rnd = i
        i = -1
        break;
      }
    }

    setRound(rnd)
  }

  if ((data == null) && (rounds != null)) {
    setData(getRoundData())
  }

  return (
    !data ? <></> : (
      <Paper className={classes.paper}>

        <Grid container spacing={2}>
          <Grid item md={8} xs={12}>
            <Paper className={classes.paper}>
              <Bar
                options={options}
                data={data}
              />
            </Paper>
          </Grid>
          <Grid item md={4} xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h6">{`${breakdownConstituency}`}</Typography>
              <br />
              <br />
              <ButtonGroup fullWidth variant="contained" aria-label="outlined primary button group">
                <Button color="primary" size="large" onClick={(e) => shiftPage(-1)}> Previous </Button>
                <Button color="primary" size="large" onClick={(e) => shiftPageToInterest(-1)}> Prev. Winner </Button>
              </ButtonGroup>
              <br />
              <ButtonGroup fullWidth variant="contained" aria-label="outlined primary button group">
                <Button color="secondary" size="large" onClick={(e) => shiftPage(1)}> Next </Button>
                <Button color="secondary" size="large" onClick={(e) => shiftPageToInterest(1)}> Next. Winner </Button>
              </ButtonGroup>
              <br />
              <br />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6">Seat Total</Typography>
                  <Typography variant="h3">{`${rounds[round].seatTotal}`}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6">Seats Left</Typography>
                  <Typography variant="h3">{`${rounds[round].seatsLeft}`}</Typography>
                </Grid>
              </Grid>
              <Typography variant="body1">{`${getVerdictFlavour()}`}</Typography>
            </Paper>
          </Grid>

        </Grid>

      </Paper>
    ))

}

export default ElectoralBreakdown;