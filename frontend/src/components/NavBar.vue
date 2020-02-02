<template lang="html">
	<div>
		<sui-menu fixed inverted>
			<sui-container>
				<a href="#" is="sui-menu-item" class="header">
					<img src="/static/images/logo.png" class="logo">
					Project Name111
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
	</div>
</template>

<script> 
	export default {
		name: 'NavBar',
	}
</script>

<style lang="css" scoped>
.footer {
	margin: 5em 0em 0em;
	padding: 5em 0em;
}
</style>