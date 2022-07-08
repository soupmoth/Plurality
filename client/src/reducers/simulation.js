
import * as act from '../const/actionTypes.js'

//When an action is dispatched, we come here to handle the logic.
export default (simulation = [], action) => {
    switch (action.type) {
        case act.FETCH_CONST:
            //return api data from Fetch All action
            return action.payload;
        default:
            return simulation;
    }
}