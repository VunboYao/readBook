import { getVideoDetail } from "services/video"

// components/related-video/related-video.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemData: {
      type: Object,
      default: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    async fetchVideoDetail() {
      const res = await getVideoDetail({ id: this.properties.itemData.vid })
      console.log(res);
    }
  }
})
