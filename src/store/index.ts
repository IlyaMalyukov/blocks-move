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
    createBlock(state: { blocks: any[] }, block: any) {
      state.blocks.push(block)
    },
  },
  actions: {
    addBlock({commit}, block: any) {
      commit('createBlock', block)
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
