import { Middleware, Store } from '../../node_modules/redux/index'
import { IAction } from '../utilities/types'

/**
 * source: https://redux.js.org/advanced/middleware/#seven-examples
 *
 * Logs all actions and states after they are dispatched.
 * Note: this is taken directly from the redux documentation
 *       with a little typescript type checking thrown in.
 */
export const loggerMiddleware : Middleware = (store : Store) => (next) => (action : IAction) => {
  console.group(action.type)
  console.info('dispatching', action)

  let result = next(action)

  console.log('next state', store.getState())
  console.groupEnd()

  return result
}
