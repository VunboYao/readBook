import request from '@/utils/request'
export function addWorker(data) {
  return request({
    url: "/api/demo/admin/staffs/checkPostEnough",
    method: "post",
    data
  });
}
