import mongoose from "mongoose";

const partySchema = mongoose.Schema({
    partyID: String,
    name: String,
    nVotePercent: Number,
    nVoteCount: Number,
    leaning: String,
    primaryColour: String,
    secondaryColour: String

});

const Parties = mongoose.model("Parties", partySchema)

export default Parties;