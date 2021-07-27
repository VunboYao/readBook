<template>
  <div class="index">
    <div class="indextitle">社区工作者基础信息</div>
    <div class="indexnav">
      <div v-for="(item, idx) in lists" :key="idx" class="indexnavitem">
        <img :src="item.ico" alt="">
        <div class="itemcontent">
          <p class="indexnavitemtitle">{{ item.text }}</p>
          <div class="itemcon">
            <p style="cursor:pointer;" @click="onRouter(item.type)">{{ item.num }}</p>
            <span>{{ item.tips }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="cards">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <div class="boxcardselect">
            <span class="boxcardselecttitle">杨浦区社区工作者员额基数及使用情况</span>
          </div>
        </div>
        <info-table
          :table-data="tableData"
          :data-total="dataTotal"
        />
        <!--
        <div class="header1">按街道各中心社区（目前人数/编制人数）</div>
        <div class="indexnav street">
          <div
            v-for="(item, idx) in streetlists"
            :key="idx"
            class="indexnavitem topmarge"
          >
            <img v-if="item.street" :src="item.ico" alt="">
            <div class="itemcontent">
              <p class="indexnavitemtitle fonttext">{{ item.street }}街道</p>
              <div class="itemcon">
                <span
                  class="fonttext2"
                >{{ item.typesCount }}/{{ item.postCount }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="header2">按岗位类别（目前人数/编制人数）</div>
        <div class="indexnav street">
          <div
            v-for="(item, idx) in postTypesCountList"
            :key="idx"
            class="indexnavitem topmarge"
          >
            <img :src="tupian[idx].ico" alt="">
            <div class="itemcontent">
              <p class="indexnavitemtitle fonttext">{{ item.typeName }}</p>
              <div class="itemcon">
                <span
                  class="fonttext2"
                >{{ item.typesCount }}/{{ item.postCount }}</span>
              </div>
            </div>
          </div>
        </div> -->
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { list, getMainData } from '@/api/indexs'
import InfoTable from './infoTable.vue'

export default {
  name: 'Dashboard',
  components: {
    InfoTable
  },
  data() {
    return {
      option: {},
      option2: {},
      option3: {},
      // 街道数据
      streetlist: [],
      postTypesCountList: [],
      option4: {
        title: {},
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['杨浦街道']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['党政中心', '党群工作', '街道', '政法委', '保安', '清洁工']
        },
        series: [
          {
            name: '杨浦街道',
            type: 'bar',
            data: [10, 20, 22, 10, 20, 10]
          }
        ]
      },
      lists: [
        {
          ico: require('@/assets/image/index/1.png'),
          text: '当前在岗社区工作者总人数',
          num: '',
          tips: '人',
          type: 'current'
        },
        {
          ico: require('@/assets/image/index/2.png'),
          text: '历史退出人数',
          num: '27',
          tips: '人',
          type: 'old'
        }
      ],
      // 图片地址
      tupian: [
        {
          ico: require('@/assets/image/index/A/13.png')
        },
        {
          ico: require('@/assets/image/index/A/14.png')
        },
        {
          ico: require('@/assets/image/index/A/15.png')
        },
        {
          ico: require('@/assets/image/index/A/16.png')
        },
        {
          ico: require('@/assets/image/index/A/17.png')
        }
      ],
      // 街道
      streetlists: [
        {
          ico: require('@/assets/image/index/A/1.png'),

          street: '77',
          postCount: '',
          typesCount: ''
        }
      ],
      tableData: [], // 表格数据
      dataTotal: 0,
      allTotal: 0,
      bm_list: []
    }
  },
  computed: {
    ...mapGetters(['name', 'roles'])
  },
  mounted() {
    // 主页信息获取
    this.getMainData()
    /* bm_list().then((res) => {
      this.bm_list = res.data
      // console.log(this.bm_list)
    })
    lastlist().then(res => {
      res.data.postTypesCountList.forEach(item => {
        // 先找到：的下标
        const index = item.typeName.indexOf('：')
        if (index !== -1) {
          // 截取字符串
          item.typeName = item.typeName.substring(index + 1)
        }
      })
      console.log(res.data.streetPostTypesCounts[0].street, '88888')
      this.postTypesCountList = res.data.postTypesCountList
      this.streetlists[0].street = res.data.streetPostTypesCounts[0].street
      this.streetlists[0].postCount = res.data.streetPostTypesCounts[0].postCount
      this.streetlists[0].typesCount = res.data.streetPostTypesCounts[0].typesCount

      this.streetlists[1].street = res.data.streetPostTypesCounts[1].street
      this.streetlists[1].postCount = res.data.streetPostTypesCounts[1].postCount
      this.streetlists[1].typesCount = res.data.streetPostTypesCounts[1].typesCount

      this.streetlists[2].street = res.data.streetPostTypesCounts[2].street
      this.streetlists[2].postCount = res.data.streetPostTypesCounts[2].postCount
      this.streetlists[2].typesCount = res.data.streetPostTypesCounts[2].typesCount

      this.streetlists[3].street = res.data.streetPostTypesCounts[3].street
      this.streetlists[3].postCount = res.data.streetPostTypesCounts[3].postCount
      this.streetlists[3].typesCount = res.data.streetPostTypesCounts[3].typesCount

      this.streetlists[4].street = res.data.streetPostTypesCounts[4].street
      this.streetlists[4].postCount = res.data.streetPostTypesCounts[4].postCount
      this.streetlists[4].typesCount = res.data.streetPostTypesCounts[4].typesCount

      this.streetlists[5].street = res.data.streetPostTypesCounts[5].street
      this.streetlists[5].postCount = res.data.streetPostTypesCounts[5].postCount
      this.streetlists[5].typesCount = res.data.streetPostTypesCounts[5].typesCount

      this.streetlists[6].street = res.data.streetPostTypesCounts[6].street
      this.streetlists[6].postCount = res.data.streetPostTypesCounts[6].postCount
      this.streetlists[6].typesCount = res.data.streetPostTypesCounts[6].typesCount

      this.streetlists[7].street = res.data.streetPostTypesCounts[7].street
      this.streetlists[7].postCount = res.data.streetPostTypesCounts[7].postCount
      this.streetlists[7].typesCount = res.data.streetPostTypesCounts[7].typesCount

      this.streetlists[8].street = res.data.streetPostTypesCounts[8].street
      this.streetlists[8].postCount = res.data.streetPostTypesCounts[8].postCount
      this.streetlists[8].typesCount = res.data.streetPostTypesCounts[8].typesCount

      this.streetlists[9].street = res.data.streetPostTypesCounts[9].street
      this.streetlists[9].postCount = res.data.streetPostTypesCounts[9].postCount
      this.streetlists[9].typesCount = res.data.streetPostTypesCounts[9].typesCount

      this.streetlists[10].street = res.data.streetPostTypesCounts[10].street
      this.streetlists[10].postCount = res.data.streetPostTypesCounts[10].postCount
      this.streetlists[10].typesCount = res.data.streetPostTypesCounts[10].typesCount

      this.streetlists[11].street = res.data.streetPostTypesCounts[11].street
      this.streetlists[11].postCount = res.data.streetPostTypesCounts[11].postCount
      this.streetlists[11].typesCount = res.data.streetPostTypesCounts[11].typesCount

      // this.streetlist = res.data.streetPostTypesCounts
    })*/
    list().then((res) => {
      // console.log(res, "DAYIN")
      const _res = res.data
      // 顶部
      // 当前在编总人数
      this.lists[0].num = _res.bianneirenyuan
      // 历史退出人数
      this.lists[1].num = _res.lizhirenyuan
      // this.lists[2].num = _res.bianneirenyuangongzi
      // this.lists[3].num = _res.bianwairenyuangongzi
      // this.lists[4].num = _res.max_mopney

      // 男女比例
      this.option = {
        title: {},
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '比例（%）',
            type: 'pie',
            radius: '50%',
            data: [
              { value: _res.nan_bili, name: '男' },
              { value: _res.nv_bili, name: '女' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }

      // 社区工作者区域分布
      this.option2 = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: _res.jiedaoyuangongbili
          }
        ]
      }

      // 社区工作者年龄
      const names = []
      const datas = []
      _res.nianling && _res.nianling.forEach((fres) => {
        names.push(fres.name)
        datas.push(fres.value)
      })
      this.option3 = {
        xAxis: {
          type: 'category',
          data: names
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: datas,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      }
    })
  },
  methods: {
    // 获取门户主页信息
    getMainData() {
      getMainData().then(res => {
        console.log(res, '门户主页信息')
        const list = res.data
        this.dataTotal = list.length || 0
        list && list.forEach(item => {
          if (item.street === '平凉路街道' || item.street === '五角场街道') {
            item.street = item.street + '*'
          }
          this.allTotal += item.communityQuota + item.partyQuota
          this.tableData.push({
            street: item.street,
            communityQuota: item.communityQuota,
            communityOtherQuota: item.communityOtherQuota,
            communityCenterQuota: item.communityCenterQuota,
            communityWorker: item.communityWorker,
            communityCenterWorker: item.communityCenterWorker,
            communityOtherWorker: item.communityOtherWorker,
            partyQuota: item.partyQuota,
            partyDoubleNewQuota: item.partyDoubleNewQuota,
            partyResidenceQuota: item.partyResidenceQuota,
            partyWorker: item.partyWorker,
            partyDoubleNewWorker: item.partyDoubleNewWorker,
            partyResidenceWorker: item.partyResidenceWorker,
            residenceWorker: item.residenceWorker,
            residenceeQuota: item.residenceeQuota,
            residenceWorker_num_xuanren: item.residenceWorker_num_xuanren,
            residenceWorker_num_pinren: item.residenceWorker_num_pinren,
            totalWorker: item.totalWorker
          })
        })
        /* this.tableData.push({
          street: '区委组织部',
          communityQuota: '/',
          communityOtherQuota: '/',
          communityCenterQuota: '/',
          communityWorker: '/',
          communityCenterWorker: '/',
          communityOtherWorker: '/',
          partyQuota: '8',
          partyDoubleNewQuota: '8',
          partyResidenceQuota: '0',
          partyWorker: '/',
          partyDoubleNewWorker: '/',
          partyResidenceWorker: '/',
          residenceWorker: '/',
          totalWorker: '/'
        }) */
        this.tableData[0]['allTotal'] = this.allTotal
      })
    },
    // 路由信息跳转
    onRouter(type) {
      if (type === 'old') {
        this.$router.push('/user/editing/history')
      } else if (type === 'current') {
        this.$router.push('/user/editing/current')
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scope>
@import "@/styles/uni.scss";
.indextitle {
  font-size: 24px;
  margin-bottom: 20px;
}
.header1 {
  margin-left: 13px;
  margin-bottom: 20px;
}
.header2 {
  margin-left: 13px;
  margin-top: 50px;
  margin-bottom: 20px;
}
.street {
  display: flex;
  // justify-content: center;
  flex-wrap: wrap;
}
.street1 {
  margin-left: 5%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.streetchil1d {
  margin: 15px 0;
  width: 50%;
}
.streetchild {
  margin: 15px 0;
  width: 30%;
}
.cards {
  @extend %row;
  @extend %lrcenter;
  justify-content: space-around;
  width: 100%;
  margin-top: 20px;
  .box-card {
    .el-card__body {
      padding: 0;
    }
    width: 100%;
  }
}

.boxcardselect {
  margin-left: 10px;
  @extend %row;
  @extend %lrcenter;
  height: 40px;
  font-weight: bold;
  .boxcardselecttitle {
    margin-right: 20px;
    font-size: 20px;
  }
}
.index {
  padding: $uni-spacing-row;
}
.fonttext {
  font-size: 30px !important;
}
.fonttext2 {
  font-size: 30px !important;
}
.topmarge {
  margin-top: 30px;
  margin-right: 10px;
  margin-left: 10px;
  text-align: center;

}
.indexnav {
  @extend %row;
  @extend %lrcenter;
  // justify-content: space-between;

  .indexnavitem {
    @extend %rev;
    .itemcontent {
      height: 160px;
      width: 310px;
      @extend %abs;
      z-index: 2;
      top: 0;
      left: 0;
      @extend %cum;
      @extend %cncenter;
      color: $wcolor;
      // padding-left: 20px;
      .indexnavitemtitle {
        font-size: 20px;
        color: #fff;
        margin-bottom: 10px;
      }
      .itemcon {
        @extend %row;
        align-items: flex-end;
        margin-left: 30%;
        text-align: center;

        span {
          margin-bottom: 6px;
        }

        p {
          font-size: 36px;
          color: #fff;
          margin-right: 4px;
        }
      }
    }
  }
}
</style>
