import { TURN, endTurnAC, startTurnAC } from '../actions/turns.action'
import { ROUND, initialiseRoundAC, finaliseRoundAC } from '../actions/round.action'
import { getTotalScore } from '../utilities/score.utils'
import { IAction, IWholeScored } from '../utilities/types'
import { Middleware, Store } from '../../node_modules/redux/index'

export const roundMiddleWare : Middleware = (store : Store) => (next) => (action : IAction) => {
  const currentState : IWholeScored = store.getState()
  const { config, end, players, round, scores } = currentState.currentGame

  switch (action.type) {
    case TURN.SCORE:
      // We don't want an infinite loop so lets add
      if (typeof action.meta.dispatched === 'undefined') {
        store.dispatch({
          type: action.type,
          payload: {
            ...action.payload,
            totalScore: getTotalScore(
              round.turns.current.playerID,
              scores
            )
          },
          error: action.error,
          meta: {
            ...action.meta,  // let myslef know I've seen this
            dispatched: true // particular action before
          }
        })

        // Now that the score has been processed, we can end the turn
        store.dispatch(endTurnAC())

        if (end === null) {
          return next(startTurnAC())
        } else {
          return next(finaliseRoundAC())
        }
      }
      break

    case TURN.START:
      if (round.playersInOrder.length === 0) {
        // We've reached the end of the current round
        // Better do all the adding up for this round
        store.dispatch(finaliseRoundAC())

        // Better get everything ready for the next round
        store.dispatch(
          initialiseRoundAC(
            players.playersSeatOrder,
            config.playOrder
          )
        )
        // Now we can let the start action do its thing
      }
      break

    case TURN.END:
      if (round.playersInOrder.length === (players.all.length - 1)) {
        store.dispatch(action)
        // store.dispatch({
        //   type:
        // })
      }
      break

    case ROUND.INITIALISE:
      break

    case ROUND.ADD_TURN:
      break

    case ROUND.UPDATE_TURN:
      break

    case ROUND.FINALISE:
      break;
  }
  return next(action)
}
