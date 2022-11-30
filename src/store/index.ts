import Vue from 'vue'
import Vuex from 'vuex'
// import VuexPersist from 'vuex-persist'

// import blocks from './modules/blocks'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    blocks: []
  },
  mutations: {
    addBlock(state: { blocks: any[] }, block: any) {
      state.blocks.push(block)
    },
    updateBlocks(state: { blocks: any[] }, blocks: any) {
      state.blocks = blocks
    }
  },
  actions: {
    addBlock({commit}, block: any) {
      commit('addBlock', block)
    },
    updateBlocks({commit}, blocks: any) {
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
