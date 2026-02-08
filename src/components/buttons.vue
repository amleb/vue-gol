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

<script lang="ts">
import Vue from 'vue'
import { CreateCellsPayload } from '@/store/modules/board'
import { RootState } from '@/types'

interface ButtonsData {
  interval: number | undefined,
  playDisabled: boolean,
  stepDisabled: boolean,
  stopDisabled: boolean,
  resetDisabled: boolean,
  randomDisabled: boolean
}

export interface ButtonsComponent extends Vue {
  reset: (randomize?: boolean) => void
}

export default Vue.extend({
  id: 'buttons',
  data (): ButtonsData {
    return {
      interval: undefined,
      playDisabled: true,
      stepDisabled: true,
      stopDisabled: true,
      resetDisabled: true,
      randomDisabled: true
    }
  },
  computed: {
    backDisabled (): boolean {
      return (this.$store.state as RootState).board.history.length === 0
    }
  },
  created () {
    this.reset()
  },
  methods: {
    play (): void {
      this.interval = window.setInterval(() => this.$store.commit('board/tick'), 200)
      this.playDisabled = true
      this.stepDisabled = false
      this.stopDisabled = false
      this.randomDisabled = true
    },

    step (): void {
      clearInterval(this.interval)
      this.$store.commit('board/tick')
      this.playDisabled = false
      this.stopDisabled = true
      this.resetDisabled = false
      this.randomDisabled = false
    },

    pause (): void {
      clearInterval(this.interval)
      this.playDisabled = false
      this.stopDisabled = true
      this.resetDisabled = false
    },

    reset (randomize: boolean = false): void {
      const payload: CreateCellsPayload = {columnsNumber: 150, rowsNumber: 50, randomize}

      this.$store.commit('board/createCells', payload)
      this.playDisabled = false
      this.stepDisabled = false
      this.randomDisabled = false
    },

    undo (): void {
      this.$store.commit('board/undo')
    }
  }
})
</script>
