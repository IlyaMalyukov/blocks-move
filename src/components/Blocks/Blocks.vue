<template lang="pug">
svg.blocks(v-if='blocks.length')
  foreignObject.blocks-wrapper
    .block(
      v-for='block in blocks'
      :style='{"top": `${block.coordTop}px`,"left": `${block.coordLeft}px`}'
      :id='`block-${block.id}`'
      @mousedown='drag(block)'
    )
      .block__circle(
        v-for='node in 4'
        @click='selectBlockNode({block, node})'
        :class='`block__circle-${node}`'
        :ref='`block-${block.id}-node-${node}`'
      )
        //-  to do убрать v-if и v-for в одном месте
        line(
          v-for='item in block.connections'
          v-if='item.nodeId === node'
          :x1="setCircleCoord(block.id, findNodeId(block.id, item.blockId)).x"
          :y1="setCircleCoord(block.id, findNodeId(block.id, item.blockId)).y"
          :x2="setCircleCoord(item.blockId, item.nodeId).x"
          :y2="setCircleCoord(item.blockId, item.nodeId).y"
          style="stroke: #E15720; stroke-width: 4px;"
        )
.no-data(v-else) No data
</template>

<script lang="ts">
import Vue from 'vue'
import Block from '@/types/Block'
import Connection from '@/types/Connection'
import { PropType } from 'vue/types/v3-component-props'

interface emitData {
  block: Block,
  node: number
}

export default Vue.extend({
  name: 'Cards',
  data: () => ({
    selectedBlocks: [{} as Block]
  }),
  methods: {
    drag(block: Block) {
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
    moveAt(e: any, block: Block) {
      let dragBlock: any = document.getElementById(`block-${block.id}`)
      dragBlock.style.left = e.pageX - dragBlock.offsetWidth / 2 + 'px'
      dragBlock.style.top = e.pageY - dragBlock.offsetHeight / 2 + 'px'
    },
    selectBlockNode(data: emitData) {
      let preparedBlock: Block = {
        id: data.block.id,
        coordTop: data.block.coordTop,
        coordLeft: data.block.coordLeft,
        connections: [
          {
            blockId: data.block.id,
            nodeId: data.node
          }
        ]
      }

      this.selectedBlocks.push(preparedBlock)

      if (this.selectedBlocks.length === 3) {
        this.selectedBlocks.shift()
        this.addConnection()
      }
    },
    // Связи
    addConnection() {
      let firstBlockConnections: Array<Connection> = this.selectedBlocks[0].connections
      let secondBlockConnections: Array<Connection> = this.selectedBlocks[1].connections

      this.selectedBlocks[0].connections = secondBlockConnections
      this.selectedBlocks[1].connections = firstBlockConnections

      this.updateBlocks()
    },
    updateBlocks() {
      let blocks: Array<Block> = [
        ...this.blocks
      ]

      let firstBlock = this.selectedBlocks[0]
      let secondBlock = this.selectedBlocks[1]


      this.blocks.forEach((i: Block) => {
        if (i.id === firstBlock.id) {
          let index = blocks.findIndex((i: Block) => i.id === firstBlock.id)
          blocks[index] = firstBlock
        }

        if (i.id === secondBlock.id) {
          let index = blocks.findIndex((i: Block) => i.id === secondBlock.id)
          blocks[index] = secondBlock
        }
      })

      this.$store.dispatch('updateBlocks', blocks)
    },
    // Линии
    setCircleCoord(blockId: number, nodeId: number) {
      return this.findCircleCoord(blockId, nodeId)
    },
    findNodeId(mainBlockId: number, desiredBlockId: number) {
      let mainBlock = this.blocks.find((i: Block) => i.id === mainBlockId)
      let desiredBlock = this.blocks.find((i: Block) => i.id === desiredBlockId)
      let nodeId: number = 0

      desiredBlock.connections.forEach((i: Connection) => {
        if (i.blockId === mainBlockId) {
          nodeId = i.nodeId
        }
      })

      return nodeId
    },
    findCircleCoord(blockId: number, nodeId: number) {
      let circle: any = this.$refs[`block-${blockId}-node-${nodeId}`]

      return circle[0].getBoundingClientRect()
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

  &-wrapper {
    width: 100%;
    height: 100%;
  }
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