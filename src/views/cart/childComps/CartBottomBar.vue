<template>
  <div class="cart-bottom">
    <div class="check-content" @click="checkClick">
      <check-button :isChecked="isSelect"></check-button>
      <span>全选</span>
    </div>

    <span class="allPrice">合计：{{allPrice}}</span>

    <div class="calculate">去计算({{checkLength}})</div>
  </div>
</template>
<script>
import CheckButton from "components/common/checkButton/CheckButton";
import { mapGetters } from "vuex";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["catListLength", "cartList"]),
    // 我的代码
    // allPrice(){
    //   let allPrice = 0;
    //   for(let item of this.$store.state.cartList){
    //     if(item.isChecked){
    //       console.log(item);
    //       allPrice += parseInt(item.price)*item.count
    //     }
    //   }
    //   return allPrice.toFixed(2);
    // }
    // 老师的代码
    allPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter((item) => {
            return item.isChecked;
          })
          .reduce((pre, item) => {
            return pre + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.$store.state.cartList
        .filter((item) => {
          return item.isChecked;
        })
        .reduce((pre, item) => {
          return pre + item.count;
        }, 0);
    },
    // 第一点、像这种通过true或者false判断的，首先第一个想到计算属性
    // 第二点、store getters里面的代码可以直接拿过来当成计算属性来用
    // 数组的查找优先考虑数组的高阶函数，如果无法实现的话再遍历
    isSelect() {
      console.log(this.cartList);
      if (this.catListLength == 0) {
        return false;
      }
      // 方法1：filter 过滤 返回负责条件的元素 组成新的数组
      // return !(this.cartList.filter(item=>!item.isChecked).length)
      // 方法2：find 函数 找到之后就不再继续往下找了 并且返回找到的值
      return !this.cartList.find((item) => !item.isChecked);
      // 方法3 遍历
    },
  },
  methods: {
    checkClick() {
      // for(let item of this.cartList){
      //   if(this.isSelect){
      //      item.isChecked = false;
      //   }else{
      //     item.isChecked = true;
      //   }
      // }
      if (this.isSelect) {
        this.cartList.forEach(item=>item.isChecked = false)
      } else {
        this.cartList.forEach(item=>item.isChecked = true)
      }
    },
  },
};
</script>
<style scoped>
.cart-bottom {
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: #efefef;
  display: flex;
  justify-content: space-between;
}
.check-content {
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-left: 5px;
}
.allPrice {
  margin-left: 10px;
}

.calculate {
  background: #ff8198;
  color: #fff;
  padding: 0 10px;
}
</style>
