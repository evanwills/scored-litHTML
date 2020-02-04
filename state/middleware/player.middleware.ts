
import { ALL_PLAYERS } from '../actions/player.action'
import { IAction, IWholeScored, IPlayerSimple } from '../types'
import { Middleware, Store } from '../../node_modules/redux/index.d'
import { errorTypes, ERROR_TYPES } from '../utilities/error.types'

/**
 * Validate player names before adding them to the system
 * @param store
 */
export const gamePlayersAllMiddleware : Middleware = (store : Store) => (next) => (action : IAction) => {
  switch (action.type) {
    case ALL_PLAYERS.ADD:
    case ALL_PLAYERS.UPDATE:
      const _name = action.payload.name.trim()
      const _sanitised = sanitiseName(_name)

      if (_name !== _sanitised) {
        store.dispatch({
          type: ERROR_TYPES.BAD_PLAYER_NAME,
          payload: {
            now: action.meta.now,
            extraMessage: 'Sanitised version: "' + _sanitised + '" was stored',
            type: errorTypes.BAD_PLAYER_NAME,
            state: null,
            action: action
          },
          error: true
        })
      } else {
        const _currentState : IWholeScored = store.getState()
        if (isDuplicateName(action.payload.name, _currentState.allPlayers.players)) {
          // Can't work around a duplicate name
          return next({
            type: ERROR_TYPES.DUPLICATE_PLAYER_NAME,
            payload: {
              now: action.meta.now,
              extraMessage: 'Cannot use "' + _sanitised + '"',
              type: errorTypes.DUPLICATE_PLAYER_NAME,
              state: null,
              action: action
            },
            error: true
          })
        }
      }

      return next({
        ...action,
        payload: {
          ...action.payload,
          name: _sanitised
        }
      })

    default:
      next(action)
  }
}

const isDuplicateName = (newName: string, players: IPlayerSimple[]) : boolean => {
  const callbackFunc = (last : boolean, player : IPlayerSimple) : boolean => {
    return (last === false) ? (player.name === newName) : true
  }
  return players.reduce(callbackFunc, false)
}


const sanitiseName = (_name: string) : string => {
  // strip invalid characters
  let _output = _name.replace(/[^\w\d&',.\- ]+/ig, ' ')
  // strip duplicate punctuation/space characters
  _output = _output.replace(/([ &,.\-'])$1+/g, '$1')
  // make sure the name is no longer than 32 characters
  if (_output.length > 32) {
    _output = _output.substring(0, 31)
  }

  return _output
}
