import { createStore, applyMiddleware } from '../../node_modules/redux/es/redux'
import { scoredReducers } from './reducers/index.reducer'
import { addNowToPayloadMiddleware } from './middleware/add-now-to-action.middleware'
import { pauseResumeMiddleware } from './middleware/pause-resume.middleware'
import { roundMiddleWare } from './middleware/round.middleware'
// import { initialState } from './initial-state'

const store = createStore(
  scoredReducers,
  applyMiddleware(
    addNowToPayloadMiddleware,
    pauseResumeMiddleware,
    roundMiddleWare
  )
)
