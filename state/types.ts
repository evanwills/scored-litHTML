// ========================================================
// START: interface declarations


// ----------------------------------------------
// START: action interfaces

export interface IAction {
  type: string,
  payload: IPayload
}

export interface IActionError extends IAction {
  type: string,
  payload: IPayloadError
}

export interface IActionStamped extends IAction {
  type: string,
  payload: IPayloadStamped
}

export interface IActionStampedTimed extends IAction {
  type: string,
  payload: IPayloadStampedTimed
}

//  END: action interfaces
// ----------------------------------------------


export interface IConfig {
  allowNegative: boolean,
  clockwise: boolean,
  endMode: END_MODE,
  minScore?: number,
  maxScore?: number,
  name: string,
  playOrder: PLAY_ORDER,
  trackTime: boolean
}

export interface IGame {
  end: number,
  config: IConfig,
  pause: IPause,
  scores: ITurnComplete[],
  start: number,
  players: IPlayers,
  round: IRound
}

export interface IPause {
  start: number,
  end: number,
  isPaused: boolean,
  pauses: number[],
  totalPauseTime: number,
  log: IPauseLog[]
}

export interface IPauseLog {
  time: number,
  type: PAUSE_ACTION
}

//  END:  pause interfaces
// ----------------------------------------------
// START: payload intefaces

export interface IPayload {
  id?: number,
  dispatched?: boolean,
  now?: number,
  score?: number,
  totalScore?: number,
  message?: string,
  state?: object,
  action?: IAction,
  playOrder?: PLAY_ORDER,
  playersSeated?: IPlayerSimple[]
  turn?: ITurnComplete,
  turns?: ITurnComplete[],
}

export interface IPayloadError extends IPayloadStamped {
  now: number,
  seconds?: number
  message: string,
  state: object,
  action: IAction
}

export interface IPayloadStamped extends IPayload {
  now: number,
  seconds?: number,
  message?: string,
  state?: object,
  action?: IAction
}

/**
 * StampedTimedPayload is used by resume actions
 */
export interface IPayloadStampedTimed extends IPayloadStamped {
  now: number,
  seconds: number,
  message?: string,
  state?: object,
  action?: IAction
}

//  END:  payload interfaces
// ----------------------------------------------
// START: player(s) intefaces


/**
 * IPlayer object are used for tracking statistical information
 * about a player in the current game
 */
export interface IPlayer extends IPlayerSimple {
  id: number,
  name: string,
  scoreIDs: number[],
  position: number,
  rank: number,
  turns: number,
  totalScore: number,
  totalPaused: number,
  totalPlayed: number
}

export interface IPlayerSimple {
  id: number,
  name: string,
}

export interface IPlayers {
  index: number,
  all: IPlayer[],
  playersSeatOrder: IPlayerSimple[]
  finalResult?: ITurnComplete[]
  // playerPositions: number[]
}

//  END:  player(s) interfaces
// ----------------------------------------------


export interface IRound {
  index: number,
  turns: {
    index: number,
    current: ITurn,
    played: ITurnComplete[]
  },
  playersInOrder: IPlayerSimple[],
  winnerID?: number,
  leaderID?: number
}

// ----------------------------------------------
// START: turn interfaces

export interface ITurn {
  id: number,
  playerID: number,
  playOrder: number,
  start: number,
  pauseDuration: number
  end?: number,
  score: {
    round: number,
    total?: number
  }
}

/**
 * ITurnComplete represents a finalised turn that has been ranked and stored
 * in the scores array it should be immutable
 */
export interface ITurnComplete extends ITurn {
  id: number,
  roundIndex: number,
  playerID: number,
  playOrder: number,
  start: number,
  end: number,
  score: {
    round: number,
    total: number
  },
  pauseDuration: number,
  rank: {
    round: number,
    overall: number
  }
}

//  END:  turn interfaces
// ----------------------------------------------
export interface IWholeScored {
  allPlayers: {
    index: number,
    players: IPlayerSimple[]
  },
  defaultConfig: IConfig
  currentGame: IGame,
  pastGames: IGame[],
}

// ----------------------------------------------
// START: turn interfaces

//  END:  interface declarations
// ========================================================
// START: enum declarations

export enum END_MODE {
  CURRENT_PLAYER = 'Current player',
  END_ROUND = 'End of current round',
  MIN_MAX_SCORE = 'Min/Max score'
}

/**
 * Play order defines who the first player will be at the start of
 * each round
 *
 * @const {object}
 */
export enum PLAY_ORDER {
  SEATING_POSTION = 'Seating position',
  ROUND_WINNER = 'Round winner',
  TRICK = 'Trick',
  GAME_LEADER = 'Game leader',
  NEXT = 'Next player'
}

export enum PAUSE_ACTION {
  start,
  end
}
