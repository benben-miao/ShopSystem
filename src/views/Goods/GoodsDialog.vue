<!-- eslint-disable vue/no-mutating-props -->
<template>
	<div>
		<!-- 1.Form -->
		<el-dialog :title="dialogTitle" :visible.sync='dialogVisible' width="60%">
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
					<el-button type="primary" @click="innerVisibleImage = true">Update Image</el-button>
					<img :src="ruleForm.image" height="200" alt="" style="margin-left: 10px;">
				</el-form-item>
				<el-form-item label="Goodes Desc" prop="descs">
					<WangEditor @sendEditor="sendEditor" ref='myEditor' />
				</el-form-item>
			</el-form>

			<span slot="footer" class="dialog-footer">
				<!-- <el-button @click="close">Cancel</el-button>
				<el-button type="primary" @click="close">Confirm</el-button> -->
				<el-button @click="resetForm">Cancel</el-button>
				<el-button type="primary" @click="submitForm">Submit</el-button>
			</span>

			<!-- 2.GoodsTree -->
			<el-dialog width="40%" title="Category" :visible.sync="innerVisible" append-to-body>
				<GoodsTree @sendTreeData='sendTreeData' />
				<span slot="footer" class="dialog-footer">
					<el-button @click="innerVisible = false">Cancel</el-button>
					<el-button type="primary" @click="showTreeData">Confirm</el-button>
				</span>
			</el-dialog>

			<!-- 3.ImageUpload -->
			<el-dialog width="40%" title="ImageUpload" :visible.sync="innerVisibleImage" append-to-body>
				<ImageUpload @sendImage='sendImage' />
				<span slot="footer" class="dialog-footer">
					<el-button @click="innerVisibleImage = false">Cancel</el-button>
					<el-button type="primary" @click="showImage">Confirm</el-button>
				</span>
			</el-dialog>
		</el-dialog>
	</div>
</template>

<script>
import GoodsTree from './GoodsTree.vue'
import ImageUpload from './ImageUpload.vue'
import WangEditor from './WangEditor.vue'

export default {
	props: {
		dialogTitle: {
			type: String,
			default: "New Goods"
		},
		rowData: {
			type: Object,
			default: function () {
				return {}
			}
		}
	},
	// mounted() {
	// 	this.ruleForm = this.rowData;
	// },
	watch: {
		rowData(val) {
			this.ruleForm = val;
			this.$nextTick(() => {
				this.$refs.myEditor.editor.txt.html(val.descs)
			})
		}
	},
	components: {
		GoodsTree,
		ImageUpload,
		WangEditor
	},
	// props: {
	// 	dialogVisible: Boolean
	// },
	data() {
		return {
			dialogVisible: false,
			innerVisible: false,
			innerVisibleImage: false,
			imageUrl: '',
			treeData: {},
			ruleForm: {
				id: "",
				title: "",
				price: "",
				num: "",
				sellPoint: "",
				image: "",
				descs: "",
				cid: '',
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
		sendEditor(val) {
			this.ruleForm.descs = val;
		},
		sendImage(val) {
			// console.log(val);
			this.imageUrl = val;
		},
		showImage() {
			this.innerVisibleImage = false;
			this.ruleForm.image = this.imageUrl;
		},
		sendTreeData(val) {
			this.treeData = val;
		},
		showTreeData() {
			this.innerVisible = false;
			this.ruleForm.category = this.treeData.name;
			this.ruleForm.cid = this.treeData.cid;
		},
		// close() {
		// 	this.$emit('changeDialog');
		// },
		submitForm() {
			this.$refs.ruleForm.validate((valid) => {
				if (valid) {
					// console.log(this.ruleForm);
					let { id, title, image, sellPoint, price, cid, category, num, descs } = this.ruleForm;
					if (this.dialogTitle === "New Goods") {
						this.$api.getInsertGoods({
							title, image, sellPoint, price, cid, category, num, descs
						})
							.then(res => {
								// console.log(res.data);
								if (res.data.status === 200) {
									this.dialogVisible = false;
									this.$parent.getData(1);
									this.$message({
										message: 'Success',
										type: 'success'
									})
									this.resetForm();
								} else {
									this.$message.error('Error');
								}
							})
					} else {
						console.log('Edit Goods');
						this.$api.getUpdateGoods({
							id,	title, image, sellPoint, price, cid, category, num, descs
						})
						.then(res=> {
							// console.log(res.data);
							if(res.data.status === 200) {
								this.$parent.getData(1);
								this.$message({
									message: 'Success',
									type: 'success'
								});
								this.resetForm();
							} else {
								this.$message.error('Error');
							}
						})
					}
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetForm() {
			this.dialogVisible = false;
			// this.$refs.ruleForm.resetFields();
			this.ruleForm = {
				title: "",
				price: "",
				num: "",
				sellPoint: "",
				image: "",
				descs: "",
				cid: '',
				category: "",
				date1: "",
				date2: ""
			};
			this.$refs.myEditor.editor.txt.clear();
		}
	}
}
</script>

<style>

</style>