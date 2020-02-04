<template lang="html">
	<div>
		<sui-menu fixed inverted>
			<sui-container>
				<a href="#" is="sui-menu-item" class="header">
					<img src="../assets/rausenxs_16px.jpg" class="logo">
					Rausenxs
				</a>

				<a href="#" is="sui-menu-item">首页</a>

				<sui-dropdown text="文章" item class="simple">
					<sui-dropdown-menu>
						<a is="sui-dropdown-item" href="#"> OI/ACM </a>
						<a is="sui-dropdown-item" href="#"> 个人 </a>
						<a is="sui-dropdown-item" href="#" >其他 </a>
<!--					
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
-->
					</sui-dropdown-menu>
				</sui-dropdown>
				
				<a href="#" is="sui-menu-item">个人介绍</a>
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
img.logo {
	margin-right: 1.5em !important;
}
</style>