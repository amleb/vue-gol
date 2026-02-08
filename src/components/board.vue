<template>
    <div>
        <div id="board">
            <div class="columns">
                <div v-for="(c, x) in generation" class="column" v-bind:key="x">
                    <cell-component v-for="(properties, y) in c"
                                    :properties="properties"
                                    :x="x"
                                    :y="y"
                                    v-bind:key="x+'-'+y"></cell-component>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CellComponent from './cell.vue'
import { Generation } from '@/store/modules/board'
import { RootState } from '@/types'

export default Vue.extend({
  id: 'board',
  components: {CellComponent},
  computed: {
    generation (): Generation {
      return (this.$store.state as RootState).board.generation
    }
  }
})
</script>
