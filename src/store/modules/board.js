const HISTORY_LENGTH = 5

const state = {
  ticks: 0,
  cells: [],
  history: [],
  lastCells: []
}

const getters = {}

const actions = {}

const mutations = {

  createCells (state, payload) {
    let cells = []

    for (let i = 0; i < payload.columnsNumber; i++) {
      cells[i] = []

      for (let j = 0; j < payload.rowsNumber; j++) {
        cells[i][j] = {isAlive: false}
      }
    }

    state.cells = cells
    state.lastCells = []
    state.ticks = 0
  },

  tick (state) {
    const previousCells = state.cells
    const columnsNumber = previousCells.length
    const rowsNumber = previousCells[0].length

    if (state.history.length > HISTORY_LENGTH) {
      state.history.shift()
    }
    state.history.push(state.lastCells)

    let changedCells = []

    for (let x = 0; x < columnsNumber; x++) {
      changedCells[x] = []
      let leftColumnExists = typeof previousCells[x - 1] !== 'undefined'
      let rightColumnExists = typeof previousCells[x + 1] !== 'undefined'

      for (let y = 0; y < rowsNumber; y++) {
        const wasAlive = previousCells[x][y].isAlive
        let isAlive = false
        let aliveSiblings = 0
        let topRowExists = typeof previousCells[x][y - 1] !== 'undefined'
        let bottomRowExists = typeof previousCells[x][y + 1] !== 'undefined'

        aliveSiblings += topRowExists && previousCells[x][y - 1].isAlive ? 1 : 0
        aliveSiblings += bottomRowExists && previousCells[x][y + 1].isAlive ? 1 : 0

        if (leftColumnExists) {
          aliveSiblings += topRowExists && previousCells[x - 1][y - 1].isAlive ? 1 : 0
          aliveSiblings += previousCells[x - 1][y].isAlive ? 1 : 0
          aliveSiblings += bottomRowExists && previousCells[x - 1][y + 1].isAlive ? 1 : 0
        }

        if (rightColumnExists) {
          aliveSiblings += topRowExists && previousCells[x + 1][y - 1].isAlive ? 1 : 0
          aliveSiblings += previousCells[x + 1][y].isAlive ? 1 : 0
          aliveSiblings += bottomRowExists && previousCells[x + 1][y + 1].isAlive ? 1 : 0
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
          changedCells[x][y] = isAlive
        }
      }
    }

    state.lastCells = changedCells

    let cells = previousCells.slice(0)
    for (let x = 0; x < columnsNumber; x++) {
      for (let y in changedCells[x]) {
        cells[x][y] = {isAlive: changedCells[x][y]}
      }
    }

    state.ticks += 1
    state.cells = cells
  },

  toggleCell (state, payload) {
    let cells = state.cells.slice(0)
    state.cells[payload.x][payload.y] = {isAlive: !state.cells[payload.x][payload.y].isAlive}
    state.cells = cells
  },

  undo (state) {
    const currentCells = state.cells
    const columnsNumber = currentCells.length
    const changedCells = state.history.pop()
    let cells = currentCells.slice(0)

    for (let x = 0; x < columnsNumber; x++) {
      for (let y in changedCells[x]) {
        cells[x][y] = {isAlive: changedCells[x][y]}
      }
    }

    state.ticks -= 1
    state.cells = cells
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
