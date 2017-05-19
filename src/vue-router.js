import Vue from 'vue'
import VueRouter from 'vue-router'

import start from './vue-components/start.vue';
import about from './vue-components/about.vue';

const routes = [{
	path: '/',
	name: 'start',
	component: start,
	meta: {
		title: 'Стартовая страница'
	}
}, {
	path: '/about',
	name: 'about',
	component: about,
	meta: {
		title: 'О нас'
	}
}, { // 404
	path: '*',
	component: {
		template: `
			<h1 class="text-center"><br/><br/>Ой-вэй, страница не найдена</h1>
			`
	}
}];

Vue.use(VueRouter);
var router = new VueRouter({
	routes
});

// router.beforeEach((to, from, next) => {}) // https://router.vuejs.org/en/advanced/navigation-guards.html
export default router;