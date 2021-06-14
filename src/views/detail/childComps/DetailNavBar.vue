<template>
  <div>
    <nav-bar>
       <img slot="left" class="back" @click="backClick" src="~assets/img/common/back.svg" alt="">
      <div slot="center" class="title">
        <span v-for="(item,index) in titles" :key="index" class="title-item" :class="{active:currentIndex===index}" @click="itemClick(index)">{{item}}</span>
      </div>
    </nav-bar>
  </div>
</template>
<script>

import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  props:{
    titles:{
      type:Array,
      default:[]
    }
  },
  data(){
    return{
      currentIndex:0
    }
  },
  components: {
    NavBar,
  },
  methods:{
    itemClick(index){
      this.currentIndex = index;
      this.$emit("itemClick",index);
    },
    backClick(){
      this.$router.back()
    }
  }
};
</script>
<style scoped>
.title{
  display: flex;
  font-size: 13px;
}
.title-item{
  flex: 1;
}
.active{
  color: var(--color-tint);
}
.back{
  vertical-align: middle;
}
</style>
