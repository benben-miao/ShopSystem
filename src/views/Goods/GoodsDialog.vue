<!-- eslint-disable vue/no-mutating-props -->
<template>
	<div>
		<el-dialog title="Add Goods" :visible.sync='dialogVisible' width="60%">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
				<el-form-item label="Category" prop="category">
					<el-button type="primary" @click="innerVisible=true">Category</el-button>
					<span>{{ ruleForm.category }}</span>
				</el-form-item>

				<el-form-item label="Goodes Name" prop="title">
					<el-input v-model="ruleForm.title"></el-input>
				</el-form-item>
				<el-form-item label="Goodes Price" prop="price">
					<el-input v-model="ruleForm.price"></el-input>
				</el-form-item>
				<el-form-item label="Goodes Number" prop="num">
					<el-input v-model="ruleForm.num"></el-input>
				</el-form-item>
				<el-form-item label="Goodes Time" prop="time">
					<el-col :span="11">
						<el-form-item prop="date1">
							<el-date-picker type="date" placeholder="Pick a date" v-model="ruleForm.date1" style="width: 100%;">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col class="line" :span="2">-</el-col>
					<el-col :span="11">
						<el-form-item prop="date2">
							<el-time-picker placeholder="Pick a time" v-model="ruleForm.date2" style="width: 100%;">
							</el-time-picker>
						</el-form-item>
					</el-col>
				</el-form-item>
				<el-form-item label="SellPoint" prop="sellPoint">
					<el-input v-model="ruleForm.sellPoint"></el-input>
				</el-form-item>
				<el-form-item label="Goodes Image" prop="image">
					<el-button type="primary">Update Image</el-button>
				</el-form-item>
				<el-form-item label="Goodes Desc" prop="descs">
					<textarea name="" id="" cols="30" rows="10"></textarea>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">Create</el-button>
					<el-button @click="resetForm('ruleForm')">Reset</el-button>
				</el-form-item>
			</el-form>

			<span slot="footer" class="dialog-footer">
				<!-- <el-button @click="close">Cancel</el-button>
				<el-button type="primary" @click="close">Confirm</el-button> -->
				<el-button @click="dialogVisible = false">Cancel</el-button>
				<el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
			</span>

			<el-dialog width="40%" title="Category" :visible.sync="innerVisible" append-to-body>
				<GoodsTree @sendTreeData='sendTreeData'/>
				<el-button @click="innerVisible = false">Cancel</el-button>
				<el-button type="primary" @click="showTreeData">Confirm</el-button>
			</el-dialog>

		</el-dialog>
	</div>
</template>

<script>
import GoodsTree from './GoodsTree.vue'

export default {
	components: {
		GoodsTree
	},
	// props: {
	// 	dialogVisible: Boolean
	// },
	data() {
		return {
			dialogVisible: false,
			innerVisible: false,
			treeData: {},
			ruleForm: {
				title: "",
				price: "",
				num: "",
				sellPoint: "",
				image: "",
				descs: "",
				category: "",
				date1: "",
				date2: ""
			},
			rules: {
				title: [
					{ required: true, message: 'Please input goods name', trigger: 'blur' },
					{ min: 3, max: 10, message: 'Length should be 3 to 10', trigger: 'blur' }
				],
				price: [
					{ required: true, message: 'Please input goods price', trigger: 'change' }
				],
				num: [
					{ required: true, message: 'Please input goods number', trigger: 'change' }
				]
			}
		}
	},
	methods: {
		sendTreeData(val) {
			this.treeData = val;
		},
		showTreeData() {
			this.innerVisible = false;
			this.ruleForm.category = this.treeData.name;
		},
		// close() {
		// 	this.$emit('changeDialog');
		// },
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					alert('submit!');
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		}
	}
}
</script>

<style>

</style>