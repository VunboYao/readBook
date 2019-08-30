<template>
  <div class="app-container">
    <upload-excel-component 
      :on-success="handleSuccess" 
      :before-upload="beforeUpload" />
  </div>
</template>

<script>
import UploadExcelComponent from "./index.vue";

export default {
  name: "UploadExcel",
  components: { UploadExcelComponent },
  props: {
    previewExcel: false, // 是否开始预览
    fileSize: { // 默认文件大小
      type: [Number, String],
      default: 0.2
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
        message: `请不要上传超过 ${this.fileSize}m 的文件`,
        type: "warning"
      });
      return false;
    },
   // 成功返回数据
    handleSuccess(data) {
      console.log(data,'success------')
      this.$emit('success', data)
    }
  }
};
</script>
