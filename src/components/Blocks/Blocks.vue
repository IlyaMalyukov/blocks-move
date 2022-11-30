<template lang="pug">
.blocks(v-if='blocks.length')
  .block(
    v-for='block in blocks'
    draggable='true'
    :style='{"position": "absolute","top": `${block.coordTop}px`,"left": `${block.coordTop}px`}'
    :ref='`block-${block.id}`'
    :id='`block-${block.id}`'
    @dragend='dragEnd($event, block)'
    @click='selectBlock(block)'
  )
    .block__circle(
      v-for='circle in 4'
      :class='`block__circle-${circle}`')
    svg(v-for='line in block.connections')
      line(
        :x1="line.x1" 
        :y1="line.y1" 
        :x2="line.x2" 
        :y2="line.y2" 
        style="stroke: #E15720; stroke-width: 4px;"
      )
.no-data(v-else) No data
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Cards',
  data: () => ({
    selectedBlocks: [
      {
        id: -1,
        connections: [-1]
      }
    ]
  }),
  methods: {
    dragEnd(e: any, block: any) {
      block.coordTop = e.pageY
      block.coordLeft = e.pageX
    },
    selectBlock(block: any) {
      this.selectedBlocks.push(block)

      if (this.selectedBlocks[0].id === -1) {
        this.selectedBlocks.splice(0, 1)
      }

      if (this.selectedBlocks.length === 2) {
        this.addConnection()
      }
    },
    addConnection() {
      const firstBlockId = this.selectedBlocks[0].id
      const secondBlockId = this.selectedBlocks[1].id

      this.selectedBlocks[0].connections.push(secondBlockId)
      this.selectedBlocks[1].connections.push(firstBlockId)

      this.updateBlocks()
    },
    updateBlocks() {
      let blocks = [
        ...this.blocks,
      ]
      this.$store.dispatch('updateBlocks', blocks)
      console.log(this.blocks)
    }
  },
  computed: {
    blocks() {
      return this.$store.getters['blocks']
    },
  },
  watch: {
    blocks() {
      this.selectedBlocks = [{
        id: -1,
        connections: [-1]
      }]
    }
  },
})
</script>

<style lang="scss" scoped>
.blocks {
  position: relative;
  width: 100%;
  height: 60vh;
  border: 1px solid gainsboro;
  border-radius: 5px;
  margin-top: 10px;
}

.block {
  width: 80px;
  height: 80px;
  border-radius: 5px;
  background: #9AC017;
  cursor: move;

  &__circle {
    background: #1867c0;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    position: absolute;
    border: 2px solid #fff;

    &:hover {
      background: darken(#1867c0, 5%);
    }

    &-1 {
      top: -10px;
      left: 30%;
      margin: 0 auto;
    }

    &-2 {
      right: -10px;
      top: 30%;
    }

    &-3 {
      bottom: -10px;
      left: 30%;
    }

    &-4 {
      left: -10px;
      top: 30%;
    }
  }
}

.no-data {
  font-size: 48px;
}
</style>