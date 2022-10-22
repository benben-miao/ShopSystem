<template>
	<div>
		<el-upload class="upload-demo" ref="upload" :action="url"
			:on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false"
			:on-success="successUpload">
			<el-button slot="trigger" size="small" type="primary">select file</el-button>
			<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">upload to server
			</el-button>
			<div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
		</el-upload>
	</div>
</template>

<script>
import base from '../../api/base'

export default {
	data() {
		return {
			url: base.uploadUrl,
			fileList: []
		}
	},
	methods: {
		submitUpload() {
			this.$refs.upload.submit();
		},
		successUpload(response, file, fileList) {
			console.log(response, file, fileList);
			this.$message({
				message: 'Success upload',
				type: 'success'
			});
			let imageUrl = base.host + '/' + response.url.slice(7);
			this.$emit('sendImage', imageUrl)
		},
		handleRemove(file, fileList) {
			console.log(file, fileList);
		},
		handlePreview(file) {
			console.log(file);
		}
	}
}
</script>

<style>

</style>