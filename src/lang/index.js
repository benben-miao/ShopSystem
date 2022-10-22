import Vue from 'vue'
import Element from 'element-ui'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n)

const messages = {
	en: {
		homeMenu: 'Home Page',
		goodsMenu: 'Goods Manage',
		paramsMenu: 'Parameters',
		advertMenu: 'Advertise',
		orderMenu: 'Order Details',
		...enLocale,
	},
	zh: {
		homeMenu: '平台首页',
		goodsMenu: '商品管理',
		paramsMenu: '商品参数',
		advertMenu: '广告宣传',
		orderMenu: '订单详情',
		...zhLocale,
	}
}

const i18n = new VueI18n({
	locale: 'en',
	messages
})

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})

export default i18n