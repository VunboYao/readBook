<template>
	<div class="recommend">
		<scroll
      ref="scroll"
      class="recommend-content"
      :data="discList">
			<div>
				<div
          class="slider-wrapper"
          v-if="recommends.length">
					<slider>
						<div
              v-for="item in recommends"
              :key="item.id">
							<a :href="item.linkUrl">
								<img class="needsclick" @load="loadImage" :src="item.picUrl">
							</a>
						</div>
					</slider>
				</div>
				<div class="recommend-list">
					<h1 class="list-title">热门歌曲推荐</h1>
					<ul>
						<li
              class="item"
              v-for="item in discList"
              :key="item.dissid">
							<div class="icon">
								<img
                  v-lazy="item.imgurl"
                  width="60"
                  height="60">
							</div>
							<div class="text">
								<h2 class="name" v-html="item.creator.name"></h2>
								<p class="desc" v-html="item.dissname"></p>
							</div>
						</li>
					</ul>
				</div>
			</div>
      <div class="loading-container" v-show="!discList.length">
        <loading />
      </div>
		</scroll>
	</div>
</template>

<script>
  import Slider from '@/base/slider/slider'
  import Scroll from '@/base/scroll/scroll'
  import Loading from '@/base/loading/loading'
  import {getRecommend, getDistList} from "@/api/recommend"
  import {ERR_OK} from "@/api/config"

  export default {
    name: "recommend",
    data() {
      return {
        recommends: [],
				discList: []
      }
    },
    created() {
      this._getRecommend();
      this._getDistList();
    },
    methods: {
      // 轮播
      _getRecommend() {
        getRecommend().then(res => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider
          }
        })
      },
			// 歌单
			_getDistList() {
        getDistList().then(res => {
          if (res.code === ERR_OK) {
            this.discList = res.data.list
          }
				})
      },
      loadImage() {
        // execute only once
        if (!this.checkLoaded) {
          this.$refs.scroll.refresh();
          this.checkLoaded = true;
        }
      }
    },
    components: {
      Slider,
      Scroll,
      Loading,
    }
  }
</script>

<style scoped lang="scss">
	@import "recommend";
</style>
