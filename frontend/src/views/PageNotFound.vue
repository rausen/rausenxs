<template>
	<div>
		<v-navbar></v-navbar>
		<v-header></v-header>
		<div class="container">
			<h1 class="display-3">Page Not Found</h1>
		</div>
	</div>
</template>

<script>
//	import NavBar from './NavBar'
//	import Header from './Header'
	export default {
		name: 'NotFound',
		components: {
//			'v-navbar': NavBar,
//			'v-header': Header
		}
	}
</script>

<style scoped>
	h1 {
		text-align: center;
	}
</style>