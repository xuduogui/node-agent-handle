/*
 * @Author: xuziyong
 * @Date: 2021-09-25 12:08:44
 * @LastEditors: xuziyong
 * @LastEditTime: 2021-09-25 17:15:06
 * @Description: TODO
 */
const HANDLE_TYPE = {
  http: 1
}


function FromClient(clientMsg) {
  this.id = ''
  this.name = ''
  this.type = ''
  this.data = null
  this.isFirst = false
  try {
    const jsonData = JSON.parse(clientMsg);
    this.id = jsonData.id;
    this.name = jsonData.name;
    this.type = jsonData.type
    this.data = jsonData.data;
    this.isFirst = jsonData.isFirst;
  } catch (error) {

  }
}

function ToClient(id, name, data, type) {
  this.id = id
  this.name = name
  this.type = type
  this.data = data
  this.msg = () => {
    return JSON.stringify({
      id, name, data, type
    })
  }
}
module.exports = {
  FromClient,
  ToClient,
  HANDLE_TYPE
}