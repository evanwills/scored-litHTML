import GAME from '../actions/game'
import TURN from '../actions/turns'

export const pauseResume = (store) => (next) => (action) => {
  let newAction = {}
  switch (action.type) {
    case GAME.RESUME:
      if (store.pause.start !== null && store.pause.isPaused === true) {
        const seconds = Math.round((action.payload.now.getTime() - store.pause.start.getTime()) / 1000)
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
            now: action.payload.now,
            isPaused: false,
            message: 'Resume failed because game was not paused',
            state: store.pause
          }
        }
      }
      return next(newAction)
    case GAME.PAUSE:
      if (store.pause.isPaused === true || store.pause.start !== null || store.pause.end !== null) {
        newAction = {
          type: GAME.PLAY_PAUSE_FAILURE,
          payload: {
            now: action.payload.now,
            isPaused: true,
            message: 'Pause failed because game was already paused',
            state: store.pause
          }
        }
        return next(newAction)
      }
  }
  return next(action)
}
