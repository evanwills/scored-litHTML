import { createStore, applyMiddleware } from '../../node_modules/redux/es/redux'
import { Store } from '../../node_modules/redux/index.d'
import scoredReducers from './reducers/index.reducer'
import { addNowToMetaMiddleware } from './middleware/add-now-to-action.middleware'
import { pauseResumeMiddleware } from './middleware/pause-resume.middleware'
import { roundMiddleWare } from './middleware/round.middleware'
import { loggerMiddleware } from './middleware/logger.middleware'

const store : Store = createStore(
  scoredReducers,
  applyMiddleware(
    addNowToMetaMiddleware,
    loggerMiddleware,
    pauseResumeMiddleware,
    roundMiddleWare
  )
)
