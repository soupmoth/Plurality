import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Grid, CircularProgress} from '@material-ui/core'

import useStyles from './styles';

import ElectoralMap from "./ElectoralMap/ElectoralMap.js"
import ElectoralSeats from "./ElectoralSeats/ElectoralSeats.js";


const SimulationPage = () => {

    const constituencies = useSelector((state) => state.constituencies)
    const parties = useSelector((state) => state.parties)

    const [seats, setSeatData] = useState({
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
    })

    console.log(seats.total)

    return (
        !constituencies.length || !parties.length ? <CircularProgress/>: (
            <div>
                <div><ElectoralSeats seats={seats} parties={parties} /></div>
                <br />
                <div><ElectoralMap seats={seats} setSeatData={setSeatData}/></div>
            </div>
        )
    );
}


export default SimulationPage