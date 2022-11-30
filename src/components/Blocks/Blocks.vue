<template lang="pug">
.blocks
  .block(v-for='item in blocks')
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Cards',
  computed: {
    blocks() {
      return this.$store.getters['blocks']
    }
  }
})
</script>

<style lang="scss" scoped>
.block {
  width: 80px;
  height: 80px;
  border-radius: 5px;
  background: #9AC017;
}
</style>