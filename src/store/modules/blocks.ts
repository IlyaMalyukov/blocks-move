const blocks = {
  state: {
    blocks: [],
  },
  mutations: {
    createBlock(state: { blocks: any[] }, block: any) {
      state.blocks.push(block)
    },
  },
  actions: {
    addBlock(commit: (arg0: string, arg1: any) => void, block: any) {
      commit('createBlock', block)
    }
  },
  getters: {
    blocks: (state: { blocks: any }) => state.blocks
  }
}

export default blocks