export const PLAYER = {
  ADD: 'Add player to game',
  UPDATE: 'Update game player',
  SCORE_TURN: 'Score turn',
  DELETE: 'Remove player form game'
}

export const ALL_PLAYERS = {
  ADD: 'Add new player',
  UPDATE: 'Update player\'s name',
  DELETE: 'Remove player from list'
}

export const addPlayerActionCreator = (_name, _position) => {
  return {
    type: PLAYER.ADD,
    payload: {
      name: _name,
      position: _position
    }
  }
}

export const updatePlayerActionCreator = (_id, _name, _position) => {
  return {
    type: PLAYER.UPDATE,
    payload: {
      id: _id,
      name: _name,
      position: _position
    }
  }
}

/**
 * Create an action object for scoring a turn
 *
 * @param {number} _id
 * @param {number} _score
 * @param {Date} _endTime
 * @param {number} _pausedTime
 *
 * @returns {object}
 */
export const scoreTurnActionCreator = (_id, _score, _endTime, _pausedTime) => {
  return {
    type: PLAYER.SCORE_TURN,
    payload: {
      id: _id,
      score: _score,
      endTime: _endTime,
      paused: _pausedTime
    }
  }
}
