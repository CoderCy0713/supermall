<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "TabBar",
};
</script>
<style scoped>
#tab-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 49px;
  display: flex;
  background: #f6f6f6;
  box-shadow: 0 -1px 1px rgba(100,100,100,.2);
  z-index: 11;
}
</style>
