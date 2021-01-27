import { combineReducers } from "redux";
import ConnectionsReducer from './ConnectionsReducer'
import StatisticsReducer from './StatisticsReducer'


export default combineReducers({
    connections: ConnectionsReducer,
    stats: StatisticsReducer
})