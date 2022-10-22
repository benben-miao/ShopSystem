<template>
	<div id="main">
		
	</div>
</template>

<script>
import E from 'wangeditor'

export default {
	data() {
		return {
			editor: ''
		}
	},
	mounted() {
		this.editor = new E('#main');
		this.editor.config.focus = false;
		
		this.editor.config.onchange = newHtml => {
			// console.log(newHtml);
			this.$emit('sendEditor', newHtml);
		};
		this.editor.config.onchangeTimeout = 500;

		// this.editor.config.menus = ["bold"];
		this.editor.create();
	}
}
</script>

<style>

</style>