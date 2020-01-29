

export interface StampedPayload {
  now: Date
}

export interface StampedTimedPayload extends StampedPayload {
  now: Date,
  seconds: number
}

export interface ErrorPayload extends StampedPayload {
  now: Date,
  message: string,
  state: object,
  action: Action
}

export interface Action {
  type: string,
  payload: object
}

export interface StampedAction extends Action {
  type: string,
  payload: StampedPayload
}

export interface StampedTimedAction extends Action {
  type: string,
  payload: StampedTimedPayload
}

export interface ErrorAction extends Action {
  type: string,
  payload: ErrorPayload
}

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
  GAME_LEADER = 'Game leader'
}

