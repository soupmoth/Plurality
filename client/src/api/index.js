import axios from 'axios';

const constituencyURL = 'https://electoral-plurality.herokuapp.com/constituencies';
const partyURL = 'https://electoral-plurality.herokuapp.com/parties';

export const fetchConstituencies = () => axios.get(constituencyURL);
export const fetchParties = () => axios.get(partyURL);