<template>
	<div id = "head">
		<h1> {{msg}} </h1>
	</div>
</template>

<script>
	export default {
		name : "Test",
		props : {
			msg : String
		}
	}
</script>

<style>
	#head {
		color : purple;
	}
</style>