<template>
  <div class="cart-list">
    <scroll class="content" :pullUpLoad="true" ref="scroll">
      <cart-list-item v-for="(item,index) in  cartList" :key="index" :itemInfo="item">

      </cart-list-item>
    </scroll>
  </div>
</template>
<script>
import scroll from "components/common/scroll/Scroll";
import { mapGetters } from "vuex";
import CartListItem from "./CartListItem";
export default {
  name: "CartList",
  components: {
    scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  activated() {
    this.$refs.scroll.refresh();
  }
};
</script>
<style scoped>
.content {
  height: calc(100vh - 44px - 49px - 40px);
  overflow: hidden;
}
</style>
