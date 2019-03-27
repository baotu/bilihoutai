import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Login from './views/Login.vue'
import Index from './views/Index.vue'
import Yhgl from './views/Yhgl.vue'
import Video from './views/Video.vue'
import Integral from './views/Integral.vue'
import Gold from './views/Gold.vue'
import Videotype from './views/Videotype.vue'
import Videoreview from './views/Videoreview.vue'
import Videopl from './views/Videopl.vue'
import Allcomment from './views/Allcomment.vue'
import Freeze from './views/Freeze.vue'
import Videoaudit from './views/Videoaudit.vue'
import Digitalnews from './views/Digitalnews.vue'
import Mass from './views/Mass.vue'
import Propertytransfer from './views/Propertytransfer.vue'
import Photoalbum from './views/Photoalbum.vue'
import Userjournal from './views/Userjournal.vue'
import Photosh from './views/Photosh.vue'
import Photopl from './views/Photopl.vue'
import Photo from './views/Photo.vue'


Vue.use(Router)

export default new Router({
	/* mode: 'history', */
	/* base : process.env.BASE_URL, */
  routes: [
	{
		path: '/login',
		name: 'login',
		component: () => import('./views/Login.vue')
	},
    {
		path: '/',
		name: 'login',
		component: () => import('./views/Login.vue')
    },
	{
		path: '/home',
		name: 'home',
		component: () => import('./views/Home.vue'),
		meta: { requiresAuth: true }
	},
    {
		path: '/about',
		name: 'about',
		component: () => import('./views/About.vue'),
		meta: { requiresAuth: true }
    },
	{
	  path: '/index',
	  name: 'index',
	  component: () => import('./views/Index.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/yhgl',
		name: 'yhgl',
		component: () => import('./views/Yhgl.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/video',
		name: 'video',
		component: () => import('./views/Video.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/integral',
		name: 'integral',
		component: () => import('./views/Integral.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/gold',
		name: 'gold',
		component: () => import('./views/Gold.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/videotype',
		name: 'videotype',
		component: () => import('./views/Videotype.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/videoreview',
		name: 'videoreview',
		component: () => import('./views/Videoreview.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/videopl',
		name: 'videopl',
		component: () => import('./views/Videopl.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/allcomment',
		name: 'allcomment',
		component: () => import('./views/Allcomment.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/freeze',
		name: 'freeze',
		component: () => import('./views/Freeze.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/videoaudit',
		name: 'videoaudit',
		component: () => import('./views/Videoaudit.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/digitalnews',
		name: 'digitalnews',
		component: () => import('./views/Digitalnews.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/mass',
		name: 'mass',
		component: () => import('./views/Mass.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/propertytransfer',
		name: 'propertytransfer',
		component: () => import('./views/Propertytransfer.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/photoalbum',
		name: 'photoalbum',
		component: () => import('./views/Photoalbum.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/userjournal',
		name: 'userjournal',
		component: () => import('./views/Userjournal.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/photosh',
		name: 'photosh',
		component: () => import('./views/Photosh.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/photopl',
		name: 'photopl',
		component: () => import('./views/Photopl.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/photo',
		name: 'photo',
		component: () => import('./views/Photo.vue'),
		meta: { requiresAuth: true }
	},
	
  ]
})