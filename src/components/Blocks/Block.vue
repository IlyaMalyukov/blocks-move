<template lang="pug">
.block
  .block__circle(
    v-for='node in 4'
    @click='selectBlockNode({block, node})'
    :class='`block__circle-${node}`'
    :ref='`block-${block.id}-node-${node}`'
  )
</template>

<script lang="ts">
import Vue from 'vue'
import Block from '@/types/Block'
import { PropType } from 'vue/types/v3-component-props'

interface emitData {
  block: Block,
  node: number
}

export default Vue.extend({
  name: 'Block',
  props: {
    block: Object as PropType<Block>
  },
  methods: {
    selectBlockNode(data: emitData) {
      this.$emit('select-block-node', data)
    }
  }
})
</script>

<style lang="scss" scoped>
.block {
  position: absolute;
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
    cursor: pointer;

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
</style>