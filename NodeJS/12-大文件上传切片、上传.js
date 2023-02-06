
function createChunks(blob, chunkSize) {
	const chunks = []
	let id = 0
	while (id * chunkSize < blob.size) {
		chunks.push({
			blob: blob.slice(id * chunkSize, (id + 1) * chunkSize),
			id: id
		})
		id++
	}
	return chunks
}


async function uploadChunks(chunks) {
	// 遍历所有切块，分片上传文件
	for (const chunk of chunks) {
		const form = new FormData()
		form.append('blob', chunk.blob)
		form.append('id', chunk.id)

		await fetch('/upload', {
			body: form
		})
	}

	// 全部分片上传完成之后，通知服务器端合成所有分片
	await fetch('upload/merge')
}
