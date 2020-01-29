/**
 * Redux middleware addNowToAction() appends a "now" property to an
 * action's payload object before passing it to the next middleware.
 *
 * Most actions want a timestamp to allow for logging playing time.
 *
 * @property {Date} now date object to be used
 */
export const addNowToPayloadMiddleware = (store) => (next) => (action) => {
  if (typeof action.now !== 'undefined') {
    return next(action)
  } else {
    const _now = new Date()

    const actionKeys = Object.keys(action)
    const payloadKeys = Object.keys(action.payload)
    let _modifiedAction = {}
    let actionKey = ''
    let payloadKey = ''

    for (let i = 0; i < actionKeys.length; i += 1) {
      actionKey = actionKeys[i]
      if (actionKey !== 'payload') {
        _modifiedAction[actionKey] = action[actionKey]
      } else {
        for (let j = 0; j < payloadKeys.length; j += 1) {
          payloadKey = payloadKeys[j]
          _modifiedAction.payload[payloadKey] = action[payloadKey]
        }
        _modifiedAction.payload.now = _now // raw Date object
      }
    }

    if (typeof _modifiedAction.payload === 'undefined') {
      _modifiedAction.payload = {
        now: _now
      }
    }

    store.dispatch(_modifiedAction)
  }
}
