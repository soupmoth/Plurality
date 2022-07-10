import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

import ElectoralGeography from "./westminster_const_region TRUE3.json"

import "./styles.css"
import { useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";

import * as eConsts from '../../../const/electionConsts.js'



const ElectoralMap = ({electionParams, seats, setSeatData}) => {
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

  //TODO, create method build groups which builds groups of constituencies, then returns an array
  //of these groups, which is then used by resolveResults.
  //const buildGroups

  //build groups works on 4 modes.
  //INDIVIDUAL - Looks at number of MPs per constituency, groups every constituency to match. 
  //For Individual, the smallest constituencies are prioritised.
  //BUROUGH and COUNTY - looks at the counties and burough a Constituency is in, then builds
  //a group of the constituencies in those spaces
  //REGION - looks at the regions a constituency is in, and groups them with other similar
  //constituencies
  //NATION - all constituencies are linked

  //all constituencies in Northen Ireland are to be excluded for now.
  

  //c being the constituency.
  const determineWinner = (c, mpNumber) => {

    //TODO
    //this solution is really bad, its because of how I formatted the backend. Have a fix in mind
    //for it, but I'll have to test it later. Proof of concept
    var array = [{pName: "con", vCount : c.con}, {pName: "lab", vCount : c.lab}, 
    {pName: "ld", vCount : c.ld}, {pName: "brexit", vCount : c.brexit}, 
    {pName: "green", vCount : c.green}, {pName: "snp", vCount : c.snp}, 
    {pName: "pc", vCount : c.pc}, {pName: "dup", vCount : c.dup}, {pName: "sf", vCount : c.sf},
    {pName: "sdlp", vCount : c.sdlp}, {pName: "uup", vCount : c.uup},
    {pName: "alliance", vCount : c.alliance}, {pName: "other", vCount : c.other}];

    array = array.filter(e => {
      return e.vCount>0
    })

    let pID = "";

    if (electionParams.typeOfVote === eConsts.PLURALITY) {
      pID = pluralityVote(array, true, mpNumber);
    }
    else if (electionParams.typeOfVote == eConsts.RUNOFF) {
      pID = runoffVote(array, mpNumber)
    }
    else if (electionParams.typeOfVote == eConsts.LOSER_TAKES_ALL) {
      pID = pluralityVote(array, false, mpNumber);
    }

    return pID;
  };

  //handle winners increments a seat
  const handleWinners = (pID) => {
    incrementSeats(pID)

    //pIDs.forEach(pID => {
    //  incrementSeats(pID)
    //});
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
    var rawResults = partyResults.map(p => {
      let resultsTemp = p.vCount
      return resultsTemp
    })

    var targetVote = null

    if (winnerWins == true) {
        targetVote = Math.max(...rawResults);
    }
    else {
        targetVote = Math.min(...rawResults);
    }

    const winners = partyResults.find((p) => p.vCount === targetVote).pName


    handleWinners(winners)
    
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
    var totalVotes = 0
    partyResults.map(p => {
      totalVotes = totalVotes + p.vCount
    })

    var winProportion = 0.5
    if (mpNumber > 2) {
      winProportion = 1/mpNumber
    }

    var portionedResults = partyResults

    portionedResults.map(p => {
      p.vCount = p.vCount/totalVotes
    })


    //correcting tactical vote. we assume there are no tactical votes in Runoff
    portionedResults = redistrubuteTacticalVotes(portionedResults)

    var runoffResults = []
    portionedResults.forEach(p => {
      for (let i = 0; i < mpNumber; i++) {
        runoffResults.push({pName: p.pName, vCount: p.vCount/mpNumber})
      }
    });

    var mpsSelected = 0;
    //while we still have not selected enough MPs.
    var mostPopular = null
    while (mpsSelected < mpNumber) {
      
      if (runoffResults.length==1) {
        handleWinners(runoffResults[0].pName)
        mpsSelected++
        return runoffResults[0].pName
      }
      else {
        //find the biggest winner
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
        handleWinners(mostPopular.pName)
        runoffResults = runoffRedistrubtion(runoffResults, mostPopular)
        mpsSelected++
        return 
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
    return mostPopular.pName
  }

  const runoffRedistrubtion = (runoffResults, runoffVictim) => {
    let newCap = 1-runoffVictim.vCount
    let normaliseMult = 1/newCap

    runoffResults = runoffResults.filter(p => runoffVictim != p)

    runoffResults.map(r => {
      r.vCount = r.vCount*normaliseMult
    })

    return runoffResults
  }

  //This redistrubutes the votes from the two best parties in a constituency
  const redistrubuteTacticalVotes = (results) => {
    var temp = results;

    var topTwoParties = []

    const extractMaxResult = (r) => {
      var mostPopular = null
      r.forEach(p => {
        if (mostPopular == null) {
          mostPopular = p;
        }
        if (p.vCount > mostPopular.vCount) {
          mostPopular = p;
        }
      });
      topTwoParties.push(mostPopular);
      r.filter(p => mostPopular != p)
    }

    extractMaxResult(temp);
    extractMaxResult(temp);

    let topPartiesMax = 0
    let topPartiesMult = 0
    let minorPartiesMax = 0
    let minorPartiesMult = 0
    topTwoParties.map(p => {
      topPartiesMax = p.vCount + topPartiesMax
    })
    minorPartiesMax = 1-topPartiesMax

    topPartiesMult = ((1-electionParams.tacticalVoteProportion) * topPartiesMax)
    minorPartiesMult = ((electionParams.tacticalVoteProportion * topPartiesMax) + minorPartiesMax)/minorPartiesMax

    topTwoParties.map(p => {
      p.vCount = p.vCount*topPartiesMult
    })

    temp.map(p => {
      p.vCount = p.vCount*minorPartiesMult
    })

    temp.concat(topTwoParties)

    return temp

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
        <Geographies geography={ElectoralGeography}>
          {({ geographies }) =>
            geographies.map(geo => {
              const currentConstit = constituencies.find(constit => (constit.constituency) === geo.properties.NAME);
              
              //console.log(currentConstit)

              let colour = null
              try {
                const winner = determineWinner(currentConstit, electionParams.noOfMPsPerConst)
                colour = getColour(winner)
              }
              catch (error) {
                //console.log(geo.properties.NAME)
                console.log(error)
                
                colour = getColour("other")
              }
              
              return <Geography key={geo.rsmKey}
                geography={geo}
                fill={`${colour}`}/>

            })
          }
        </Geographies>
      </ComposableMap>
    )
  );
};

export default ElectoralMap;