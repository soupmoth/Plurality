import React, { useState, useEffect } from "react";

import "./styles.js"
import { useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";

import {AxisOptions, Chart} from "react-charts";


  
  type Parties = {
    name: string,
    count: number,
  }

  type Series = {
    label: string
    data: Parties[]
  }


const ElectoralSeats = ({seats, parties}) => {

    const primaryAxis = React.useMemo(
        (): AxisOptions<Parties> => ({
          getValue: datum => datum.name,
          position: "left",
          scaleType: "band",
        }),
        []
      )
    
      const secondaryAxes = React.useMemo(
        (): AxisOptions<Parties>[] => ([{
          position: "bottom",
          getValue: datum => datum.count,
          scaleType: "band",
        }]),
        []
      )

    function findPartyName(pID:string):string {
      try {
        console.log(parties.find(party => party.partyID == pID).name)
        return parties.find(party => party.partyID == pID).name
      }
      catch (error) {
        console.log(error)
        return "ERROR"
      }
    }

    const partyData: Parties[] = [
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
        name: "Northen",
        count: seats.ni,
      },
      {
        name: "Independants/Other",
        count: seats.other,
      },
    ]

    const data : Series[] = [
      {
        label: "Seats Won",
        data: partyData,
      }
    ]

    console.log(data)

    try {
      return (
        <>
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
          }}
          />
        </>
      )
    }
    catch (error) {
      return (
        <>
        </>
      )
    }
    
}


export default ElectoralSeats;