import { GAME } from '../actions/game.action'

const initialPause = {
  start: null,
  end: null,
  isPaused: false,
  last: 0,
  total: 0,
  log: []
}

export const pauseReducer = (state = initialPause, action) => {
  switch (action.type) {
    case GAME.PAUSE:
      return {
        start: action.payload.now,
        end: null,
        isPaused: true,
        last: state.last,
        total: state.total,
        log: [
          ...state.log,
          {
            type: 'start',
            time: action.payload.now
          }
        ]
      }

    case GAME.RESUME:
      if (action.payload.pausedSeconds > 0) {
        const { now, pausedSeconds } = action.payload
        return {
          start: null,
          end: null,
          isPaused: false,
          last: pausedSeconds,
          total: state.total + pausedSeconds,
          log: [
            ...state.log,
            {
              type: 'end',
              time: now,
              duration: pausedSeconds
            }
          ]
        }
      } else {
        return {
          start: null,
          end: null,
          isPaused: false,
          last: state.last,
          total: state.total,
          log: state.log
        }
      }

    case GAME.PLAY_PAUSE_FAILURE:
      return {
        ...state,
        log: [
          ...state.log,
          {
            type: 'error',
            time: action.payload.now,
            message: action.payload.message,
            mode: (action.payload.isPaused) ? 'PAUSE' : 'RESUME'
          }
        ]
      }
      // if (action.payload.isPaused === true) {
      // } else {
      // }
      // break

    default:
      return state
  }
}
