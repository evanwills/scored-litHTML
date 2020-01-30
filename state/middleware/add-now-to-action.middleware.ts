import { IAction, IActionStamped } from '../types'

/**
 * Redux middleware addNowToIAction() appends a "now" property to an
 * Iaction's payload object before passing it to the next middleware.
 *
 * Most Iactions want a timestamp to allow for logging playing time.
 *
 * @property {Date} now date object to be used
 */
export const addNowToPayloadMiddleware = (store) => (next) => (Iaction : IAction | IActionStamped) => {
  if (typeof (Iaction as IActionStamped).payload.now !== 'undefined') {
    return next(Iaction)
  } else {
    const _now : number = Date.now()

    const IactionKeys : string[] = Object.keys(Iaction)
    const payloadKeys : string[] = Object.keys(Iaction.payload)
    let _modifiedIAction : IActionStamped = {
      type: '',
      payload: {
        now: null
      }
    }
    let IactionKey = ''
    let payloadKey = ''

    for (let i = 0; i < IactionKeys.length; i += 1) {
      IactionKey = IactionKeys[i]
      if (IactionKey !== 'payload') {
        _modifiedIAction[IactionKey] = Iaction[IactionKey]
      } else {
        for (let j = 0; j < payloadKeys.length; j += 1) {
          payloadKey = payloadKeys[j]
          _modifiedIAction.payload[payloadKey] = Iaction[payloadKey]
        }
        _modifiedIAction.payload.now = _now // raw Date object
      }
    }

    if (typeof _modifiedIAction.payload === 'undefined') {
      _modifiedIAction.payload = {
        now: _now
      }
    }

    store.dispatch(_modifiedIAction)
  }
}
