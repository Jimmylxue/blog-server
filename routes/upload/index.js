import router from 'koa-router'
import { putStream, basePut } from '../../utils/upload.js'
import upload from '../../utils/uploadConfig.js'
// let client = new OSS(store)
const route = router()

route.post('/action', upload.single('file'), async ctx => {
	const { files } = ctx.request
	let res = await basePut(files.file.path)
	if (res.code == 200) {
		ctx.body = { code: 200, result: '上传成功', url: res.url }
	}
})

export default route.routes()
