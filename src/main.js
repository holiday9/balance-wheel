import Vue from 'vue'
import App from './App.vue'
import "element-ui/lib/theme-chalk/index.css";
import ElementUI from "element-ui";
import _ from "lodash";

Object.defineProperty(Vue.prototype, '_', { value: _ });

Vue.config.productionTip = false
Vue.use(ElementUI, { size: "small" });

new Vue({
  render: h => h(App),
}).$mount('#app')
