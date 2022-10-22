import axios from 'axios'
import base from './base'

const qs = require('qs')

const api ={
	getLogin(params) {
		// console.log(qs.stringify(params));
		return axios.post(base.login, qs.parse(params))
	},

	getGoodsList(params){
		return axios.get(base.goodsList, {
			params
		})
	},

	getSearch(params){
		return axios.get(base.search, {params})
	},

	getCategory(params) {
		return axios.get(base.category, {params})
	},

	getInsertGoods(params) {
		return axios.get(base.insertGoods, {
			params
		})
	},

	getDeleteGoods(params) {
		return axios.get(base.deleteGoods, {
			params
		})
	},

	getUpdateGoods(params) {
		return axios.get(base.updateGoods, {
			params
		})
	}
}

export default api;