<template>
	<div class="add-goods">
		<div class="title">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">Home Page</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/goods' }">Goods Page</el-breadcrumb-item>
				<el-breadcrumb-item>Add Goods</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="myform">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
				<el-form-item label="Category" prop="category">
					<el-button type="primary">Category</el-button>
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
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
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
		};
	},
	methods: {
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
.add-goods {
	margin: 20px;
}

.title {
	padding: 10px;
	background-color: #ffffff;
	box-shadow: 0px 0px 5px #cdcdcd;
	border-radius: 10px;
	border: 1px solid #eee;
	margin-bottom: 20px;
}

.myform {
	background-color: #ffffff;
	box-shadow: 0px 0px 5px #cdcdcd;
	border-radius: 10px;
	padding: 20px;
}
</style>