import { Reducer } from '../../node_modules/redux/index'
import { gamePlayers, IAction, gamePlayersAll } from '../types'



export const gamePlayerReducer : Reducer = (state : gamePlayers , action: IAction) : gamePlayers => {
  return state
}
export const allPlayerReducer : Reducer = (state : gamePlayersAll , action: IAction) : gamePlayersAll => {
  return state
}


