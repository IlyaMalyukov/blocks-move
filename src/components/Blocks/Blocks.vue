<template lang="pug">
svg.blocks(v-if='blocks.length')
  foreignObject.blocks-wrapper
    BlockItem(
      v-for='block in blocks'
      :block='block'
      :style='{"top": `${block.coordTop}px`,"left": `${block.coordLeft}px`}'
      :id='`block-${block.id}`'
      @select-block-node='selectBlockNode'
      @mousedown='drag(block)'
    )
      line(
        v-for='item in block.connections'
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

import BlockItem from './Block.vue'

interface emitData {
  block: Block,
  node: number
}

export default Vue.extend({
  name: 'Cards',
  components: {
    BlockItem
  },
  data: () => ({
    selectedBlocks: [
      {
        id: 0,
        coordTop: 0,
        coordLeft: 0,
        connections: [{blockId: 0, nodeId: 0}]
      }
    ],
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

      console.log(this.$refs)

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

.no-data {
  font-size: 48px;
}
</style>