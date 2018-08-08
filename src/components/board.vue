<template>
    <div id="board">
        <div class="columns">
            <div v-for="c in numberOfColumns" class="column" v-bind:key="c">
                <div v-for="r in numberOfRows" class="cell" v-bind:key="r"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  id: 'gateway',
  data () {
    return {
      numberOfColumns: 150,
      numberOfRows: 50
    }
  }
}
</script>
