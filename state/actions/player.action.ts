import { IAction } from "../types"

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

export const addPlayerToGameActionCreator = (_name, _position) : IAction => {
  return {
    type: PLAYER.ADD,
    payload: {
      name: _name,
      position: _position
    }
  }
}

export const updatePlayerActionCreator = (_id, _name, _position) : IAction => {
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
export const scoreTurnActionCreator = (_score : number) : IAction => {
  return {
    type: PLAYER.SCORE_TURN,
    payload: {
      score: _score
    }
  }
}

/**
 * Add a new player to the system.
 * (This is not the same as adding a player to a game)
 *
 * @param _name name of the player being added to the system
 */
export const addNewPlayerActionCreator = (_name : string) => {
  return {
    type: ALL_PLAYERS.ADD,
    payload: {
      score: _name
    }
  }
}

/**
 * Change the name of an existing player
 * (This is not the same as adding a player to a game)
 *
 * @param _name name of the player being added to the system
 */
export const updateExistingPlayerActionCreator = (_name : string) => {
  return {
    type: ALL_PLAYERS.UPDATE,
    payload: {
      score: _name
    }
  }
}

/**
 * Remove an existing player from the system
 * (This means )
 *
 * @param _name name of the player being added to the system
 */
export const deleteExistingPlayerActionCreator = (_id : number) => {
  return {
    type: ALL_PLAYERS.UPDATE,
    payload: {
      score: _id
    }
  }
}
