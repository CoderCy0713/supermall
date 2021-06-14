import {ADD_COUNTET,ADD_TO_CART} from './mutation-types'

export default {
  addCart(context,payload){


    return new Promise((resolve,reject)=>{
      let oldCart = null;
      for(let item of  context.state.cartList){
        if(item.id == payload.id){
          oldCart = item;

        }
      }
      // 説明之前有
      if(oldCart){
        context.commit(ADD_COUNTET,oldCart);
        resolve('当前商品数量+1');
      }else{
        payload.count = 1;
        context.commit(ADD_TO_CART,payload);
        resolve('新商品添加成功');
      }
    })
  }
}
