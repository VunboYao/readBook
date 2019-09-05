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
      <el-button class="img-upload-btn" @click="handleUpload" type="primary" :loading="loading">选择图片</el-button>
      <span class="img-upload-tip">最多上传 {{maxFileNum}} 张图片</span>
      <!-- 预览图片外层 -->
      <div class="img-prview-wrap" v-if="previewImg">
        <!-- 单图片 -->
          <div class="img-prview-inner" v-for="(item, index) in previewFile" :key="index">
            <img :src="item|filterSrc" :width="imgWidth" :height="imgWidth" />
            <span :style="{width: imgWidth + 'px'}" :title="item.name">
              {{item.name}}
              <i @click="removePreview(item)" class="el-icon-delete-solid"></i>
            </span>
          </div>
      </div>
      <!-- 预览标题列表 -->
      <div class="img-title-wrap" v-else>
          <p class="img-title" v-for="(item, index) in previewFile" :key="index" :title="item.name">
            <i class="el-icon-document"></i>
            {{item.name}}
            <i @click="removePreview(item)" class="el-icon-delete-solid"></i>
          </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgWidth: {
      // 预览图片默认宽度
      type: [Number, String],
      default: 200
    },
    maxFileNum: {
      // Default maximum number
      type: Number,
      default: 9
    },
    beforeUpload: Function, // validator before upload
    onSuccess: Function, // callback of success
    previewImg: true
  },
  filters: {
    /* 过滤文件，提取地址 */
    filterSrc(item) {
      return window.URL.createObjectURL(item);
    }
  },
  data() {
    return {
      loading: false,
      files: null, // input 选择后的文件
      originFile: [], // 原始文件
      previewFile: [], // 预览文件
      bufferData: [] // 回调buffer文件
    };
  },
  methods: {
    removePreview(item) {
      let index = this.previewFile.findIndex(temp => {
        return temp === item;
      });
      // 删除预览区文件
      this.previewFile.splice(index, 1);
      // 重新渲染当前可预览文件，更新bufferData。返回外界
      this.bufferData = []; // clear old bufferData
      this.previewFile.forEach(item => {
        this.readerData(item);
      });
      this.generateData(this.bufferData); // 传出数据
    },
    // 生成数据
    generateData(data) {
      this.onSuccess && this.onSuccess(data);
    },
    // 1. 触发input事件
    handleUpload() {
      this.$refs["img-upload-input"].click();
    },
    // 2. 选择文件
    handleClick(e) {
      this.bufferData = []; // 2.1 选择文件后重置当前buffer数据
      this.files = e.target.files;
      // 2.2 提取所有文件
      Array.from(this.files).forEach(item => {
        this.originFile.push(item);
      });
      if (!this.originFile) return;
      console.log(
        this.originFile.length,
        "-----选择的文件长度",
        this.previewFile.length,
        "预览区的文件"
      );
      // 2.3 over the maximum, shut down
      if (this.originFile.length + this.previewFile.length > this.maxFileNum) {
        this.$message({
          message: `最大上传数量为 ${this.maxFileNum}`,
          type: "warning"
        });
        // this.files = null
        console.log(this.files, "临界值");
        this.originFile = [];
        return;
      } else {
        this.upload(this.originFile);
      }
    },
    // 3.上传数据
    upload(file) {
      this.$refs["img-upload-input"].value = null; // fix the same file can't select
      console.log(file.length, "本次选择上传文件长度");
      this.loading = true;
      // 3.1 遍历文件，验证是否超出大小
      file.forEach(item => {
        const before = this.beforeUpload(item);
        if (before) {
          this.originFile = []; // 重置选择的文件历史
          this.previewFile.push(item); // 3.2 预览的文件
        }
      });
      console.log(
        this.previewFile.length,
        "大小判断后实际上传的预览区的文件"
      );
      // 3.3 获取buffer数据
      this.previewFile.forEach(item => {
        this.readerData(item);``
      });
      // 3.4 传出数据
      this.generateData(this.bufferData);
      this.loading = false;
    },
    // get the ArrayBuffer
    readerData(file) {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = e => {
          const data = e.target.result;
          this.bufferData.push(data);
          resolve();
        };
        reader.readAsArrayBuffer(file);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.img-upload-input {
  display: none;
  z-index: -9999;
}

.img-upload-btn {
  margin-left: 10px;
}

.img-upload-tip {
  font-size: 14px;
  padding-left: 10px;
  color: #666;
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
      transition: all 0.3s;
      border-color: #108ee9;
    }
    &:hover i {
      opacity: 1;
      transition: all 0.3s;
    }
    &:hover span {
      color: #108ee9;
      transition: all 0.3s;
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
        color: #108ee9;
        &::after {
          position: absolute;
          content: "";
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

.img-title-wrap {
  margin-top: 10px;
  padding-left: 10px;
  .img-title {
    margin: 5px 0;
    padding: 5px;
    position: relative;
    width: 220px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #666;
    border: 1px dashed transparent;
    border-radius: 4px;
    &:hover {
      border-color: #108ee9;
      color: #108ee9;
      transition: all 0.3s;
    }
    &:hover .el-icon-delete-solid {
      opacity: 1;
      transition: all 0.3s;
    }
    .el-icon-document {
      padding-right: 3px;
    }
    .el-icon-delete-solid {
      position: absolute;
      right: 5px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      color: #108ee9;
      opacity: 0;
      &::after {
        position: absolute;
        content: "";
        top: -8px;
        left: -8px;
        display: block;
        z-index: -1;
        width: 200%;
        height: 200%;
      }
    }
  }
}

</style>
