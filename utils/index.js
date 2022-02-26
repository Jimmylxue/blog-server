import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { access, fstat, writeFile, readFile, write, open } from 'fs'

export const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

export function includeFile(dir, filename) {
	return new Promise((resolve, reject) => {
		access(`${dir}/${filename}.json`, err => {
			if (err) {
				writeFile(`${dir}/${filename}.json`, '[]', (err, data) => {
					if (err) {
					} else {
						resolve({})
					}
				})
			} else {
				readFile(`${dir}/${filename}.json`, 'utf-8', (err, data) => {
					resolve(data)
				})
			}
		})
	})
}

export function writeText(dir, obj) {
	console.log(dir, obj)
	return new Promise((resolve, reject) => {
		open(dir, 'a', (err, fd) => {
			if (err) {
				console.log('失败', reject(err.message))
				return
			}
			write(fd, B(obj), (err, data) => {
				if (err) {
					console.log(err.message)
				} else {
					console.log(data)
				}
				// resolve(err)
			})
		})
	})
}
