import request from '@/utils/request'
export function edit2(id) {
  return request({
    url: "/api/demo/admin/staffs/edit2",
    method: "post",
    id
  });
}
export function list() {
  return request({
    url: "/api/demo/admin/staffs/lists",
    method: "post"
  });
}
export function shegonglist() {
  return request({
    url: "/api/demo/admin/syspost/lists",
    method: "post"
  });
}
