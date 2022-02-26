import OSS from 'ali-oss'
import fs from 'fs'
import { resolve } from 'path'
import { __dirname } from '../utils/index.js'
// console.log('??', __dirname)

let store = {
	accessKeyId: 'LTAI4GGe6UwzwnjCt9jo1eZz',
	accessKeySecret: 'm21xxxfv3mke4oicWhwTvwuxhXZH8A',
	bucket: 'jimmyxx',
	region: 'oss-cn-beijing',
}

let client = new OSS(store)

export async function listBuckets() {
	try {
		let result = await client.listBuckets()
		return result
	} catch (err) {
		throw new Error(err)
	}
}

export async function list(num = 5) {
	try {
		let result = await client.list({
			'max-keys': num, // 指定最多返回的文件个数
		})
		console.log(result)
	} catch (err) {
		throw new Error(err)
	}
}

// 普通上传
export async function basePut(localUrl) {
	/*
    因为做了 try-catch 所以只要是成功的就不会走到catch
  */
	try {
		//object-name可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
		let timeString = new Date().getTime() / 1000
		let fileExtends = localUrl.split('.')[localUrl.split('.').length - 1] // 文件后罪名
		let result = await client.put(
			`jimmy${timeString}.${fileExtends}`,
			resolve(__dirname, localUrl)
		)
		// console.log(fileExtends)
		if (result && result.res.status == 200) {
			return { code: 200, url: result.url, name: result.name }
		}
	} catch (e) {
		throw new Error(e)
	}
}

// 流式上传  -- 需要上传文件流
export async function putStream(stream, filename) {
	console.log(stream, filename)
	try {
		let result = await client.putStream(filename, stream)
		// console.log('ssss', result);
		if (result && result.res.status == 200) {
			return { code: 200, url: result.url, name: result.name }
		}

		// don't use 'chunked encoding'
		// let stream = fs.createReadStream('local-file');
	} catch (e) {
		throw new Error(e)
	}
}

// listBuckets()
//   .then(res => { console.log('hh', res) })
//   .catch(err => { console.log('err', err) })

// basePut('./test.png').then()

// list()
