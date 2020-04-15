/* eslint-disable */
import Vue from 'vue'
import axios from 'axios'
import devSrv from './spa_mock'

function init() {
	let backendIpAddr = null
	if (window.top.pathConfig && window.top.pathConfig.gateway) {
		// 如果外层有就用外层的路径配置
		let parentServerPath = window.top.pathConfig.gateway
		if (parentServerPath.endsWith('/')) {
			backendIpAddr = parentServerPath.substring(0, parentServerPath.length - 1)
		} else {
			backendIpAddr = parentServerPath
		}
	} else {
		// 单vue页面使用配置的后台地址
		if (sessionStorage.getItem('bx_auth_ticket') === null) {
			devSrv.dummy()
		}
		let server_cfg = devSrv.server_cfg
		backendIpAddr =
			server_cfg.back_server_protocol +
			'://' +
			server_cfg.back_server_ip +
			':' +
			server_cfg.back_server_port
	}
	top.window.backendIpAddr = backendIpAddr

	let defaultApp =
		(window.frameElement && window.frameElement.dataset['app']) ||
		(top.window.pathConfig && top.window.pathConfig.application)

	var service_api = {
		selectOne: backendIpAddr + '/' + defaultApp + '/select',
		select: backendIpAddr + '/' + defaultApp + '/select',
		selectByUser: backendIpAddr + '/' + defaultApp + '/select',
		operate: backendIpAddr + '/' + defaultApp + '/operate',
		approval: backendIpAddr + '/' + defaultApp + '/process/approval',

		uploadFile: backendIpAddr + '/file/upload',
		downloadFile: backendIpAddr + '/file/download?filePath=',
		deleteFile: backendIpAddr + '/file/delete',

		exportExcel: backendIpAddr + '/' + defaultApp + '/export/exportExcel',
		importExcel: backendIpAddr + '/' + defaultApp + '/bizDataImport',

		qrcode: backendIpAddr + '/' + defaultApp + '/bxsys/qrcode'
	}

	top.window.serviceApi = service_api

	Vue.prototype.service_api = service_api

	Vue.config.productionTip = false
	// 封装axios
	Vue.prototype.axios = axios // 将axios挂载到vue原型
	axios.defaults.retry = 3 // 设置请求超时后重新发起请求的次数
	axios.defaults.retryDelay = 5000 // 设置超时时间（毫秒）
	axios.interceptors.request.use(
		config => {
			// 在发送请求之前做些什么
			let bx_auth_ticket = sessionStorage.getItem('bx_auth_ticket')
			if (bx_auth_ticket) {
				config.headers['bx_auth_ticket'] = bx_auth_ticket
			}
			return config
		},
		error => {
			// 对请求错误做些什么
			return Promise.reject(error)
		}
	)

	axios.interceptors.response.use(
		response => {
			// let self  =this
			// 对响应数据做处理
			if (response.data.state == 'FAILURE') {
				if (response.data.resultCode == '0011') {
					// 需要登录访问
					if (sessionStorage.getItem('need_login_flag') != 'need_login') {
						sessionStorage.setItem('need_login_flag', 'need_login')
					}
				} else if (response.data.resultCode == '0000') {
					if (sessionStorage.getItem('need_login_flag') != 'need_login') {
						alert(response.data.resultMessage)
					}
				} else {
					if (sessionStorage.getItem('need_login_flag') != 'need_login') {
						alert(response.data.resultMessage)
					}
				}
			} else if (response.data.state == 'SUCCESS') {
				let now = new Date().getTime()
				now = parseInt(now / 1000) // 得到当前的时间戳（秒）
			}
			return response
		},
		error => {
			// 对响应错误做处理
			var config = error.config
			// 判断是否配置了重试
			if (!config || !config.retry) return Promise.reject(error)
			if (!config.shouldRetry || typeof config.shouldRetry != 'function') {
				return Promise.reject(error)
			}
			//判断是否满足重试条件
			if (!config.shouldRetry(error)) {
				return Promise.reject(error)
			}
			// 设置重置次数，默认为0
			config.__retryCount = config.__retryCount || 0
			// 判断是否超过了重试次数
			if (config.__retryCount >= config.retry) {
				return Promise.reject(error)
			}
			//重试次数自增
			config.__retryCount += 1
			//延时处理
			var backoff = new Promise(function(resolve) {
				setTimeout(function() {
					resolve()
				}, config.retryDelay || 1)
			})
			//重新发起axios请求
			return backoff.then(function() {
				return axios(config)
			})
		}
	)

	/**
	 * 定时重复发送请求
	 * @params t: 时间间隔
	 * @params out: 倒计时
	 * @params fun:请求数据的函数，必须是一个返回true/false的函数
	 */
	Vue.prototype.timeOut = function(t, out, efun) {
		// this.time  = t
		this.time = t // 定时间隔 秒
		this.nTime = out // 计时 秒
		this.isLoad = false // 请求是否成功有效
		this.eNum = 0 // 请求失败次数
		this.rFun = efun
		this.reqFun = async function() {
			let _this = this
			let reqPromise = await _this.rFun()
			// reqPromise.then((res)=>{
			if (reqPromise&&reqPromise.isRes) {
				this.isLoad = true
				this.nTime = 0
				this.eNum = 0
				this.startTime()
				// this.timeOut(10,0)
			} else {
				this.isLoad = false
				if (this.eNum < 3) {
					this.nTime = 0
					this.eNum++
					this.startTime()
				}
			}
			// })
			// let http = s()
			// fun() 请求方法 处理数据和业务逻辑
			// $http 处理 发请求机制，多久发，
		}
		this.startTime = function() {
			if (this.eNum < 3 && this.nTime === this.time) {
				this.reqFun(this.nTime)
			} else if (this.eNum === 3) {

				return false
			} else {
				let bTimeout = setTimeout(() => {
					this.nTime++
					this.startTime()
				}, 1000)
			}
		}
	}
}

export default init
