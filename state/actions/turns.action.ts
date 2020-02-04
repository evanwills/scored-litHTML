import { IAction } from '../types'

export const TURN = {
  START: 'Start a player\'s turn',
  SCORE: 'Enter a score for the current player',
  SCORE_END: 'Enter a score for the current player and remove them from play',
  SCORE_END_GAME: 'Enter a score for the current player and end the game',
  END: 'END_TURN',
  PAUSE: 'PAUSE_TURN',
  RESUME: 'RESUME_TURN'
}

export const startTurnAC = () : IAction => {
  return {
    type: TURN.START,
    payload: {}
  }
}

export const pauseTurnAC = () : IAction => {
  return {
    type: TURN.PAUSE,
    payload: {}
  }
}

export const resumeTurnAC = () : IAction => {
  return {
    type: TURN.RESUME,
    payload: {}
  }
}

export const scoreTurnAC = (score : number) : IAction => {
  return {
    type: TURN.START,
    payload: {
      score: score
    }
  }
}

export const endTurnAC = () : IAction => {
  return {
    type: TURN.END,
    payload: {}
  }
}
