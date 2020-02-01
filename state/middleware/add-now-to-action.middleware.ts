import { IAction, IActionStamped } from '../types'
import { Middleware, Store } from '../../node_modules/redux/index'

/**
 * Redux middleware addNowToPayloadMiddleware() appends a
 * "now" property to an Iaction's payload object before
 * passing it to the next middleware.
 *
 * Many "scored" actions want a timestamp to allow for
 * logging playing time.
 *
 * @property {Date} now date object to be used
 */
export const addNowToPayloadMiddleware : Middleware = (store : Store) => (next) => (action : IAction | IActionStamped) => {
  if (typeof action.payload.now !== 'number') {
    return next(action)
  } else {
    const _modifiedIAction : IActionStamped = {
      type: action.type,
      payload: {
        ...action.payload,
        now: Date.now()
      },
      error: (typeof action.error === 'undefined' || action.error === null ) ? false : action.error,
      meta: (typeof action.meta === 'undefined') ? {} : action.meta
    }

    store.dispatch(_modifiedIAction)
  }
}
