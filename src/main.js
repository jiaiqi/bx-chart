import Vue from 'vue'
import VCharts from 'v-charts'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import App from './App.vue'
import router from './router'
import store from './store'
import VueInit from '@/assets/dev_config/vue_init'
import VueUtil from '@/assets/dev_config/vue_util'
import { vChartInfo } from '@/assets/common/getvChartData'
// import { resizeJs } from '@/assets/dev_config/resize'
import common from '@/assets/common/common'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import dataV from '@jiaminghi/data-view'
import 'font-awesome/css/font-awesome.css'
import VueDragResize from 'vue-drag-resize'
import yanan from './assets/common/yanan.json' // 导入延安地图geo json
import echarts from 'echarts'
import 'echarts-liquidfill'
import 'video.js/dist/video-js.css' // 引入样式
import 'videojs-flash'
import 'videojs-contrib-hls'
// import { videoPlayer } from 'vue-video-player'


Vue.config.productionTip = false

Vue.use(VueAwesomeSwiper)
Vue.use(ElementUI)
Vue.use(VCharts)
Vue.use(common)
Vue.use(dataV)
// Vue.use(videoPlayer)

VueInit()
VueUtil()

Vue.component('vue-drag-resize', VueDragResize)

Vue.prototype.$echarts = echarts //将echarts存到Vue原型中
Vue.prototype.vChartInfo = vChartInfo // 挂载 vChartInfo 到vue.proto对象上原型属性
// Vue.prototype.resize = resizeJs
Vue.prototype.$echarts.registerMap('yanan', yanan) // 注册自定义地图

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
