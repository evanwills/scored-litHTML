
import { ALL_PLAYERS, GAME_PLAYER } from '../actions/player.action'
import { IAction, IWholeScored, IPlayerSimple, IActionError } from '../utilities/types'
import { Middleware, Store } from '../../node_modules/redux/index.d'
import { E_TYPE } from '../utilities/error.types'
import { getPlayerByID, isDuplicateName, sanitiseName } from '../utilities/name.utils'
import { errorAC } from '../actions/error.action'


// ========================================================
// START: Redux reducer

export const gamePlayersMiddleware : Middleware = (store : Store) => (next) => (action : IAction) => {
  let errorAction : IActionError = null

  switch (action.type) {
    case GAME_PLAYER.ADD:
      const {allPlayers, currentGame} : IWholeScored = store.getState()
      const _playerID : number = action.payload.id
      // Get the player's basic details
      const _player : IPlayerSimple = getPlayerByID(
        _playerID,
        allPlayers.players
      )

      // Check whether the player is already listed in the game
      if (getPlayerByID(_playerID, currentGame.players.all) !== null) {
        // You're a duffa. You've already added that player
        store.dispatch(
          errorAC(
            [_player.name, `{_playerID}`],
            E_TYPE.PLAYER_ALREADY_ADDED,
            action
          )
        )
      } else if (_player === null) {
        // Check whether the player exists

        // That's odd! No player!
        // Send an error
        store.dispatch(
          errorAC(
            [`{_playerID}`],
            E_TYPE.PLAYER_NOT_FOUND,
            action
          )
        )
      } else if (_player.active === false) {
        // Something weird is going on here.
        // Can't add an inactive player to a game
        store.dispatch(
          errorAC(
            [_player.name, `{_playerID}`],
            E_TYPE.CANT_ADD_INACTIVE_PLAYER,
            action
          )
        )
      } else {
        // All good!!! Go and do what needs doing
        return next({
          ...action,
          payload: {
            player: {..._player}
          }
        })
      }
      break;

    default:
      next(action)
  }
}

/**
 * Validate player names before adding them to the system
 * @param store
 */
export const playersAllMiddleware : Middleware = (store : Store) => (next) => (action : IAction) => {
  switch (action.type) {
    case ALL_PLAYERS.UPDATE:
    case ALL_PLAYERS.ADD:
      const _name = action.payload.name.trim()
      const _sanitised = sanitiseName(_name)
      if (_name !== _sanitised) {
        store.dispatch(
          errorAC(
            [_sanitised],
            E_TYPE.BAD_PLAYER_NAME,
            action
          )
        )
      }
      const _currentState : IWholeScored = store.getState()

      if (isDuplicateName(_sanitised, _currentState.allPlayers.players)) {
        // Can't work around a duplicate name
        return next(
          errorAC(
            [_sanitised],
            E_TYPE.DUPLICATE_PLAYER_NAME,
            action
          )
        )
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


//  END:  Redux reducer
// ========================================================
