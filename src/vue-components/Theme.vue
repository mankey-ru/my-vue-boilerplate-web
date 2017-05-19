<script>
	import mixins from './../vue-mixins.js'

	export default {
		name: 'AppRoot',
		data: function () {
			return {}
		},
		mixins: [mixins]
	}
</script>


<template>
	<div class="theme-wrap">
		<div class="nav">
			<b>Навигация:</b>
			<a v-for="rt in $root.$router.options.routes" v-if="rt.meta && !rt.meta.hidden" v-bind:href="'#'+rt.path">{{rt.meta.title}}</a>
		</div>
		<router-view></router-view>
	</div>
</template>

<style lang="less"> /* Глобальные стили */
	body {
		margin: 0;
		padding: 0;
		font-family: consolas, monospace;
		font-size: 1.2em;
	}
	.theme-wrap {
		width: 960px;
		margin: 0 auto;
		padding: 2em 0;
	}
</style>

<style scoped lang="less"> /* Изолированные (scoped) стили обвязки */
	.nav a {
		margin-right: .5em;
	}
</style>