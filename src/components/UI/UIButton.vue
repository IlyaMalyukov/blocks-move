<template lang="pug">
button.button(@click='$emit("click-btn")')
  slot
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'UIButton'
})
</script>

<style lang="scss" scoped>
.button {
  padding: 10px 25px;
  border-radius: 5px;
  color: #fff;
  background: #1867c0;
  cursor: pointer;
  user-select: none;

  &:hover {
    background: darken(#1867c0, 5%);
  }

  &:active {
    background: darken(#1867c0, 10%);
  }
}
</style>