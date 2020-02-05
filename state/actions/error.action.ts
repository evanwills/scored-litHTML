import { IAction, IActionError, StateSlice } from '../utilities/types'
import { E_TYPE, errorTypes } from '../utilities/error.types'


export const errorAC = (replacements: string[], errorType: E_TYPE, action: IAction, state: StateSlice = null) : IActionError => {
  const {name, code, message, replacementCount} = errorTypes[errorType]

  return {
    type: name,
    payload: {
      action: action,
      code: code,
      message: printf(
        replacements,
        message,
        replacementCount
      ),
      state: state,
      type: name
    },
    error: true,
    meta: {
      ...action.meta,
      code: code
    }
  }
}

/**
 * Add strings to a message string to give better error
 * reporting information.
 *
 * @param replacements list of replacement strings in order
 * @param message      message whose contents is to be
 *                     updated
 * @param count        number of replacement strings expected
 */
const printf = (replacements: string[], message: string, count: number) : string => {
  if (replacements.length < count) {
    throw new Error(
      'Error action creator expected ' + count +
      ' replacement strings for {type} but only found ' +
      replacements.length
    )
  }

  let output = message

  for (let a : number = 0; a < count; a += 1) {
    const reg = new RegExp('\{\{' + (a + 1) + '\}\}', 'g')
    message = message.replace(reg, replacements[a])
  }

  return message
}
