<template>
  <div ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    setTimeout(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
      });
      this.scroll.on("scroll", (position) => {
        this.$emit("scroll", position);
      });
      this.scroll.on("pullingUp", () => {
        // console.log(this);
        this.$emit("pullMore");
      });
      console.log(this.scroll.scrollerHeight,"refresh之前");
    }, 500);
  },
  methods: {
    scrollTo(x, y, time = 300) {
      // console.log(this.scroll);
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp();
      // this.scroll.refresh();
    },
    refresh(){
      console.log("------")
      this.scroll && this.scroll.refresh();
    }
  },
};
</script>
