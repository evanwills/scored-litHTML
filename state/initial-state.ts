import { playerGameJoin, IWholeScored, END_MODE, PLAY_ORDER } from './types'

export const initialState : IWholeScored = {
  allPlayers: {
    index: 0,
    players: [],
    playerGames: []
  },
  currentGame: null,
  defaultConfig: {
    allowNegative: false,
    endMode: END_MODE.CURRENT_PLAYER,
    minScore: 0,
    maxScore: 0,
    playOrder: PLAY_ORDER.SEATING_POSTION,
    scoreBonuses: false,
    trackTime: true
  },
  pastGames: {
    index: 0,
    games: [],
    playerGames: []
  }
}
