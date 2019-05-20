import { HTTP } from "../util/http.js";

/* 期刊最新一期 继承 HTTP */
class ClassicModel extends HTTP {
  getLatest(sCallback) {
    this.request({
      url: 'classic/latest',
      success: res => {
        /* 回调的方式输出res */
        sCallback(res);
      }
    })
  }
}

export {ClassicModel}
