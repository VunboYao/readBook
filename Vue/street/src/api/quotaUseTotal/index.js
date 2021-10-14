import request from '@/utils/request'

// 数据字典
export function DictGet() {
  return request({
    url: '/api/demo/admin/sysDict/lists',
    method: 'get'
  })
}

// 回去汇总额度数据
export function GetTotal() {
  return request({
    url: '/api/demo/admin/postUseInfo/query',
    method: 'get'
  })
}

// 招考简章汇总
export function BriefUseTotal(pages, nums) {
  return request({
    url: `/api/demo/admin/postUseInfo/queryDetial?pages=${pages}&nums=${nums}`,
    method: 'get'
  })
}
