import request from "@/utils/request";

export function list() {
  return request({
    url: "/api/demo/admin/sums/index",
    method: "post"
  });
}
export function lastlist() {
  return request({
    url: "/api/demo/admin/sums/typesAndPostStatistics",
    method: "get"
  });
}

// 表格方式获取用户信息
export function getMainData() {
  return request({
    url: "/api/demo/admin/sums/typesAndPostStatisticsReport",
    method: "get"
  });
}
