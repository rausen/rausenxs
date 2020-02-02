<template lang="html">
	<div>
		<sui-container class="main" text>
			<sui-header size="huge"> {{ article.title}} </sui-header>
			<p> article id: {{ article.id }}</p>
			<pre> {{ article.content }} </pre>
			<docs-wireframe name="media-paragraph" />
			<docs-wireframe
				v-for="n in 5"
				:key="n"
				class="wireframe"
				name="paragraph" />
		</sui-container>
	</div>
</template>

<script>
export default {
	name: 'testArticle',
	data() {
		return {
			article: {}
		}
	},
	mounted () {
		this.article = this.getArticle(this.$route.params.id)
	},
	beforeRouteUpdate (to, from, next) {
		this.article = this.getArticle(to.params.id)
		next()
	},
	methods: {
		getArticle(_id) {
			return {
				id: _id,
				title: 'test title',
				content: 'test content',
			}
		}
	}
};
</script>

<style lang="css" scoped>
img.logo {
	margin-right: 1.5em !important;
}
.main {
	margin-top: 7em;
}
.wireframe {
	margin: 2em 0;
}
.footer {
	margin: 5em 0em 0em;
	padding: 5em 0em;
}
</style>