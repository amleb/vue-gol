import Vue from 'vue'
import Vuex from 'vuex'
import toolbox from './modules/toolbox'
import board from './modules/board'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    toolbox,
    board
  }
})
