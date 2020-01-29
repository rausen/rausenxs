<template>
	<div>
		<p> {{ message1 }} </p>
		<div v-html = 'message2'> </div>
		
		<p>{{ message3.split('').reverse().join('') }}</p>
		<label for="r1">↓会隐形</label><input type="checkbox" v-model="message4" id="r1">
		<p v-if="message4">现在你看到我了</p>
		
		<p> {{ message5 }} </p>
		
		<input type = "text" v-model = "message5">
		
		<p> {{ message6 }} </p>
		<button v-on:click="reverseMessage6">反转字符串</button>
	</div>
</template>   
 
<script>
	export default {
		data() {
			return {
				message1: 'test message1',
				message2: '<h1> Rausen! </h1>',
				message3: '我 服 了 真的',
				message4: false,
				message5: 'test message5',
				message6: 'Rausen!',
			}
		},
		methods: {
			reverseMessage6() {
				this.message6 = this.message6.split('').reverse().join('')
			}
		},
		name: 'Test',
		components: {
		}
	}
</script>