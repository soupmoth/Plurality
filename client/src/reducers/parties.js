
import * as act from '../const/actionTypes.js'

export default (parties = [], action) => {
    switch (action.type) {
        case act.FETCH_PARTIES:
            return action.payload;
        default:
            return parties;
    }
}