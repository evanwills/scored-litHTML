import { TURN, endTurnActionCreator } from '../actions/turn.action'
import { ROUND } from '../actions/round.action'

export const turnMiddleWare = (store) => (next) => (action) => {
  const {round, players} = store.getState()

  switch (action.type) {
    case TURN.SCORE:
      if (typeof action.dispatch === 'undefined') {
        store.dispatch({
          ...action,
          dispatch: true
        })
        store.dispatch(endTurnActionCreator(round.currentTurn))
        // return next(startTurnActionCreator())
        return next({
          type: TURN.START,
          payload: {}
        })
      }
      break

    case TURN.START:
      // need to get a UID for the turn,
      // plus the name and ID of the user whose turn it is.
      break

    case TURN.END:
      if (round.turns.length === (players.all.length - 1)) {
        store.dispatch(action)
        store.dispatch({
          type:
        })
      }
      break
  }
  return next(action)
}
