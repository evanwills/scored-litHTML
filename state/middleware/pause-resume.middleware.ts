import { GAME } from '../actions/game.action'
import { TURN } from '../actions/turns.action'
import { ErrorAction, StampedAction, StampedTimedAction } from '../types'

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
export const pauseResumeMiddleware = (store) => (next) => (action) => {
  let newAction : StampedAction | StampedTimedAction | ErrorAction = {
    type: '',
    payload: {
      now: null
    }
  }
  const currentStore = store.getState()
  switch (action.type) {
    case GAME.RESUME:
      if (currentStore.pause.start !== null && currentStore.pause.isPaused === true) {
        const seconds = Math.round((action.payload.now.getTime() - currentStore.pause.start.getTime()) / 1000)
        newAction = {
          ...action,
          payload: {
            ...action.payload,
            pausedSeconds: seconds
          }
        }
        // dispatch an additional action to trigger unpausing of the
        // current turn
        currentStore.dispatch({
          ...newAction,
          type: TURN.RESUME
        })
      } else {
        // That's weird we're being asked to resume but are not paused
        newAction = {
          type: GAME.PLAY_PAUSE_FAILURE,
          payload: {
            now: action.payload.now,
            action: action,
            message: 'Resume failed because game was not paused',
            state: currentStore.pause
          }
        }
      }
      return next(newAction)

    case GAME.PAUSE:
      // Test if the action is valid and trigger a log event if not.
      if (currentStore.pause.isPaused === true || currentStore.pause.start !== null || currentStore.pause.end !== null) {
        newAction = {
          type: GAME.PLAY_PAUSE_FAILURE,
          payload: {
            now: action.payload.now,
            action: action,
            message: 'Pause failed because game was already paused',
            state: currentStore.pause
          }
        }
        return next(newAction)
      }
  }
  return next(action)
}
