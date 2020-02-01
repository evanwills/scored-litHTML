import { ITurnComplete, IAction, SCORE_SORT_METHOD, FILTER_BY_PROP } from '../types'
import { pureSort, ICompare } from '../utilities/functional-sort'

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
 * get a callback function to be used by Array.sort()
 *
 * @param whichScore which score should the sort be based on
 */
const sortByScore = (whichScore : SCORE_SORT_METHOD = SCORE_SORT_METHOD.round) : ICompare => (turnA : ITurnComplete, turnB: ITurnComplete ) : number => {
  if (turnA.score[whichScore] < turnB.score[whichScore]) {
    return -1
  } else if (turnA.score[whichScore] > turnB.score[whichScore]) {
    return 1
  } else {
    return 0
  }
}

/**
 * get a callback function to be used by Array.filter()
 *
 * @param whichType which type of score (ITurn) should be returned
 * @param id        row or player UID to filter by
 */
const filterByType = (whichType : FILTER_BY_PROP, id: number) => (item: ITurnComplete) : boolean {
  return (item[whichType] === id)
}

const sortTurns = (
  filteredTurns: ITurnComplete[],
  sortedBy : SCORE_SORT_METHOD = SCORE_SORT_METHOD.order
) => {
  switch (sortedBy) {
    case SCORE_SORT_METHOD.round:
    case SCORE_SORT_METHOD.total:
      return pureSort(filteredTurns, sortByScore(sortedBy))

    default:
      return filteredTurns
  }
}


/**
 * Get all the turns for a player round.
 *
 * @param allScores all the scores (ITurns) recored so far
 * @param id        UID of the round to be retrieved
 * @param sortedBy  the order in which to retrieve the turns
 */
export const getPlayerTurns = (
  allScores: ITurnComplete[],
  id: number,
  sortedBy : SCORE_SORT_METHOD = SCORE_SORT_METHOD.order
) : ITurnComplete[] => {
  return sortTurns(
    allScores.filter(
      filterByType(FILTER_BY_PROP.playerID, id)
    ),
    sortedBy
  )
}

/**
 * Get all the turns for a given round.
 *
 * @param allScores all the scores (ITurns) recored so far
 * @param id        UID of the round to be retrieved
 * @param sortedBy  the order in which to retrieve the turns
 */
export const getRoundTurns = (
  allScores: ITurnComplete[],
  id: number,
  sortedBy : SCORE_SORT_METHOD = SCORE_SORT_METHOD.order
) : ITurnComplete[] => {
  return sortTurns(
    allScores.filter(
      filterByType(FILTER_BY_PROP.id, id)
    ),
    sortedBy
  )
}

/**
 * Get the cumulative score for a given player
 *
 * @param playerID ID for the player we want the score total for
 * @param allScores All the scores from all the player
 */
export const getTotalScore = (allScores: ITurnComplete[], playerID : number) => {
  return allScores.reduce(getTotalScoreReducer(playerID), 0)
}


export const scoresReducer = (state : ITurnComplete[] = [], action: IAction) => {
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
