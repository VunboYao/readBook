import { HTTP } from "../util/http.js";

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
