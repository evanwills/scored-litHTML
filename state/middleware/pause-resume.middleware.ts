import { GAME } from '../actions/game.action'
import { TURN } from '../actions/turns.action'
import { IActionStamped, IWholeScored, IGameActive } from '../utilities/types'
import { Middleware, Store } from '../../node_modules/redux/index'

/**
 * pauseResume() handles adding the paused time (in seconds) to
 * appropriate actions. It also intercepts bad pause/resume actions
 * and kills them. Instead it creates a log only action for logging
 * the problem.
 *
 * pauseResume() must be run after addNowToAction() middleware
 * because it relies on the Date object added by that middleware.
 *
 * @param {Store} store Redux store
 */
export const pauseResumeMiddleware : Middleware = (store: Store) => (next) => (action) => {
  let newAction : IActionStamped = null

  const currentStore : IWholeScored = store.getState()
  const game : IGameActive = currentStore.currentGame

  switch (action.type) {
    case GAME.RESUME:
      if (game.pause.start !== null && game.pause.isPaused === true) {
        const seconds = Math.round((action.meta.now - game.pause.start) / 1000)
        newAction = {
          ...action,
          payload: {
            ...action.payload,
            pausedSeconds: seconds
          }
        }
        // dispatch an additional action to trigger unpausing of the
        // current turn
        store.dispatch({
          ...newAction,
          type: TURN.RESUME
        })
      } else {
        // That's weird we're being asked to resume but are not paused
        newAction = {
          type: GAME.PLAY_PAUSE_FAILURE,
          payload: {
            action: action,
            message: 'Resume failed because game was not paused',
            state: game.pause
          },
          error: true,
          meta: action.meta
        }
      }
      return next(newAction)

    case GAME.PAUSE:
      // Test if the action is valid and trigger a log event if not.
      if (game.pause.isPaused === true || game.pause.start !== null || game.pause.end !== null) {
        newAction = {
          type: GAME.PLAY_PAUSE_FAILURE,
          payload: {
            action: action,
            message: 'Pause failed because game was already paused',
            state: game.pause
          },
          error: true,
          meta: action.meta
        }

        // no need to trigger an aditional action because
        // GAME.PAUSE actions already have all the info
        // they need for the TURN reducer to process them
        return next(newAction)
      }
  }
  return next(action)
}
