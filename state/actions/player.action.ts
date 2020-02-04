import { IAction } from "../types"

export const GAME_PLAYER = {
  ADD: 'Add player to game',
  UPDATE: 'Update game player\'s name',
  REARRANGE: 'Change the seating order of players',
  DEACTIVATE: 'Stop player from having turns'
}

export const ALL_PLAYERS = {
  ADD: 'Add new player',
  UPDATE: 'Update player\'s name',
  DELETE: 'Remove player from list'
}

export const addPlayerToGameAC = (_name, _position) : IAction => {
  return {
    type: GAME_PLAYER.ADD,
    payload: {
      name: _name,
      position: _position
    }
  }
}

export const updatePlayerAC = (_id, _name, _position) : IAction => {
  return {
    type: GAME_PLAYER.UPDATE,
    payload: {
      id: _id,
      name: _name,
      position: _position
    }
  }
}

/**
 * Add a new player to the system.
 * (This is not the same as adding a player to a game)
 *
 * @param _name name of the player being added to the system
 */
export const addNewPlayerAC = (_name : string) => {
  return {
    type: ALL_PLAYERS.ADD,
    payload: {
      name: _name
    }
  }
}

/**
 * Change the name of an existing player
 * (This is not the same as adding a player to a game)
 *
 * @param _name name of the player being added to the system
 */
export const updateExistingPlayerAC = (_name : string) => {
  return {
    type: ALL_PLAYERS.UPDATE,
    payload: {
      name: _name
    }
  }
}

/**
 * Remove an existing player from the system
 * (This means )
 *
 * @param _name name of the player being added to the system
 */
export const dactivateExistingPlayerAC = (_id : number) => {
  return {
    type: ALL_PLAYERS.UPDATE,
    payload: {
      score: _id
    }
  }
}
