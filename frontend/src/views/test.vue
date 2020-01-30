<template>
	<div>
		<p> {{ message1 }} </p>
		<div v-html = 'message2'> </div>
		
		<p>{{ message3.split('').reverse().join('') }}</p>
		<label for = "r1">↓会隐形</label><input type = "checkbox" v-model = "message4" id="r1">
		<p v-if = "message4">现在你看到我了</p>
		
		<p> {{ message5 }} </p>
		
		<input type = "text" v-model = "message5">
		
		<p> {{ message6 }} </p>
		<button v-on: click = "reverseMessage6">反转字符串</button>
		
		<p> {{ message7 | message7_func }} </p>
		
		<div v-if = "Math.random() > 0.5"> Sorry </div>
		<div v-else > Not sorry </div>
		
		<div>
			<ol>
				<li v-for = "message8 in message8s" :key = "message8.name">
					{{ message8.name }}
				</li>
			</ol>
		</div>
		
		<div v-for = "n in 5" :key = "n">
			{{ n }}
		</div>
		
		<div id = "kilometers to meters">
			千米 : <input type = "text" v-model = "kilometers">
			米 : <input type = "text" v-model = "meters">
		</div>
		
		<p>多个复选框：</p>
		<input type="checkbox" id="runoob" value="Runoob" v-model = "message9">
		<label for="runoob">Runoob</label>
		<input type="checkbox" id="google" value="Google" v-model = "message9">
		<label for="google">Google</label>
		<input type="checkbox" id="taobao" value="Taobao" v-model = "message9">
		<label for="taobao">taobao</label>
		<br>
		<span>选择的值为: {{ message9 }}</span>
		
		<p>单选按钮：</p>
		<input type="radio" id="runoob1" value="Runoob" v-model = "message10">
		<label for="runoob1">Runoob</label>
		<br>
		<input type="radio" id="google1" value="Google" v-model = "message10">
		<label for="google1">Google</label>
		<br>
		<span>选中值为: {{ message10 }}</span>
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
				message7: 'rausen!',
				message8s: [ {name: 'rausen1'}, {name: 'rausen2'}, {name: 'rausen3'}],
				kilometers: 0,
				meters: 0,
				message9: [],
				message10: 'Runoob',
			}
		},
		methods: {
			reverseMessage6() {
				this.message6 = this.message6.split('').reverse().join('')
			}
		},
		filters: {
			message7_func: function(value) {
				if (!value) return ''
				value = value.toString()
				return value.charAt(0).toUpperCase() + value.slice(1)
			}
		},
		watch: {
			kilometers: function(val) {
				this.kilometers = val;
				this.meters = this.kilometers * 1000;
			},
			meters: function(val) {
				this.kilometers = val/ 1000;
				this.meters = val;
			}
		},
		name: 'Test',
		components: {
		}
	}
	
</script>