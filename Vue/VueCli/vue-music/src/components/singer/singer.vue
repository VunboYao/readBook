<template>
	<div class="singer">
    <list-view :data="singers" @select="selectSinger"></list-view>
		<transition name="slide">
			<router-view></router-view>
		</transition>
  </div>
</template>

<script>
  import {getSingerList} from "@/api/singer";
  import {ERR_OK} from "@/api/config";
  import Singer from "@/common/js/singer";
  import ListView from "@/base/listview/listview"

  const HOT_NAME = "热门";
  const HOT_SINGET_LENGTH = 10;
  export default {
    name: "singer",
    data() {
      return {
        singers: []
      };
    },
    created() {
      this._getSingerList();
    },
    methods: {
      selectSinger(singer) {
        this.$router.push({
					path: `/singer/${singer.id}`
				})
			},
      _getSingerList() {
        getSingerList().then(res => {
          if (ERR_OK === res.code) {
            this.singers = this._normalizeSinger(res.data.list);
          }
        });
      },
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        };
        list.forEach((item, index) => {
          if (index < HOT_SINGET_LENGTH) {
            map.hot.items.push(
                new Singer({
                  id: item.Fsinger_mid,
                  name: item.Fsinger_name
                })
            );
          }

          const key = item.Findex;
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            };
          }

          map[key].items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        });

        // sort list
        let hot = []
        let ret = []
        for (let k in map) {
          let val = map[k]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        ret.sort((a,b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      }
    },
    components: {
      ListView
    }
  };
</script>

<style scoped lang="scss">
	.singer {
		position: fixed;
		top: 88px;
		bottom: 0;
		width: 100%;
	}
	.slide-enter-active,
	.slide-leave-active {
		transition: all .3s;
	}
	.slide-enter,
	.slide-leave-to {
		/*transform: translate3d(100%, 0, 0);*/
		opacity: 0;
	}

</style>
