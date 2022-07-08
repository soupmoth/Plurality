import * as api from '../api';
import * as act from '../const/actionTypes.js'



//Action creators

//this is dispatched to when 
export const getConstituencies = () => async (dispatch) => {

    try {
        const {data} = await api.fetchConstituencies();

        dispatch({ type: act.FETCH_CONST, payload: data});
    } catch (error) {
        console.log(error);
    }
}
