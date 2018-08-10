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

<script>
import {mapState} from 'vuex'
import CellComponent from './cell'

export default {
  id: 'board',
  components: {CellComponent},
  computed: mapState({
    generation: state => state.board.generation
  })
}
</script>
