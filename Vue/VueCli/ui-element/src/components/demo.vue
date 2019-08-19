<template>
  <div>
    <el-row>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">click upload</el-button>
        <div slot="tip">only upload jpg/png file, and no more than 500kb</div>
      </el-upload>
    </el-row>
    <el-row>
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img :src="imageUrl" v-if="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "demo",
    data() {
      return {
        imageUrl: '',
        fileList: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
        ],
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file){
        console.log(file);
      },
      handleExceed(file,fileList) {
        this.$message.warning(`limit 3 file, now select ${file.length} files, total ${file.length + fileList.length} files`)
      },
      beforeRemove(file,fileList) {
        return this.$confirm(`confirm remove ${file.name}?`)
      },
      handleAvatarSuccess(res,file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if(!isJPG) {
          this.$message.error('only JPG 格式')
        }
        if(!isLt2M) {
          this.$message.error('avatar can\'t more than 2MB');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>

<style scoped>
.el-row {
  padding: 20px;
}
.avatar-uploader {
  width: 178px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader:hover{
  border-color: #409eef;
}
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
