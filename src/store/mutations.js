import {ADD_COUNTET,ADD_TO_CART} from './mutation-types'
export default  {
  [ADD_COUNTET](state,oldCart){
    oldCart.count++;
    console.log(oldCart,"oldCart");
  },
  [ADD_TO_CART](state,payload){
    payload.isChecked = true;
    state.cartList.push(payload);
  }
}
