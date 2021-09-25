/*
 * @Author: xuziyong
 * @Date: 2021-09-25 19:21:45
 * @LastEditors: xuziyong
 * @LastEditTime: 2021-09-25 20:20:38
 * @Description: TODO
 */

function getConfigByReq(req) {
  const {
    body,
    headers,
    method,
    params,
    url
  } = req
  return {
    body,
    headers,
    method,
    params,
    url
  }
}

module.exports = {
  getConfigByReq
}