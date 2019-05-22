import {HTTP} from '../util/http.js'

class LikeModel extends HTTP {
  // 点赞行为
  like(behavior, artId, category) {
    let url = behavior === 'like' ? 'like' : 'like/cancel'
    this.request({
      url:url,
      method: 'POST',
      data: {
        art_id: artId,
        type: category
      }
    })
  }

  // 获取点赞状态
  getClassicLikeStatus(artId, category, sCallback) {
    this.request({
      url: 'classic/' + category + '/' + artId + '/favor',
      success: sCallback
    })
  }
}

export {LikeModel}
