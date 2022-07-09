import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

import ElectoralGeography from "./westminster_const_region TRUE3.json"

import "./styles.css"
import { useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";



const ElectoralMap = ({seats, setSeatData}) => {
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

  console.log(constituencies);
  console.log(parties);

  //c being the constituency.
  const determineWinner = (c) => {

    //TODO
    //this solution is really bad, its because of how I formatted the backend. Have a fix in mind
    //for it, but I'll have to test it later. Proof of concept
    const array = [c.con, c.lab, c.ld, c.brexit, c.green, c.snp,
      c.pc, c.dup, c.sf, c.sdlp, c.uup, c.alliance, c.other];
    const highestVote =  Math.max(...array);

    
    let pID = "";
    
    if ((seatCount.total == seatTotal)) {
      setSeatData(seatCount)
    }
    else if (seats.total != seatTotal) {
      seatCount.total = seatCount.total+1
    }
    
    
    switch (highestVote) {
      case c.con:
        seatCount.party.con = seatCount.party.con+1;
        pID = "con";break;
      case c.lab:
        seatCount.party.lab = seatCount.party.lab+1;
        pID = "lab";break;
      case c.ld:
        seatCount.party.ld = seatCount.party.ld+1;
        pID = "ld";break;
      case c.brexit:
        seatCount.party.brexit = seatCount.party.brexit+1;
        pID = "brexit";break;
      case c.green:
        seatCount.party.green = seatCount.party.green+1;
        pID = "green";break;
      case c.snp:
        seatCount.party.snp = seatCount.party.snp+1;
        pID = "snp";break;
      case c.pc:
        seatCount.party.pc = seatCount.party.pc+1;
        pID = "pc";break;
      case c.dup:
        seatCount.party.ni = seatCount.party.ni+1;
        pID = "dup";break;
      case c.sf:
        seatCount.party.ni = seatCount.party.ni+1;
        pID = "sf";break;
      case c.sdlp:
        seatCount.party.ni = seatCount.party.ni+1;
        pID = "sdlp";break;
      case c.uup:
        seatCount.party.ni = seatCount.party.ni+1;
        pID = "uup";break;
      case c.alliance:
        seatCount.party.ni = seatCount.party.ni+1;
        pID = "alliance";break;
      default:
        seatCount.party.other = seatCount.party.other+1;
        pID = "other"; break;

    }

    

    return pID;
    
  };

  const getColour = (pID) => {
    const result = parties.find(party => party.partyID == pID)
    return result.primaryColour
  };


  return (
    !constituencies.length || !parties.length ? <CircularProgress/>: (
      <ComposableMap width={800}
      height={800}
      projectionConfig={{
        center: [0, 55.4],
        rotate: [4.4, 0, 0],
        parallels: [50, 60],
        scale: 4000,
      }}>
        <Geographies geography={ElectoralGeography}>
          {({ geographies }) =>
            geographies.map(geo => {
              const currentConstit = constituencies.find(constit => (constit.constituency) === geo.properties.NAME);
              
              //console.log(currentConstit)

              let colour = null
              try {
                const winner = determineWinner(currentConstit)
                colour = getColour(winner)
              }
              catch (error) {
                console.log(geo.properties.NAME)
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