const HISTORY_LENGTH = 5

const state = {
  ticks: 0,
  cells: [],
  history: [],
  prevGen: []
}

const getters = {}

const actions = {}

const mutations = {

  createCells (state, payload) {
    let cells = []

    for (let i = 0; i < payload.columnsNumber; i++) {
      cells[i] = []

      for (let j = 0; j < payload.rowsNumber; j++) {
        cells[i][j] = {isAlive: payload.randomize ? !!Math.round(Math.random()) : false}
      }
    }

    state.cells = cells
    state.prevGen = []
    state.ticks = 0
  },

  tick (state) {
    const currentGen = state.cells
    const columnsNumber = currentGen.length
    const rowsNumber = currentGen[0].length

    if (state.history.length > HISTORY_LENGTH) {
      state.history.shift()
    }
    state.history.push(state.prevGen)

    let nextGenChanges = []

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
        cells[x][y] = {isAlive: nextGenChanges[x][y]}
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
