import Vue from 'vue'
import Vuex from 'vuex'
import toolbox from './modules/toolbox'
import board from './modules/board'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    toolbox,
    board
  }
})
