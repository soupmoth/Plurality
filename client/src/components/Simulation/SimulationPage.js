import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Grid, CircularProgress} from '@material-ui/core'

import useStyles from './styles';

import ElectoralMap from "./ElectoralMap/ElectoralMap.js"
import ElectoralSeats from "./ElectoralSeats/ElectoralSeats";


const SimulationPage = () => {
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

    return (
        <div>
            <div><ElectoralSeats seats={seats}/></div>
            <div><ElectoralMap seats={seats} setSeatData={setSeatData}/></div>
        </div>
    );
}


export default SimulationPage