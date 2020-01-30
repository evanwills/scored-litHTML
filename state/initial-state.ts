import { IWholeScored, END_MODE, PLAY_ORDER } from './types'

export const initialState : IWholeScored = {
  allPlayers: {
    index: 0,
    players: []
  },
  currentGame: null,
  defaultConfig: {
    allowNegative: false,
    clockwise: true,
    endMode: END_MODE.CURRENT_PLAYER,
    minScore: 0,
    maxScore: 0,
    name: '',
    playOrder: PLAY_ORDER.SEATING_POSTION,
    trackTime: true
  },
  pastGames: []
}
