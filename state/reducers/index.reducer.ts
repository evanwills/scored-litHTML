import { combineReducers } from '../../node_modules/redux/es/redux'
import { pauseReducer } from './pause.reducer'
import { roundReducer } from './round.reducer'

export const scored = combineReducers({
  end: null,
  config: null,
  pastGames: null,
  pause: pauseReducer,
  scores: null,
  start: null,
  players: null,
  round: roundReducer
})

export default scored
