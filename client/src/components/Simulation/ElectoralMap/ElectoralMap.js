import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

import ElectoralGeography from "./westminster_const_region TRUE3.json"

import { useSelector } from "react-redux";
import { TextField, Button, Typography, Paper } from "@material-ui/core";

import useStyles from './styles.js';

import * as eConsts from '../../../const/electionConsts.js'



const ElectoralMap = ({electionParams, seats, setSeatData}) => {
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

  console.log(electionParams);



  //TODO - Build a method which finds the results of all grouped constituencies
  //This means an array of objects with first, an inner array of constituencies as "group",
  //and then the MPs returned by that group. This allows the map to easily crossreference this
  //resulting array to resolve the colour of the constituency and the data to present
  //const resolveResults

  const resolveResults = () => {
    //section dedicated to adding electoral swing. we can do it later

    var groups = buildGroups(constituencies, electionParams.grouping)
    groups = groups.map(g => {
      var tempGroup = {
        constituencies: g,
        totalVotes: {
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
        },
        seatHolders: null,
      }

      for (let i = 0; i < g.length; i++) {
        tempGroup.totalVotes.con += g[i].con
        tempGroup.totalVotes.lab += g[i].lab
        tempGroup.totalVotes.ld += g[i].ld
        tempGroup.totalVotes.brexit += g[i].brexit
        tempGroup.totalVotes.green += g[i].green
        tempGroup.totalVotes.snp += g[i].snp
        tempGroup.totalVotes.pc += g[i].pc
        tempGroup.totalVotes.dup += g[i].dup
        tempGroup.totalVotes.sf += g[i].sf
        tempGroup.totalVotes.sdlp += g[i].sdlp
        tempGroup.totalVotes.uup += g[i].uup
        tempGroup.totalVotes.alliance += g[i].alliance
        tempGroup.totalVotes.other += g[i].other
      }

      
      //determineWinner returns pIDs. We then map over them and find the biggest constituency for that party's success
      let constituenciesCopy = tempGroup.constituencies.slice()
      tempGroup.seatHolders = determineWinner(tempGroup.totalVotes, tempGroup.constituencies.length)
      tempGroup.seatHolders = tempGroup.seatHolders.map((pID) => {
        
        let constName = null
        let valueArr = null

        switch (pID) {
          case "con":
            valueArr = constituenciesCopy.map((c) => {return c.con})
            constName = constituenciesCopy[valueArr.indexOf(Math.max(...valueArr))].constituency;
            break;
          case "lab":
            valueArr = constituenciesCopy.map((c) => {return c.lab})
            constName = constituenciesCopy[valueArr.indexOf(Math.max(...valueArr))].constituency;
            break;
          case "ld":
            valueArr = constituenciesCopy.map((c) => {return c.ld})
            constName = constituenciesCopy[valueArr.indexOf(Math.max(...valueArr))].constituency;
            break;
          case "brexit":
            valueArr = constituenciesCopy.map((c) => {return c.brexit})
            constName = constituenciesCopy[valueArr.indexOf(Math.max(...valueArr))].constituency;
            break;
          case "green":
            valueArr = constituenciesCopy.map((c) => {return c.green})
            constName = constituenciesCopy[valueArr.indexOf(Math.max(...valueArr))].constituency;
            break;
          case "snp":
            valueArr = constituenciesCopy.map((c) => {return c.snp})
            constName = constituenciesCopy[valueArr.indexOf(Math.max(...valueArr))].constituency;
            break;
          case "pc":
            valueArr = constituenciesCopy.map((c) => {return c.pc})
            constName = constituenciesCopy[valueArr.indexOf(Math.max(...valueArr))].constituency;
            break;
          case "dup":
            valueArr = constituenciesCopy.map((c) => {return c.ni})
            constName = constituenciesCopy[valueArr.indexOf(Math.max(...valueArr))].constituency;
            break;
          case "sf":
            valueArr = constituenciesCopy.map((c) => {return c.ni})
            constName = constituenciesCopy[valueArr.indexOf(Math.max(...valueArr))].constituency;
            break;
          case "sdlp":
            valueArr = constituenciesCopy.map((c) => {return c.ni})
            constName = constituenciesCopy[valueArr.indexOf(Math.max(...valueArr))].constituency;
            break;
          case "uup":
            valueArr = constituenciesCopy.map((c) => {return c.ni})
            constName = constituenciesCopy[valueArr.indexOf(Math.max(...valueArr))].constituency;
            break;
          case "alliance":
            valueArr = constituenciesCopy.map((c) => {return c.ni})
            constName = constituenciesCopy[valueArr.indexOf(Math.max(...valueArr))].constituency;
            break;
          default:
            valueArr = constituenciesCopy.map((c) => {return c.other})
            constName = constituenciesCopy[valueArr.indexOf(Math.max(...valueArr))].constituency;
            break;
        }

        constituenciesCopy = constituenciesCopy.filter(c => c.constituency != constName)

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

    var consts = constituencyArr.filter((c) => c.country != "Northern Ireland")

    if (eConsts.NATION == grouping) {
      return [consts]
    }
    else if (eConsts.INDIVIDUAL == grouping) {
      return consts.map(c => {
        return [c]
      })
    }

    var listOfGroups = []
    if (eConsts.COUNTY_AND_BUROUGH == grouping) {
      for (let i = 0; i < consts.length; i++) {
        if (listOfGroups.find((e) => e == consts[i].county_name) == null) {
          listOfGroups.push(consts[i].county_name)
        }
      }
    }
    else if (eConsts.REGION == grouping) {
      for (let i = 0; i < consts.length; i++) {
        if (listOfGroups.find((e) => e == consts[i].region) == null) {
          listOfGroups.push(consts[i].region)
        }
      }
      
    }
    else if (eConsts.COUNTRY == grouping) {
      for (let i = 0; i < consts.length; i++) {
        if (listOfGroups.find((e) => e == consts[i].country) == null) {
          listOfGroups.push(consts[i].country)
        }
      }
    }

    let groups = []

    for (let i = 0; i < listOfGroups.length; i++) {
      groups.push([])
    }

    if (eConsts.COUNTY_AND_BUROUGH == grouping) {
      for (let i = 0; i < consts.length; i++) {
        let a = groups[listOfGroups.findIndex((g) => g == consts[i].county_name)].push(consts[i])
      }
    }
    else if (eConsts.REGION == grouping) {
      for (let i = 0; i < consts.length; i++) {
        groups[listOfGroups.findIndex((g) => g == consts[i].region)].push(consts[i])
      }
    }
    else if (eConsts.COUNTRY == grouping) {
      for (let i = 0; i < consts.length; i++) {
        groups[listOfGroups.findIndex((g) => g == consts[i].country)].push(consts[i])
      }
    }

    console.log(groups)

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
    else if (electionParams.typeOfVote == eConsts.RUNOFF) {
      pID = runoffVote(partyResults, mpNumber)
    }
    else if (electionParams.typeOfVote == eConsts.LOSER_TAKES_ALL) {
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
    switch (pID) {
      case "con":
        seatCount.party.con = seatCount.party.con+1;
        break;
      case "lab":
        seatCount.party.lab = seatCount.party.lab+1;
        break;
      case "ld":
        seatCount.party.ld = seatCount.party.ld+1;
        break;
      case "brexit":
        seatCount.party.brexit = seatCount.party.brexit+1;
        break;
      case "green":
        seatCount.party.green = seatCount.party.green+1;
        break;
      case "snp":
        seatCount.party.snp = seatCount.party.snp+1;
        break;
      case "pc":
        seatCount.party.pc = seatCount.party.pc+1;
        break;
      case "dup":
        seatCount.party.ni = seatCount.party.ni+1;
        break;
      case "sf":
        seatCount.party.ni = seatCount.party.ni+1;
        break;
      case "sdlp":
        seatCount.party.ni = seatCount.party.ni+1;
        break;
      case "uup":
        seatCount.party.ni = seatCount.party.ni+1;
        break;
      case "alliance":
        seatCount.party.ni = seatCount.party.ni+1;
        break;
      default:
        seatCount.party.other = seatCount.party.other+1;
        break;
    }

    if (seats.total != seatTotal) {
      seatCount.total = seatCount.total+1
      console.log(seatCount.total)
    }
    if ((seatCount.total == seatTotal)) {
      setSeatData(seatCount)
    }
  }

  const getColour = (pID) => {
    const result = parties.find(party => party.partyID == pID)
    return result.primaryColour
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

    if (winnerWins == false) {
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
      console.log(targetVote)
      console.log(JSON.parse(JSON.stringify(partyResults)))
      winner = partyResults[targetVote];
      console.log(winner)
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
    var winProportion = 1
    var mpsToElect = mpNumber

    if (mpNumber > 1) {
      winProportion = 1/mpNumber
    }

    //correcting tactical vote. we assume there are no tactical votes in Runoff
    partyResults = redistrubuteTacticalVotes(partyResults)

    let runoffResults = []
    partyResults.forEach(p => {
      for (let i = 0; i < mpNumber; i++) {
        runoffResults.push({pName: p.pName, vCount: p.vCount/mpNumber})
      }
    });

    console.log("runoff begins!:")
    //while we still have not selected enough MPs.
    let mostPopular = null
    let winners = []
    while (mpsToElect > 0) {
      if (runoffResults.length == mpsToElect) {
        //seat agained
        mostPopular = runoffResults[0]
        winners.push(mostPopular.pName)
        runoffResults = runoffRedistrubtion(runoffResults, mostPopular)
        console.log("winner!:")
        console.log(mostPopular)
        mpsToElect--
      }
      else {
        //find the biggest winner
        mostPopular = null
        runoffResults.forEach(p => {
          if (mostPopular == null) {
            mostPopular = p;
          }
          else if (p.vCount > mostPopular.vCount) {
            mostPopular = p;
          }
        });
        //does the biggest winner qualify for a seat yet?
        if (mostPopular.vCount >= winProportion) {
          mostPopular.vCount -= winProportion 
          mpsToElect--
          runoffResults = runoffRedistrubtion(runoffResults, mostPopular)
          winners.push(mostPopular.pName)
          console.log("winner!:")
          console.log(mostPopular)
        }
        else {
          var leastPopular = null
          //find the biggest loser
          runoffResults.forEach(p => {
            if (leastPopular == null) {
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

    //same candidate weight = 0
    //same party weight = 50
    //same alignment = 25
    //one alignment off = 15
    //two alignments off = 5
    //else = 1

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
    runoffResults = runoffResults.filter(p => runoffVictim != p)

    console.log(JSON.parse(JSON.stringify(runoffResults)))

    return runoffResults
  }

  const getWeightedArray = (array, compareTo) => {
    return array.map(p => {
      let curPartyLeaning = toLeaning(p.pName) 
      let victimLeaning = toLeaning(compareTo.pName)
      if (p == compareTo) {
        return 0
      }
      else if (p.pName == array.pName) {
        return 200
      }
      else if (curPartyLeaning == victimLeaning) {
        return 50
      }
      else if (Math.abs(curPartyLeaning-victimLeaning) == 1) {
        return 25
      }
      else if (Math.abs(curPartyLeaning-victimLeaning) == 2) {
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
      let party = parties.find(p => pName == p.partyID)
      return eConsts.POLITICAL_DISTANCE(party.leaning)
    } catch (error) {
      console.log(error)
      return 4
    }
  }

  //This redistrubutes the votes from the two best parties in a constituency
  const redistrubuteTacticalVotes = (results) => {
    var temp = results;

    

    var tracker = 0
    
    temp.map(p => {
      tracker+= p.vCount
    })
    var topTwoParties = []

    const extractMaxResult = () => {
      var mostPopular = null
      temp.forEach(p => {
        if (mostPopular == null) {
          mostPopular = p;
        }
        if (p.vCount > mostPopular.vCount) {
          mostPopular = p;
        }
      });
      topTwoParties.push(mostPopular);
      temp = temp.filter(p => mostPopular != p)
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

  const data = resolveResults();

  return (
    <Paper className={classes.paper}>
      <ComposableMap width={1200}
      height={800}
      projectionConfig={{
        center: [0, 55.4],
        rotate: [4.4, 0, 0],
        parallels: [0, 10],
        scale: 4000,
      }}>
        <Geographies geography={ElectoralGeography}>
          {({ geographies }) =>
            geographies.map(geo => {
              var currentDatum = null
              var currentConstituency

              data.forEach(datum => {
                datum.constituencies.map(group => {
                  if ((group.constituency === geo.properties.NAME)) {
                  currentDatum = datum
                  currentConstituency = group.constituency
                  }
                })
              })
              console.log(currentDatum)
              console.log(currentConstituency)

              let colour = null
              try {
                console.log(currentDatum.seatHolders.find(s => currentConstituency == s.constituencyName).mostResponsible)
                colour = getColour(currentDatum.seatHolders.find(s => currentConstituency == s.constituencyName).mostResponsible)
              }
              catch (error) {
                //console.log(geo.properties.NAME)
                console.log(error)
                
                colour = getColour("other")
              }

              var strColour = "#000000"
              var strWidth = 1.125

              
              return <Geography key={geo.rsmKey}
                geography={geo}
                fill={`${colour}`}
                stroke={`${strColour}`}
                strokeWidth={strWidth}/>

            })
          }
        </Geographies>
      </ComposableMap>
    </Paper>
  );
};

export default ElectoralMap;