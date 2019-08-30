<template>
  <div>
    <input
        ref="img-upload-input"
        type="file"
        class="img-upload-input"
        multiple
        accept="image/*"
        @change="handleClick"
    />
    <div class="img-upload">
      <el-button
          class="img-upload-btn"
          @click="handleUpload"
          type="primary"
          :loading="loading">选择图片
      </el-button>
      <!-- 预览图片外层 -->
      <div class="img-prview-wrap">
        <!-- 单图片 -->
        <div
          class="img-prview-inner"
          v-for="(item, index) in previewFile" :key="index">
          <img :src="item|filterSrc" :width="imgWidth" :height="imgWidth"/>
          <span :style="{width: imgWidth + 'px'}">{{item.name}}
            <i @click="removePreview(index)" class="el-icon-delete-solid"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	export default {
		props: {
			imgWidth: { // 预览图片默认宽度
				type: [Number, String],
				default: 200
			},
			maxFileNum: { // Default maximum number
				type: Number,
        default: 4
      },
      beforeUpload: Function, // validator before upload
      onSuccess: Function, // callback of success
		},
		filters: {
			/* 过滤文件，提取地址 */
			filterSrc(item) {
				return window.URL.createObjectURL(item)
			}
		},
		data() {
			return {
				loading: false,
				files: null, // input 选择后的文件
				originFile: [], // 原始文件
        previewFile: [], // 预览文件
        bufferData: [], // 回调buffer文件
			}
		},
		methods: {
			removePreview(index) {
				this.previewFile.splice(index,1)
        this.originFile.splice(index,1)
        this.bufferData.splice(index,1)
        this.files = null
				this.generateData(this.bufferData) // 传出数据
			},
			// 生成数据
			generateData(data) {
				this.onSuccess && this.onSuccess(data);
			},
			// 触发input事件
			handleUpload() {
				this.$refs['img-upload-input'].click()
			},
			// 选择文件
			handleClick(e) {
				this.bufferData = []
				this.files = e.target.files
				console.log(this.files, '选择的原始文件------')
				Array.from(this.files).forEach(item => {
					this.originFile.push(item) // 提取所有文件
				})
        if (!this.originFile) return;
        this.upload(this.originFile)
			},

      upload(file) {
				this.previewFile = [] // 预览文件清空
				this.loading = true
        // over the maximum
        if (file.length > this.maxFileNum) {
          this.$message({
            message: `最大上传数量为 ${this.maxFileNum}`,
            type: "warning"
          })
          file = this.originFile.slice(0, this.maxFileNum) // ???????
          this.originFile = file
        }
        file.forEach(item => {
          const before = this.beforeUpload(item)
            if (before) {
              this.readerData(item) // 大小满足的文件
              this.previewFile.push(item) // 预览的文件
            }
        })
        this.generateData(this.bufferData) // 传出数据
				console.log(this.previewFile,'可预览文件')
				this.loading = false
      },
      // get the ArrayBuffer
      readerData(file) {
				return new Promise((resolve,reject) => {
					const reader = new FileReader()
          reader.onload = e => {
						const data = e.target.result
            this.bufferData.push(data)
            resolve()
          }
					reader.readAsArrayBuffer(file)
        })
      }
		}
	}
</script>

<style lang="scss" scoped>
  .img-upload-input {
    display: none;
    z-index: -9999;
  }

  .img-upload-btn {
    margin-left: 10px;
  }

  .img-prview-wrap {
    padding-right: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    .img-prview-inner {
      margin-top: 10px;
      margin-left: 10px;
      padding: 4px;
      border-radius: 4px;
      border: 1px dashed #999;
      display: flex;
      flex-direction: column;
      &:hover {
        transition: all .3s;
        border-color: #108EE9;
      }
      &:hover i {
        opacity: 1;
        transition: all .3s;
      }
      &:hover span {
        color: #108EE9;
        transition: all .3s;
      }
      span {
        margin-top: 4px;
        position: relative;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 2;
        padding-left: 4px;
        font-size: 12px;
        color: #666;
        i {
          opacity: 0;
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          cursor: pointer;
          color: #108EE9;
          &::after {
            position: absolute;
            content: '';
            top: -5px;
            left: -8px;
            display: block;
            z-index: -1;
            width: 200%;
            height: 200%;
          }
        }
      }
    }
  }
</style>
