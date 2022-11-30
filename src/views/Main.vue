<template lang="pug">
Container
  h1 Blocks
  Toolbar(@add-block='addBlock')
  Blocks
</template>

<script lang="ts">
import Vue from 'vue'

import Container from '@/components/Layout/Container.vue'
import Toolbar from '@/components/Blocks/Toolbar.vue'
import Blocks from '@/components/Blocks/Blocks.vue'

export default Vue.extend({
  name: 'Main',
  components: {
    Container,
    Toolbar,
    Blocks
  },
  methods: {
    addBlock() {
      const block = {
        id: this.blocks.length,
        coordTop: this.randomInt(350),
        coordLeft: this.randomInt(350),
        connections: []
      }

      this.$store.dispatch('addBlock', block)
    },
    randomInt(max: any) {
      return Math.floor(Math.random() * max)
    },
  },
  computed: {
    blocks() {
      return this.$store.getters['blocks']
    }
  },
})
</script>
