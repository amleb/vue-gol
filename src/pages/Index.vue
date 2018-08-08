<template>
  <div id="board-container">
    <board-component></board-component>
  </div>
</template>

<script>
import BoardComponent from '../components/board'

export default {
  name: 'Index',
  components: {BoardComponent},
  data () {
    return {

    }
  }
}
</script>
