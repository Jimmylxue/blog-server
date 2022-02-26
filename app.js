import koa from 'koa'
import routers from 'koa-router'
import bodyparser from 'koa-bodyparser'
import koabody from 'koa-body'
import cors from 'koa2-cors'
import kstatic from 'koa-static'
import { __dirname } from './utils/index.js'

import client from './routes/client/index.js'
import upload from './routes/upload/index.js'

const router = routers()

const app = new koa()

// 配置处理后端跨域
app.use(cors())
// 接收参数
// app.use(bodyparser())
app.use(
	koabody({
		multipart: true,
		formidable: {
			maxFieldsSize: 4 * 1024 * 1024,
			// multipart: true,
		},
	})
)
app.use(bodyparser())
// 暴露出 static 文件夹下的文件 可以直接访问
app.use(kstatic(__dirname + '/static'))
// console.log(__dirname)

// 配置接口
router.get('/test', async ctx => {
	ctx.body = { code: 200, result: 'get /test is connect!!!' }
})

router.post('/demo', async ctx => {
	ctx.body = { code: 200, result: 'post /demo is connect!!!' }
})

router.use('/client', client)
router.use('/upload', upload)

app.use(router.routes())

app.listen('666', () => {
	//监听端口
	console.log('server is running in port 666! ')
})
