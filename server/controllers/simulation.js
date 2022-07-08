import mongoose from 'mongoose';
import Constituencies from '../models/constituency.js';
import Parties from '../models/party.js';

//When we create a post, the server delegates to this controller, and adds the
//post to the database by utilising the model outlined in PostMessage.
export const getConstituencies = async (req, res) => {
    try {
        const constituencies = await Constituencies.find();

        res.status(200).json(constituencies);
        console.log("Got Constituencies");
        
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}

export const getParties = async (req, res) => {
    try {
        const parties = await Parties.find();

        res.status(200).json(parties);
        console.log("Got Parties");
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}
