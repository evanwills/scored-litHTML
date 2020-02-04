
import { PLAY_ORDER, IPlayerPlaying, IAction} from '../types'

export const ROUND = {
  INITIALISE: 'INITIALISE_ROUND',
  ADD_TURN: 'ADD_TURN_TO_ROUND',
  UPDATE_TURN: 'UPDATE_ROUND_TURN',
  FINALISE: 'FINALISE_ROUND'
}

export const initialiseRoundAC = (playersSeatOrder : IPlayerPlaying[], playOrder: PLAY_ORDER ) : IAction => {
  return {
    type: ROUND.INITIALISE,
    payload: {
      playOrder: playOrder,
      playersSeated: playersSeatOrder
    }
  }
}
export const finaliseRoundAC = () => {
  return {
    type: ROUND.FINALISE,
    payload: {}
  }
}
