<template>
  <div class="gz-uploader">
    <uploader
      ref="uploader"
      :options="options"
      :autoStart="false"
      @file-added="onFileAdded"
      @file-success="onFileSuccess"
      @file-progress="onFileProgress"
      @file-error="onFileError"
      class="uploader-app"
    >
      <uploader-unsupport></uploader-unsupport>
      <uploader-btn class="global-uploader-btn" :attrs="attrs" ref="uploadBtn">选择文件</uploader-btn>
      <uploader-list>
        <div class="file-panel" slot-scope="props">
          <div class="file-title">
            <h2>文件列表</h2>
            <div class="file-operate">
              <el-button type="text">
                <i class="el-icon-minus"></i>
              </el-button>
              <el-button type="text">
                <i class="el-icon-close"></i>
              </el-button>
            </div>
          </div>
          <ul class="file-list" v-if="props.fileList.length > 0">
            <li v-for="file in props.fileList" :key="file.id">
              <uploader-file class="file" ref="files" :file="file" :list="true"></uploader-file>
            </li>
          </ul>
          <div class="no-file" v-else>
            <i class="el-icon-eleme"></i>
            暂无待上传文件
          </div>
        </div>
      </uploader-list>
    </uploader>
  </div>
</template>
<script>
import SparkMD5 from "spark-md5";
export default {
  data() {
    return {
      options: {
        target: "http://localhost:3000/uploadfile",
        testChunks: true, // 测试在服务端已经上传
        chunkSize: "2048000", // 分块大小
        fileParameterName: "file", // 上传文件时文件的参数名，默认 file
        maxChunkRetries: 3, // 最大自动失败重试上传次数
        // 服务器分片校验函数，秒传及断点续传基础
        checkChunkUploadedByResponse: function(chunk, message) {
          let objMessage = JSON.parse(message);
          if (objMessage.skipUpload) {
            return true;
          }

          return (objMessage.uploaded || []).indexOf(chunk.offset + 1) >= 0;
        },
        headers: {
          // 在header中添加的验证，请根据实际业务来
          // Authorization: "Bearer " + Ticket.get().access_token
        }
      },
      attrs: {
        // 接受的文件类型
        accept: "*"
      }
    };
  },
  methods: {
    // 单文件校验，如果返回false,则该文件会被忽略
    onFileAdded(file, event) {
      this.computedMD5(file);
    },
    // 成功上传事件
    onFileSuccess(rootFile, file, message, chunk) {},
    // 上传中
    onFileProgress(rootFile, file, chunk) {
      console.log(
        `上传中 ${file.name}，chunk：${chunk.startByte /
          1024 /
          1024} ~ ${chunk.endByte / 1024 / 1024}`
      );
    },
    // 上传错误
    onFileError(rootFile, file, message, chunk) {
      this.$message({
        message: response,
        type: "error"
      });
    },
    computedMD5(file) {
      let fileReader = new FileReader();
      let time = new Date().getTime();
      let blobSlice =
        File.prototype.slice ||
        File.prototype.mozSlice ||
        File.prototype.webkitSlice;
      let currentChunk = 0;
      const chunkSize = 10 * 1024 * 1024;
      let chunks = Math.ceil(file.size / chunkSize);
      let spark = new SparkMD5.ArrayBuffer();

      this.statusSet(file.id, "md5");
      file.pause();

      loadNext();

      fileReader.onload = e => {
        spark.append(e.target.result);

        if (currentChunk < chunks) {
          currentChunk++;
          loadNext();

          // 展示MD5的计算进度
          this.$nextTick(() => {
            console.log(
              "校验MD5 :",
              ((currentChunk / chunks) * 100).toFixed(0) + "%"
            );
          });
        } else {
          let md5 = spark.end();
          this.computeMD5Success(md5, file);
          console.log(
            `MD5计算完毕：${file.name} \nMD5：${md5} \n分片：${chunks} 大小:${
              file.size
            } 用时：${new Date().getTime() - time} ms`
          );
        }
        fileReader.onerror = function() {
          this.error(`文件${file.name}读取出错，请检查该文件`);
          file.cancel();
        };
      };

      function loadNext() {
        let start = currentChunk * chunkSize;
        let end =
          start + chunkSize >= file.size ? file.size : start + chunkSize;

        fileReader.readAsArrayBuffer(blobSlice.call(file.file, start, end));
      }
    },
    computeMD5Success(md5, file) {
      // 将自定义参数直接加载uploader实例的opts上
      Object.assign(this.uploader.opts, {
        query: {
          ...this.params
        }
      });

      file.uniqueIdentifier = md5;
      file.resume()
      this.statusRemove(file.id)
    },
    close() {
      this.uploader.cancel();
    },
    /**
     * 新增的自定义的状态: 'md5'、'transcoding'、'failed'
     * @param id
     * @param status
     */
    statusSet(id, status) {
      let statusMap = {
        md5: {
          text: "校验MD5",
          bgc: "#fff"
        },
        merging: {
          text: "合并中",
          bgc: "#e2eeff"
        },
        transcoding: {
          text: "转码中",
          bgc: "#e2eeff"
        },
        failed: {
          text: "上传失败",
          bgc: "#e2eeff"
        }
      };

      this.$nextTick(() => {
      });
    },
    statusRemove(id) {
      
    },
  },
};
</script>
<style lang="scss" scoped>
.gz-uploader {
  .uploader-app {
    width: 520px;
  }

  .file-panel {
    background-color: #fff;
    border: 1px solid #e2e2e2;
    border-radius: 7px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

    .file-title {
      display: flex;
      height: 40px;
      line-height: 40px;
      padding: 0 15px;
      border-bottom: 1px solid #ddd;
      background-color: #e7ecf2;

      h2 {
        margin: 0;
        font-weight: normal;
        font-size: 14px;
        color: #333;
      }
      .file-operate {
        flex: 1;
        text-align: right;
      }
    }

    .file-list {
      padding: 0;
      position: relative;
      height: 240px;
      overflow-x: hidden;
      overflow-y: auto;
      background-color: #fff;

      > li {
        background-color: #fff;
        color: #333;
      }
    }
    .no-file {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 140px;
    }
  }
}
</style>