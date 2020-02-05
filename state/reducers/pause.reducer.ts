import { Reducer } from '../../node_modules/redux/index'
import { GAME } from '../actions/game.action'
import { IPause, IPauseLog, IPauseFailLog, IActionStamped, PAUSE_LOG_TYPE } from '../utilities/types'

const initialPause : IPause = {
  start: null,
  end: null,
  isPaused: false,
  pauses: [],
  totalPauseTime: 0,
  log: []
}

export const pauseReducer : Reducer = (state : IPause = initialPause, action : IActionStamped ) : IPause => {
  switch (action.type) {
    case GAME.PAUSE:
      return {
        start: action.meta.now,
        end: null,
        isPaused: true,
        log: [
          ...state.log,
          {
            error: false,
            mode: PAUSE_LOG_TYPE.PAUSE,
            time: action.meta.now
          }
        ],
        pauses: state.pauses,
        totalPauseTime: state.totalPauseTime,
      }

    case GAME.RESUME:
      if (action.payload.pauseDuration > 0) {
        const { pauseDuration } = action.payload
        return {
          start: null,
          end: null,
          isPaused: false,
          log: [
            ...state.log,
            {
              error: false,
              mode: PAUSE_LOG_TYPE.RESUME,
              time: action.meta.now
            }
          ],
          pauses: state.pauses,
          totalPauseTime: state.totalPauseTime + pauseDuration
        }
      } else {
        return {
          start: null,
          end: null,
          isPaused: false,
          log: state.log,
          pauses: state.pauses,
          totalPauseTime: state.totalPauseTime
        }
      }

    case GAME.PLAY_PAUSE_FAILURE:
      return {
        ...state,
        log: [
          ...state.log,
          {
            error: true,
            time: action.meta.now,
            message: action.payload.message,
            mode: (action.payload.isPaused) ? PAUSE_LOG_TYPE.PAUSE : PAUSE_LOG_TYPE.RESUME
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
