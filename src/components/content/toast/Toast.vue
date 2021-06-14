<template>
  <div class="toast" v-show="show">
    <div >{{message}}</div>
  </div>
</template>
<script>
export default {
  name:"Toast",
  props:{
    message:{
      type:String
    },
    show:{
      type:Boolean,
      default:false
    }
  }
}
</script>
<style scoped>
  .toast{
    background: rgba(0,0,0,.7);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 8px 10px;
    z-index:100;
    color: #fff;
  }
</style>
