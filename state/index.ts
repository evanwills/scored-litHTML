import { createStore } from 'redux'
import { scored } from './reducers/index.reducer'
import { initialState } from './initial-state'

const scoredApp = createStore(scored, initialState)
