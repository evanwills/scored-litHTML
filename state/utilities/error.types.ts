


/**
 * This represents a definitive list of errors the *scored*
 * app knows about and can handle
 *
 * 100 - 149 errors are user input errors that *scored* can
 *                  work around
 * 150 - 199 errors are user input errors that *scored*
 *                  cannot fix
 * 200 - 249 errors are application errors where the
 *                  developer has made a mistake but
 *                  *scored* can recover
 * 250 - 299 errors are application errors where something
 *                  has gone wrong and *scored* cannot
 *                  revover
 * 300 - 599 errors are reserved for standard HTTP response
 *                  error codes
 */
export const errorTypes = {
  // ============================================
  // START: recoverable errors

  // --------------------------------------------
  // START: Recoverable user input errors

  BAD_PLAYER_NAME: {
    name: 'BAD_PLAYER_NAME',
    message: 'Player\'s name contained invalid characters or was too long (or both). Name has been cleand up before submission. Using: "{{1}}"',
    code: 100
  },

  //  END:  Recoverable user input errors
  // --------------------------------------------
  // START: Recoverable system errors

  PLAYER_ALREADY_ADDED: {
    name: 'PLAYER_ALREADY_ADDED',
    message: 'Player "{{1}}" (#{{2}}) has already been added to the game.',
    code: 150
  },
  CANT_ADD_INACTIVE_PLAYER: {
    name: 'CANT_ADD_INACTIVE_PLAYER',
    message: 'Cannot add an inactive player "{{1}}" (#{{2}}) to the game',
    code: 151
  },

  //  END:  Recoverable system errors
  // --------------------------------------------


  //  END:  recoverable errors
  // ============================================
  // START: unrecoverable errors


  // --------------------------------------------
  // START: Unrecoverable user input errors

  DUPLICATE_PLAYER_NAME: {
    name: 'DUPLICATE_PLAYER_NAME',
    message: 'A player with the name "{{1}}" (#{{2}}) already exists in the system.',
    code: 200
  },

  //  END: Unrecoverable user input errors
  // --------------------------------------------
  // START: Unrecoverable system errors

  PLAYER_NOT_FOUND: {
    name: 'PLAYER_NOT_FOUND',
    message: 'Could not find player matching the specified ID: {{1}}',
    code: 250
  }

  //  END:  Unrecoverable system errors
  // --------------------------------------------


  // --------------------------------------------
  // START: HTTP errors

  //  END:  HTTP errors
  // --------------------------------------------

  //  END:  unrecoverable errors
  // ============================================
}

export enum E_TYPE {
  BAD_PLAYER_NAME,
  PLAYER_ALREADY_ADDED,
  CANT_ADD_INACTIVE_PLAYER,
  DUPLICATE_PLAYER_NAME,
  PLAYER_NOT_FOUND
}
