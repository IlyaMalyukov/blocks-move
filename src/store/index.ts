import Vue from 'vue'
import Vuex from 'vuex'
import Block from '@/types/Block'
import Connection from '@/types/Connection'
// import VuexPersist from 'vuex-persist'

// import blocks from './modules/blocks'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    blocks: []
  },
  mutations: {
    addBlock(state: { blocks: Array<Block> }, block: Block) {
      state.blocks.push(block)
    },
    updateBlocks(state: { blocks: Array<Block> }, blocks: Array<Block>) {
      state.blocks = blocks
    }
  },
  actions: {
    addBlock({commit}, block: Block) {
      commit('addBlock', block)
    },
    updateBlocks({commit}, blocks: Block) {
      commit('updateBlocks', blocks)
    }
  },
  getters: {
    blocks: (state) => state.blocks
  },
  // modules: {
  //   blocks
  // },
  // plugins: [
  //   new VuexPersist({
  //     modules: ['blocks']
  //   }).plugin
  // ]
})

export default store
