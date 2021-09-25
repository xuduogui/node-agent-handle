/*
 * @Author: xuziyong
 * @Date: 2021-09-25 11:57:32
 * @LastEditors: xuziyong
 * @LastEditTime: 2021-09-25 19:10:00
 * @Description: TODO
 */
class HttpStroe {
  constructor() {
    this.store = {}
  }
  add(id) {
    this.store[id] = 1
  }
  delete(id) {
    delete this.store[id]
  }
  uuid() {
    let id = null
    while(!id || this.store[id]) {
      id = '_' + Math.floor(Math.random() * 10000000000000);
    }
    return id;
  }
}
const httpStroe = new HttpStroe()
module.exports = {
  httpStroe
}