<template>
	<div>
		<el-tree :props="props" :load="loadNode" lazy accordion @node-click="nodeClick">
		</el-tree>
	</div>
</template>

<script>
export default {
	data() {
		return {
			props: {
				label: 'name',
				children: 'zones'
			},
		};
	},
	methods: {
		nodeClick(data, node) {
			console.log(data, node);
			this.$emit('sendTreeData', data);
		},
		loadNode(node, resolve) {
			if (node.level === 0) {
				this.$api.getCategory()
				.then(res => {
					// console.log(res.data);
					return resolve(res.data.result)
				})
			}
			if (node.level >= 1) {
				this.$api.getCategory({
					id:node.data.cid
				})
				.then(res => {
					if(res.data.status === 200) {
						return resolve(res.data.result);
					} else {
						return resolve([])
					}
				})
			}
		}
	}
};
</script>

<style>

</style>