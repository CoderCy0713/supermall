import Vue from 'vue'
import App from './App.vue'
import router from './router'
import  { Swipe, SwipeItem } from 'vant';
import 'vant/lib/index.css';
import store from './store'
import vuelazyload from 'vue-lazyload'

Vue.prototype.$EventBus = new Vue();
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(vuelazyload);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
