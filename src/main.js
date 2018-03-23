import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import DataTables from 'vue-data-tables'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import Aplayer from 'vue-aplayer'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(DataTables);
locale.use(lang)

new Vue({
  components: {
  Aplayer
},

render: h => h(App)
}).
$mount('#app')
