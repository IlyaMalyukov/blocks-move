<template lang="pug">
.toolbar
  UIButton(@click-btn='addBlock') Add new block
</template>

<script lang="ts">
import Vue from 'vue'
import UIButton from '@/components/UI/UIButton.vue'

export default Vue.extend({
  name: 'Toolbar',
  components: {
    UIButton
  },
  methods: {
    addBlock() {
      this.$emit('add-block')
    }
  }
})
</script>


<style lang="scss" scoped>
.toolbar {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>