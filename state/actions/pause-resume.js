export const GAME = {
  INITIALISE: 'INITIALISE_GAME',
  START: 'START_GAME',
  PAUSE: 'PAUSE_GAME',
  RESUME: 'RESUME_GAME',
  END: 'END_GAME'
}

export const END_MODE = {
  CURRENT_PLAYER: "Current player",
  "End of current round",
  "Min/Max score"
}

/**
 * Set the game to paused (i.e. stop counting the time)
 *
 * @param {Date} _time Time action was created
 */
export const pauseGameActionCreator = (_time) => {
  return {
    type: GAME.PAUSE
  }
}


/**
 * Set the game to paused (i.e. stop counting the time)
 *
 * @param {Date} _time Time action was created
 */
export const resumeGameActionCreator = (_time) => {
  return {
    type: GAME.RESUME
  }
}

/**
 *
 * @param {string} _name
 * @param {boolean} _clockwise
 */
export const initialiseGameActionCreator = (_name, _clockwise) => {
  return {
    type: GAME.INITIALISE,
    payload: {
      name: _name
    }
  }
}
