import axios from 'axios';

const constituencyURL = 'http://localhost:5000/constituencies';
const partyURL = 'http://localhost:5000/parties';

export const fetchConstituencies = () => axios.get(constituencyURL);
export const fetchParties = () => axios.get(partyURL);