/**
 * Redux middleware addNowToAction() appends a "now" property to the
 * actions object before passing it to the next middleware.
 *
 * @property {Date} now date object to be used
 */
export const addNowToAction = (store) => (next) => (action) => {
  if (typeof action.now !== 'undefined') {
    return next(action)
  } else {
    const _now = new Date()

    const actionKeys = Object.keys(action)
    let _modifiedAction = {}
    let tmpKey = ''

    for (let i = 0; i < actionKeys.length; i += 1) {
      tmpKey = actionKeys[i]
      _modifiedAction[tmpKey] = action[tmpKey]
    }

    _modifiedAction.now = _now // raw Date object

    store.dispatch(_modifiedAction)
  }
}
