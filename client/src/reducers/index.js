import { combineReducers } from "redux";

import parties from './parties'
import constituencies from "./constituencies";

export default combineReducers({parties, constituencies});