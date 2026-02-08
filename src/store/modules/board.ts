const HISTORY_LENGTH = 5

export interface Cell {
  isAlive: boolean
}

export type Generation = Cell[][]
export type GenerationChanges = Array<Array<boolean | undefined>>

export interface BoardState {
  ticks: number,
  generation: Generation,
  history: GenerationChanges[],
  prevGen: GenerationChanges
}

export interface CreateCellsPayload {
  columnsNumber: number,
  rowsNumber: number,
  randomize: boolean
}

export interface ToggleCellPayload {
  x: number,
  y: number
}

const state: BoardState = {
  ticks: 0,
  generation: [],
  history: [],
  prevGen: []
}

const getters = {}

const actions = {}

const mutations = {

  createCells (state: BoardState, payload: CreateCellsPayload) {
    let cells: Generation = []

    for (let i = 0; i < payload.columnsNumber; i++) {
      cells[i] = []

      for (let j = 0; j < payload.rowsNumber; j++) {
        cells[i][j] = {isAlive: payload.randomize ? !!Math.round(Math.random()) : false}
      }
    }

    state.generation = cells
    state.prevGen = []
    state.ticks = 0
  },

  tick (state: BoardState) {
    const currentGen = state.generation
    const columnsNumber = currentGen.length
    const rowsNumber = currentGen[0].length

    if (state.history.length > HISTORY_LENGTH) {
      state.history.shift()
    }
    state.history.push(state.prevGen)

    let nextGenChanges: GenerationChanges = []

    for (let x = 0; x < columnsNumber; x++) {
      nextGenChanges[x] = []
      let leftColumnExists = typeof currentGen[x - 1] !== 'undefined'
      let rightColumnExists = typeof currentGen[x + 1] !== 'undefined'

      for (let y = 0; y < rowsNumber; y++) {
        const wasAlive = currentGen[x][y].isAlive
        let isAlive = false
        let aliveSiblings = 0
        let topRowExists = typeof currentGen[x][y - 1] !== 'undefined'
        let bottomRowExists = typeof currentGen[x][y + 1] !== 'undefined'

        aliveSiblings += topRowExists && currentGen[x][y - 1].isAlive ? 1 : 0
        aliveSiblings += bottomRowExists && currentGen[x][y + 1].isAlive ? 1 : 0

        if (leftColumnExists) {
          aliveSiblings += topRowExists && currentGen[x - 1][y - 1].isAlive ? 1 : 0
          aliveSiblings += currentGen[x - 1][y].isAlive ? 1 : 0
          aliveSiblings += bottomRowExists && currentGen[x - 1][y + 1].isAlive ? 1 : 0
        }

        if (rightColumnExists) {
          aliveSiblings += topRowExists && currentGen[x + 1][y - 1].isAlive ? 1 : 0
          aliveSiblings += currentGen[x + 1][y].isAlive ? 1 : 0
          aliveSiblings += bottomRowExists && currentGen[x + 1][y + 1].isAlive ? 1 : 0
        }

        if (aliveSiblings < 2) {
          isAlive = false
        } else if (aliveSiblings > 3) {
          isAlive = false
        } else if (wasAlive && (aliveSiblings === 2 || aliveSiblings === 3)) {
          isAlive = true
        } else if (!wasAlive && aliveSiblings === 3) {
          isAlive = true
        }

        if (isAlive !== wasAlive) {
          nextGenChanges[x][y] = isAlive
        }
      }
    }

    state.prevGen = nextGenChanges

    let cells = currentGen.slice(0)
    for (let x = 0; x < columnsNumber; x++) {
      for (let y in nextGenChanges[x]) {
        cells[x][Number(y)] = {isAlive: !!nextGenChanges[x][Number(y)]}
      }
    }

    state.ticks += 1
    state.generation = cells
  },

  toggleCell (state: BoardState, payload: ToggleCellPayload) {
    let cells = state.generation.slice(0)
    state.generation[payload.x][payload.y] = {isAlive: !state.generation[payload.x][payload.y].isAlive}
    state.generation = cells
  },

  undo (state: BoardState) {
    const currentCells = state.generation
    const columnsNumber = currentCells.length
    const changedCells = state.history.pop()
    let cells = currentCells.slice(0)

    if (!changedCells) {
      return
    }

    for (let x = 0; x < columnsNumber; x++) {
      for (let y in changedCells[x]) {
        cells[x][Number(y)] = {isAlive: !!changedCells[x][Number(y)]}
      }
    }

    state.ticks -= 1
    state.generation = cells
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
