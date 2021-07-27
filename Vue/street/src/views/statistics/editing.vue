<template>
  <div>
    <div class="alltitle">在岗社区工作者信息</div>
    <div class="vue_content">
      <div class="table_toolbar">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-button type="primary" @click="dialogVisible = true">筛选</el-button>
          </el-col>
        </el-row>
        <!-- 选择器 -->
        <div class="table_toolbar_view" />
      </div>
      <p class="mb-10">在{{ pageFirstTotalNums }}条记录中找到{{ page.total }}个</p>
      <commonTable
        :columns="columns"
        :data="tableData"
        :pager="page"
        row-class-name="cursorRow"
        @handleCurrentChange="changepage"
        @handleSizeChange="changesize"
        @row-click="rowClick"
      >
        <!-- <el-table-column
          slot="table_oper"
          align="center"
          label="操作"
          width="150"
          :resizable="false"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="editTableData(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="removeTableData(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column> -->
      </commonTable>
      <!-- 人员信息表 -->
      <el-dialog
        title="人员信息表"
        :visible.sync="modifyVisible"
        width="80%"
        top="0"
        center
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <div class="modify-wrap">
          <table border="1" cellspacing="0" cellpadding="0" width="100%" class="cl-table">
            <tr class="head-col">
              <td>姓名</td>
              <td>
                <el-input v-model="modifyForm.user_name" clearable type="text" />
              </td>
              <td>性别</td>
              <td>
                <el-select
                  v-model="modifyForm.sex"
                  clearable
                  filterable
                >
                  <el-option value="男" label="男" />
                  <el-option value="女" label="女" />
                </el-select>
              </td>
              <td>民族</td>
              <td><el-input v-model="modifyForm.minzu" clearable type="text" /></td>
              <td rowspan="4" colspan="2">
                <img class="user-avatar" src="./../../assets/image/index/user.png" alt="avatar">
              </td>
            </tr>
            <tr>
              <td>出生年月</td>
              <td>
                <el-date-picker
                  v-model="modifyForm.chushengnianyue"
                  type="date"
                  placeholder="选择日期"
                />
              </td>
              <td>籍贯</td>
              <td>
                <el-input v-model="modifyForm.jiguan" clearable type="text" />
              </td>
              <td>出生地</td>
              <td>
                <el-input v-model="modifyForm.chushengdi" clearable type="text" />
              </td>
            </tr>
            <tr>
              <td>入职年月</td>
              <td>
                <el-date-picker
                  v-model="modifyForm.add_date"
                  format="yyyy-MM"
                  value-format="yyyyMM"
                  type="month"
                  placeholder="选择日期"
                />
              </td>
              <td>政治面貌</td>
              <td>
                <el-input v-model="modifyForm.zhengzhimianmao" clearable type="text" />
              </td>
              <td>入党时间</td>
              <td>
                <el-date-picker
                  v-model="modifyForm.rudang_date"
                  type="date"
                  placeholder="选择日期"
                />
              </td>
            </tr>
            <tr>
              <td>所属街道</td>
              <td colspan="1">
                <el-input v-model="modifyForm.street" clearable type="text" />
              </td>
              <td>工作部门</td>
              <td colspan="3">
                <el-input v-model="modifyForm.shijigongzuobumen" clearable type="text" />
              </td>
            </tr>
            <tr>
              <td>岗位类别</td>
              <td>
                <el-select
                  v-model="modifyForm.zaibiangangweileibie"
                  filterable
                  clearable
                >
                  <el-option
                    label="街道各中心社区工作者：受理中心工作人员"
                    value="街道各中心社区工作者：受理中心工作人员"
                  />
                  <el-option
                    label="街道各中心社区工作者：其它中心工作人员"
                    value="街道各中心社区工作者：其它中心工作人员"
                  />
                  <el-option
                    label="居民区社区工作者：聘任制居委干部"
                    value="居民区社区工作者：聘任制居委干部"
                  />
                  <el-option
                    label="居民区社区工作者：选任制居委干部/党组织班子成员"
                    value="居民区社区工作者：选任制居委干部/党组织班子成员"
                  />
                  <el-option
                    label="专职党群工作者：“两新”组织专职党群工作者"
                    value="专职党群工作者：“两新”组织专职党群工作者"
                  />
                  <el-option
                    label="专职党群工作者：居民区党组织副书记"
                    value="专职党群工作者：居民区党组织副书记"
                  />
                  <el-option
                    label="专职党群工作者：其他居民区专职党务工作者"
                    value="专职党群工作者：其他居民区专职党务工作者"
                  />
                </el-select>
              </td>
              <td>岗位等级</td>
              <td>
                <el-select
                  v-model="modifyForm.gangweidengji"
                  filterable
                  clearable
                >
                  <el-option
                    v-for="(item, idx) in gw_list"
                    :key="idx"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </td>
              <td>岗位层次</td>
              <td colspan="3">
                <el-select
                  v-model="modifyForm.gangweicengci"
                  filterable
                  clearable
                >
                  <el-option label="工作人员" value="工作人员" />
                  <el-option label="主管" value="主管" />
                  <el-option label="负责人" value="负责人" />
                </el-select>
              </td>
            </tr>
            <tr>
              <td>人员经费</td>
              <td>
                <el-input v-model="modifyForm.money" placeholder="" type="text" />
              </td>
              <td colspan="2">是否调整过人员编制类别</td>
              <td colspan="4">
                <el-select v-model="modifyForm.is_edit">
                  <el-option label="是" value="是" />
                  <el-option label="否" value="否" />
                </el-select>
              </td>
            </tr>
            <tr>
              <td>身份证号码</td>
              <td colspan="3">
                <el-input v-model="modifyForm.user_id" placeholder="" type="text" />
              </td>
              <td>专业水平</td>
              <td colspan="3">
                <el-input v-model="modifyForm.zhuanyeshuipin" placeholder="" type="text" />
              </td>
            </tr>
            <tr>
              <td colspan="1" rowspan="2">学历学位</td>
              <td>全日制教育</td>
              <td colspan="2">
                <el-input v-model="modifyForm.xueli_quanrizhi" placeholder="" type="textarea" />
              </td>
              <td>毕业院校及专业</td>
              <td colspan="3">
                <el-input v-model="modifyForm.biyeyuanxiao" placeholder="" type="textarea" />
              </td>
            </tr>
            <tr>
              <td>在职教育</td>
              <td colspan="2">
                <el-input v-model="modifyForm.xueli_zaizhi" placeholder="" type="textarea" />
              </td>
              <td>毕业院校及专业</td>
              <td colspan="3">
                <el-input v-model="modifyForm.biyeyuanxiao_zaizhi" placeholder="" type="textarea" />
              </td>
            </tr>
            <tr><td colspan="8"><p>社会工作者职业水平证书</p></td></tr>
            <tr>
              <td colspan="1">
                本人简历（自高中起）
              </td>
              <td colspan="7">
                <el-input v-model="modifyForm.jianli" placeholder="" type="textarea" />
              </td>
            </tr>
            <tr>
              <td colspan="1">
                奖惩情况
              </td>
              <td colspan="7">
                <el-input v-model="modifyForm.jiangfaqingkuang" placeholder="" type="textarea" />
              </td>
            </tr>
            <tr>
              <td colspan="1">
                历年考核情况
              </td>
              <td colspan="7">
                <el-input v-model="modifyForm.kaoheqingkong" placeholder="" type="textarea" />
              </td>
            </tr>
            <tr>
              <td colspan="1" rowspan="5">
                家庭主要成员情况
              </td>
              <td>
                称谓
              </td>
              <td>姓名</td>
              <td>出生年月</td>
              <td colspan="3">工作（学习）单位及职务</td>
              <td>政治面貌</td>
            </tr>
            <tr>
              <td>
                <el-input
                  v-model="modifyForm.staffs_type_familys[0]['relationtitle']"
                  type="text"
                />
              </td>
              <td> <el-input v-model="modifyForm.staffs_type_familys[0]['user_name']" type="text" /></td>
              <td><el-date-picker
                v-model="modifyForm.staffs_type_familys[0]['birth_date']"
                type="date"
                placeholder="选择日期"
              /></td>
              <td colspan="3">
                <el-input
                  v-model="modifyForm.staffs_type_familys[0]['place']"
                  type="textarea"
                /></td>
              <td><el-input
                v-model="modifyForm.staffs_type_familys[0]['zhengzhimianmao']"
                type="text"
              /></td>
            </tr>
            <tr>
              <td>
                <el-input
                  v-model="modifyForm.staffs_type_familys[1]['relationtitle']"
                  type="text"
                />
              </td>
              <td> <el-input v-model="modifyForm.staffs_type_familys[1]['user_name']" type="text" /></td>
              <td><el-date-picker
                v-model="modifyForm.staffs_type_familys[1]['birth_date']"
                type="date"
                placeholder="选择日期"
              /></td>
              <td colspan="3">
                <el-input
                  v-model="modifyForm.staffs_type_familys[1]['place']"
                  type="textarea"
                /></td>
              <td><el-input
                v-model="modifyForm.staffs_type_familys[1]['zhengzhimianmao']"
                type="text"
              /></td>
            </tr>
            <tr>
              <td>
                <el-input
                  v-model="modifyForm.staffs_type_familys[2]['relationtitle']"
                  type="text"
                />
              </td>
              <td> <el-input v-model="modifyForm.staffs_type_familys[2]['user_name']" type="text" /></td>
              <td><el-date-picker
                v-model="modifyForm.staffs_type_familys[2]['birth_date']"
                type="date"
                placeholder="选择日期"
              /></td>
              <td colspan="3">
                <el-input
                  v-model="modifyForm.staffs_type_familys[2]['place']"
                  type="textarea"
                /></td>
              <td><el-input
                v-model="modifyForm.staffs_type_familys[2]['zhengzhimianmao']"
                type="text"
              /></td>
            </tr>
            <tr>
              <td>
                <el-input
                  v-model="modifyForm.staffs_type_familys[3]['relationtitle']"
                  type="text"
                />
              </td>
              <td> <el-input v-model="modifyForm.staffs_type_familys[3]['user_name']" type="text" /></td>
              <td><el-date-picker
                v-model="modifyForm.staffs_type_familys[3]['birth_date']"
                type="date"
                placeholder="选择日期"
              /></td>
              <td colspan="3">
                <el-input
                  v-model="modifyForm.staffs_type_familys[3]['place']"
                  type="textarea"
                /></td>
              <td><el-input
                v-model="modifyForm.staffs_type_familys[3]['zhengzhimianmao']"
                type="text"
              /></td>
            </tr>
            <tr>
              <td colspan="1" rowspan="4">
                其他信息
              </td>
              <td colspan="1">户籍所在地</td>
              <td colspan="6">
                <el-input v-model="modifyForm.other_huji" placeholder="" type="textarea" />
              </td>
            </tr>
            <tr>
              <td colspan="1">家庭住址：</td>
              <td colspan="6">
                <el-input v-model="modifyForm.other_family_place" placeholder="" type="textarea" />
              </td>
            </tr>
            <tr>
              <td colspan="1">家庭电话：</td>
              <td colspan="6">
                <el-input v-model="modifyForm.other_phone" placeholder="" type="textarea" />
              </td>
            </tr>
            <tr>
              <td colspan="1">手机号码：</td>
              <td colspan="6">
                <el-input v-model="modifyForm.other_mobile" placeholder="" type="textarea" />
              </td>
            </tr>
          </table>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="warning" @click="quitDialog = true">人员退出</el-button>
          <el-button @click="modifyVisible = false">取 消</el-button>
          <el-button type="primary" @click="userInfoModify">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 筛选条件 -->
      <el-dialog
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        title="筛选条件"
        :visible.sync="dialogVisible"
        width="70%"
        center
      >
        <el-form
          ref="form"
          :model="form"
          label-width="120px"
          inline
        >
          <el-form-item label="姓名">
            <el-select
              v-model="form.user_name"
              filterable
              clearable
              multiple
              placeholder="请选择用户姓名"
            >
              <el-option
                v-for="(item, idx) in nameList"
                :key="idx"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="选择街道">
            <el-select
              v-model="form.streetSub"
              multiple
              placeholder="请选择"
            >
              <el-option
                v-for="(item, idx) in bm_list"
                :key="idx"
                :label="item.name_street"
                :value="item.name_street"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="选择性别">
            <el-select v-model="form.sex" placeholder="请选择">
              <el-option label="男" value="男" />
              <el-option label="女" value="女" />
            </el-select>
          </el-form-item>
          <el-form-item label="起始年龄">
            <!-- <el-input v-model="form.age" placeholder="请输入年龄"></el-input> -->
            <el-select v-model="form.age1" placeholder="请选择年龄">
              <el-option
                v-for="(item, idx) in age_list"
                :key="idx"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="结束年龄">
            <!-- <el-input v-model="form.age" placeholder="请输入年龄"></el-input> -->
            <el-select v-model="form.age2" placeholder="请选择年龄">
              <el-option
                v-for="(item, idx) in age_list"
                :key="idx"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="政治面貌">
            <el-select
              v-model="form.zhengzhimianmao"
              placeholder="请选择政治面貌"
              filterable
              multiple
            >
              <el-option label="中共党员" value="中共党员" />
              <el-option label="共青团员" value="共青团员" />
              <el-option label="群众" value="群众" />
              <el-option label="中共预备党员" value="中共预备党员" />
              <el-option label="民主党派" value="民主党派" />
              <el-option label="无党派人士" value="无党派人士" />
            </el-select>
          </el-form-item>
          <el-form-item label="学历">
            <el-select
              v-model="form.zuigaoxveli"
              filterable
              multiple
              placeholder="请选择学历"
            >
              <el-option label="大专以下" value="大专以下" />
              <el-option label="大专" value="大专" />
              <el-option label="本科" value="本科" />
              <el-option label="研究生" value="研究生" />
            </el-select>
          </el-form-item>
          <el-form-item label="岗位类别">
            <el-select
              v-model="form.zaibiangangweileibie"
              filterable
              multiple
              placeholder="请选择岗位类别"
            >
              <el-option
                label="街道各中心社区工作者：受理中心工作人员"
                value="街道各中心社区工作者：受理中心工作人员"
              />
              <el-option
                label="街道各中心社区工作者：其它中心工作人员"
                value="街道各中心社区工作者：其它中心工作人员"
              />
              <el-option
                label="居民区社区工作者：聘任制居委干部"
                value="居民区社区工作者：聘任制居委干部"
              />
              <el-option
                label="居民区社区工作者：选任制居委干部/党组织班子成员"
                value="居民区社区工作者：选任制居委干部/党组织班子成员"
              />
              <el-option
                label="专职党群工作者：“两新”组织专职党群工作者"
                value="专职党群工作者：“两新”组织专职党群工作者"
              />
              <el-option
                label="专职党群工作者：居民区党组织副书记"
                value="专职党群工作者：居民区党组织副书记"
              />
              <el-option
                label="专职党群工作者：其他居民区专职党务工作者"
                value="专职党群工作者：其他居民区专职党务工作者"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="岗位层次">
            <el-select
              v-model="form.gangweicengci"
              filterable
              multiple
              placeholder="请选择岗位层次"
            >
              <el-option label="工作人员" value="工作人员" />
              <el-option label="主管" value="主管" />
              <el-option label="负责人" value="负责人" />
            </el-select>
          </el-form-item>
          <el-form-item label="岗位等级">
            <el-select
              v-model="form.gangweidengji"
              filterable
              multiple
              placeholder="请选择岗位等级"
            >
              <el-option
                v-for="(item, idx) in gw_list"
                :key="idx"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="工作部门">
            <el-select
              v-model="form.shijigongzuobumen"
              filterable
              multiple
              placeholder="请选择工作部门"
            >
              <el-option label="居民区" value="居民区" />
              <el-option label="党政办公室" value="党政办公室" />
              <el-option
                label="社区党建办公室（群团组织、人大统战）"
                value="社区党建办公室（群团组织、人大统战）"
              />
              <el-option label="社区管理办公室" value="社区管理办公室" />
              <el-option label="社区服务办公室" value="社区服务办公室" />
              <el-option
                label="社区平安办公室（信访办公室）"
                value="社区平安办公室（信访办公室）"
              />
              <el-option label="社区自治办公室" value="社区自治办公室" />
              <el-option
                label="社区优化营商办公室"
                value="社区优化营商办公室"
              />
              <el-option
                label="社区宣传文化办公室"
                value="社区宣传文化办公室"
              />
              <el-option label="街道监察办公室" value="街道监察办公室" />
              <el-option
                label="社区事务受理服务中心"
                value="社区事务受理服务中心"
              />
              <el-option
                label="城市网格化综合管理中心"
                value="城市网格化综合管理中心"
              />
              <el-option label="社区党建服务中心" value="社区党建服务中心" />
              <el-option
                label="街道房屋管理办公室"
                value="街道房屋管理办公室"
              />
              <el-option
                label="街道绿化市容管理事务中心"
                value="街道绿化市容管理事务中心"
              />
              <el-option label="街道城管执法中队" value="街道城管执法中队" />
              <el-option label="街道司法所" value="街道司法所" />
              <el-option label="其他" value="其他" />
            </el-select>
          </el-form-item>
          <el-form-item label="是否曾调整过人员编制类别">
            <el-select v-model="form.is_edit">
              <el-option label="是" value="是" />
              <el-option label="否" value="否" />
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSearch(1)">查询</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="人员解聘"
        :visible.sync="quitDialog"
        center
        width="40%"
        top="30vh"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <el-form
          ref="form"
          :model="quitForm"
          label-width="120px"
        >
          <el-form-item label="日期">
            <el-date-picker
              v-model="quitForm.quit_date"
              type="date"
              placeholder="选择日期"
              value-format="yyyyMMdd"
            />
          </el-form-item>
          <el-form-item label="理由">
            <el-input v-model="quitForm.quit_remark" placeholder="" type="textarea" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="onCancelQuit">取消</el-button>
          <el-button type="primary" @click="onQuit">确定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { bm_list, selectlist, userDetail, userInfoModify, userQuit } from '@/api/statistics/editing'

export default {
  name: 'Current',
  components: {},
  data() {
    return {
      // 人员信息表
      modifyVisible: false,
      text: '所有区',
      columns: [
        { type: 'index', label: '序号' },
        { prop: 'street', label: '街道' },
        { prop: 'user_name', label: '姓名' },
        { prop: 'sex', label: '性別' },
        { prop: 'age', label: '年龄' },
        { prop: 'user_id', label: '身份证号', width: 300 },
        { prop: 'zhengzhimianmao', label: '政治面貌' },
        { prop: 'zuigaoxveli', label: '最高学历' },
        { prop: 'biyeyuanxiao', label: '毕业院校', width: 300 },
        { prop: 'is_type', label: '是否全日制', width: 200 },
        { prop: 'zhaolupici', label: '招录批次/选任类别', width: 200 },
        { prop: 'add_date', label: '入职年月' },
        { prop: 'zaibiangangweileibie', label: '在编岗位类别', width: 400 },
        { prop: 'gangweicengci', label: '岗位层次' },
        { prop: 'gangweidengji', label: '岗位等级' },
        { prop: 'shijigongzuobumen', label: '实际工作部门', width: 200 },
        { prop: 'zhengshu1', label: '社会工作者职业水平证书情况', width: 300 },
        { prop: 'money', label: '人员经费预算(元/年)', width: 300 },
        { prop: 'is_edit', label: '是否曾调整过人员编制类别', width: 300 },
        { prop: 'comm', label: '备注1', width: 200 },
        { prop: 'comm2', label: '备注2', width: 200 }

        // { prop: "is_set", label: "3-5月离职情况" },
      ],
      tableData: [],
      pageFirstTotalNums: 0, // 页面初始化的总数量
      page: {
        hide: true,
        pageNo: 1,
        limit: 60,
        sizes: [60],
        total: 0
      },
      // 人员辞退
      quitForm: {
        id: '',
        quit_date: '',
        quit_remark: ''
      },
      quitDialog: false,
      nameList: [],
      modifyForm: {
        id: '',
        street: '',
        sex: '',
        desc: '',
        user_name: '',
        user_id: '',
        zhengzhimianmao: '',
        zuigaoxveli: '',
        biyeyuanxiao: '',
        is_type: '',
        add_date: '',
        zhaolupici: '',
        zaibiangangweileibie: '',
        gangweicengci: '',
        gangweidengji: '',
        shijigongzuobumen: '',
        zhengshu1: '',
        money: '',
        is_edit: '',
        comm: '',
        comm2: '',
        age: '',
        is_set: '1',
        gmt_modified: '',
        gmt_create: '',
        start: '',
        end: '',
        applicationId: '',
        pages: '',
        sums: '',
        minzu: '',
        chushengnianyue: '',
        jiguan: '',
        chushengdi: '',
        rudang_date: '',
        zhuanyeshuipin: '',
        xueli_quanrizhi: '',
        xuewei_quanrizhi: '',
        biyeyuanxiao_quanrizhi: '',
        zhuanye_quanrizhi: '',
        xueli_zaizhi: '',
        xuewei_zaizhi: '',
        biyeyuanxiao_zaizhi: '',
        zhuanye_zaizhi: '',
        jianli: '',
        jiangfaqingkuang: '',
        kaoheqingkong: '',
        other: '',
        staffs_type_familys: [{
          staffs_type_id: 1,
          relationtitle: '',
          user_name: '',
          birth_date: '',
          place: '',
          zhengzhimianmao: ''
        },
        {
          staffs_type_id: 2,
          relationtitle: '',
          user_name: '',
          birth_date: '',
          place: '',
          zhengzhimianmao: ''
        },
        {
          staffs_type_id: 3,
          relationtitle: '',
          user_name: '',
          birth_date: '',
          place: '',
          zhengzhimianmao: ''
        },
        {
          staffs_type_id: 4,
          relationtitle: '',
          user_name: '',
          birth_date: '',
          place: '',
          zhengzhimianmao: ''
        }],
        other_huji: '',
        other_family_place: '',
        other_phone: '',
        other_mobile: '',
        agemin: '',
        agemax: '',
        streetlist: ''
      },
      // 街道列表
      dialogVisible: false,
      form: {
        street: '',
        streetSub: [],
        sex: null,
        age: '',
        age1: null,
        age2: '',
        zhengzhimianmao: null,
        staffs_types: null,
        user_name: null,
        user_id: null,
        biyeyuanxiao: null,
        is_type: null,
        add_date: null,
        zhaolupici: null,
        zaibiangangweileibie: null,
        gangweicengci: null,
        gangweidengji: null,
        shijigongzuobumen: null,
        zhengshu1: null,
        money: null,
        is_edit: null,
        comm: null,
        comm2: null
      },
      bm_list: [],
      age_list: [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65],
      gw_list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
      fileTemp: null
    }
  },
  mounted() {
    this.onSearch(1, true)
    bm_list().then((res) => {
      this.bm_list = res.data
    })
  },
  methods: {
    onCancelQuit() {
      this.quitDialog = false
      this.$set(this.quitForm, 'quit_date', '')
      this.$set(this.quitForm, 'quit_remark', '')
    },
    // 人员解聘接口
    onQuit() {
      this.quitForm.id = this.modifyForm.id
      userQuit(this.quitForm).then(res => {
        this.$message({
          type: 'success',
          message: res.data
        })
        this.quitDialog = false
        this.modifyVisible = false
        this.$set(this.quitForm, 'quit_date', '')
        this.$set(this.quitForm, 'quit_remark', '')
        this.onSearch(1, true)
      })
    },
    rowDblclick({ row, column }) {
      userDetail({
        id: row.id
      }).then(res => {
        console.log(res, '岗位相信信息')
      })
      this.modifyVisible = true
    },
    rowClick({ row, column }) {
      userDetail({
        id: row.id
      }).then(res => {
        console.log(res.data.family, 'family')
        if (!res.data.staffs_type_familys) {
          res.data.staffs_type_familys = [
            {
              staffs_type_id: 1,
              relationtitle: '',
              user_name: '',
              birth_date: '',
              place: '',
              zhengzhimianmao: ''
            },
            {
              staffs_type_id: 2,
              relationtitle: '',
              user_name: '',
              birth_date: '',
              place: '',
              zhengzhimianmao: ''
            },
            {
              staffs_type_id: 3,
              relationtitle: '',
              user_name: '',
              birth_date: '',
              place: '',
              zhengzhimianmao: ''
            },
            {
              staffs_type_id: 4,
              relationtitle: '',
              user_name: '',
              birth_date: '',
              place: '',
              zhengzhimianmao: ''
            }]
        }
        this.modifyForm = res.data
        if (res.data.family) {
          this.$set(this.modifyForm, 'staffs_type_familys', JSON.parse(res.data.family))
        }
        this.modifyVisible = true
      })
    },
    // 筛选
    onSearch(page, first = false) {
      this.text = this.form.street
      if (this.form.age2) {
        this.form.age = this.form.age1 + '-' + this.form.age2
      }
      this.form.streetSub && this.form.streetSub.forEach(item => {
        this.form.street = this.form.street ? this.form.street + '-' + item : item
      })
      // 分页处理
      this.form.pages = page
      this.form.sums = this.page.limit
      this.form.pageNo = this.page.pageNo
      // 数据查询
      selectlist(this.form).then((res) => {
        this.tableData = res.data
        this.dialogVisible = false
        this.page.total = res.amx_sum
        // 暂存总数
        if (first) {
          this.pageFirstTotalNums = this.page.total
        }
        this.$set(this.form, 'street', '')
        this.$set(this.form, 'age', '')
        this.tableData && this.tableData.forEach(item => {
          this.nameList.push({
            value: item.user_name,
            label: item.user_name
          })
        })
      }).catch(() => {
        this.$set(this.form, 'street', '')
        this.$set(this.form, 'age', '')
      })
    },
    changepage(e) {
      this.page.pageNo = e
      // list(this.page.pageNo, this.page.limit).then((res) => {
      //   this.tableData = res.data
      // })
      this.onSearch(e)
    },
    changesize(e) {
      this.page.limit = e
      this.page.pageNo = 1
      this.onSearch(e)
      // list(this.page.pageNo, this.page.limit).then((res) => {
      //   this.tableData = res.data
      // })
    },
    // 简历修改确认
    userInfoModify() {
      userInfoModify(this.modifyForm).then(res => {
        this.modifyVisible = false
        this.$message({
          type: 'success',
          message: '简历修改成功'
        })
      })
    }
  }
}
</script>

<style lang="scss">
.modify-wrap {
  width: 80%;
  margin: 0 auto;
}
table tr td {
  padding: 8px;
}
.head-col {
  td {
    width: 180px;
  }
  td:first-child{
    width: 120px;
  }
  td:last-child {
    text-align: center;
  }
}
.user-avatar {
  width: 180px;
  height: auto;
  border-radius: 4px;
}
.mb-10 {
  margin-bottom: 10px;
}
.cursorRow {
  cursor: pointer;
}
</style>
