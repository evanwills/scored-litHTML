
export const TURN = {
  START: 'START_TURN',
  SCORE: 'SCORE_TURN',
  END: 'END_TURN',
  PAUSE: 'PAUSE_TURN',
  RESUME: 'RESUME_TURN'
}

export const startTurnActionCreator = (playerID) => {
  return {
    type: TURN.START,
    payload: {
      id: playerID
    }
  }
}

export const pauseTurnActionCreator = (playerID, score) => {
  return {
    type: TURN.START,
    payload: {
      id: playerID,
      score: score
    }
  }
}

export const resumeTurnActionCreator = (playerID, score) => {
  return {
    type: TURN.START,
    payload: {
      id: playerID,
      score: score
    }
  }
}

export const scoreTurnActionCreator = (playerID, score) => {
  return {
    type: TURN.START,
    payload: {
      id: playerID,
      score: score
    }
  }
}

export const endTurnActionCreator = (turn) => {
  return {
    type: TURN.START,
    payload: {
      turn: turn
    }
  }
}
