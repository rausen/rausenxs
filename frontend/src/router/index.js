import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PageNotFound from '../views/PageNotFound.vue'
import Test from '../views/test.vue'
import AjaxTest from '../views/AjaxTest.vue'
import SemanticTestLogin from '../views/SemanticTestLogin.vue'
import SemanticTestFixedMenu from '../views/SemanticTestFixedMenu.vue'
import testArticle from '../views/testArticle.vue'
import testNoHeader from '../views/testNoHeader.vue'
Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/about',
		name: 'about',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	},
	{
		path: '/test',
		name: 'test',
		component: Test
	},
	{
		path: '/ajaxtest',
		name: 'ajaxtest',
		component: AjaxTest
	},
	{
		path: '/semantictestlogin',
		name: 'semantictestlogin',
		component: SemanticTestLogin,
		meta: {
			isHideHeader: true
		}
	},
	{
		path: '/semantictestfixedmenu',
		name: 'semantictestfixedmenu',
		component: SemanticTestFixedMenu
	},
	{
		path: '/testarticle/:id',
		name: 'testarticle',
		component: testArticle,
	},
	{
		path: '/testnoheader',
		name: 'testnoheader',
		component: testNoHeader,
		meta: {
			isHideHeader: true
		}
	},
	{
		path: '*',
		name: 'PageNotFound',
		component: PageNotFound
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
