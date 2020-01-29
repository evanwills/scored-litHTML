import { createStore } from '../../node_modules/redux/es/redux'
import { scored } from './reducers/index.reducer'
import { initialState } from './initial-state'

const scoredApp = createStore(scored, initialState)
