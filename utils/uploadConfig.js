import multer from 'koa-multer'
import fs from 'fs'
// const { basePut } = require('../../api/oss')

let storage = multer.diskStorage({
	//文件保存路径
	destination: function (req, file, cb) {
		console.log('aaa', req.url)
		let dir = null
		try {
			dir = req.url.split('?')[1].split('=')[1]
		} catch {
			dir = 'before'
		}

		cb(null, `static/${dir}/`) //path.resolve('public/phoneManageSystem')
	},
	//修改文件名称
	filename: function (req, file, cb) {
		let fileFormat = file.originalname.split('.') //以点分割成数组，数组的最后一项就是后缀名
		cb(null, 'Jimmy' + Date.now() + '.' + fileFormat[fileFormat.length - 1])
	},
})

let upload = multer({
	storage: storage,
	limits: {
		// fileSize: 1024 * 1024 / 2 // 限制512KB
		fileSize: (1024 * 1024) / 2, // 限制512KB
	},
})

export default upload
