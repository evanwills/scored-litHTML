
export const initialState = {
  ended: null,
  config: {
    clockwise: true,
    endMode: 'Current player',
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
    current: [],
    previous: []
  }
}
