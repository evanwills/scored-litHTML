import { combineReducers } from '../../node_modules/redux/es/redux'
import { pauseReducer } from './pause.reducer'
import { roundReducer } from './round.reducer'
import { gamePlayerReducer, allPlayerReducer } from './player.reducer'
import { pastGameReducer } from './past-games.reducer'
import { scoresReducer } from './scores.reducer'
import { gameConfigReducer, DefaultConfigReducer } from './config.reducer'
import { startReducer, endReducer } from './start-end.reducer'

const scoredReducers = combineReducers({
  allPlayers: allPlayerReducer,
  currentGame: combineReducers({
    end: startReducer,
    config: gameConfigReducer,
    pause: pauseReducer,
    players: gamePlayerReducer,
    round: roundReducer,
    scores: scoresReducer,
    start: endReducer,
  }),
  defautlConfig: DefaultConfigReducer,
  pastGames: pastGameReducer
})

export default scoredReducers
