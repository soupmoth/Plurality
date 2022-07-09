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
        count: seats.con,
      },
      {
        name: findPartyName("lab"),
        count: seats.lab,
      },
      {
        name: findPartyName("ld"),
        count: seats.ld,
      },
      {
        name: findPartyName("brexit"),
        count: seats.brexit,
      },
      {
        name: findPartyName("green"),
        count: seats.green,
      },
      {
        name: findPartyName("snp"),
        count: seats.snp,
      },
      {
        name: findPartyName("pc"),
        count: seats.pc,
      },
      {
        name: "Northen Ireland",
        count: seats.ni,
      },
      {
        name: "Independants/Other",
        count: seats.other,
      },
    ]

    console.log(seats)

    return (
      <div>
        <h1>totalSeats = {seats.total}</h1>
        <div>
          {partyData.map(party => {
            return <p>{party.name}: {party.seats}</p>
          })}
        </div>
      </div>
    )
    
}


export default ElectoralSeats;