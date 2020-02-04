type errorType = {
  message: string,
  code: number
}


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
  // --------------------------------------------
  // START: Recoverable user input errors

  BAD_PLAYER_NAME: {
    message: 'Player\'s name contained invalid characters or was too long (or both). Name has been cleand up before submission',
    code: 100
  },

  //  END:  Recoverable user input errors
  // --------------------------------------------
  // START: Unrecoverable user input errors

  DUPLICATE_PLAYER_NAME: {
    message: 'A player with the same name already exists in the system.',
    code: 150
  }

  //  END: Unrecoverable user input errors
  // --------------------------------------------


  // --------------------------------------------
  // START: Recoverable system errors

  //  END:  Recoverable system errors
  // --------------------------------------------
  // START: Unrecoverable system errors

  //  END: Unrecoverable system errors
  // --------------------------------------------


  // --------------------------------------------
  // START: HTTP errors

  //  END:  HTTP errors
  // --------------------------------------------
}


export enum ERROR_TYPES {
  BAD_PLAYER_NAME,
  DUPLICATE_PLAYER_NAME
}
