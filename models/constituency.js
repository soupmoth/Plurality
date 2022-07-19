import mongoose from "mongoose";

const constituencySchema = mongoose.Schema({
    constituency: String,
    county_name: String,
    region: String,
    country: String,
    constituency_type: String,
    electorate: Number,
    votes: Number,
    con: Number,
    lab: Number,
    ld: Number,
    brexit: Number,
    green: Number,
    snp: Number,
    pc: Number,
    dup: Number,
    sf: Number,
    sdlp: Number,
    uup: Number,
    alliance: Number,
    other: Number,
}, {collection : 'constituencies'});

const Constituencies = mongoose.model(`Constituencies`, constituencySchema)

export default Constituencies;