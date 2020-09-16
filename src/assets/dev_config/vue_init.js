/* eslint-disable */
import Vue from 'vue'
import devSrv from './spa_mock'
import router from '../../router'
import http from '../common/http'
Vue.prototype.$http = http
Vue.prototype.axios = http
function init () {
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
		if (sessionStorage.getItem('pathConfig')) {
			try {
				window.top.pathConfig = JSON.parse(sessionStorage.getItem('pathConfig'))
				backendIpAddr = window.top.pathConfig.gateway
			} catch (error) {
				console.info(error)
			}
		} else {
			console.error('未发现pathConfig,即将使用mock地址')
			// if (sessionStorage.getItem('bx_auth_ticket') === null) {
			devSrv.dummy()
			// }
			let server_cfg = devSrv.server_cfg
			backendIpAddr =
				server_cfg.back_server_protocol +
				'://' +
				server_cfg.back_server_ip +
				':' +
				server_cfg.back_server_port
		}

	}
	top.window.backendIpAddr = backendIpAddr

	let defaultApp =
		(window.frameElement && window.frameElement.dataset[ 'app' ]) ||
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

}

export default init
