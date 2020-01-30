<template>
	<div>
		<p> message from Django Ajax Test: </p>
		<p> {{ message }} </p>
	</div>
</template>   
 
<script>
import axios from 'axios'

	export default {
		data() {
			return {
				message: '111'
			}
		},
		mounted() {
			axios
				.get('getsound?soundid=1303303')
				.then(response => (this.message = response))
				.catch(function (error) {
					console.log(error);
				});
		},
		name: 'AjaxTest',
		components: {
		}
	}
	
</script>