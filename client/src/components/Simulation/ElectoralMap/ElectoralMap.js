import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";

import ElectoralGeography from "./westminster_const_region TRUE3.json"

import { Grid, CircularProgress} from '@material-ui/core'

import { useSelector } from "react-redux";
import { TextField, Button, Typography, Paper, styled } from "@material-ui/core";

import useStyles from './styles.js';

import * as eConsts from '../../../const/electionConsts.js'

const ElectoralMap = ({electionParams, seats, setSeatData, electionData, setElectionData}) => {
  const classes = useStyles();

  //constants
  const seatTotal = 650;

  const seatCount = {
    total: 18,
    party: {
        con: 0,
        lab: 0,
        ld: 0,
        brexit: 0,
        green: 0,
        snp: 0,
        pc: 0,
        ni: 18,
        other: 0
    } 
  }

  const constituencies = useSelector((state) => state.constituencies)
  const parties = useSelector((state) => state.parties)

  //console.log(electionParams);

  //TODO - Build a method which finds the results of all grouped constituencies
  //This means an array of objects with first, an inner array of constituencies as "group",
  //and then the MPs returned by that group. This allows the map to easily crossreference this
  //resulting array to resolve the colour of the constituency and the data to present
  //const resolveResults

  const resolveResults = () => {
    //section dedicated to adding electoral swing. we can do it later
    var allVotes = findNationalResults(constituencies)
    var newConstituencies = alterConstResults(JSON.parse(JSON.stringify(constituencies)), allVotes)

    var groups = buildGroups(newConstituencies, electionParams.grouping)
    groups = groups.map(g => {
      //build initial for group
      var tempGroup = {
        constituencies: g,
        totalVotes: {
          con: 0,
          lab: 0,
          ld: 0,
          brexit: 0,
          green: 0,
          snp: 0,
          pc: 0,
          dup: 0,
          sf: 0,
          sdlp: 0,
          uup: 0,
          alliance: 0,
          other: 0
        },
        seatHolders: null,
      }

      //find the total votes in a group
      for (let i = 0; i < g.length; i++) {
        for (const key in tempGroup.totalVotes) {
          tempGroup.totalVotes[key] += (g[i])[key]
        }
      }

      console.log(tempGroup)

      //determineWinner returns pIDs. We then map over them and find the biggest constituency for that party's success
      let constituenciesCopy = tempGroup.constituencies.slice()
      tempGroup.seatHolders = determineWinner(tempGroup.totalVotes, tempGroup.constituencies.length)
      tempGroup.seatHolders = tempGroup.seatHolders.map((pID) => {

        let constName = null
        let valueArr = null

        valueArr = constituenciesCopy.map((c) => { return c[pID] })
        constName = constituenciesCopy[valueArr.indexOf(Math.max(...valueArr))].constituency;

        constituenciesCopy = constituenciesCopy.filter(c => c.constituency !== constName)

        return {
          constituencyName: constName,
          mostResponsible: pID
        }
      })

      return tempGroup
    })

    console.log(groups)

    return groups;
  }

  //this function finds the national results of each party and then returns an array of such results
  const alterConstResults = (constituencyArr, nResults) => { 

    if (electionParams.partyPollRates.length > 0) {
      var newConsts = constituencyArr.slice()
      let pollRates = electionParams.partyPollRates.slice()

      console.log(JSON.parse(JSON.stringify(newConsts)))

      newConsts.map((c) => {
        var totalWeight = 0;

        console.log(JSON.parse(JSON.stringify(c)))
        
        for (var i = 0; i < pollRates.length; i++) {
          let key = pollRates[i].pID
          if (c[pollRates[i].pID] > 0) {
            totalWeight += (pollRates[i].votePercent/nResults[key])
          }
        }

        for (var i = 0; i < pollRates.length; i++) {
          let key = pollRates[i].pID
          if (c[key] > 0) {
            c[key] = c[key]*((pollRates[i].votePercent/nResults[key])/totalWeight)
          }
        }

        console.log(JSON.parse(JSON.stringify(c)))
            

      })

      console.log(JSON.parse(JSON.stringify(newConsts)))

      return newConsts
    }
    else {
      return constituencyArr
    }
  }

  //this function finds the national results of each party and then returns an array of such results
  const findNationalResults = (constituencyArr) => {
    var allVotes = {
      con: 0,
      lab: 0,
      ld: 0,
      brexit: 0,
      green: 0,
      snp: 0,
      pc:0,
      dup:0,
      sf: 0,
      sdlp:0,
      uup: 0,
      alliance: 0,
      other: 0
    }

    var totalVotes = 0
    constituencyArr.forEach(c => {
      for (const key in allVotes) {
        allVotes[key] += c[key]
        totalVotes += c[key]
    }
    });

    for (const key in allVotes) {
      allVotes[key] = allVotes[key] / totalVotes
    }

    return allVotes

  }

  //build groups works on 4 modes.
  //INDIVIDUAL - Looks at number of MPs per constituency, groups every constituency to match. 
  //For Individual, the smallest constituencies are prioritised.
  //BUROUGH and COUNTY - looks at the counties and burough a Constituency is in, then builds
  //a group of the constituencies in those spaces
  //REGION - looks at the regions a constituency is in, and groups them with other similar
  //constituencies
  //NATION - all constituencies are linked

  //all constituencies in Northen Ireland are to be excluded for now.

  const buildGroups = (constituencyArr, grouping) => {

    var consts = constituencyArr.filter((c) => c.country !== "Northern Ireland")

    if (eConsts.NATION === grouping) {
      return [consts]
    }
    else if (eConsts.INDIVIDUAL === grouping) {
      return consts.map(c => {
        return [c]
      })
    }

    var listOfGroups = []
    for (let i = 0; i < consts.length; i++) {
      if (!listOfGroups.find((e) => e === (consts[i])[grouping])) {
        listOfGroups.push((consts[i])[grouping])
      }
    }

    let groups = []

    for (let i = 0; i < listOfGroups.length; i++) {
      groups.push([])
    }

    for (let i = 0; i < consts.length; i++) {
        groups[listOfGroups.findIndex((g) => g === (consts[i])[grouping])].push(consts[i])
    }

    return groups
  }

  

  //c being the constituency.
  const determineWinner = (c, mpNumber) => {
    //TODO
    //this solution is really bad, its because of how I formatted the backend. Have a fix in mind
    //for it, but I'll have to test it later. Proof of concept
    var partyResults = [{pName: "con", vCount : c.con}, {pName: "lab", vCount : c.lab}, 
    {pName: "ld", vCount : c.ld}, {pName: "brexit", vCount : c.brexit}, 
    {pName: "green", vCount : c.green}, {pName: "snp", vCount : c.snp}, 
    {pName: "pc", vCount : c.pc}, {pName: "dup", vCount : c.dup}, {pName: "sf", vCount : c.sf},
    {pName: "sdlp", vCount : c.sdlp}, {pName: "uup", vCount : c.uup},
    {pName: "alliance", vCount : c.alliance}, {pName: "other", vCount : c.other}];

    partyResults = partyResults.filter(e => {
      return e.vCount>0
    })

    let totalVotes = 0
    partyResults.map(p => {
      totalVotes = totalVotes + p.vCount
    })

    partyResults.map(p => {
      p.vCount = p.vCount/totalVotes
    })

    let pID = "";

    if (electionParams.typeOfVote === eConsts.PLURALITY) {
      pID = pluralityVote(partyResults, true, mpNumber);
    }
    else if (electionParams.typeOfVote === eConsts.RUNOFF) {
      pID = runoffVote(partyResults, mpNumber)
    }
    else if (electionParams.typeOfVote === eConsts.LOSER_TAKES_ALL) {
      pID = pluralityVote(partyResults, false, mpNumber);
    }

    handleWinners(pID)

    return pID;
  };

  //handle winners increments a seat
  const handleWinners = (pIDs) => {
    pIDs.map(pID => {
      incrementSeats(pID)
    })
  }

  const incrementSeats = (pID) => {
    seatCount.party[pID] = seatCount.party[pID]+1;

    if (seats.total !== seatTotal) {
      seatCount.total = seatCount.total+1
    }
    if ((seatCount.total === seatTotal)) {
      setSeatData(seatCount)
    }
  }

  const getColour = (pID) => {
    const result = parties.find(party => party.partyID === pID)
    return result
  };

  const pluralityVote = (partyResults, winnerWins, mpNumber) => {
    var winProportion = 1
    var mpsToElect = mpNumber

    if (mpNumber > 1) {
      winProportion = 1/mpNumber
      partyResults = redistrubuteTacticalVotes(partyResults)
    }
    

    var rawResults = partyResults.map(p => {
      let resultsTemp = p.vCount
      return resultsTemp
    })

    if (winnerWins === false) {
      partyResults.map((p) => {
        p.vCount = 1-p.vCount
      })
      
    }

    var targetVote = null
    var winners = []
    var winner = null

    console.log("start")

    while (mpsToElect > 0) {
      targetVote = rawResults.indexOf(Math.max(...rawResults));
      console.log(JSON.parse(JSON.stringify(partyResults)))
      winner = partyResults[targetVote];
      winner.vCount -= winProportion;
      winners.push(winner.pName);
      rawResults[targetVote] -= winProportion;
      mpsToElect--
    }

    try {
      return winners
    }
    catch (error) {
      console.log(error)
      return "other"
    }
    
  }


  //Runoff voting. Works by reallocating votes to a different party if the
  //prime party does not win. SMP constituency systems with this are commonly called "AV"
  //and MMP systems are called "STV". This system ensures no vote is wasted.

  const runoffVote = (partyResults, mpNumber) => {
    var winProportion = 0.5
    var mpsToElect = mpNumber

    if (mpNumber > 1) {
      winProportion = 1/mpNumber
    }

    //correcting tactical vote. we assume there are no tactical votes in Runoff
    partyResults = redistrubuteTacticalVotes(partyResults)


    let weighting = []
    let weightMax = 0
    let weightAdding = 1

    for (let i = 0; i < mpNumber; i++) {
      weightMax += weightAdding
      weighting.push(weightAdding)
      weightAdding = 1/(1.5*(i+1))
    }

    let runoffResults = []
    partyResults.forEach(p => {
      for (let i = 0; i < mpNumber; i++) {
        runoffResults.push({pName: p.pName, vCount: p.vCount*(weighting[i]/weightMax)})
      }
    });

    console.log("runoff begins!:")
    console.log(winProportion)
    //while we still have not selected enough MPs.
    let mostPopular = null
    let winners = []
    while (mpsToElect > 0) {
      if (runoffResults.length === mpsToElect) {
        //seat agained
        mostPopular = runoffResults[0]
        console.log("winner!:")
        console.log(mostPopular)
        mpsToElect--
        winners.push(mostPopular.pName)
        runoffResults = runoffRedistrubtion(runoffResults, mostPopular)
        
      }
      else {
        //find the biggest winner
        mostPopular = null
        runoffResults.forEach(p => {
          if (mostPopular === null) {
            mostPopular = p;
          }
          else if (p.vCount > mostPopular.vCount) {
            mostPopular = p;
          }
        });
        //does the biggest winner qualify for a seat yet?
        if (mostPopular.vCount >= winProportion) {
          winners.push(mostPopular.pName)
          console.log("winner!:")
          console.log(mostPopular)
          mostPopular.vCount -= winProportion 
          mpsToElect--
          if (mpsToElect > 0) {
            runoffResults = runoffRedistrubtion(runoffResults, mostPopular)
          }
        }
        else {
          var leastPopular = null
          //find the biggest loser
          runoffResults.forEach(p => {
            if (leastPopular === null) {
              leastPopular = p;
            }
            else if (p.vCount < leastPopular.vCount) {
              leastPopular = p;
            }
          });

          runoffResults = runoffRedistrubtion(runoffResults, leastPopular)
        }
      }
    }
    
    return winners
  }

  const runoffRedistrubtion = (runoffResults, runoffVictim) => {
    let weightMax = 0
    console.log("victim:")
    console.log(runoffVictim)
    console.log(JSON.parse(JSON.stringify(runoffResults)))
    let resultsTemp = getWeightedArray(runoffResults, runoffVictim)

    resultsTemp.map(w => {
      weightMax += w
    })

    console.log(JSON.parse(JSON.stringify(resultsTemp)))

    let victimVote =  runoffVictim.vCount
    runoffVictim.vCount = 0

    for (let i = 0; i < runoffResults.length; i++) {
      runoffResults[i].vCount += victimVote*(resultsTemp[i]/weightMax)
    }
    runoffResults = runoffResults.filter(p => runoffVictim !== p)

    console.log(JSON.parse(JSON.stringify(runoffResults)))

    return runoffResults
  }

  const getWeightedArray = (array, compareTo) => {
    //same candidate weight = 0
    //same party weight = 50
    //same alignment = 25
    //one alignment off = 15
    //two alignments off = 5
    //else = 1
    return array.map(p => {
      let curPartyLeaning = toLeaning(p.pName) 
      let victimLeaning = toLeaning(compareTo.pName)
      if (p === compareTo) {
        return 0
      }
      else if (p.pName === array.pName) {
        return 1000
      }
      else if (curPartyLeaning === victimLeaning) {
        return 100
      }
      else if (Math.abs(curPartyLeaning-victimLeaning) === 1) {
        return 25
      }
      else if (Math.abs(curPartyLeaning-victimLeaning) === 2) {
        return 5
      }
      else {
        return 1
      }
    })
  }

  //finds the leaning as an 
  const toLeaning = (pName) => {
    try {
      let party = parties.find(p => pName === p.partyID)
      return eConsts.POLITICAL_DISTANCE(party.leaning)
    } catch (error) {
      console.log(error)
      return 4
    }
  }

  //This redistrubutes the votes from the two best parties in a constituency
  const redistrubuteTacticalVotes = (results) => {
    var temp = results;
    
    var tracker

    temp.map(p => {
      tracker+= p.vCount
    })
    var topTwoParties = []

    const extractMaxResult = () => {
      var mostPopular = null
      temp.forEach(p => {
        if (mostPopular === null) {
          mostPopular = p;
        }
        if (p.vCount > mostPopular.vCount) {
          mostPopular = p;
        }
      });
      topTwoParties.push(mostPopular);
      temp = temp.filter(p => mostPopular !== p)
    }

    extractMaxResult();
    extractMaxResult();

    topTwoParties.map(p => {
      let reducedVote = p.vCount * (electionParams.tacticalVoteProportion)
      p.vCount -= reducedVote
      let tempArray = temp.map(p => {
        return p.vCount
      })

      let weightMax = 0

      tempArray.map(w => {
        weightMax += w
      })

      for (let i = 0; i < temp.length; i++) {
        temp[i].vCount += reducedVote*(tempArray[i]/weightMax)
      }
    })

    topTwoParties.map(p => {
      temp.push(p)
    })


    tracker = 0 
    
    temp.map(p => {
      tracker+= p.vCount
    })

    return temp

  }

  if (electionData === null) {
    setElectionData(resolveResults())
  }

  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  
  function handleMoveEnd(pos) {
    if (position.zoom !== pos.zoom) {
      setPosition(pos);
    }
    
  }

  return (
    !constituencies.length || !parties.length ? <CircularProgress/>: (
      <ComposableMap width={1200}
      height={800}
      projectionConfig={{
        center: [0, 55.4],
        rotate: [4.4, 0, 0],
        parallels: [0, 10],
        scale: 4000,
      }}>
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
          maxZoom={16}
        >
        <Geographies geography={ElectoralGeography}>
          {({ geographies }) =>
            geographies.map(geo => {
              var currentDatum = null
              var currentConstituency = null

              //console.log(electionData)

                electionData.forEach(datum => {
                  datum.constituencies.map(group => {
                    if ((group.constituency === geo.properties.NAME)) {
                    currentDatum = datum
                    currentConstituency = group.constituency
                    }
                  })
                })

              //console.log(currentDatum)
              //console.log(currentConstituency)

              let colour = null
              try {
                colour = getColour(currentDatum.seatHolders.find(s => currentConstituency === s.constituencyName).mostResponsible)
              }
              catch (error) {
                //console.log(geo.properties.NAME)
                console.log(error)
                
                colour = getColour("other")
              }

              var strColour = "#000000"
              var strWidth = (1/position.zoom)
              var selectedWidth = 25*(1/position.zoom)

              
              return <Geography key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: `${colour.primaryColour}`,
                    stroke: `${strColour}`,
                    strokeWidth: {strWidth}
                  },
                  hover: {
                    fill: `${colour.secondaryColour}`,
                    strokeWidth: {selectedWidth}
                  },
                  press: {
                    fill: `${colour.primaryColour}`,
                    stroke: `${strColour}`,
                    strokeWidth: {strWidth}
                  }
                }}
                strokeWidth = {strWidth}
                />

            })
          }
        </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    )
  );
};

export default ElectoralMap;