import axios from 'axios';

const simulationURL = 'http://localhost:5000/simulation';

export const fetchConstituencies = () => axios.get(simulationURL);