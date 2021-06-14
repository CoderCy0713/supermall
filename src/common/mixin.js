import {debound} from './utils'
import {TOP_DISTANCE} from 'common/const'
export const itemImgListener = {
  mounted(){
    console.log("混入的内容");
    const refresh = debound( this.$refs.scroll.refresh,100);
    this.itemImgListener = ()=>{
      refresh();
    }
    this.$EventBus.$on("imageLoadEvent", this.itemImgListener);
  }
}

export const backTopMixin = {
  data(){
    return{
      isShow:false
    }
  },
  components:{
    TOP_DISTANCE
  },
  methods:{
    // 监听回到顶部事件
    backClick(){
      // console.log("回到顶部");
      // this.$refs.scroll拿到的是组件实例
      // this.$refs.scroll.scroll 拿到的是实例里面的scroll实例
      this.$refs.scroll.scrollTo(0,0)
    },
    judgeShow(position){
      this.isShow = -position.y > TOP_DISTANCE;
    }
  }
}
