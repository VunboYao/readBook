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
        :loading="loading">选择图片</el-button>
      <!-- 预览图片外层 -->
      <div class="img-prview-wrap">
        <!-- 单图片 -->
        <div class="img-prview-inner" v-for="(item, index) in 3" :key="index">
          <img :src="item" :width="imgWidth" :height="imgWidth" />
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgWidth: { // 预览图片默认宽度
      type: [Number,String],
      default: 200
    }
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
    }
  },
 methods: {
  // 触发input事件
  handleUpload() {
    this.$refs['img-upload-input'].click()
  },
  // 选择文件
  handleClick(e){
    this.files = e.target.files
    console.log(this.files.length)
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
    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 2;
      padding-left: 4px;
      font-size: 14px;
      color: #666;
    }
  }
}
</style>