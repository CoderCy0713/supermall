<template>
  <div class="check-button" :class="{check:isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="" v-show="isChecked">
  </div>
</template>
<script>
export default {
  name: "CheckButton",
  props:{
    isChecked:{
      type:Boolean,
      defaule:false
    }
  }
};
</script>
<style scoped>
.check-button {
  width: 18px;
  height: 18px;
  border:1px solid gray;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.check{
  background: var(--color-tint);
  border:1px solid var(--color-tint);
}
</style>
