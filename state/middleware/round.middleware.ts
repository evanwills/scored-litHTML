import { TURN, endTurnActionCreator, startTurnActionCreator } from '../actions/turns.action'
import { ROUND, initialiseRoundActionCreator, finaliseRoundActionCreator } from '../actions/round.action'
import { getTotalScore } from '../reducers/scores.reducer'
import { IAction, IWholeScored } from '../types'

export const roundMiddleWare = (store) => (next) => (action : IAction) => {
  const currentState : IWholeScored = store.getState()
  const { config, end, players, round, scores } = currentState.currentGame

  switch (action.type) {
    case TURN.SCORE:
      // We don't want an infinite loop so lets add
      if (typeof action.dispatched === 'undefined') {
        store.dispatch({
          ...action,       // let myslef know I've seen this
          dispatched: true // particular action before
        })
        // Now that the score has been processed, we can end the turn

        /**
         * The most up-to-date total score for the current player
         */
        const totalScore = getTotalScore(
          scores,
          round.turns.current.playerID
        )
        store.dispatch(endTurnActionCreator(totalScore))

        if (end === null) {
          return next(startTurnActionCreator())
        } else {
          return next(finaliseRoundActionCreator())
        }
      }
      break

    case TURN.START:
      if (round.playersInOrder.length === 0) {
        // We've reached the end of the current round
        // Better do all the adding up for this round
        store.dispatch(finaliseRoundActionCreator())

        // Better get everything ready for the next round
        store.dispatch(
          initialiseRoundActionCreator(
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
