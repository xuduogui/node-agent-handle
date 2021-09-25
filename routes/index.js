/*
 * @Author: xuziyong
 * @Date: 2021-09-25 11:54:51
 * @LastEditors: xuziyong
 * @LastEditTime: 2021-09-25 23:05:29
 * @Description: TODO
 */
var express = require('express');
const {
  httpStroe
} = require('../http.store');
const {
  getConfigByReq
} = require('../utils.http');
var router = express.Router();

const {
  store,
  wss
} = require('../ws');
const {
  ToClient
} = require('../ws.data');

/* GET home page. */
router.all('/*', function (req, res, next) {
  const uuid = httpStroe.uuid()
  const reqData = getConfigByReq(req)
  const head = reqData.headers || {}
  const clientName = req.hostname.split('.')[0]
  const handleType = head.target_handle_type
  const ws = store.getWsByName(clientName)

  if (!ws) {
    res.send('不存在主机：' + clientName)
    return false
  }

  const wsHandle = function (message) {
    const data = message.data
    try {
      const dataJson = JSON.parse(data)
      if (dataJson.id === uuid) {
        const resJson = dataJson.data
        delete resJson.headers['transfer-encoding']
        delete resJson.headers['content-length']
        // 释放id
        httpStroe.delete(uuid)  
        // 释放监听
        ws.removeEventListener('message', wsHandle)
        console.log('返回数据：', resJson)
        res.status(resJson.status)
        if (resJson.headers && resJson.data) {
          res.set(resJson.headers)
          res.send(resJson.data)
        } else {
          res.send(resJson)
        }

      }
    } catch (error) {
      ws.removeEventListener('message', wsHandle)
      res.send(error)
    }
  }
  ws.addEventListener('message', wsHandle)

  const msg = new ToClient(uuid, clientName, reqData, handleType).msg()
  ws.send(msg)
});

module.exports = router;