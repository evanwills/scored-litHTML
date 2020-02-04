import { Reducer } from '../../node_modules/redux/index'
import { gamePlayers, IAction, gamePlayersAll } from '../types'
import { ALL_PLAYERS } from '../actions/player.action'



export const gamePlayerReducer : Reducer = (state : gamePlayers , action: IAction) : gamePlayers => {
  return state
}
export const allPlayerReducer : Reducer = (state : gamePlayersAll , action: IAction) : gamePlayersAll => {
  switch (action.type) {
    case ALL_PLAYERS.ADD:
      const _index = state.index + 1
      return {
        index: _index,
        players: [
          ...state.players,
          {
            id: _index,
            name: action.payload.name,
            active: true
          }
        ],
        playerGames: state.playerGames
      }

    case ALL_PLAYERS.UPDATE:
      return {
        ...state,
        players: state.players.map(player => {
          if (player.id === action.payload.id) {
            return {
              ...player,
              name: action.payload.name
            }
          } else {
            return player
          }
        })
      }

    case ALL_PLAYERS.DELETE:
      return {
        ...state,
        players: state.players.map(player => {
          if (player.id === action.payload.id) {
            return {
              ...player,
              active: false
            }
          } else {
            return player
          }
        })
      }
  }
  return state
}


