<!--eslint-disable-->
<template>
  <p hotrep id="test1">p标签，预置跟踪属性，hotrep</p>
  <p><span anotherprop id="test2">p标签>span，预置跟踪属性，anotherprop</span></p>
  <p data-prop2><strong  id="test3" msg="123">p标签>strong，p标签预置跟踪属性，响应P标签 </strong></p>
  <div class="aaa" id="a1" bb="123" ss="sss1">默认采集div，无需传递跟踪属性</div>
  <header class="bbb" data-123="test">header标签，未声明跟踪，不会跟踪</header>
  <div>
    自动采集 input, a等
    <input type="text">
    <a href="#">test a little, you know</a>
  </div>
  <span hotrep>span标签，添加预置跟踪属性，hotrep</span>
  <div class="x">
    <button id="button" button v-on:click="track2">button标签，自定义埋点，会覆盖自定义</button>
    <a href="#" @click="track2">a标签试一下，会覆盖自定义</a>
    <span @click="track2">span标签：自定义跟踪</span>
  </div>
  <template customF v-if="3 > 2">不能在vue template上使用 </template>
  <div class="wrapper" customF id="wrap">
    外层,有跟踪属性
    <div class="inner">
      中间层，无跟踪属性，不会访问
      <div class="box">
        div的最小叶子层，会捕获，会覆盖最外层，外围曝光有问题
<!--        <button>操作</button>-->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import sensors from "sa-sdk-javascript"
import { onMounted } from "vue"

const track = (e) => {
  console.log('>>>>>', e.target, '<<<<<')
  sensors.quick('trackHeatMap', e.target, {
    customProp1: 'test666', //如果需要添加自定义属性需要将 SDK 升级到 1.13.7 及以上版本。
    customProp2: 'test2',
    /*  // !json 无法传
    json2: {
      a: '12',
      b: {
        d: '123',
      },
    },*/
    // !数组里不能传数字
    arr0: [{ a: 1 }, { b: 2 }],
    arr: [1, 2],
    arr1: ["hello", "world", 1, 2],
    // !数组里不能传json和数字
    arr2: ['a', '12', 1, {
      json3: {
        a: '12',
        b: {
          d: '123',
        },
      },
    }],
    number: 333,
    symbol: Symbol('123'),
    set: new Set([1, 2]),
    map: new Map([[1, 2], [1, 4]]),
  })
}

const track2 = () => {
  sensors.track('BuyProduct', {
    ProductName: "MacBook Pro",
    ProductPrice: 123.45,
    IsAddedToFav: false,
    json2: {
      a: '12',
      b: {
        d: '123',
      },
    },
    // !数组里不能传数字
    arr0: [{ a: 1 }, { b: 2 }],
    arr: [1, 2],
    arr1: ["hello", "world", 1, 2],
    // !数组里不能传json和数字
    arr2: ['a', '12', 1, {
      json3: {
        a: '12',
        b: {
          d: '123',
        },
      },
    }],
    number: 333,
    symbol: Symbol('123'),
    set: new Set([1, 2]),
    map: new Map([[1, 2], [1, 4]]),
  })
}
onMounted(() => {
  sensors.track('BlackCard', {
    'init': 'blackcard',
  })
})
</script>

<style scoped>
.wrapper {
  color: #fff;
  background: #620404;
  padding: 20px;
}
.inner {
  padding: 20px;
  background: #090993;
}
.inner .box {
  padding: 20px;
  background: #42b983;
}

*{
  background: rgba(0,0,0,.2);
  margin: 10px 0;
}

.x {
  width: 200px;
  display: flex;
  flex-direction: column;
}
</style>
