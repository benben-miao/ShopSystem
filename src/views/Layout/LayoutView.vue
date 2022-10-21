<template>
	<el-container>
		<!-- 1. Aside -->
		<el-aside>
			<el-menu :default-active="$router.path" :collapse='isCollapse' collapse-transition router>
				<el-menu-item index="/">
					<i class="el-icon-table-lamp"></i>
					<template slot="title">Home Page</template>
				</el-menu-item>
				<el-menu-item index="/goods">
					<i class="el-icon-s-shop"></i>
					<template slot="title">Goods Detail</template>
				</el-menu-item>
				<el-menu-item index="/params">
					<i class="el-icon-s-order"></i>
					<template slot="title">Params Detail</template>
				</el-menu-item>
				<el-menu-item index="/advert">
					<i class="el-icon-message-solid"></i>
					<template slot="title">Advert Detail</template>
				</el-menu-item>
				<el-submenu index="/order">
					<template slot="title">
						<i class="el-icon-s-goods"></i>
						<span slot="title">Order Detail</span>
					</template>

					<el-menu-item index="/order/order-list">Order List</el-menu-item>
					<el-menu-item index="/order/order-back">Order Back</el-menu-item>
				</el-submenu>
			</el-menu>
		</el-aside>

		<el-container class="content">
			<!-- 2. Header -->
			<el-header>
				<i v-if='!isCollapse' @click='changeCollapse' class="el-icon-news" 
					style="font-size: 1.5em; font-weight: bold; background-color: #ff000033; padding: 5px; border-radius: 5px;">
				</i>
				<i v-else @click='changeCollapse' class="el-icon-news" 
					style="font-size: 1.5em; font-weight: bold; background-color: #0000ff33; padding: 5px; border-radius: 5px;">
				</i>
			</el-header>

			<!-- 3. Main -->
			<el-main>
				<router-view />
			</el-main>

			<!-- 4. Footer -->
			<el-footer>
				Autho: benben-miao University: Xiamen University
			</el-footer>

		</el-container>
	</el-container>
</template>

<script>
export default {
	data() {
		return {
			isCollapse: false
		}
	},
	methods: {
		changeCollapse(){
			this.isCollapse = !this.isCollapse;
		}
	}
}
</script>

<style>
.content {
	margin-left: 15%;
}

.el-header {
	height: 60px;
	background-color: #00880033;
	box-shadow: 0px 1px 5px #00880033;
	border-radius: 10px;
	line-height: 60px;
}

.el-aside {
	max-width: 15% !important;
	height: 100%;
	position: fixed;
}

.el-menu {
	height: 98.9%;
	background-color: #0000ff11 !important;
	border-radius: 10px;
	margin: 5px !important;
	color: black;
}

.el-menu-item {
	border-radius: 10px;
}

.el-footer {
	width: 84.9%;
	height: 50px;
	background-color: #333333;
	position: fixed;
	bottom: 0px;
	color: white;
	padding: 10px !important;
	border-radius: 10px;
}
</style>