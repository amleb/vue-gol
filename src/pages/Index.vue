<template>
  <div id="board-container">
    <board-component></board-component>
    <br/>
    <button v-on:click="undo()" :disabled="backDisabled">Back</button>
    <button v-on:click="play()" :disabled="playDisabled">Start</button>
    <button v-on:click="step()" :disabled="stepDisabled">Step</button>
    <button v-on:click="stop()" :disabled="stopDisabled">Stop</button>
    <button v-on:click="reset()" :disabled="resetDisabled">Reset</button>
  </div>
</template>

<script>
import BoardComponent from '../components/board'
import { mapState } from 'vuex'

export default {
  components: {BoardComponent},
  data () {
    return {
      playDisabled: true,
      stepDisabled: true,
      stopDisabled: true,
      resetDisabled: true
    }
  },
  computed: mapState({
    backDisabled (state) {
      return state.board.history.length === 0
    }
  }),
  created () {
    this.reset()
  },
  methods: {
    play () {
      this.interval = setInterval(() => this.$store.commit('board/tick'), 200)
      this.playDisabled = true
      this.stepDisabled = false
      this.stopDisabled = false
    },

    step () {
      clearInterval(this.interval)
      this.$store.commit('board/tick')
      this.playDisabled = false
      this.stopDisabled = true
      this.resetDisabled = false
    },

    stop () {
      clearInterval(this.interval)
      this.playDisabled = false
      this.stopDisabled = true
      this.resetDisabled = false
    },

    reset () {
      this.$store.commit('board/createCells', {columnsNumber: 150, rowsNumber: 50})
      this.playDisabled = false
      this.stepDisabled = false
    },

    undo () {
      this.$store.commit('board/undo')
    }
  }
}
</script>
