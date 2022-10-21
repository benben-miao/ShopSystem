import axios from 'axios'
import base from './base'

const api ={
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
	}
}

export default api;