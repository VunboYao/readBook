<template>
  <div class="upload-wrap">
    <input
      type="file"
      ref="breakPointUpload"
      @change="selectFile"
      id="break-point-upload"
      accept="image/*"
      multiple
    />
    <el-button type="primary" @click="changeInput">选择文件</el-button>
    <el-button type="success">开始上传</el-button>
    <el-button type="danger">暂停上传</el-button>
    <div class="privew-wrap">
      <i class="el-icon-menu" @click="privewStyle=true"></i>
      <i class="el-icon-notebook-2" @click="privewStyle=false"></i>
      <div v-if="fileList.length">
        <div v-if="privewStyle" class="privew-list">
          <div v-for="(item, index) in fileList" :key="index" class="privew-item">
            <img :src="item.url" />
            <span class="privew-title">{{item.name}}</span>
          </div>
        </div>
      </div>
      <div class="privew-none" v-else>暂无文件</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileList: [],
      privewStyle: true
    };
  },
  mounted() {},
  methods: {
    changeInput() {
      let breakPoint = this.$refs.breakPointUpload;
      breakPoint.click();
    },
    selectFile(e) {
      let files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        let url = window.URL.createObjectURL(files[i]);
        this.fileList.push({ url, name: files[i].name });
      }
    }
  }
};
</script>
<style lang="scss">
.upload-wrap {
}
#break-point-upload {
  display: none;
  z-index: -9999;
}
.privew-wrap {
  position: relative;
  margin-top: 10px;
  padding: 30px 5px 5px;
  min-height: 230px;
  border-radius: 6px;
  border: 1px solid #ccc;
  .el-icon-menu,
  .el-icon-notebook-2 {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 26px;
    cursor: pointer;
    color: #ccc;
    &:hover {
      color: #108ee9;
    }
  }
  .el-icon-notebook-2 {
    right: 28px;
  }

  .privew-list {
    display: flex;
    flex-wrap: wrap;
    .privew-item {
      margin: 0 20px;
      border: 1px dashed #ccc;
      padding: 4px;
      width: 200px;
      display: block;
      border-radius: 4px;
      transition: all 0.3s;
      cursor: pointer;
      &:hover {
        border-color: #108ee9;
        .privew-title {
          color: #108ee9;
        }
      }
      .privew-title {
        line-height: 1.6;
        color: #666;
        display: block;
        overflow: hidden;
      }
      img {
        width: 200px;
        height: 200px;
        border-radius: 4px;
        display: block;
      }
    }
  }
}
.privew-none {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 230px;
  color: #ddd;
  font-size: 20px;
}
</style>