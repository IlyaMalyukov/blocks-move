<template lang="pug">
.blocks(v-if='blocks.length')
  .block(
    v-for='block in blocks'
    draggable='true'
    :style='{"position": "absolute","top": `${block.coordTop}px`,"left": `${block.coordTop}px`}'
    :class='{"block_selected": selectedBlock.id === block.id}'
    :ref='`block-${block.id}`'
    :id='`block-${block.id}`'
    @dragend='dragEnd($event, block)'
    @click='selectBlock(block)'
  )
    .block__circle(
      v-for='item in 4'
      :class='`block__circle-${item}`')
.no-data(v-else) No data
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Cards',
  data: () => ({
    selectedBlock: {
      id: -1
    }
  }),
  methods: {
    dragStart(e: any, block: any) {
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('itemID', block.id)
    },
    dragEnd(e: any, block: any) {
      block.coordTop = e.pageY
      block.coordLeft = e.pageX
    },
    onDrop(e: any, block: any) {
      const itemID = e.dataTransfer.getData('itemID')
      block.coordTop = e.pageY
      block.coordLeft = e.pageX
    },
    selectBlock(block: any) {
      this.selectedBlock = block
    }
  },
  computed: {
    blocks() {
      return this.$store.getters['blocks']
    }
  }
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

  &_selected {
    background: darken(#9AC017, 5%);
  }

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