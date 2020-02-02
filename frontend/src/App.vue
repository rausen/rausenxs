<template>
	<div>
		<v-navbar> </v-navbar>
		<router-view> </router-view>
		<v-footbar> </v-footbar>
	</div>
</template>

<script>
import 'semantic-ui-css/semantic.css';
import NavBar from '@/components/NavBar.vue'
import FootBar from '@/components/FootBar.vue'

export default {
	name: 'App',
	components: {
		'v-navbar': NavBar,
		'v-footbar': FootBar,
	},
};
</script>

<style lang="less">

</style>
