import router from 'koa-router'
import { __dirname } from '../../utils/index.js'
import db from '../../service/index.js'
const route = router()
const dbs = db.isconnect()

route.get('/init', async ctx => {
	let result
	try {
		const { id } = ctx.request.query
		console.log(id)
		let res2 = await dbs.find('*', 'blog', `text = '${id}'`)
		let blogid = 0
		if (res2.length === 0) {
			await dbs.insert('blog', `('${id}')`)
			blogid = 1
		} else {
			blogid = res2[0].id
		}
		let comment = await dbs.find('*', 'comment', `blogid='${blogid}'`)
		result = {
			code: 200,
			data: comment,
			blogid: blogid,
		}
	} catch (error) {
		ctx.body = { code: 10000, result: error.message }
	}
	ctx.body = result
})

route.post('/add', async ctx => {
	let result
	try {
		const { id, text, header, name, email } = ctx.request.body
		let res = await dbs.insert(
			'comment',
			`('${text}','${header}','${name}','${email}','${Date.now()}',${id})`
		)
		if (res.code === 1) {
			result = {
				code: 200,
				result: '评论成功',
			}
		}
		ctx.body = result
	} catch (error) {
		ctx.body = { code: 10000, result: error.message }
	}
})

export default route.routes()
