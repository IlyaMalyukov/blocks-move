<template lang="pug">
.blocks(v-if='blocks.length')
  .block(
    v-for='block in blocks'
    :style='{"top": `${block.coordTop}px`,"left": `${block.coordLeft}px`}'
    :id='`block-${block.id}`'
    @mousedown='drag(block)'
  )
    .block__circle(
      v-for='node in 4'
      @click='selectBlockNode(block, node)'
      :class='`block__circle-${node}`'
      :id='`block-${block.id}-node-${node}`')
    svg(v-for='item in block.connections')
      line(
        :x1="item.x1" 
        :y1="item.y1" 
        :x2="item.x2" 
        :y2="item.y2" 
        style="stroke: #E15720; stroke-width: 4px;"
      )
.no-data(v-else) No data
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Cards',
  data: () => ({
    selectedBlocks: <any>[]
  }),
  methods: {
    drag(block: any) {
      let dragBlock: any = document.getElementById(`block-${block.id}`)
      let moveAt = this.moveAt

      dragBlock.onmousedown = function(e: any) {
        moveAt(e, block)
        document.body.appendChild(dragBlock)

        document.onmousemove = function(e) {
          moveAt(e, block)
        }

        dragBlock.onmouseup = function() {
          document.onmousemove = null
          dragBlock.onmouseup = null
        }
      }
    },
    moveAt(e: any, block: any) {
      let dragBlock: any = document.getElementById(`block-${block.id}`)
      dragBlock.style.left = e.pageX - dragBlock.offsetWidth / 2 + 'px'
      dragBlock.style.top = e.pageY - dragBlock.offsetHeight / 2 + 'px'
    },
    selectBlockNode(block: any, node: any) {
      let preparedBlock: any = {
        id: block.id,
        connections: [
          {
            blockId: block.id,
            nodeId: node
          }
        ]
      }

      this.selectedBlocks.push(preparedBlock)

      if (this.selectedBlocks.length === 2) {
        this.addConnection()
      }
    },
    addConnection() {
      let firstBlock: any = this.selectedBlocks[0]
      let secondBlock: any = this.selectedBlocks[1]

      this.selectedBlocks[0].connections = secondBlock.connections
      this.selectedBlocks[1].connections = firstBlock.connections

      this.updateBlocks()
    },
    async updateBlocks() {
      let blocks = [
        ...this.blocks,
      ]
      await this.$store.dispatch('updateBlocks', blocks)

    }
  },
  computed: {
    blocks() {
      return this.$store.getters['blocks']
    },
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

.no-data {
  font-size: 48px;
}
</style>