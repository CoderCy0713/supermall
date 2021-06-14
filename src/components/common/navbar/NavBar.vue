<template>
  <div class="nar-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name:"NavBar"
}
</script>
<style scoped>
.nar-bar {
  display: flex;
  height: 44px;
  text-align: center;
  line-height: 44px;
  box-shadow: 0px 1px 1px #e8d6d6;
}
.left,
.right {
  width: 60px;
  /* background: blue; */
}
.center {
  flex: 1;
  /* background: red; */
}
</style>
