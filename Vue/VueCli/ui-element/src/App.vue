<template>
  <div class="container">
    <div class="ul">
      <div
          class="li"
          v-for="(item,index) in arr"
          @mouseover="father(index)"
          @mouseleave="close()"
          :key="index">
        <h2>{{item.title}}</h2>
        <transition-group name="el-fade-in">
          <div class="sub-wrap" key="1" v-show="active === index">
            <div
                class="sub-li"
                v-for="(sub,subIndex) in item.child"
                :key="subIndex"
                @mouseover="subFather(subIndex)"
                @mouseleave="closeSub()"
            >
              <h2>{{sub.subTitle}}</h2>
                <div class="grd-wrap"  v-show="subActive === subIndex">
                  <h2 v-for="(last, lastIndex) in sub.children" :key="lastIndex">
                    {{last.grdTitle}}
                  </h2>
                </div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
	export default {
		data() {
			return {
				active: null,
				subActive: null,
				arr: [
					{
						title: '1',
						child: [
							{
								subTitle: '1-1',
								children: [
									{grdTitle: '1-1-1'},
									{grdTitle: '1-1-2'},
									{grdTitle: '1-1-3'},
									{grdTitle: '1-1-4'}
								]
							},
							{
								subTitle: '1-2',
								children: [
									{grdTitle: '1-2-1'},
									{grdTitle: '1-2-2'},
									{grdTitle: '1-2-3'},
									{grdTitle: '1-2-4'},
									{grdTitle: '1-2-5'},
									{grdTitle: '1-2-6'},
								]
							},
							{
								subTitle: '1-3',
								children: [
									{grdTitle: '1-3-1'},
									{grdTitle: '1-3-2'},
									{grdTitle: '1-3-3'}
								]
							},
							{
								subTitle: '1-4',
								children: [
									{grdTitle: '1-4-1'},
									{grdTitle: '1-4-2'},
									{grdTitle: '1-4-3'},
									{grdTitle: '1-4-4'},
									{grdTitle: '1-4-5'},
									{grdTitle: '1-4-6'},
									{grdTitle: '1-4-7'},
									{grdTitle: '1-4-8'},
								]
							}
						]
					},
					{
						title: '2',
						child: [
							{
								subTitle: '2-1',
								children: [
									{grdTitle: '2-1-1'},
									{grdTitle: '2-1-2'},
									{grdTitle: '2-1-3'},
									{grdTitle: '2-1-4'}
								]
							},
							{
								subTitle: '2-2',
								children: [
									{grdTitle: '2-2-1'},
									{grdTitle: '2-2-2'},
									{grdTitle: '2-2-3'},
									{grdTitle: '2-2-4'},
									{grdTitle: '2-2-5'},
									{grdTitle: '2-2-6'},
								]
							},
							{
								subTitle: '3-3',
								children: [
									{grdTitle: '3-3-1'},
									{grdTitle: '3-3-2'},
									{grdTitle: '3-3-3'}
								]
							},
							{
								subTitle: '4-4',
								children: [
									{grdTitle: '4-4-1'},
									{grdTitle: '4-4-2'},
									{grdTitle: '4-4-3'},
									{grdTitle: '4-4-4'},
									{grdTitle: '4-4-5'},
									{grdTitle: '4-4-6'},
									{grdTitle: '4-4-7'},
									{grdTitle: '4-4-8'},
								]
							}
						]
					},
				]
			}
		},
		methods: {
			father(i) {
				this.active = i
			},
			close() {
				this.active = null
			},
			subFather(index) {
				this.subActive = index
			},
			closeSub() {
				this.subActive = null
			}
		}
	}
</script>

<style>
  .ul {
    margin: 0;
    width: 200px;
  }

  .li {
    position: relative;
    cursor: pointer;
  }

  h2 {
    margin: 0;
    border-bottom: 1px solid #000;
  }

  .sub-wrap {
    position: absolute;
    top: 0;
    right: -110%;
    width: 110%;
  }

  .grd-wrap {
    position: absolute;
    top: 0;
    right: -110%;
    width: 110%;
  }
</style>
