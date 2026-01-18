import { Injectable, computed, signal } from '@angular/core'
import { CellState, GameConfig, GameWinner } from '../models';

@Injectable({ providedIn: 'root' })
export class GameService {
  private readonly config: GameConfig = {
    gridSize: 10,
    winScore: 10,
  }
  private readonly totalCells = this.config.gridSize ** 2
  private readonly _grid = signal<CellState[]>(
    Array(this.totalCells).fill(CellState.DEFAULT),
  )

  private activeIndex: number | null = null
  private timer?: ReturnType<typeof setTimeout>
  private reactionTime = 1000

  public readonly grid = computed(() => this._grid())
  public readonly playerScore = signal(0)
  public readonly computerScore = signal(0)
  public readonly isRunning = signal(false)
  public readonly showResultModal = signal(false)
  public readonly winner = signal<GameWinner | null>(null)

  public startGame(time: number): void {
    this.reset()
    this.reactionTime = time
    this.isRunning.set(true)
    this.nextRound()
  }

  public reset(): void {
    this._grid.set(Array(this.totalCells).fill(CellState.DEFAULT))
    this.playerScore.set(0)
    this.computerScore.set(0)
    this.isRunning.set(false)
    this.showResultModal.set(false)
    this.winner.set(null)
    this.stopTimer()
  }

  public clickCell(index: number): void {
    if (!this.isRunning() || index !== this.activeIndex) return

    this.paintCell(index, CellState.SUCCESS)
    this.playerScore.update(v => v + 1)
    this.stopTimer()

    this.checkWinner()
    if (this.isRunning()) this.nextRound()
  }

  private nextRound(): void {
    const freeCells: number[] = []

    const grid = this._grid()
    for (let i = 0; i < grid.length; i++) {
      if (grid[i] === CellState.DEFAULT) freeCells.push(i)
    }

    if (!freeCells.length) return

    const index = freeCells[(Math.random() * freeCells.length) | 0]
    this.activeIndex = index

    this.paintCell(index, CellState.ACTIVE)

    this.timer = setTimeout(() => {
      this.paintCell(index, CellState.FAIL)
      this.computerScore.update(v => v + 1)

      this.checkWinner()
      if (this.isRunning()) this.nextRound()
    }, this.reactionTime)
  }

  private paintCell(index: number, state: CellState): void {
    this._grid.update(grid => {
      const newGrid = grid.slice()
      newGrid[index] = state
      return newGrid
    })
  }

  private checkWinner(): void {
    if (this.playerScore() >= this.config.winScore) {
      this.finish(GameWinner.PLAYER)
    } else if (this.computerScore() >= this.config.winScore) {
      this.finish(GameWinner.COMPUTER)
    }
  }

  private finish(winner: GameWinner): void {
    this.isRunning.set(false)
    this.winner.set(winner)
    this.showResultModal.set(true)
    this.stopTimer()
  }

  private stopTimer(): void {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = undefined
    }
  }
}
