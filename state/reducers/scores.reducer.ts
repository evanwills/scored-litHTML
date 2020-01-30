import { ITurnComplete, IAction } from '../types'

export const SCORE = {
  ADD: 'Add score',
  UPDATE: 'Update past score'
}

/**
 * Generate a callback function that can be passed to Array.reduce()
 *
 * @param id ID of the player whose scores we want to sum
 */
const getTotalScoreReducer = (id : number) => (oldTotal:number, turn:ITurnComplete) => {
  if (turn.playerID === id) {
    return oldTotal + turn.score.round
  } else {
    return oldTotal
  }
}

/**
 *
 * @param playerID ID for the player we want the score total for
 * @param allScores All the scores from all the player
 */
export const getTotalScore = (playerID : number, allScores: ITurnComplete[]) => {
  return allScores.reduce(getTotalScoreReducer(playerID), 0)
}


export const scoresReducer = (state = [], action: IAction) => {
  switch (action.type) {
    case SCORE.ADD:
      return [...state, ...action.payload.turns]

    case SCORE.UPDATE:
      const {id, score} = action.payload
      return state.map((thisTurn : ITurnComplete) => {
        if (thisTurn.id === id) {
          return {
            ...thisTurn,
            score: {
              round: score,
              total: thisTurn.score.total - thisTurn.score.round + score
            }
          }
        } else {
          return thisTurn
        }
      })

    default:
      return state
  }
}
