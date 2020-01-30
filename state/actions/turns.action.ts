import { IAction } from '../types'

export const TURN = {
  START: 'START_TURN',
  SCORE: 'SCORE_TURN',
  END: 'END_TURN',
  PAUSE: 'PAUSE_TURN',
  RESUME: 'RESUME_TURN'
}

export const startTurnActionCreator = () : IAction => {
  return {
    type: TURN.START,
    payload: {}
  }
}

export const pauseTurnActionCreator = () : IAction => {
  return {
    type: TURN.PAUSE,
    payload: {}
  }
}

export const resumeTurnActionCreator = () : IAction => {
  return {
    type: TURN.RESUME,
    payload: {}
  }
}

export const scoreTurnActionCreator = (score : number) : IAction => {
  return {
    type: TURN.START,
    payload: {
      score: score
    }
  }
}

export const endTurnActionCreator = (total: number) : IAction => {
  return {
    type: TURN.END,
    payload: {
      totalScore: total
    }
  }
}
