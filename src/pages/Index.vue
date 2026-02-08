<template>
  <div id="board-container">
    <stats-component></stats-component>
    <board-component></board-component>
    <buttons-component ref="buttons"></buttons-component>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BoardComponent from '../components/board.vue'
import ButtonsComponent, { ButtonsComponent as ButtonsComponentInstance } from '../components/buttons.vue'
import StatsComponent from '../components/stats.vue'

export default Vue.extend({
  components: {BoardComponent, ButtonsComponent, StatsComponent},
  mounted (): void {
    (this.$refs.buttons as ButtonsComponentInstance).reset()
  }
})
</script>
