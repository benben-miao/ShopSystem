const express = require('express')
const router = express.Router()

const sqlFun = require('./mysql')

const multer = require('multer')
const fs = require('fs')

const jwt = require('jsonwebtoken')
const config = require('./secert')

const Mock = require('mockjs')

// router.post('/register', (req, res) => {
// 	const {
// 		username,
// 		password
// 	} = req.body;
// 	const sql = "insert into userinfo values(null, ?, ?)";
// 	const arr = [username, password];
// 	sqlFun(sql, arr, (result) => {
// 		if (result.affectedRows > 0) {
// 			res.send({
// 				status: 200,
// 				msg: 'success'
// 			})
// 		} else {
// 			res.status(401).json({
// 				errors: 'error'
// 			})
// 		}
// 	})
// })

router.post('/login', (req, res) => {
	let {username, password} = req.body;
	let sql = "select * from userinfo where username=? and password=?";
	let arr = [username, password]
	sqlFun(sql, arr, result => {
		if (result.length > 0) {
			let token = jwt.sign({
				username: result[0].username,
				id: result[0].id
			}, config.jwtSecert, {
				expiresIn: 20 * 1
			})
			res.send({
				status: 200,
				data: token
			})
		} else {
			res.send({
				status: 404,
				msg: 'error'
			})
		}
	})
})

router.get('/projectList', (req, res) => {
	const page = req.query.page || 1;
	const sqlLen = "select * from project where id";
	sqlFun(sqlLen, null, data => {
		let len = data.length;
		const sql = "select * from project order by id desc limit 8 offset " + (page - 1) * 8;
		sqlFun(sql, null, result => {
			if (result.length > 0) {
				res.send({
					status: 200,
					data: result,
					pageSize: 8,
					total: len
				})
			} else {
				res.send({
					status: 500,
					msg: "None"
				})
			}
		})
	})
})

router.get("/search", (req, res) => {
	var search = req.query.search;
	const sql = "select * from project where concat(id, title, sellPoint, descs) like '%" + search + "%'";
	sqlFun(sql, null, (result) => {
		if (result.length > 0) {
			res.send({
				status: 200,
				result
			})
		} else {
			res.send({
				status: 500,
				msg: "None"
			})
		}
	})
})
// router.get('/', (req, res)=>{
// 	res.send('hello')
// })

router.get("/category", (req, res) => {
	const id = req.query.id || 1;
	const sql = "select * from category where id=?";
	var arr = [id];
	sqlFun(sql, arr, result => {
		if (result.length > 0) {
			res.send({
				status: 200,
				result
			})
		} else {
			res.send({
				status: 500,
				msg: "None"
			})
		}
	})
})

router.get("/category/data", (req, res) => {
	var cid = req.query.cid;
	var sql = "select * from params where itemCatId=?";
	sqlFun(sql, [cid], result => {
		if(result.length > 0) {
			res.send({
				status: 200,
				result
			})
		} else {
			res.send({
				status: 500,
				msg: "None"
			})
		}
	})
})

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./upload/")
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + "-" + file.originalname)
	}
})

var createFolder = function(folder) {
	try {
		fs.accessSync(folder);
	} catch(e) {
		fs.mkdirSync(folder);
	}
}

var uploadFolder = './upload/';
createFolder(uploadFolder);
var upload = multer({
	storage: storage
})

router.post('/upload', upload.single('file'), function (req, res, next) {
	var file = req.file;
	console.log('File type: %s', file.mimetype);
	console.log('File name: %s', file.originalname);
	console.log('File size: %s', file.size);
	console.log('File path: %s', file.path);
	res.json({
		res_code: '0',
		name: file.originalname,
		url: file.path
	})
})

router.get('/insertGoods', (req, res) => {
	var title = req.query.title || "";
	var cid = req.query.cid || "";
	var category = req.query.category || "";
	var sellPoint = req.query.sellPoint || "";
	var price = req.query.price || "";
	var num = req.query.num || "";
	var descs = req.query.descs || "";
	var paramsInfo = req.query.paramsInfo || "";
	var image = req.query.image || "";

	const sql = "insert into project values (null, ?, ?, ?, ?, ?, ?, ?, '', 1, '', '', ?, ?)";
	var arr = [title, image, sellPoint, price, cid, category, num, descs, paramsInfo];
	sqlFun(sql, arr, result => {
		if(result.affectedRows > 0) {
			res.send({
				status: 200,
				msg: 'Intert success'
			})
		} else {
			res.send({
				status: 500,
				msg: 'Inter failed'
			})
		}
	})
})

router.get('/deleteGoods', (req, res) => {
	var id = req.query.id;
	const sql = "delete from project where id=?";
	const arr = [id];
	sqlFun(sql, arr, result => {
		if(result.affectedRows > 0) {
			res.send({
				status: 200,
				msg: "success"
			})
		} else {
			res.send({
				status: 500,
				msg: "failed"
			})
		}
	})
})

router.get('/batchDelete', (req, res) => {
	let arr = req.query.idArr;
	let sql = '';
	function fun(arr) {
		sql = 'delete from project where id in ('
		for (let i = 0; i < arr.length; i++) {
			sql += arr[i] + ','
		}
		sql = sql.slice(0, -1)
		sql = sql + ')'
	}
	fun(arr)
	sqlFun(sql, null, result => {
		if(result.affectedRows > 0) {
			res.send({
				status: 200,
				msg: "success"
			})
		} else {
			res.send({
				status: 500,
				msg: 'failed'
			})
		}
	})
})

router.get('/updateGoods', (req, res) => {
	var id = req.query.id;
	var title = req.query.title || "";
	var cid = req.query.cid || "";
	var category = req.query.category || "";
	var sellPoint = req.query.sellPoint || "";
	var price = req.query.price || "";
	var num = req.query.num || "";
	var descs = req.query.descs || "";
	var paramsInfo = req.query.paramsInfo || "";
	var image = req.query.image || "";

	var sql = "update project set title=?, image=?, sellPoint=?, price=?, cid=?, category=?, num=?, descs=?, paramsInfo=?"
	var arr = [title, image, sellPoint, price, cid, category, num, descs, paramsInfo];
	sqlFun(sql, arr, result => {
		if(result.affectedRows > 0) {
			res.send({
				status: 200,
				msg: 'Intert success'
			})
		} else {
			res.send({
				status: 500,
				msg: 'Inter failed'
			})
		}
	})
})

// router.get('/itemParams', (req, res) => {
// 	const page = req.query.page || 1;
// 	const sqlLen = "select * from params where id";
// 	sqlFun(sqlLen, null, data => {
// 		let len = data.length;
// 		const sql = "select * from params order by id desc limit 8 offset" + (page - 1) * 8;
// 		sqlFun(sql, null, result => {
// 			if (result.length > 0) {
// 				res.send({
// 					status: 200,
// 					msg: "success"
// 				})
// 			}
// 		})
// 	})
// })

router.get('/test', (req, res) => {
	let data = Mock.mock({
		info: 'I am',
		status: 200,
		"list|6":[
			{
				"id|+1":100,
				"flag|1-2": true,
				"city|1": {
					"310000": "shanghai",
					"320000": "jiangsu",
					"330000": "zhejiang",
					"340000": "anhui"
				}, 
				"arr|+1": [
					"AMD",
					"CMD",
					"UMD",
					"aaa",
					"bbb",
					"ccc"
				],
				"desc": '@cword(20,80)',
				"imgurl": "@Image()"	
			}
		]
	})

	res.send(data)
})

router.get('/stats', (req, res) => {
	res.send(Mock.mock({
		success: true,
		status: 200,
		"list|4": [
			{
				"id|+1": 100,
				"title|+1": ['总销售','访问量','总支付','收藏量'],
				"current|0-2000": 100,
				"total|100-999999": 200
			}
		]
	}))
})
module.exports = router