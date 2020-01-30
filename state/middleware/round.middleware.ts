import { TURN, endTurnActionCreator, startTurnActionCreator } from '../actions/turns.action'
import { ROUND, initialiseRoundActionCreator, finaliseRoundActionCreator } from '../actions/round.action'
import { getTotalScore } from '../reducers/scores.reducer'
import { IGame } from '../types'

export const roundMiddleWare = (store) => (next) => (action) => {
  const currentState : IGame = store.getState()

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
          currentState.round.turns.current.id,
          currentState.scores
        )
        store.dispatch(endTurnActionCreator(totalScore))

        // return next(startTurnActionCreator())
        if (currentState.end === null) {
          return next(startTurnActionCreator())
        } else {
          return next(finaliseRoundActionCreator())
        }
      }
      break

    case TURN.START:
      if (currentState.round.playersInOrder.length === 0) {
        // We've reached the end of the current round
        // Better do all the adding up for this round
        store.dispatch(finaliseRoundActionCreator())

        // Better get everything ready for the next round
        store.dispatch(
          initialiseRoundActionCreator(
            currentState.players.playersSeatOrder,
            currentState.config.playOrder
          )
        )
        // Now we can let the start action do its thing
      }
      // need to get a UID for the turn,
      // plus the name and ID of the user whose turn it is.
      break

    case TURN.END:
      if (currentState.round.playersInOrder.length === (currentState.players.all.length - 1)) {
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
