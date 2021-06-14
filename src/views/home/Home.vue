<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>
    <tab-control :titles="titles" class="tab-control" @itemClick="tabClick" ref="topTab" v-show="showTabControl"></tab-control>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3" :pullUpLoad="true" @pullMore="loadMore">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" :stop-propagation="false">
        <van-swipe-item v-for="(item,index) in banners" :key="index">
          <a :href="item.link">
            <img :src="item.image" alt="">
          </a>
        </van-swipe-item>
      </van-swipe>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="titles" class="tab-control" @itemClick="tabClick" ref="contentTab"></tab-control>
      <good-list :goods="showGoodsList"></good-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"></back-top>
  </div>
</template>
<script>
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import TabControl from "components/content/tabControl/TabControl";
import GoodList from "components/content/goods/GoodList";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
import {itemImgListener,backTopMixin} from 'common/mixin'

export default {
  name: "Home",
  components: {
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodList,
    Scroll,
    BackTop
  },
  data() {
    return {
      stop:false,
      banners: [],
      recommends: [],
      titles: ["流行", "新款", "精选"],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      tabOffsetTop: 0,
      showTabControl:false,
      itemImgListener:null
    };
  },
  mixins: [itemImgListener,backTopMixin],
  //组件创建完就加载数据
  created() {
    // 1、请求多个数据
    this.getHomeMultidata();
    // 2、请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted(){
    // console.log("home本身的内容");
  },
  deactivated(){
    // console.log("离开home");
    this.$EventBus.$off("imageLoadEvent", this.itemImgListener);
  },
  destroyed(){
    // console.log("home destroyed");
  },
  computed: {
    showGoodsList() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {

    /**
     * 网络请求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(
        (res) => {
          // console.log(res, "getHomeMultidata");
          // 保存请求到的数据
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
          // console.log(this.banners);
        },
        (err) => {
          // console.log(err);
        }
      );
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(
        (res) => {
          // console.log(res);
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
        },
        (err) => {
          // console.log(err);
        }
      );
    },
    /**
     * 事件监听相关方法
     */
    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
      }
      this.$refs.topTab.currentIndex = index;
      this.$refs.contentTab.currentIndex = index;
    },
    contentScroll(position) {
      // console.log(position.y);
      //true和false直接用运算符 最好啊！
      this.judgeShow(position)
      this.tabOffsetTop = this.$refs.contentTab.$el.offsetTop;//tabControl到顶部的距离
      // console.log(this.$refs.contentTab.$el.offsetTop);
      this.showTabControl = this.$refs.contentTab.$el.offsetTop < -position.y;
    },
    loadMore(){
      console.log("下拉加载更多");
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.finishPullUp();
      this.$refs.scroll.refresh();
    }
  },
};
</script>
<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}
.my-swipe .van-swipe-item img {
  width: 100%;
}
.tab-control {
  position: sticky;
  top: 44px;
}
.good-list {
  display: flex;
  flex-wrap: wrap;
}
.content{
  position: absolute;
  top: 44px;
  bottom:49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>

