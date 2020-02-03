<template>
	<div>
		<v-navbar v-if="!this.$route.meta.isHideHeader"/>
		<router-view/>
		<v-footbar v-if="!this.$route.meta.isHideHeader"/>
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
