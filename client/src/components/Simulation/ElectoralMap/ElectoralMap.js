import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

import ElectoralGeography from "./westminster_const_region TRUE3.json"

import "./styles.css"
import { useSelector } from "react-redux";



const ElectoralMap = () => {


  const constituencies = useSelector((state) => state.constituencies)
  const parties = useSelector((state) => state.parties)

  console.log(constituencies);
  console.log(parties);

  const determineWinner = (constituency) => {
    
  };


  return (
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
            geographies.map(geo => (
                <Geography key={geo.rsmKey} geography={geo}/>
            ))
          }
        </Geographies>
      </ComposableMap>
    
  );
};

export default ElectoralMap;