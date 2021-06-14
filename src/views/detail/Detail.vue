

<template>
  <div id="detail" v-cloak>
    <detail-nav-bar :titles="titles" class="detail-nav" @itemClick="itemClick" ref="nav"></detail-nav-bar>

    <scroll :pullUpLoad="true" class="content" ref="scroll" @scroll="contentScroll">
      <div class="detail-swiper">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item,index) in topImages" :key="index">
            <img :src="item" alt="">
          </van-swipe-item>
        </van-swipe>
      </div>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @loadOver="loadOver" ref="goodInfo"></detail-goods-info>
      <detail-param-info :param-info="paramsInfo" ref="paramInfo"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="commentInfo"></detail-comment-info>
      <good-list :goods="recommendInfo" ref="recommendInfo"></good-list>
    </scroll>
    <detail-bottom-info @addToCart="addToCart"></detail-bottom-info>
    <back-top @click.native="backClick" v-show="isShow"></back-top>
    <toast :message="message" :show="show"></toast>
  </div>
</template>
<script>
import {
  getDetail,
  getRecommend,
  GoodsInfo,
  ShopInfo,
  paramsInfo,
} from "network/detail";
import Scroll from "components/common/scroll/Scroll";
import DetailNavBar from "./childComps/DetailNavBar";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import GoodList from "components/content/goods/GoodList";
import DetailBottomInfo from './childComps/DetailBottomInfo.vue';
import { itemImgListener,backTopMixin } from "common/mixin";
import BackTop from "components/content/backTop/BackTop";
import Toast from 'components/content/toast/Toast'
import {mapActions} from 'vuex';

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    paramsInfo,
    DetailCommentInfo,
    GoodList,
    DetailBottomInfo,
    BackTop,
    Toast
  },
  data() {
    return {
      id: 0,
      titles: ["商品", "参数", "评论", "推荐"],
      topImages: [],
      goods: {},
      shopInfo: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommendInfo: [],
      itemImgListener: null,
      themeTopY: [],
      message:"",
      show:false
    };
  },
  mixins: [itemImgListener,backTopMixin],
  created() {
    this.id = this.$route.params.id;
    // console.log(this.id);
    this.getDetail(this.id);
    this.getRecommend();
  },
  mounted() {},
  destroyed() {
    // console.log("离开详情页");
    // this.$EventBus.$off("imageLoadEvent", this.itemImgListener);
  },
  methods: {
    // ...mapActions(['addCart']),
    ...mapActions({
      add:'addCart'
    }),
    getDetail(id) {
      getDetail(id)
        .then((res) => {
          // console.log(res, "res");
          // 1、请求页面轮播图数据
          const data = res.result;
          this.topImages = data.itemInfo.topImages;
          // console.log(this.topImages);
          // 2、加载商品数据
          this.goods = new GoodsInfo(
            data.itemInfo,
            data.columns,
            data.shopInfo.services
          );
          // console.log(this.goods, "goods");
          // 3、加载店铺数据
          this.shopInfo = new ShopInfo(data.shopInfo);
          // console.log(this.shopInfo, "shopInfo");
          // 4、加载商品的详情数据
          this.detailInfo = data.detailInfo;
          // 5、加载参数数据
          this.paramsInfo = new paramsInfo(
            data.itemParams.info,
            data.itemParams.rule
          );
          // console.log(this.paramsInfo, "paramsInfo");
          // 6、加载评论数据
          if (data.rate.cRate != 0) {
            this.commentInfo = data.rate.list[0];
          }
          // console.log(this.commentInfo, "commentInfo");
          // 7、加载推荐数据
        })
        .catch((err) => {});
    },
    loadOver() {
      this.$refs.scroll.refresh();
    },
    getRecommend() {
      getRecommend()
        .then((res) => {
          // console.log(res);
          const data = res.data;
          this.recommendInfo = data.list;
        })
        .catch((err) => {
          // console.log(err);
        });
    },
    // 点击标题跳转
    itemClick(index) {
      this.themeTopY = [];
      this.themeTopY.push(0);
      this.themeTopY.push(this.$refs.paramInfo.$el.offsetTop);
      this.themeTopY.push(this.$refs.commentInfo.$el.offsetTop);
      this.themeTopY.push(this.$refs.recommendInfo.$el.offsetTop);
      // console.log(this.themeTopY);
      // console.log(index);
      // console.log(-this.themeTopY[index]);
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 200);
    },
    contentScroll(position) {
      this.judgeShow(position);
      this.themeTopY = [];
      this.themeTopY.push(0);
      this.themeTopY.push(this.$refs.paramInfo.$el.offsetTop);
      this.themeTopY.push(this.$refs.commentInfo.$el.offsetTop);
      this.themeTopY.push(this.$refs.recommendInfo.$el.offsetTop);
      //  console.log(this.themeTopY);
      const positionY = -position.y;
      if (positionY > 0 && positionY <= this.themeTopY[1]) {
        this.$refs.nav.currentIndex = 0;
      } else if (
        positionY > this.themeTopY[1] &&
        positionY <= this.themeTopY[2]
      ) {
        this.$refs.nav.currentIndex = 1;
      } else if (
        positionY > this.themeTopY[2] &&
        positionY <= this.themeTopY[3]
      ) {
        this.$refs.nav.currentIndex = 2;
      }else{
        this.$refs.nav.currentIndex = 3;
      }
    },
    // 加入到购物车
    addToCart(){
      // console.log("加入到购物车")
      const product = {};
      product.images = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.detailInfo.desc;
      product.price = this.goods.realPrice;
      product.id = this.id;
      product.num = 1;
      // this.$store.dispatch('addCart',product).then(res=>{
      //   console.log(res);
      // });
      this.add(product).then(res=>{
        // console.log(res);
        this.show = true;
        this.message = res;
        setTimeout(()=>{
          this.show = false;
        },1500)
      });
    }
  },
};
</script>
<style scoped>
/* #tab-bar{
  display:none !important;
} */
#detail {
  height: 100vh;
  position: relative;
}
.my-swipe img {
  height: 400px;
  overflow: hidden;
  object-fit: cover;
  width: 100%;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 58px;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 12;
}
.detail-nav {
  position: relative;
  z-index: 13;
  background: #fff;
}
[v-cloak]{
  display: none;
}
</style>

