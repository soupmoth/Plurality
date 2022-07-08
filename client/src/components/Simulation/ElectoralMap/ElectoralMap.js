import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

import ElectoralGeography from "./westminster_const_region TRUE3.json"

import "./styles.css"
import { useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";



const ElectoralMap = () => {


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

    switch (highestVote) {
      case c.con:
        return "con";
      case c.lab:
        return "lab";
      case c.ld:
        return "ld";
      case c.brexit:
        return "brexit";
      case c.green:
        return "green";
      case c.snp:
        return "snp";
      case c.pc:
        return "pc";
      case c.dup:
        return "dup";
      case c.sf:
        return "sf";
      case c.sdlp:
        return "sdlp";
      case c.uup:
        return "uup";
      case c.alliance:
        return "alliance";
      default:
        return "other";


    }
    
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