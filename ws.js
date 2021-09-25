/*
 * @Author: xuziyong
 * @Date: 2021-09-25 11:55:22
 * @LastEditors: xuziyong
 * @LastEditTime: 2021-09-25 19:14:22
 * @Description: TODO
 */
const wbs = require('ws');
const { FromClient } = require('./ws.data');
const wstore = require('./ws.store')
const wss = new wbs.WebSocketServer({ port: 3002 });
const store = wstore.wsStore
wss.on('connection', function connection(ws) {
  console.log('connection', ws)
  let curWsName = ''
  ws.on('message', function incoming(message) {
    const jsondata = new FromClient(message)
    // console.log(jsondata)
    // 如果存在isFirst标记，表示客户端重新open，需要清除可能存在的原始的ws连接
    if (jsondata.isFirst) {
      store.deleteByName(jsondata.name)
      // 添加新的ws连接
      if (jsondata.name && !store.hasByName(jsondata.name)) {
        store.add(store.uuid(), jsondata.name, ws)
      }
      // 记录curWsName
      curWsName = jsondata.name
    }
  });

  ws.on("close", function(msg) {
    // 关闭时，需要清空ws
    curWsName && store.deleteByName(curWsName)
    console.log('closed', msg)
  })

  ws.on("error", function(msg) {
    // 关闭时，需要清空ws
    curWsName && store.deleteByName(curWsName)
    console.log('error', msg)
  })

});

// wss.on('error')

console.log('wss has init!')

module.exports = {
  wss,
  store
}
