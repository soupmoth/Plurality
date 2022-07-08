
import * as act from '../const/actionTypes.js'

//When an action is dispatched, we come here to handle the logic.
export default (constituencies = [], action) => {
    switch (action.type) {
        case act.FETCH_CONST:
            return action.payload;
        default:
            return constituencies;
    }
}

