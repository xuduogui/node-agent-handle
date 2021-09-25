/*
 * @Author: xuziyong
 * @Date: 2021-09-25 11:57:32
 * @LastEditors: xuziyong
 * @LastEditTime: 2021-09-25 20:09:59
 * @Description: TODO
 */
class WsStroe {
  constructor() {
    this.store = {}
  }
  add(id, name, ws) {
    this.store[id] = {
      name,
      ws
    }
  }
  delete(id) {
    delete this.store[id]
  }
  deleteByName(name) {
    const keyArr = Object.keys(this.store)
    console.log(this.store)
    console.log(name)
    for (let index = 0; index < keyArr.length; index++) {
      const key = keyArr[index];
      if (this.store[key].name === name) {
        this.delete(key)
      }
    }
  }
  hasById(id) {
    return !!this.store[id]
  }
  getWsByName(name) {
    const keyArr = Object.keys(this.store)
    for (let index = 0; index < keyArr.length; index++) {
      const key = keyArr[index];
      if (this.store[key].name === name) {
        return this.store[key].ws
      }
    }
    return null
  }
  hasByName(name) {
    const keyArr = Object.keys(this.store)
    for (let index = 0; index < keyArr.length; index++) {
      const key = keyArr[index];
      if (this.store[key].name === name) {
        return true
      }
    }
    return false
  }
  uuid() {
    let id = null
    while(!id || this.store[id]) {
      id = '_' + Math.floor(Math.random() * 10000000000000);
    }
    return id;
  }
}
const wsStore = new WsStroe()
module.exports = {
  wsStore
}