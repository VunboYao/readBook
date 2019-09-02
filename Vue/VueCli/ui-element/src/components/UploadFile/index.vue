<template>
  <div>
    <input
      ref="img-upload-input"
      class="img-upload-input"
      type="file"
      multiple
      accept="image/*"
      @change="handleClick"
    />
    <!-- 图片预览 -->
    <div class="img-upload-image">
      <!-- 按钮 -->
      <el-button :loading="loading" type="primary" @click="handleUpload">选择图片</el-button>
      <!-- 预览图片外层 -->
      <div class="img-prview-wrap">
        <!-- 单图片 -->
        <div class="img-prview-inner" v-for="(item, index) in srcArr" :key="index">
          <img :src='item|filterSrc' />
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    beforeUpload: Function, // 上传前检测
    onSuccess: Function, // 成功回调
    maxFileNum: { // 默认限制文件最大数量
      type: Number,
      default: 5
    },
  },
  filters: {
    /* 过滤item，转换为地址 */
    filterSrc(item) {
      return window.URL.createObjectURL(item)
    }
  },
  data() {
    return {
      loading: false,
      rawFile: [], // 原始文件集合
      tempData: [], //
      srcArr: []
    };
  },
  methods: {
    // 生成数据
    generateData(data) {
      this.onSuccess && this.onSuccess(data);
    },
    // 事件传递至input
    handleUpload() {
      this.tempData = []; // 清空buffer二进制数据集合
      this.$refs["img-upload-input"].click();
    },
    // input触发事件
    handleClick(e) {
      const files = e.target.files; // 返回为一个数组
      console.log(files,files.length,'------选择的源文件')
      Array.from(files).forEach(item => {
        this.rawFile.push(item); // 提取所有文件
      });
      if (!this.rawFile) return;
      this.upload(this.rawFile);
    },
    upload(rawFile) {
      this.$refs["img-upload-input"].value = null; // fix can't select the same file
      this.srcArr = []; // 可预览文件清空
      if (!this.beforeUpload) {
        // 如果没有验证函数，直接渲染数据
        this.loading = true;
        rawFile.forEach(item => {
          this.readerData(item) // 提取buffer二进制数据
          this.srcArr.push(item) // 预览文件集合
        })
        this.generateData(this.tempData); // 传出数据
        this.loading = false;
        return;
      }
      this.loading = true;
      console.log(rawFile.length,this.maxFileNum,'file length ------');
      // 超出数量限制
      if (rawFile.length > this.maxFileNum) {
        this.$message({
          message: `最大上传数量为 ${this.maxFileNum}`,
          type: "warning"
        });
        rawFile = this.rawFile.slice(0,this.maxFileNum)
      }
      rawFile.forEach(item => {
        const before = this.beforeUpload(item); // 验证判断
        if (before) {
          this.readerData(item); // 合理的文件
          this.srcArr.push(item) // 合理的可预览数据集合
        }
      });
      this.generateData(this.tempData); // 传出数据
      this.loading = false;
    },
    // 提取buffer二进制数据
    readerData(rawFile) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => {
          const data = e.target.result;
          this.tempData.push(data)
          resolve();
        };
        reader.readAsArrayBuffer(rawFile);
      });
    }
  }
};
</script>

<style scoped>
.img-upload-input {
  display: none;
  z-index: -9999;
}
.img-prview-wrap {
  padding-right: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.img-prview-inner {
  margin-top: 10px;
  margin-left: 10px;
  padding: 4px;
  border-radius: 4px;
  border: 1px dashed #999;
  width: 200px;
  display: flex;
  flex-direction: column;
}
.img-prview-inner > img {
  width: 200px;
  height: 200px;
}
.img-prview-inner > span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 2;
  padding-left: 4px;
  font-size: 14px;
  color: #666;
}
</style>
