<template>
    <div>
        <p>
            <span>Generation: {{ ticks }}</span>
        </p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { RootState } from '@/types'

export default Vue.extend({
  id: 'stats',
  computed: {
    ticks (): number {
      return (this.$store.state as RootState).board.ticks
    }
  }
})
</script>
