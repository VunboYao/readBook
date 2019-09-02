<template>
  <div>
    <tinymce-editor
      :init="init"
      v-model="content"
    />
  </div>
</template>
<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver/theme.min.js'
import './static/skins/ui/oxide/skin.min.css'
import './static/zh_CN.js'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/autosave'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/directionality'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/media'
import 'tinymce/plugins/noneditable'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/print'
import 'tinymce/plugins/save'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/template'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/textpattern'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/visualchars'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/help'

export default {
  props: {
    height: Number
  },
  data() {
    return {
      init: {
        language:'zh_CN',
        browser_spellcheck: true, // 拼写检查
        branding: false, // 去水印
        elementpath: false,  //禁用编辑器底部的状态栏
        statusbar: true, // 隐藏编辑器底部的状态栏
        paste_data_images: true, // 允许粘贴图像
        menubar: true, // 隐藏最上方menu
        height: this.height || 600,
        fontsize_formats: "8px 10px 12px 14px 18px 24px 36px",
        font_formats: '微软雅黑',
        toolbar: ['searchreplace bold italic autosave underline strikethrough |alignleft aligncenter alignright outdent indent | blockquote undo redo | removeformat subscript superscript code codesample | print forecolor backcolor | fullscreen', 'formatselect fontselect fontsizeselect | hr bullist numlist | link charmap preview anchor pagebreak | insertdatetime media table'],
        plugins: 'advlist anchor autolink autosave code codesample  directionality fullscreen hr imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace table template textpattern visualblocks visualchars wordcount help'
      },
      content: '请在此输入内容'
    }
  },
  components: {
    'tinymce-editor': Editor
  },
  watch: {
    'content': function(item) {
      this.$emit('content', item)
    }
  }
}
</script>