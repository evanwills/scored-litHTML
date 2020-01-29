import { ROUND } from '../actions/round.action'
import { TURN } from '../actions/turns.action'
import { GAME } from '../actions/game.action'

const initialRound = {
  index: 0,
  currentTurn: null,
  turns: [],
  previous: []
}

export const roundReducer = (state = initialRound, action) => {
  switch (action.type) {
    case ROUND.INITIALISE:
      break
    case ROUND.ADD_TURN:
      break
    case ROUND.UPDATE_TURN:
      break
    case ROUND.FINALISE:
      break
    case TURN.START:
      break
    case TURN.SCORE:
      break
    case TURN.PAUSE:
      break
    case TURN.RESUME:
      break
    case TURN.END:
      break
    case GAME.INITIALISE:
      return initialRound
  }
}
