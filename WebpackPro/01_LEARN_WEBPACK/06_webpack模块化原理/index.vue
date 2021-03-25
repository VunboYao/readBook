<template>
  <div>
    <el-dialog
      :visible.sync="visible"
      :title="title"
      :width="'980px'"
      :top="'35px'"
      class="popup-container"
      :close-on-press-escape="false"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <div ref="focusStart0" tabindex="0" style="width: 0;height: 0" />
      <div class="venusForm-container">
        <el-form
          ref="form"
          :model="form"
          :inline="true"
        >
          <div class="title">
            <span>基本信息</span>
          </div>
          <div class="select">
            <el-form-item
              prop="IdTyp"
              label="证件种类"
              class="branch-select-input"
              :rules="{ required: true, message: '证件类型不能为空', trigger: ['blur', 'change'] }"
            >
              <el-select
                v-model="form.IdTyp"
                :disabled="onlyCheckId || singleCheck"
                filterable
                placeholder="请选择证件类型"
                @change="onChangeIdTyp"
              >
                <el-option
                  v-for="item in ecifDic('C001')"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                />
              </el-select>
            </el-form-item>
          </div>
          <div class="input">
            <el-form-item
              label="证件号码"
              style="display: inline-flex;margin-bottom: 10px;"
              prop="IdNo"
              :rules="[
                { required: true, message: '请输入证件号码', trigger: 'blur' },
                { validator: (rule, value, callback) => {
                  validateIdCard(form.IdTyp, value, callback, true)
                }, trigger: 'blur' }
              ]"
            >
              <div class="merge_input">
                <el-input
                  v-model="form.IdNo"
                  :disabled="onlyCheckId || singleCheck"
                  placeholder="请输入证件号码"
                />
                <el-button
                  v-btn-delay
                  class="input_btn"
                  :disabled="onlyCheckId || singleCheck"
                  @click="getIdNo"
                >读取</el-button>
              </div>
            </el-form-item>
          </div>
          <div class="input">
            <el-form-item
              prop="CustNm"
              label="客户名称"
              class="branch-select-input form-item-small"
              :rules="{ required: true, message: '客户名称不能为空', trigger: ['blur', 'change'] }"
            >
              <el-input
                v-model="form.CustNm"
                :disabled="onlyCheckId || singleCheck"
                placeholder="请输入客户名称"
              />
            </el-form-item>
          </div>
          <div class="select">
            <el-form-item
              label="国籍"
              class="branch-select-input"
              :rules="{ required: true, message: '国籍不能为空', trigger: ['blur', 'change'] }"
            >
              <el-select
                v-model="Naty"
                filterable
                disabled
                placeholder="请选择国籍"
              >
                <el-option
                  v-for="(item) in coreDic('nationl_code')"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                />
              </el-select>
            </el-form-item>
          </div>
          <div class="select">
            <el-form-item
              label="业务种类"
              class="branch-select-input"
              :rules="{ required: true, message: '业务种类不能为空', trigger: ['blur', 'change'] }"
            >
              <el-select
                v-model="sysCheckType"
                filterable
                placeholder="请选择业务种类"
              >
                <el-option label="01-银行账户业务" value="01" />
                <el-option label="02-信贷及征信业务" value="02" />
                <el-option label="03-支付结算业务" value="03" />
                <el-option label="04-反洗钱业务" value="04" />
                <el-option label="05-其他业务" value="05" />
              </el-select>
            </el-form-item>
          </div>
          <div class="select">
            <el-form-item
              label="人脸识别"
              class="branch-select-input"
            >
              <el-select
                v-model="isShowFaceConfirm"
                filterable
                :disabled="isFaceConfirm"
                placeholder="是否进行人脸识别"
              >
                <el-option label="0-否" value="0" />
                <el-option label="1-是" value="1" />
              </el-select>
            </el-form-item>
          </div>
          <div class="IdAuthButton" style="padding-right:120px">
            <el-button v-btn-delay @click="closeDialog">返回</el-button>
            <el-button v-btn-delay type="primary" @click="doSysCheck('form')">提交核查</el-button>
          </div>
          <div class="line" style="margin-top:20px;">
            <el-divider />
          </div>
          <div class="title">
            <span>核查信息</span>
          </div>
          <div class="AuthInfo">
            <div class="AuthInfoContent">
              <div class="select">
                <el-form-item
                  label="核查方式"
                  style="display: inline-flex;margin-bottom: 10px;"
                  class="small"
                >
                  <el-select v-model="checkType" filterable disabled placeholder="核查方式">
                    <el-option label="1-人行核查" value="1" />
                    <el-option label="2-7*24" value="2" />
                    <el-option label="3-行内核查" value="3" />
                  </el-select>
                </el-form-item>
              </div>
              <div class="datePicker">
                <el-form-item
                  label="核查时间"
                  class="small"
                  prop="BillDate"
                >
                  <venus-dater
                    v-model="form.BillDate"
                    disabled
                    placeholder="请选择核查时间"
                    format="YYYY-MM-DD"
                    value-type="YYYYMMDD"
                    @close="$_ResetFous('MainCardProdCode')"
                  />
                </el-form-item>
              </div>
              <div class="select">
                <el-form-item
                  label="核查结果"
                  style="display: inline-flex;margin-bottom: 10px;"
                  class="small"
                >
                  <div class="merge_input">
                    <el-select
                      v-model="sysCheckRes.res"
                      disabled
                      placeholder="请输入核查结果"
                    >
                      <el-option label="MCHD-要素核查匹配正确" value="MCHD" />
                      <el-option label="NMCH-要素核查匹配不一致" value="NMCH" />
                      <el-option label="SYAB-核查系统异常" value="SYAB" />
                    </el-select>
                    <el-button
                      v-btn-delay
                      class="input_btn"
                    >人工认定</el-button>
                  </div>
                </el-form-item>
              </div>
              <div class="input">
                <el-form-item
                  label="签发机关"
                  style="display: inline-flex;margin-bottom: 10px;"
                  class="small"
                >
                  <el-input
                    v-model="sysCheckRes.Signatory"
                    disabled
                    placeholder="请输入签发机关"
                  />
                </el-form-item>
              </div>
            </div>
            <div class="AuthInfoImg">
              <img v-if="imgCheck" style="width:150px" :src="'data:image/jpeg;base64,' + imgCheck">
              <img v-else src="./../../assets/tempImg/defaultCust.png" alt="核查照">
            </div>
          </div>
          <div class="line" style="margin-top:20px;">
            <el-divider />
          </div>
          <div v-if="isShowFaceConfirm === '1'">
            <div class="title">
              <span>人脸识别</span>
            </div>
            <el-form-item label="选择摄像头" class="small">
              <el-select v-model="camNo" filterable placeholder="请选择摄像头">
                <el-option label="1-主摄像头(可上下)" value="1" />
                <el-option label="2-上摄像头" value="2" />
                <el-option label="3-副摄像头" value="3" />
                <el-option label="4-柜外清摄像头" value="4" />
              </el-select>
            </el-form-item>
            <div class="content">
              <!--修改版-->
              <div class="img-list">
                <div class="img-item">
                  <div class="img-pho" @click="StartPlay()">
                    <img v-if="imgBg" :src="'data:image/jpeg;base64,' + imgBg">
                    <svg-icon v-else icon-class="defaultCust1" class-name="svg-idBg" />
                    <!-- <img src="./../../assets/tempImg/defaultCust.png" alt="现场照"> -->
                  </div>
                  <span>客户现场照片</span>
                </div>
                <!--              <span
                tabindex="0"
                class="img-exec"
                @click="StartPlay('3')"
                @keyup.enter="StartPlay('3')"
                >拍照</span>-->
                <!-- <el-button
                  v-btn-delay:3000
                  tabindex="0"
                  @click="StartPlay()"
                  @keyup.enter="StartPlay()"
                >拍照</el-button> -->
                <!-- </div> -->
                <!--证件照-->
                <!-- <div class="img-item">
                  <span>证件照片(正面)</span>
                  <div class="img-pho img-Id-pho">
                    <img
                      v-if="readInfo.FrontImg"
                      :src="'data:image/jpeg;base64,' + readInfo.FrontImg"
                    >
                  </div>
                  <el-button
                    v-btn-delay:3000
                    tabindex="0"
                    @click="StartPlay('id')"
                    @keyup.enter="StartPlay('id')"
                  >拍照</el-button>
                </div> -->
                <!--核查照-->
                <div class="img-item">
                  <div class="img-pho" @click="StartPlay('id')">
                    <img v-if="readInfo.FrontImg" :src="'data:image/jpeg;base64,' + readInfo.FrontImg">
                    <svg-icon v-else icon-class="defaultCust1" class-name="svg-idBg" />
                    <!-- <img src="./../../assets/tempImg/defaultCust.png" alt="证件照"> -->
                  </div>
                  <span>客户证件影像</span>
                </div>
              </div>
              <div class="input">
                <el-form-item
                  label="比对结果"
                  style="display: inline-flex;margin-bottom: 10px;"
                  class="small"
                >
                  <div class="merge_input">
                    <el-select v-model="manualComparison" :disabled="FaceRcogModel !== '1'" placeholder="请选择比对结果">
                      <el-option label="0-通过" value="0" />
                      <el-option label="1-不通过" value="1" />
                    </el-select>
                    <el-button
                      v-btn-delay
                      class="input_btn"
                      :disabled="comparativeRes !== '1' || comparativeRes === ''"
                      @click="doSysOwn('form')"
                    >人工比对</el-button>
                  </div>
                </el-form-item>
              </div>
            </div>
          </div>
        </el-form>
      </div>
      <!-- <div class="check-container">
        <div
          v-if="mode === 'all'"
          class="tabs"
        >
          <div
            class="tab"
            :class="{active:tab==='system'}"
            @click="tabChange('system')"
          >身份核查</div>
          <div
            class="tab"
            :class="{active:tab==='manual'}"
            @click="tabChange('manual')"
          >人脸识别</div>
        </div>
        <div v-show="tab==='system'" class="content">
          <div class="title">读取信息</div>
          <div class="center">
            <div class="items">
              <div class="item">
                <label>姓名</label>
                <span>{{ readInfo.CustNm }}</span>
              </div>
              <div class="item">
                <label>证件号码</label>
                <span>{{ readInfo.IdNo }}</span>
              </div>
              <div v-if="readInfo.IssueAuth" class="item">
                <label>签发机关</label>
                <span>{{ readInfo.IssueAuth }}</span>
              </div>
              <div v-if="readInfo.IdStrtDate" class="item">
                <label>有效日期</label>
                <span>{{ readInfo.IdStrtDate ? readInfo.IdStrtDate + '-' + readInfo.IdEndDate : '' }}</span>
              </div>
              <div v-if="readInfo.IdAddr" class="item">
                <label>住址</label>
                <span>{{ readInfo.IdAddr }}</span>
              </div>
            </div>
            <div v-if="readInfo.IdAddr" class="img">
              <img :src="'data:image/jpeg;base64,' + readInfo.Photo">
            </div>
          </div>
          <div class="btns border">
            <label>业务类型</label>
            <el-select v-model="sysCheckType" placeholder="请选择业务类型" filterable class="venus-input-middle">
              <el-option label="01-银行账户业务" value="01" />
              <el-option label="02-信贷及征信业务" value="02" />
              <el-option label="03-支付结算业务" value="03" />
              <el-option label="04-反洗钱业务" value="04" />
              <el-option label="05-其他业务" value="05" />
            </el-select>
            <div style="float: right">
              <el-button
                v-btn-delay
                :disabled="!isCanAuth"
                @click="doSysCheck('form')"
              >系统核查</el-button>
            </div>
          </div>
          <div class="title">核查结果</div>
          <div class="center">
            <div class="items res">
              <div class="item">
                <label>签发机关</label>
                <span>{{ sysCheckRes.Signatory }}</span>
              </div>
              <div class="item" style="display: flex; align-items: center;">
                <label style="flex: none;">核查结果</label>
                <span>{{ sysCheckRes.res | filterSign }}</span>
              </div>
              <div v-if="VerfExcpInfo !== '00'" class="item" style="display: flex; align-items: center;">
                <label style="flex: none;">异常信息</label>
                <span>{{ VerfExcpInfo }}</span>
              </div>
            </div>
            <div class="img">
              <img v-if="sysCheckRes.Photo" :src="'data:image/jpeg;base64,' + sysCheckRes.Photo">
              <img v-else src="./../../assets/tempImg/defaultCust.png" alt="核查照">
            </div>
          </div>
        </div>
        <div v-show="tab==='manual'" class="content">
          <div class="img-list">
            <div class="img-item">
              <span>现场照片</span>
              <div class="img-pho">
                <img v-if="imgBg" :src="'data:image/jpeg;base64,' + imgBg">
                <img v-else src="./../../assets/tempImg/defaultCust.png" alt="现场照">
              </div>
              <el-button
                v-btn-delay:3000
                tabindex="0"
                @click="StartPlay()"
                @keyup.enter="StartPlay()"
              >拍照</el-button>
            </div>
            <div class="img-item">
              <span>证件照片(正面)</span>
              <div class="img-pho img-Id-pho">
                <img
                  v-if="readInfo.FrontImg"
                  :src="'data:image/jpeg;base64,' + readInfo.FrontImg"
                >
              </div>
              <el-button
                v-btn-delay:3000
                tabindex="0"
                @click="StartPlay('id')"
                @keyup.enter="StartPlay('id')"
              >拍照</el-button>
            </div>
            <div class="img-item">
              <span>核查照片</span>
              <div class="img-pho">
                <img v-if="imgCheck" :src="'data:image/jpeg;base64,' + imgCheck">
                <img v-else src="./../../assets/tempImg/defaultCust.png" alt="核查照">
              </div>
            </div>
          </div>
          <div class="item-compare">
            <el-button v-btn-delay @click="doManualCheck('form')">对比</el-button>
          </div>
          <div class="res">
            <div class="title">
              <span>识别结果</span>
              <span>{{ manualCheckRes }}</span>
            </div>
          </div>
        </div>
      </div> -->
      <div slot="footer" class="footer">
        <el-button v-btn-delay type="primary" @click="previewFun">打印核查结果</el-button>
        <div style="float: right;">
          <el-button
            v-btn-delay
            type="primary"
            @click="confirmIdAuth('form')"
          >确定</el-button>
          <el-button v-btn-delay @click="closeDialog">关闭</el-button>
          <div tabindex="0" style="width: 0;height: 0" @focus="resetFocus(true)" />
        </div>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="PreviewVoucher"
      width="50%"
      :show-close="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      class="dialog-modify2 fix-collection-table"
    >
      <div id="PrintVoucherCommon" class="PrintVoucher">
        <h1>身份信息联网核查</h1>
        <div class="Print_wrap">
          <div class="Print_Box">
            <div class="list">
              <div class="item">
                <div class="label">业务类型</div>
                <div class="content">：{{ sysCheckType || '' | dict('NetWorkType') }}</div>
              </div>
            </div>
            <div class="list">
              <div class="item">
                <div class="label">姓名</div>
                <div class="content">：{{ form.CustNm || '' }}</div>
              </div>
              <div class="item">
                <div class="label">证件类型</div>
                <div class="content">：{{ form.IdTyp | dict('C001') }}</div>
              </div>
            </div>
            <div class="list">
              <div class="item">
                <div class="label">证件号码</div>
                <div class="content">：{{ form.IdNo }}</div>
              </div>
              <div class="item">
                <div class="label">国籍</div>
                <div class="content">：{{ 'CHN' || '' | dict('nationl_code') }}</div>
              </div>
            </div>
            <div class="list">
              <div class="label">核查结果</div>
              <div class="content">：{{ sysCheckRes.res || '' | dict('NetWorkCheckResult') }}</div>
            </div>
            <div class="list">
              <div class="label">详情</div>
              <div class="content">：{{ sysCheckRes.desc || '' }}</div>
            </div>
            <div class="list">
              <div class="label">签发机关</div>
              <div class="content">：{{ sysCheckRes.Signatory || '' }}</div>
            </div>
            <div class="list">
              <div class="item">
                <div class="label">交易柜员</div>
                <div class="content">：{{ store.TlrNo }} / {{ store.TlrNm }}</div>
              </div>
              <div class="item">
                <div class="label">打印日期</div>
                <div class="content">：{{ today | filterDay }}</div>
              </div>
            </div>
          </div>
          <div v-if="imgCheck" class="photo">
            <img :src="'data:image/jpeg;base64,' + imgCheck" alt="">
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer center">
        <el-button v-btn-delay @click="onCancelPreview(false)">取 消</el-button>
        <el-button v-btn-delay type="primary" @click="Print">打印</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { clientIdentityVerification } from '@/api/common/publicModule'
  import initMixin from '@/views/initMixin' // 混入公共报文数据
  import { validateIdCard } from '../../verifyDic'
  import { commonMethods } from '../../views/commonMixin'
  import userStore from '@/store/modules/user'
  import lrz from 'lrz'

  export default {
    name: 'NewScanner',
    filters: {
      // filterSign(val) {
      //   const data = {
      //     'MCHD': 'MCHD-要素核查匹配正确',
      //     'NMCH': 'NMCH-要素核查匹配不一致',
      //     'SYAB': 'SYAB-核查系统异常'
      //   }
      //   return data[val]
      // },
      filterDay(val) {
        return val.replace(/^(\d{4})(\d{2})(\d{2})$/g, (match, $1, $2, $3) => {
          return `${$1}-${$2}-${$3}`
        })
      }
    },
    mixins: [initMixin, commonMethods],
    data() {
      return {
        store: {
          TlrNo: '',
          TlrNm: ''
        },
        FaceRcogFlag: '', // 默认人脸识别
        FaceRcogModel: '0', // 人脸识别模式0：自动识别，1：人工识别
        PreviewVoucher: false,
        validateIdCard,
        checkType: '', // 核查方式
        wrapData: null,
        VerfExcpInfo: '',
        showOwnPass: false, // 是否显示人工通过
        api: '',
        onlyCheckId: false, // 单独核查
        SrvInstnId: '',
        SrvCmptId: '',
        loading: null,
        SrvCmptFuncCod: null,
        IdTypData: [
          {
            label: '101-居民身份证',
            value: '101'
          },
          {
            label: '102-户口簿',
            value: '102'
          },
          {
            label: '110-临时居民身份证',
            value: '110'
          },
          {
            label: '112-普通护照',
            value: '112'
          },
          {
            label: '108-港澳居民往来内地通行证（香港）',
            value: '108'
          },
          {
            label: '114-港澳居民往来内地通行证（澳门）',
            value: '114'
          },
          {
            label: '109-往来台湾通行证',
            value: '109'
          }
        ],
        singleCheck: false,
        title: '客户身份核查',
        visible: false,
        mode: 'all', // system,manual,all
        type: '',
        // NoIdType: false, // 可核查的证件类型
        today: '',
        form: {
          IdTyp: '',
          IdNo: '',
          CustNm: ''
        },
        oldVal: null, // 原始存量数据
        isCanAuth: true, // 可以核查
        camNo: '4',
        isFaceConfirm: false,
        options: [
          { label: '01-未核实', value: '01' },
          { label: '02-真实', value: '02' },
          { label: '03-虚假', value: '03' },
          { label: '04-假名', value: '04' },
          { label: '05-匿名', value: '05' },
          { label: '06-无法核实', value: '06' },
          { label: '07-已发生需核查交易', value: '07' },
          { label: '08-暂不核实', value: '08' }
        ], // 核查结果选项
        value: '', // 核查结果
        tab: 'system',
        info: {},
        readInfo: {},
        Naty: 'CHN',
        sysCheckType: '01', // 系统核查-类型
        sysCheckRes: {// 系统核查-结果
          Signatory: '',
          Photo: '',
          desc: '',
          res: ''
        },
        errorPho: '',
        imgBg: '', // 人脸识别-现场照片
        imgCheck: '', // 人脸识别-核查照片
        imgId: '', // 人脸识别-证件照片
        manualCheckRes: '', // 人脸识别-结果
        manualComparison: '', // 人工比对-通过/不通过
        comparativeRes: '', // 对比结果
        isShowFaceConfirm: '0' // 是否进行人脸识别
      }
    },
    watch: {
      mode(val) {
        if (val === 'all') this.tab = 'system'
        if (val === 'system') this.tab = 'system'
        if (val === 'manual') this.tab = 'manual'
      },
      // 证件三要素
      info(val) {
        if (val.FaceRcogFlag && val.FaceRcogFlag === '1') {
          this.FaceRcogFlag = val.FaceRcogFlag
          this.isFaceConfirm = true
          this.isShowFaceConfirm = '1'
        } else {
          this.isFaceConfirm = false
          this.isShowFaceConfirm = '0'
        }
        if (!val.IdTyp || !val.IdNo || !val.CustNm) return // 比对三要素，增加容错，防止后端返回三要素不全导致的比对异常
        if (val.IdTyp.slice(0, 1) === '2') return
        if (val.IdTyp !== '101') {
          this.isFaceConfirm = true
          this.isShowFaceConfirm = '0'
        }
        // 反显
        if (val.isCheckIdType === 'Y') {
          this.singleCheck = true
        }
        this.oldVal = JSON.parse(JSON.stringify(val)) // 备份原始数据
        // 如果是只读核查模式
        if (this.onlyCheckId || this.singleCheck) {
          this.form = val
        }
        /* const index = this.IdTypData.findIndex(item => {
                  return item.value === val.IdTyp
                })
                if (index < 0) {
                  this.form = val
                  return
                  // this.NoIdType = true
                  const idArr = this.ecifDic('C001_C002')
                  const index = idArr.findIndex(item => {
                    return item.value === val.IdTyp
                  })
                  this.ResultMsg({
                    status: 'warning',
                    resultTitle: `${idArr[index]['label']} 无法核查`,
                    closeBtn: true
                  })
                } else {
                  this.form = val
                }
                console.log(val, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')*/
      }
    },
    mounted() {
      this.store = userStore.state.$_AGSCustomerInfo
      this.RegisterSavePicCallback()
      // this.RegisterStopRec()
      // this.RegisterGetBarCodeOnLine()
      // this.RegisterSavePic()
      // this.RegisterGetID()
    },
    updated() {
      this.resetFocus()
    },
    methods: {
      // 图片压缩方法
      photoCompression(imgStr) {
        return new Promise((resolve, reject) => {
          lrz('data:image/jpeg;base64,' + imgStr, {
            width: 316,
            height: 200,
            quality: 0.7
          }).then(res => {
            resolve(res.base64.substring(23, res.base64.length))
          }).catch(() => {
            resolve(imgStr)
          })
        })
      },
      async photoGraph(typ) {
        if (this.camNo === '') {
          this.$confirm('请选择摄像头', '提示', {
            confirmButtonText: '确定',
            // cancelButtonText: '取消',
            showCancelButton: false,
            showClose: false,
            type: 'warning'
          })
        } else {
          this.loading = this.$loading({
            lock: true,
            text: '正在加载摄像头...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          for (let i = 1; i <= 3; i++) {
            await this.ClearPlay(i)
          }
          // 调起人脸 识别
          CCDevGpy.GetCameraList((pho) => {
            if (pho.errorcode === '') {
              // alert(x.retval)
              //
              const callback = JSON.parse(pho.retval)
              // 遍历 拿到对应的摄像头 打开
              const callbackData = JSON.parse(callback.data)
              console.log(callbackData)
              const photoList = callbackData.list
              // 用上摄像头拍摄
              // 紫图高拍仪：
              // {"count":4,
              // "list":[
              // {"DeviceId":0,"DeviceName":"S520-3"},                     ----右 副摄像头（线可弯曲）
              // {"DeviceId":2,"DeviceName":"S520-2"},					  ----上 副摄像头（可旋转）
              // {"DeviceId":3,"DeviceName":"UDS CamScanner"}]}			  ----下 主摄像头（可升降）

              // 实达高拍仪：
              // {"count":4,
              // "list":[
              // {"DeviceId":1,"DeviceName":"USB CAM3"},					  ------左 副摄像头（线可弯曲、可插拔）
              // {"DeviceId":2,"DeviceName":"STAR ET-220"},				  ------下 主摄像头（可升降）
              // {"DeviceId":3,"DeviceName":"USB CAM2"}]}				  ------上 副摄像头（可旋转）
              photoList.forEach(item => {
                //  实达柜外清摄像头
                // if (item.DeviceName === 'Star_YL1020SK-3M' && this.form.camNo === '4') {
                //   this.photoId = item.DeviceId
                // }
                //  // 紫图高拍仪：看选择的 是哪个摄像头
                // 上 副摄像头（可旋转）
                if (item.DeviceName === 'S520-2' && this.camNo === '2') {
                  this.photoId = item.DeviceId
                }
                // 右 副摄像头（线可弯曲）
                if (item.DeviceName === 'S520-3' && this.camNo === '3') {
                  this.photoId = item.DeviceId
                }
                // 下摄像头 ----下 主摄像头（可升降）
                if (item.DeviceName === 'UDS CamScanner' && this.camNo === '1') {
                  this.photoId = item.DeviceId
                }
                // 实达 上 副摄像头（可旋转）
                if (item.DeviceName === 'USB CAM2' && this.camNo === '2') {
                  this.photoId = item.DeviceId
                  console.log('上 副摄像头可旋转')
                }
                // 实达 左副摄像头左 副摄像头（线可弯曲、可插拔）
                if (item.DeviceName === 'USB CAM3' && this.camNo === '3') {
                  this.photoId = item.DeviceId
                  console.log('实达 左副摄像头左 副摄像头（线可弯曲、可插拔）')
                }
                // 实达 下 主摄像头（可升降）
                if (item.DeviceName === 'STAR ET-220' && this.camNo === '1') {
                  this.photoId = item.DeviceId
                  console.log('实达 下 主摄像头（可升降）')
                }
              })
              //   拿到ID去打开摄像头
              if (this.photoId !== '') {
                this.facePhoto(this.photoId, typ)
              } else {
                this.loading && this.loading.close()
              }
            } else {
              this.loading && this.loading.close()
              this.$message({
                showClose: true,
                type: 'error',
                message: pho.errormsg
              })
              console.log(pho.errormsg)
            }
          })
        }
      },
      // 人脸拍照
      facePhoto(DeviceId, typ) {
        if (typ === '1') {
          this.imgBg = ''
        }
        // 柜外清的拍照
        if (this.camNo === '4') {
          this.RegisterCCDevGwq()
        }

        /* const idNu = DeviceId.toString()
                CCDevGpy.OpenLiveDetectGetBestFace({ 'cameraId': idNu }, (x) => {
                  if (x.errorcode === '') {
                    const faceback = JSON.parse(x.retval)
                    // 遍历 拿到对应的摄像头 打开
                    const faceData = JSON.parse(faceback.info)
                    // 拿到图片
                    const facePhoto = faceData.data
                    if (facePhoto !== '' && typ === '1') {
                      this.imgBg = facePhoto
                      console.log(this.imgBg)
                    }
                  } else {
                    this.$confirm(x.errormsg === 'Live detection failed!' ? '人脸检测失败,请重试' : x.errormsg, '提示', {
                      confirmButtonText: '确定',
                      // cancelButtonText: '取消',
                      showCancelButton: false,
                      showClose: false,
                      type: 'warning'
                    })
                  }
                })*/
      },
      // 摄像头恢复
      ClearPlay(num) {
        return new Promise((resolve, reject) => {
          CCDevGpy.StopPlay({ 'num': String(num) }, function(x) {
            resolve(x)
          })
        })
      },
      // 打印预览
      previewFun() {
        this.onCancelPreview(true)
      },
      // 取消打印
      onCancelPreview(bool) {
        this.PreviewVoucher = bool
      },
      // 打印
      Print() {
        this.$print('#PrintVoucherCommon')
        this.onCancelPreview(false)
      },
      // 证件类型判断
      onChangeIdTyp(val) {
        const index = this.IdTypData.findIndex(item => {
          return item.value === val
        })
        if (index < 0) {
          this.ResultMsg({
            status: 'warning',
            resultTitle: `当前证件类型无法核查`,
            closeBtn: true
          })
          this.isCanAuth = false
        } else {
          this.isCanAuth = true
        }
        if (this.form.IdTyp !== '101') {
          this.isFaceConfirm = true
          this.isShowFaceConfirm = '0'
        } else {
          this.isFaceConfirm = this.FaceRcogFlag === '1'
          this.isShowFaceConfirm = this.FaceRcogFlag === '1' ? '1' : '0'
        }
      },
      // 读取ID
      async getIdNo() {
        this.readInfo = await this.$_Read_ID()
        this.$set(this.form, 'IdTyp', this.readInfo.IdTyp)
        this.$set(this.form, 'IdNo', this.readInfo.IdNo)
        this.$set(this.form, 'CustNm', this.readInfo.CustNm)
        /* if (res.IdNo === this.form.IdNo && res.IdTyp === this.form.IdTyp && res.CustNm === this.form.CustNm) {
                } else {
                  this.ResultMsg({
                    status: 'warning',
                    title: '证件读取',
                    resultTitle: '证件号码与客户号码不一致，请重新执行',
                    closeBtn: true
                  })
                }*/
      },
      async query() {
        const option = {
          // 'TranCod': this.TranCod,
          'BankNum': this.BankNum,
          'SrvOprTyp': this.SrvOprTyp,
          'SrvInstnId': this.SrvInstnId,
          'SrvCmptId': this.SrvCmptId,
          'SrvCmptFuncCod': this.SrvCmptFuncCod
        }
        const process = await this.$_Process(clientIdentityVerification, {}, option)
        console.log(option)
      },
      tabChange(type) {
        this.tab = type
        this.$data['preventFocusSwitch'] = false
      },
      resetFocus(force) {
        if (force) this.$data['preventFocusSwitch'] = false
        if (this.$data['preventFocusSwitch']) return
        if (this.$refs.focusStart0) {
          this.$refs.focusStart0.focus()
          this.$data['preventFocusSwitch'] = true
        }
      },
      // 人工核查
      doSysOwn(formName) {
        this.FaceRcogModel = '1'
        // if (this.manualComparison === '') {
        //   this.$confirm('请选择人工比对结果', '提示', {
        //     confirmButtonText: '确定',
        //     // cancelButtonText: '取消',
        //     showCancelButton: false,
        //     showClose: false,
        //     type: 'warning'
        //   })
        //   return
        // }
        // if (this.manualComparison === '0') {
        //   this.CheckApi(formName, '1')
        // } else {
        //   this.$confirm('核查不通过', '提示', {
        //     confirmButtonText: '确定',
        //     // cancelButtonText: '取消',
        //     showCancelButton: false,
        //     showClose: false,
        //     type: 'error'
        //   })
        //   // this.closeDialog()
        // }
      },
      // 提交核查结果
      confirmIdAuth(formName) {
        if ((this.isShowFaceConfirm === '1' && this.manualComparison === '0') || this.isShowFaceConfirm === '0') {
          if (this.isCanAuth && this.sysCheckRes.res === '') {
            this.ResultMsg({
              status: 'warning',
              resultTitle: `请先进行系统核查`,
              closeBtn: true
            })
            return
          }
          // this.FaceRcogModel = '0'
          // 无法核查证件类型
          if (!this.isCanAuth) {
            this.ResultMsg({
              status: 'warning',
              resultTitle: `无法核查的证件类型，继续交易将触发本地授权`,
              closeBtn: false,
              btnGroup: [
                {
                  text: '取消',
                  type: '',
                  fun: () => {}
                },
                {
                  text: '确定',
                  type: 'primary',
                  fun: () => {
                    this.CheckApi('form', '1')
                  }
                }
              ]
            })
          } else if (this.isCanAuth && this.sysCheckRes.res === 'NMCH') {
            // 不一致，拒绝交易
            this.ResultMsg({
              status: 'error',
              resultTitle: `要素核查匹配不一致，拒绝交易`,
              closeBtn: true
            })
          } else if (this.isCanAuth && this.sysCheckRes.res === 'SYAB') {
            // 核查系统异常
            this.ResultMsg({
              status: 'warning',
              resultTitle: `核查系统异常，继续交易将触发本地授权`,
              closeBtn: false,
              btnGroup: [
                {
                  text: '取消',
                  type: '',
                  fun: () => {}
                },
                {
                  text: '确定',
                  type: 'primary',
                  fun: () => {
                    this.CheckApi('form', '1')
                  }
                }
              ]
            })
          } else {
            this.CheckApi(formName, '0')
          }
        } else {
          this.ResultMsg({
            status: 'error',
            resultTitle: `人脸识别未通过，拒绝交易`,
            closeBtn: true
          })
        }
      },
      // 跳过
      JumpCheck() {
        this.ResultMsg({
          status: 'warning',
          title: '联网核查',
          resultTitle: '跳过核查将触发本地授权，是否继续',
          closeBtn: false,
          btnGroup: [
            {
              text: '取消',
              type: '',
              fun: () => {}
            },
            {
              text: '确定',
              type: 'primary',
              fun: () => {
                this.CheckApi('form', '2', true)
              }
            }
          ]
        })
      },
      // 核查方法
      CheckApi(formName, type = '0', noValid = false) {
        // 拍照回调清空
        if (window.CCDevGpy) {
          CCDevGpy.RegisterSavePicCallback(x => {
          })
        }
        // 单独核查时，自动关闭
        if (this.onlyCheckId) {
          this.close()
          this.resolve({
            result: this.sysCheckRes.res,
            type: type
          })
          return
        }
        this.$refs[formName].validate(async valid => {
          if (noValid || valid) {
            await this.$_Process(this.api, {
              'C_NETCHKRESULT_VAL': this.sysCheckRes.res, // 结果
              'C_NETCHKRESULT_VALMODEL': type, // 类型：人工
              'C_NETCHECK_TIME': this.today, //
              'C_IDCHECK_RMK': '' // 备注
            }, {
              SrvOprTyp: 'Process',
              SrvCmptId: this.SrvCmptId,
              SrvInstnId: this.SrvInstnId,
              SrvCmptFuncCod: 'submitCustNetChkInfo'
            })
            if (this.isShowFaceConfirm === '1') {
              await this.$_Process(this.api, {
                'FaceRcogResult': this.manualComparison === '0' ? '01' : '02', // 人脸识别结果
                'FaceRcogModel': this.FaceRcogModel, // 人脸识别模式
                'IdTyp': this.form.IdTyp,
                'IdNo': this.form.IdNo,
                'CustNm': this.form.CustNm
              }, {
                SrvOprTyp: 'Process',
                SrvCmptId: this.SrvCmptId,
                SrvInstnId: this.SrvInstnId,
                SrvCmptFuncCod: 'submitFaceRcogResult'
              })
            }
            this.$_Next(this.api, {
              SrvOprTyp: 'Next',
              BAK2: 'pubbusiflow',
              SrvInstnId: this.SrvInstnId,
              SrvCmptId: this.SrvCmptId
            }).then(res => {
              this.close()
              this.resolve(res)
            }, err => {
              // 失败不关闭
              // this.close()
              this.reject(err)
            })
          }
        })
      },
      // 变更摄像头
      changeCam() {
        this.StartPlay()
      },
      // 打开摄像头
      StartPlay(type = 'live') {
        if (this.camNo === '') {
          this.$confirm('请选择摄像头', '提示', {
            confirmButtonText: '确定',
            // cancelButtonText: '取消',
            showCancelButton: false,
            showClose: false,
            type: 'warning'
          })
          return
        }
        this.type = type
        if (type === 'live') {
          // this.camNo = '4'
          if (this.camNo === '4') {
            this.photoGraph('1')
          } else {
            // this.$message({
            //   showClose: true,
            //   type: 'warning',
            //   message: '请选择4号摄像头'
            // })
            this.loading = this.$loading({
              lock: true,
              text: '正在加载摄像头...',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            })
            CCDevGpy.StartPlay({
              'num': this.camNo,
              'rotate': '0'
            }, x => {
              if (x.errorcode === '') {
                this.callbackInfo = x.retval
                setTimeout(() => {
                  CCDevGpy.ShowWindow(true)
                  this.loading && this.loading.close()
                }, 1000)
              } else {
                this.loading && this.loading.close()
                alert(x.errormsg)
              }
            })
          }
        } else {
          this.loading = this.$loading({
            lock: true,
            text: '正在加载摄像头...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          this.camNo = (this.camNo === '4' || !this.camNo) ? '1' : this.camNo
          this.callbackInfo = ''
          CCDevGpy.StartPlay({
            'num': this.camNo,
            'rotate': '0'
          }, x => {
            if (x.errorcode === '') {
              this.callbackInfo = x.retval
              setTimeout(() => {
                this.loading && this.loading.close()
                CCDevGpy.ShowWindow(true)
              }, 1000)
            } else {
              this.loading && this.loading.close()
              alert(x.errormsg)
            }
          })
        }
      },
      // 关闭摄像头
      StopPlay(num) {
        CCDevGpy.StopPlay({
          'num': num
        }, x => {
          if (x.errorcode === '') {
            /* 参数对象，num为高拍仪摄像头编号*/
            alert(x.retval)
          } else {
            alert(x.errormsg)
          }
        })
      },
      // 拍照
      SavePic(camNo) {
        if (camNo) this.camNo = camNo
        this.callbackInfo = ''
        CCDevGpy.SavePic({
          'num': this.camNo,
          'imageType': '3'
        }, x => {
          if (x.errorcode === '') {
            /*
                      * 参数对象，num为高拍仪摄像头编号,imageType为图片类型有如下: 1—BMP 11 灰度 BMP 21 黑白 BMP
                      2—GIF 12 灰度 GIF 22 黑白 GIF
                      3—JPG 13 灰度 JPG 23 黑白 JPG
                      4—PNG 14 灰度 PNG 24 黑白 PNG
                      5—TIF（黑白）51 灰度 TFI 52 彩色 TIF
                      */
            this.callbackInfo = JSON.parse(x.retval)
            if (this.camNo === '1') this.readInfo.FrontImg = JSON.parse(x.retval).picBase64
          } else {
            alert(x.errormsg)
          }
        })
      },
      // 人脸识别-对比
      async doManualCheck(formName) {
        this.loading && this.loading.close()
        this.manualCheckRes = ''
        this.$refs[formName].validate(async valid => {
          if (valid) {
            if (!this.imgBg) {
              this.$confirm('请拍摄现场照片', '提示', {
                confirmButtonText: '确定',
                // cancelButtonText: '取消',
                showCancelButton: false,
                showClose: false,
                type: 'warning'
              }).then(() => {
                return
              })
              return
            }
            if (!this.readInfo.FrontImg) {
              this.$confirm('请拍摄证件照片', '提示', {
                confirmButtonText: '确定',
                // cancelButtonText: '取消',
                showCancelButton: false,
                showClose: false,
                type: 'warning'
              })
            }
            const ScnPhotoData = await this.photoCompression(this.imgBg)
            const ChkPhotoData = await this.photoCompression(this.imgCheck)
            const IdPhotoData = await this.photoCompression(this.readInfo.FrontImg)
            const sendData = {
              ScnPhotoData: ScnPhotoData, // 现场照片
              CustNm: this.form.CustNm, // 客户名称
              IdTyp: this.form.IdTyp, // 证件种类
              IdNo: this.form.IdNo, // 证件号码
              ChkPhotoData: ChkPhotoData, // 核查照片
              IdPhotoData: IdPhotoData // 证件照片
            }
            const option = {
              'SrvOprTyp': 'Process',
              'SrvInstnId': this.SrvInstnId,
              'SrvCmptId': this.SrvCmptId,
              'SrvCmptFuncCod': 'Exec04'
            }
            const process = await this.$_Process(this.api, sendData, option).catch((process) => {
              this.comparativeRes = JSON.parse(process.responseData.body).data.RecncltnRst === '0' ? process.body.RecncltnRst : '1'
              this.manualComparison = JSON.parse(process.responseData.body).data.RecncltnRst === '0' ? process.body.RecncltnRst : '1'
            })
            this.comparativeRes = process.body.RecncltnRst === '0' ? process.body.RecncltnRst : '1'
            this.manualComparison = process.body.RecncltnRst === '0' ? process.body.RecncltnRst : '1'
            // this.manualCheckRes = process.body.RecncltnRst !== '0' ? '比对失败' : '比对成功'
          }
        })
      },
      filterSign(val) {
        const data = {
          'MCHD': 'MCHD-要素核查匹配正确',
          'NMCH': 'NMCH-要素核查匹配不一致',
          'SYAB': 'SYAB-核查系统异常'
        }
        return data[val]
      },
      // 系统核查-对比
      async doSysCheck(formName) {
        this.$refs[formName].validate(async valid => {
          if (valid) {
            const index = this.IdTypData.findIndex(item => {
              return item.value === this.form.IdTyp
            })
            if (index < 0) {
              this.ResultMsg({
                status: 'warning',
                resultTitle: `当前证件类型无法核查, 请直接确认进入交易`,
                closeBtn: true
              })
              this.isCanAuth = false
              return
            }
            const sendData = {
              SvForm: this.sysCheckType, // 业务种类
              IdTyp: this.form.IdTyp, // 证件种类
              IdNo: this.form.IdNo, // 证件号码
              ChkChnl: this.form.IdTyp === '101' ? 'PBOC' : 'NIAC',
              Naty: 'CHN', // 国籍
              CustNm: this.form.CustNm // 客户名称
            }
            // 三要素检测
            if (this.oldVal && (this.form.IdTyp !== this.oldVal.IdTyp || this.form.IdNo !== this.oldVal.IdNo || this.form.CustNm !== this.oldVal.CustNm)) {
              this.ResultMsg({
                status: 'warning',
                resultTitle: `核查证件三要素与当前账户原证件三要素不匹配`,
                closeBtn: true
              })
            }
            const option = {
              'SrvOprTyp': 'Process',
              'SrvInstnId': this.SrvInstnId,
              'SrvCmptId': this.SrvCmptId,
              'SrvCmptFuncCod': this.SrvCmptFuncCod || 'Exec03',
              '$_close_commonNode': this.onlyCheckId
            }
            const res = await this.$_Process(this.api, sendData, option)
            this.sysCheckRes.res = res.body.IdenVerfRst // 核查结果
            this.sysCheckRes.Signatory = res.body.IsueIst // 签发机关
            this.imgCheck = this.sysCheckRes.Photo = res.body.Pic // 图片
            this.VerfExcpInfo = res.body.VerfExcpInfo // 成功返回 ‘00’
            // 异常=>人工通过（后端返回要求截取4位处理）
            this.showOwnPass = this.VerfExcpInfo.slice(0, 4) === '0001'
            this.sysCheckRes.desc = res.body.VerfExcpInfo.replace(/\d/g, '')
          }
        })
      },
      // 关闭
      async closeDialog() {
        // 拍照回调清空
        if (window.CCDevGpy) {
          CCDevGpy.RegisterSavePicCallback(x => {})
        }
        // 单独核查时，自动关闭
        if (this.onlyCheckId) {
          this.close()
          this.reject(false)
          return
        }
        const pr = await this.$_Process(this.api, {}, {
          SrvOprTyp: 'Quit',
          SrvInstnId: this.SrvInstnId,
          SrvCmptId: this.SrvCmptId
        })
        this.close()
        this.reject(pr)
      },
      // 注册停止录像
      RegisterStopRec() {
        CCDevGpy.RegisterStopRecCallback(function(x) {
          if (x.errorcode === '') {
            console.log(x.retval, '停止录像')
          } else {
            alert(x.errormsg)
          }
        })
      },
      // 注册获取二维码
      RegisterGetBarCodeOnLine() {
        CCDevGpy.RegisterGetBarCodeOnLineCallback(function(x) {
          if (x.errorcode === '') {
            console.log(x.retval, '获取二维码')
          } else {
            alert(x.errormsg)
          }
        })
      },
      // 注册保存图片
      RegisterSavePic() {
        CCDevGpy.RegisterSavePicCallback(function(x) {
          if (x.errorcode === '') {
            console.log(x.retval, '保存图片')
          } else {
            alert(x.errormsg)
          }
        })
      },
      // 注册获取身份证
      RegisterGetID() {
        CCDevGpy.GetIdCardInfo({
          'timeout': '60',
          'flag': '0'
        }, x => {
          if (x.errorcode === '') {
            console.log(x.retval, '身份证')
          } else {
            alert(x.errormsg)
          }
        })
      },
      // 注册拍照
      RegisterSavePicCallback() {
        CCDevGpy.RegisterSavePicCallback(x => {
          if (x.errorcode === '') {
            const callbackInfo = JSON.parse(x.retval)
            if (this.type === 'live') {
              this.imgBg = callbackInfo.picBase64
            } else {
              this.$set(this.readInfo, 'FrontImg', callbackInfo.picBase64)
            }
            CCDevGpy.ShowWindow(false)
            if (this.imgBg && this.readInfo.FrontImg) {
              this.doManualCheck('form')
            }
            /* if (this.camNo === '1') {
                        this.imgBg = 'data:image/jpeg;base64,' + callbackInfo.picBase64
                        CCDevGpy.ShowWindow(false)
                      } else if (this.camNo === '2') {
                        this.imgBg = 'data:image/jpeg;base64,' + callbackInfo.picBase64
                        CCDevGpy.ShowWindow(false)
                      }*/
            this.resetFocus(true)
          } else {
            alert(x.errormsg)
          }
        })
      },
      RegisterCCDevGwq() {
        CCDevGwq.RegisterSavePicCallback((x) => {
          console.log(x)
          const callback = JSON.parse(x.retval)
          // 如果照片存在，直接取 不存在，不用问
          if (callback.picBase64) {
            // 现场照片
            this.imgBg = callback.picBase64
            CCDevGwq.ShowWindow(false)
            if (this.imgBg && this.readInfo.FrontImg) {
              this.doManualCheck('form')
            }
          }
        })
        // 注册完，调拍照
        this.GwqPhoto()
      },
      GwqPhoto() {
        CCDevGwq.StartPlay(x => {
          setTimeout(() => {
            this.loading && this.loading.close()
            CCDevGwq.ShowWindow(true)
          }, 1000)
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "_li/common/index.scss";
  // 可在此区域自定义样式
  .popup-container/deep/ {
    .el-form {
      margin: 0;
    }
    .svg-idBg {
      width: 100%;
      height: 40px;
      margin-top:70px;
    }
    .el-dialog{
      /*宽度设置、默认950*/
      /*width: 1000px;*/
      /*height: 883px;*/
      .el-dialog__body {
        padding: 10px;
      }
      .IdAuthButton{
        display: block;
        text-align: center;
        .el-button{
          float: none;
        }
      }
      .AuthInfo{
        display: flex;
        .AuthInfoContent{
          width: 50%;
          display: flex;
          flex-direction: column;
        }
        .AuthInfoImg{
          width: 50%;
          text-align: center;
        }
      }
      .check-container{
        width: 960px;
        height: auto;
        border: 1px solid #DCDFE6;

        >.tabs{
          padding-top: 10px;
          background: #F5F5F5;
          font-size: 0;
          cursor: pointer;
          .tab{
            font-size: 14px;
            color: rgba(0,0,0,0.65);
            background: #E5E7E8;
            border-radius: 6px 6px 0 0;
            display: inline-block;
            width: 120px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            &.active{
              background: #FFFFFF;
            }
          }
        }
        >.content{
          position: relative;
          margin: 10px;
          >.title{
            font-size: 16px;
            color: rgba(0,0,0,0.65);
            line-height: 20px;
            margin-bottom: 10px;
            font-weight: 700;
          }
          >.center{
            background: #F5F5F5;
            border: 1px solid #D9D9D9;
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            .items{
              /*flex: 1 1 auto;*/
              width: 430px;
              display: flex;
              justify-content: space-between;
              flex-direction: column;
              padding: 15px;
              &.res{
                justify-content: start;
                .item{
                  margin-bottom: 14px;
                }
              }
              .item{
                font-size: 0;
                &>label{
                  font-size: 14px;
                  color: rgba(0,0,0,0.45);
                  width: 60px;
                  display: inline-block;
                }
                &>span{
                  font-size: 14px;
                  color: rgba(0,0,0,0.65);
                  width: 340px;
                  display: inline-block;
                  text-align: right;
                }
              }
            }
            .img{
              width: 156px;
              height: 180px;
              background: #F5F5F5;
              border: 1px solid #D9D9D9;
              flex: 0 0 auto;
              margin: -1px;
              border-radius: 6px;
              img{
                width: 100%;
                height: 100%;
              }
            }
          }
          >.btns{
            &.border{
              margin: 0 -10px 10px;
              padding: 10px;
              border-bottom: 1px solid #E9E9E9;
            }
            &>label{
              font-size: 14px;
              color: rgba(0,0,0,0.65);
              margin-right: 6px;
            }
            &>.el-select{
              width: 240px;
            }
          }
          >.camera{
            display: flex;
            margin-top: 10px;
            img{
              width: 100%;
              height: 100%;
            }
            .cam{
              background: #F5F5F5;
              border: 1px solid #D9D9D9;
              width: 400px;
              height: 400px;
              flex: 0 0 auto;
            }
            .cambtn{
              width: 178px;
              height: 100%;
              flex: 0 0 auto;
              .item{
                width: 100px;
                height: 40px;
                display: inline-block;
                background: #EEEEEE;
                border: 1px solid #D9D9D9;
                border-radius: 6px;
                margin: 80px 39px;
                text-align: center;
                line-height: 38px;
                font-size: 14px;
                color: rgba(0,0,0,0.65);
                cursor: pointer;
              }
            }
            .campho{
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              .item{
                position: relative;
                .el-button{
                  position: absolute;
                  bottom: 0;
                  right: 0;
                }
                .title{
                  font-size: 14px;
                  color: rgba(0,0,0,0.65);
                  margin: 14px 0 10px;
                }
                .pho{
                  width: 160px;
                  height: 160px;
                  background: #F5F5F5;
                  border: 1px solid #D9D9D9;
                }
              }
            }
          }
          >.res{
            border-top: 1px solid #E9E9E9;
            display: flex;
            margin: 10px -10px -10px;
            padding: 10px;
            justify-content: space-between;
            .title{
              line-height: 40px;
              font-size: 16px;
              color: rgba(0,0,0,0.65);
              & span:first-child{
                color: rgba(0,0,0,0.85);
                margin-right: 18px;
              }
            }
          }
          @at-root .img-list {
            display: flex;
            justify-content: space-between;
            .img-item {
              width: 430px;
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              align-items: center;
              padding: 15px;
            }
            .img-pho {
              cursor: pointer;
              width: 156px;
              height: 180px;
              background: #f5f5f5;
              border: 1px solid #D9D9D9;
              flex: 0 0 auto;
              margin: 10px 0;
              border-radius: 6px;
              font-size: 0;
              img{
                width: 100%;
                height: 100%;
              }
            }
            .img-Id-pho {
              width: 270px;
              height: 180px;
            }
            .img-exec {
              margin-top: 10px;
              width: 100px;
              height: 40px;
              display: inline-block;
              background: #EEEEEE;
              border: 1px solid #D9D9D9;
              border-radius: 6px;
              text-align: center;
              line-height: 38px;
              font-size: 14px;
              color: rgba(0,0,0,0.65);
              cursor: pointer;
              &:focus,
              &:hover {
                color: #fff;
                background: #D90A1A;
              }
            }
          }
          .item-compare {
            position: absolute;
            bottom: 85px;
            right: 0;
          }
        }
      }

      .el-dialog__footer {
        height: 50px;
        padding: 0 10px 10px;
        border: none;
        text-align: left;
        .fl-right{
          float: right;
        }
      }
    }
  }
  .PrintVoucher {
    width: 100%;
    background: #fff;
    h1 {
      text-align: center;
    }
    .Print_wrap {
      display: flex;
      font-size: 14px;
      .photo {
        margin-top: 40px;
        width: 100px;
        img {
          width: 100%;
          display: inline-block;
        }
      }
      .Print_Box {
        padding-left: 20px;
        flex: 1;
      }
      .list {
        margin: 20px 0;
        display: flex;
        .item {
          width: 50%;
          display: flex;
        }
        .label {
          width: 5em;
          text-align: justify;
          &:after {
            display: inline-block;
            width: 100%;
            content: '';
          }
        }
        .content {
          flex: 1;
        }
      }
    }
  }
  .dialog-footer {
    text-align: center;
  }
</style>

<!--用法指导

  import { IdAuth } from "component";
  IdAuth({
    info: this.userInfo,  //身份信息
    mode: 'all' // system,manual,all  系统模式
  }, function (res) {
    console.log(res)
  })

-->
