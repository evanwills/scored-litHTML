export const GAME = {
  INITIALISE: 'INITIALISE_GAME',
  START: 'START_GAME',
  PAUSE: 'PAUSE_GAME',
  RESUME: 'RESUME_GAME',
  END: 'END_GAME',
  PLAY_PAUSE_FAILURE: 'PLAY_PAUSE_FAILURE'
}

/**
 * Set the game to paused (i.e. stop counting the time)
 */
export const pauseGameAC = () => {
  return {
    type: GAME.PAUSE,
    payload: {}
  }
}

/**
 * Set the game to paused (i.e. stop counting the time)
 */
export const resumeGameAC = () => {
  return {
    type: GAME.RESUME,
    payload: {}
  }
}

/**
 * Set the game to paused (i.e. stop counting the time)
 */
export const endGameAC = () => {
  return {
    type: GAME.END,
    payload: {}
  }
}

/**
 *
 * @param {string}  _name      Name of the game being played
 * @param {boolean} _clockwise Whether turns a taken in a clockwise
 *                             or counter clockwise order
 * @param {string}  _endMode   How the game ends
 * @param {string}  _playOrder Play order for the start of each round.
 */
export const initialiseGameAC = (_name, _clockwise, _endMode, _playOrder) => {
  return {
    type: GAME.INITIALISE,
    payload: {
      name: _name,
      clockWise: _clockwise,
      endMode: _endMode,
      playOrder: _playOrder
    }
  }
}

/**
 *
 * @param {string}  _firstPlayer First player to take a turn
 */
export const startGameAC = (_firstPlayer) => {
  return {
    type: GAME.START,
    payload: {
      firstPlayer: _firstPlayer
    }
  }
}
