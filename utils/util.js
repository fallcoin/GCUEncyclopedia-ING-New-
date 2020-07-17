const requestPromise = function(myUrl, method, data) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: myUrl,
      method: method,
	  data,
      success: res => resolve(res),
	  fail: reason => reject(reason)
    })
  })
}

module.exports = { requestPromise }