<template lang="html">
	<div>
		<sui-menu fixed inverted>
			<sui-container>
				<a href="#" is="sui-menu-item" class="header">
					<img src="/static/images/logo.png" class="logo">
					Project Name
				</a>

				<a href="#" is="sui-menu-item">Home</a>

				<sui-dropdown text="dropdown" item class="simple">
					<sui-dropdown-menu>
						<a is="sui-dropdown-item" href="#">Link Item</a>
						<a is="sui-dropdown-item" href="#">Link Item</a>

						<sui-dropdown-divider />
						<sui-dropdown-header>Header Item</sui-dropdown-header>

						<sui-dropdown-item>
							<sui-icon name="dropdown" /> Submenu

							<sui-dropdown-menu class="simple">
								<a is="sui-dropdown-item" href="#">Link Item</a>
								<a is="sui-dropdown-item" href="#">Link Item</a>
							</sui-dropdown-menu>
						</sui-dropdown-item>

						<a is="sui-dropdown-item" href="#">Link Item</a>
					</sui-dropdown-menu>
				</sui-dropdown>
			</sui-container>
		</sui-menu>

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

		<sui-segment inverted vertical class="footer">
			<sui-container text-align="center">
				<sui-grid class="inverted" stackable divided>
					<sui-grid-row>
						<sui-grid-column :width="3" v-for="n in 3" :key="n">
							<sui-list class="inverted" link>
								<h4 is="sui-header" :content="`Group ${n}`" class="inverted" />
								<a is="sui-list-item" href="#">Link One</a>
								<a is="sui-list-item" href="#">Link Two</a>
								<a is="sui-list-item" href="#">Link Three</a>
								<a is="sui-list-item" href="#">Link Four</a>
							</sui-list>
						</sui-grid-column>
						<sui-grid-column :width="3">
							<h4 is="sui-header" content="Footer Header" class="inverted" />
							<p>
								Extra space for a call to action inside the footer that could help re-engage users.
							</p>
						</sui-grid-column>
					</sui-grid-row>
				</sui-grid>

				<sui-divider inverted section />

				<sui-image src="/static/images/logo.png" size="mini" centered />
				<sui-list
					horizontal
					divided
					link
					class="inverted">

					<a is="sui-list-item" href="#">Site Map</a>
					<a is="sui-list-item" href="#">Contact Us</a>
					<a is="sui-list-item" href="#">Terms and Conditions</a>
					<a is="sui-list-item" href="#">Privacy Policy</a>
				</sui-list>
			</sui-container>
		</sui-segment>
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