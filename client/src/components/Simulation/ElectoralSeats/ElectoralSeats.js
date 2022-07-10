import React, { useState, useEffect } from "react";

import "./styles.js"
import { useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";

import {AxisOptions, Chart} from "react-charts";



const ElectoralSeats = ({seats, parties}) => {

    function findPartyName(pID) {
      try {
        console.log(parties.find(party => party.partyID == pID).name)
        return parties.find(party => party.partyID == pID).name
      }
      catch (error) {
        console.log(error)
        return "ERROR"
      }
    }

    const partyData = [
      {
        name: findPartyName("con"),
        count: seats.party.con,
      },
      {
        name: findPartyName("lab"),
        count: seats.party.lab,
      },
      {
        name: findPartyName("ld"),
        count: seats.party.ld,
      },
      {
        name: findPartyName("brexit"),
        count: seats.party.brexit,
      },
      {
        name: findPartyName("green"),
        count: seats.party.green,
      },
      {
        name: findPartyName("snp"),
        count: seats.party.snp,
      },
      {
        name: findPartyName("pc"),
        count: seats.party.pc,
      },
      {
        name: "Northen Ireland",
        count: seats.party.ni,
      },
      {
        name: "Independants/Other",
        count: seats.party.other,
      },
    ]

    console.log(partyData)

    return (
      <div>
        <h1>totalSeats = {seats.total}</h1>
        <div>
          {partyData.map(party => {
            return <p>{party.name}: {party.count}</p>
          })}
        </div>
      </div>
    )
    
}


export default ElectoralSeats;