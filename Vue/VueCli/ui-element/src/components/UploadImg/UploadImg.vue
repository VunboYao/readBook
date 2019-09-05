<template>
  <div class="app-container">
    <upload-img-component
      :max-file-num="maxFileNum"
      :img-width="imgWidth"
      :preview-img="previewImg"
      :on-success="handleSuccess"
      :before-upload="beforeUpload" />
  </div>
</template>

<script>
import UploadImgComponent from "./index.vue";

export default {
  name: "UploadExcel",
  components: { UploadImgComponent },
  props: {
    fileSize: { // 默认文件大小
      type: [Number, String],
      default: 2
    },
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
    previewImg: { // 是否开启预览图片
      type: [Boolean],
      default: true
    }
  },
  data() {
    return {
      tableData: [],
      tableHeader: [],
      file: null,
    };
  },
  methods: {
    // 上传前验证
    beforeUpload(file) {
      // M 单位大小
      const isLimit = file.size / 1024 / 1024 < this.fileSize;
      if (isLimit) {
        return true;
      }
      this.$message({
        message: `请不要上传超过 ${this.fileSize}M 的文件`,
        type: "warning"
      });
      return false;
    },
   // 成功返回数据
    handleSuccess(data) {
      this.$emit('success', data)
    }
  }
};
</script>
