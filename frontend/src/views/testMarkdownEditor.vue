<template lang="html">
	<div>
		<sui-header size="huge"> {{ "Markdown Editor" }} </sui-header>

		<mavon-editor
			v-model="article.markdown"
			ref="md"
			@change="change"
		/>
		
		<div v-html = 'article.html'> </div>
	</div>	
</template>

<script>
import { mavonEditor } from 'mavon-editor'
export default {
	name: 'testMarkdownEditor',
	components: {
		mavonEditor,
	},
	data() {
		return {
			article: {
				title: '现代密码学第一次作业',
				id: '20200205',
				markdown: '',
				html: '',
			}
		}
	},
	methods: {
		change(markdown, html) {
			console.log(markdown);
			console.log(html);
			this.article.html = html;
		},
	}
};
</script>

<style lang="css" scoped>

</style>