
export const initialState = {
  end: null,
  config: {
    allowNegative: false,
    clockwise: true,
    endMode: 'Current player',
    minScore: 0,
    maxScore: 0,
    name: '',
    playOrder: 'Seating position',
    trackTime: true
  },
  pastGames: [],
  pause: {
    start: null,
    end: null,
    isPaused: false,
    last: 0,
    total: 0,
    log: []
  },
  scores: [],
  start: null,
  players: {
    index: 0,
    all: []
  },
  round: {
    index: 0,
    currentTurn: null,
    turns: [],
    previous: []
  }
}
