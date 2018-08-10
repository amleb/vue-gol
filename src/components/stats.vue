<template>
    <div>
        <p>
            <span>Generation: {{ ticks }}</span>
        </p>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  id: 'stats',
  computed: mapState({
    ticks: state => state.board.ticks
  })
}
</script>
