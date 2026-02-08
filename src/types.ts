import { BoardState } from './store/modules/board'

export interface RootState {
  board: BoardState,
  toolbox: Record<string, never>
}
