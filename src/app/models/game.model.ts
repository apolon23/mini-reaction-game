export const CellState = {
  DEFAULT: 'default',
  ACTIVE: 'active',
  SUCCESS: 'success',
  FAIL: 'fail',
} as const

export type CellState = typeof CellState[keyof typeof CellState]

export const GameWinner = {
  PLAYER: 'Player',
  COMPUTER: 'Computer',
} as const

export type GameWinner = typeof GameWinner[keyof typeof GameWinner]

export interface GameConfig {
  gridSize: number
  winScore: number
}
