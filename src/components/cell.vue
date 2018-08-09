<template>
    <div
        :class="properties.isAlive ? 'alive' : ''"
        class="cell"
        @click="toggleCell({x: x, y: y})"/>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: ['properties', 'x', 'y'],
  computed: mapState({
    isAlive (state) {
      return state.board.cells[this.x][this.y]
    }
  }),
  // updated () {
  //   console.log(this.x + ', ' + this.y)
  // },
  methods: mapActions('board', [
    'toggleCell'
  ])
}
</script>
