import { IAction, IWholeScored, IHasName } from '../types'

/**
 * Check whether a given name is already in use
 * @param newName
 * @param items
 */
export const isDuplicateName = (newName: string, items: IHasName[]) : boolean => {
  const callbackFunc = (last : boolean, item : IHasName) : boolean => {
    return (last === false) ? (item.name === newName) : true
  }
  return items.reduce(callbackFunc, false)
}

/**
 * Ensure a name is valid and no longer than 32 characters
 *
 * @param _name name of user or game
 */
export const sanitiseName = (_name: string) : string => {
  // strip invalid characters
  let _output = _name.replace(/[^\w\d&',.\- ]+/ig, ' ')

  // strip duplicate punctuation/space characters
  _output = _output.replace(/([ &,.\-'])$1+/g, '$1')

  // remove punctuation from start and end of string
  _output = _output.replace(/(?:^[0-9&,.\-']+|[&,\-']+$)/g, '')

  if (_output.length > 32) {
    // make sure the name is no longer than 32 characters
    _output = _output.substring(0, 31)
  }

  return _output
}
