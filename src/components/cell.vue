<template>
    <div
        :class="properties.isAlive ? 'alive' : ''"
        class="cell"
        @click="toggleCell({x: x, y: y})"/>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Cell, ToggleCellPayload } from '@/store/modules/board'
import { RootState } from '@/types'

export default Vue.extend({
  props: {
    properties: {
      type: Object as PropType<Cell>,
      required: true
    },
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    }
  },
  computed: {
    isAlive (): Cell {
      return (this.$store.state as RootState).board.generation[this.x][this.y]
    }
  },
  methods: {
    toggleCell (payload: ToggleCellPayload): void {
      this.$store.commit('board/toggleCell', payload)
    }
  }
})
</script>
