import mysql from 'mysql'

const connection = mysql.createConnection({
	host: '1.116.204.114',
	// host: '127.0.0.1',
	user: 'root',
	// password: 'root',
	password: '123456',
	database: 'comment',
})

class db {
	static isconnect() {
		if (!db.connection) {
			return (db.connection = new db())
		}
		return db.connection
	}
	constructor() {
		this.status = ''
	}

	connect() {
		return new Promise((reslove, reject) => {
			if (this.status === '') {
				this.status = connection.connect()
				reslove(this.status)
			}
			reslove(this.status)
		})
	}

	// 增
	insert(table, options) {
		return new Promise((reslove, reject) => {
			this.connect()
			let sql = ''
			if (table === 'blog') {
				sql = `insert into ${table}(text) values ${options}`
			} else if (table === 'comment') {
				sql = `insert into ${table}(text,header,name,email,createTime,blogid) values ${options}`
			} else {
				sql = `insert into ${table} values ${options}`
			}
			console.log('sqllll', sql)
			connection.query(sql, (err, data) => {
				if (err) {
					reject(err)
					return
				}
				if (data.affectedRows !== 0) {
					reslove({ code: 1, msg: `插入了${data.affectedRows}条` })
				}
			})
		})
	}

	// 删
	delete(table, option) {
		return new Promise((reslove, reject) => {
			this.connect()
			let sql = `delete from ${table} where ${option}`
			console.log(sql)
			connection.query(sql, (err, data) => {
				if (err) {
					reject(err)
				}
				if (data.affectedRows !== 0) {
					reslove({ code: 1, message: `删除数据${data.affectedRows}条` })
				}
			})
		})
	}

	// 改
	update(table, option1, option2) {
		return new Promise((reslove, reject) => {
			this.connect()
			let sql = `update ${table} set ${option1} where ${option2}`
			console.log('sql', sql)
			connection.query(sql, (err, data) => {
				if (err) {
					// console.log('errsss', err)
					reject(err)
				}
				if (data.affectedRows !== 0) {
					reslove({ code: 1, msg: `更新了${data.affectedRows}条` })
				}
			})
		})
	}

	// 查
	find(option1, table, option2) {
		return new Promise((reslove, reject) => {
			this.connect()
			let sql = ''
			if (arguments.length === 2) {
				sql = `select ${option1} from ${table}`
			} else {
				sql = `select ${option1} from ${table} where ${option2}`
			}
			console.log('sql', sql)
			connection.query(sql, (err, data) => {
				if (err) {
					reject(err)
					return
				}
				reslove(data)
			})
		})
	}

	other(sql) {
		console.log('other', sql)
		return new Promise((reslove, reject) => {
			this.connect()
			connection.query(sql, (err, data) => {
				if (err) {
					reject({ code: 0, reslut: err.message })
					return
				}
				reslove({ code: 1, reslut: '请求成功', data })
			})
		})
	}
}

export default db
