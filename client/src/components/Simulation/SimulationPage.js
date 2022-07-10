import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Grid, CircularProgress} from '@material-ui/core'



import useStyles from './styles';

import ElectoralMap from "./ElectoralMap/ElectoralMap.js"
import ElectoralSeats from "./ElectoralSeats/ElectoralSeats.js";
import ElectoralForm from "./ElectoralForm/ElectoralForm.js"

import * as eConsts from '../../const/electionConsts.js'


const SimulationPage = () => {

    const constituencies = useSelector((state) => state.constituencies)
    const parties = useSelector((state) => state.parties)


    const [seats, setSeatData] = useState(eConsts.STARTING_SEATS)

    const [electionParams, setElectionParams] = useState(eConsts.DEFAULT) 

    console.log (electionParams)

    return (
        !constituencies.length || !parties.length ? <CircularProgress/>: (
            <div>
                <div><ElectoralSeats seats={seats} parties={parties} /></div>
                <br />
                <ElectoralForm electionParams={electionParams} setElectionParams={setElectionParams} setSeatData={setSeatData}/>
                <div><ElectoralMap electionParams={electionParams} seats={seats} setSeatData={setSeatData}/></div>
            </div>
        )
    );
}


export default SimulationPage