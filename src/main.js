import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import './plugins/element.js'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import vuePicturePreview from 'vue-picture-preview'

Vue.use(preview)
Vue.use(vuePicturePreview)
axios.defaults.baseURL = 'http://111.230.247.223/SameBWeb/';
axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
	axios.get('xyadministrator/findSession.do').then(rs => {
		if (JSON.stringify(rs.data) != '{}') {
			store.commit('setuser', rs.data.xyuser);
		}
		if (to.meta.requiresAuth) {
			axios.get('xyadministrator/findSession.do').then(rst => {
				if (JSON.stringify(rst.data) === '{}') {
					next('/login');
				} else {
					next();
				}
			})
		} else {
			next();
		}
	})
	
	//if (to.meta.requiresAuth) { // 下一个页面需要登录
		/* axios.get('http://111.230.247.223/SameBWeb/xyadministrator/findSession.do')
		.then(rs => {
			if (JSON.stringify(rs.data) === '{}') {
				next('/login');
			} else {
				store.commit('changeLogin', rs.data.xyuser);
				next();
			}
		}).catch(err => {
			console.log(err)
		});
	} else { //下一个页面不需要登录
		next() // 访问下一个页面
	} */
})

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
