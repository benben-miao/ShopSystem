import axios from 'axios'
import base from './base'

const api ={
	getGoodsList(params){
		return axios.get(base.goodsList, {
			params
		})
	}
}

export default api;