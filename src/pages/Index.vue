<template>
  <div id="board-container">
    <stats-component></stats-component>
    <board-component></board-component>
    <buttons-component ref="buttons"></buttons-component>
  </div>
</template>

<script>
import BoardComponent from '../components/board'
import ButtonsComponent from '../components/buttons'
import StatsComponent from '../components/stats'

export default {
  components: {BoardComponent, ButtonsComponent, StatsComponent},
  mounted () {
    this.$refs.buttons.reset()
  }
}
</script>
