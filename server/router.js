const express = require('express')
const router = express.Router()

const sqlFun = require('./mysql')

// router.post('/login', (req, res) => {

// })

// router.post('/register', (req, res) => {

// })

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

module.exports = router