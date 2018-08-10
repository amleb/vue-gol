<template>
    <div>
        <button v-on:click="undo()" :disabled="backDisabled">Back</button>
        <button v-on:click="play()" :disabled="playDisabled">Start</button>
        <button v-on:click="step()" :disabled="stepDisabled">Step</button>
        <button v-on:click="pause()" :disabled="stopDisabled">Pause</button>
        <button v-on:click="reset(false)" :disabled="resetDisabled">Reset</button>
        <button v-on:click="reset(true)" :disabled="randomDisabled">Random</button>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  id: 'buttons',
  data () {
    return {
      playDisabled: true,
      stepDisabled: true,
      stopDisabled: true,
      resetDisabled: true,
      randomDisabled: true
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
      this.randomDisabled = true
    },

    step () {
      clearInterval(this.interval)
      this.$store.commit('board/tick')
      this.playDisabled = false
      this.stopDisabled = true
      this.resetDisabled = false
      this.randomDisabled = false
    },

    pause () {
      clearInterval(this.interval)
      this.playDisabled = false
      this.stopDisabled = true
      this.resetDisabled = false
    },

    reset (randomize) {
      this.$store.commit('board/createCells', {columnsNumber: 150, rowsNumber: 50, randomize})
      this.playDisabled = false
      this.stepDisabled = false
      this.randomDisabled = false
    },

    undo () {
      this.$store.commit('board/undo')
    }
  }
}
</script>
