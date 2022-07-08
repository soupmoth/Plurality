import React from "react";
import { useSelector } from "react-redux";

import { Grid, CircularProgress} from '@material-ui/core'

import useStyles from './styles';

import ElectoralMap from "./ElectoralMap/ElectoralMap.js"


const SimulationPage = () => {

    return (
            <ElectoralMap />
    );

}


export default SimulationPage