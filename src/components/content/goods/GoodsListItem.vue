<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImg" alt="" @load="imageLoad" class="image">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    imageLoad() {
      this.$EventBus.$emit("imageLoadEvent");
    },
    itemClick() {
      // setTimeout(()=>{
        this.$router.push("/detail/" + this.goodsItem.iid);
      // },200)
    },
  },
  computed: {
    showImg() {
      return this.goodsItem.image || this.goodsItem.show.img;
      //  return this.goodsItem.show.img || this.goodsItem.image ;
    },
  },
};
</script>
<style scoped>
.goods-item {
  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -17px;
  width: 14px;
  height: 14px;
  top: -1px;
  background: url("~assets/img/common/collect.svg") no-repeat;
  background-size: 100% 100%;
}
.image{
  height: 295px;
}
</style>
