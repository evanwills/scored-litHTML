import { Reducer } from '../../node_modules/redux/index'
import { ROUND } from '../actions/round.action'
import { TURN } from '../actions/turns.action'
import { GAME } from '../actions/game.action'
import { IAction, IRound, PLAY_ORDER, IPlayerSimple} from '../types'

const initialRound : IRound = {
  index: 0,
  turns: {
    index: 0,
    current: null,
    played: []
  },
  playersInOrder: []
}

/**
 * Returns a reducer callback function with the ID of the player who
 * should go first in the next round curried into the callback
 * function.
 *
 * Returned function is to be passed to Array.reduce()
 *
 * @param starterID
 */
const getStarterIndexReducer = (starterID: number) => (currentI: number, player : IPlayerSimple , newI: number) => {
  if (player.id === starterID) {
    return newI
  } else {
    return currentI
  }
}

/**
 * Returns the players in the order they should play the next
 * round
 *
 * @param playersSeated players listed in their seating order
 *                      (based on their first round)
 * @param starterID     id of the player who should start the
 *                      next round
 */
const getPlayersInOrder = (
  playersSeated : IPlayerSimple[],
  starterID : number
) : IPlayerSimple[] => {
  if (playersSeated[0].id === starterID) {
    // The player who started last round should start the next
    // round as well
    return playersSeated
  } else {
    const starterIndex = playersSeated.reduce(
      getStarterIndexReducer(starterID),
      0
    )

    // Get new array with the starter player first
    const firstGroup = playersSeated.slice(starterIndex)

    // Get what was the start of the array (up to but not including
    // the player who should start the next round)
    const nextGroup = playersSeated.slice(0, starterIndex - 1)

    // Return a new array with all the players but in a new order.
    return [...firstGroup, ...nextGroup]
  }
}

/**
 *
 * NOTE: this reduce relies heavily on roundMiddleWare() to ensure
 *       it gets actions with the right data
 *
 * @param state the slice of redux state concerned with rounds
 * @param action any action passing through redux
 */
export const roundReducer : Reducer = (
  state : IRound = initialRound,
  action : IAction
) : IRound => {
  const {type, payload} = action
  switch (type) {
    case ROUND.INITIALISE:
      let playersInOrder : IPlayerSimple[] = null;

      switch (payload.playOrder) {
        case PLAY_ORDER.ROUND_WINNER:
          playersInOrder = getPlayersInOrder(
            payload.playersSeated,
            state.winnerID
          )
          break;

        // case PLAY_ORDER.TRICK:
          // Not sure how to implement this yet
          // break;

        case PLAY_ORDER.GAME_LEADER:
          playersInOrder = getPlayersInOrder(
            payload.playersSeated,
            state.leaderID
          )
          break;

        case PLAY_ORDER.NEXT:
          playersInOrder = getPlayersInOrder(
            payload.playersSeated,
            payload.playersSeated[1].id
          )
          break;

        case PLAY_ORDER.SEATING_POSTION:
        default:
          playersInOrder = payload.playersSeated
          break;
      }

      return {
        ...initialRound,
        index: state.index += 1,
        playersInOrder: playersInOrder
      }

    case ROUND.ADD_TURN:
      break
    case ROUND.UPDATE_TURN:
      break
    case ROUND.FINALISE:
      break
    case TURN.START:
      break
    case TURN.SCORE:
      break
    case TURN.PAUSE:
      break
    case TURN.RESUME:
      break
    case TURN.END:
      break
    case GAME.INITIALISE:
      return initialRound

    default:
      return state
  }
}
