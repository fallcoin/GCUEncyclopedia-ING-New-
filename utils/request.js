const {
	requestPromise
} = require('./util.js')

const getQuestion = async function(questionQuestionUrl, data) {
	let res = await requestPromise(questionQuestionUrl, 'POST', data)
	if (res.statusCode !== 200) {
		uni.showToast({
			title: '获取问题失败',
			icon: 'none'
		})
	}
	return res.data.data
}

const getLabel = async function(aid) {
	let res = await requestPromise(`https://xingkong.gqt.gcu.edu.cn/qa/api/preview/type/${aid}`, 'POST')
	if (res.statusCode !== 200) {
		uni.showToast({
			title: '获取标签失败',
			icon: 'none'
		})
	}
	return res.data
}

const getList = async function(url, data) {
	let questions = await getQuestion(url, data)
	for (let i = 0; i < questions.length; i++) {
		questions[i].label = await getLabel(questions[i].aid)
	}
	return questions
}

const getAnswer = async function(aid) {
	let res = await requestPromise(`https://xingkong.gqt.gcu.edu.cn/qa/api/preview/${aid}`, 'POST')
	if (res.statusCode !== 200) {
		uni.showToast({
			title: '获取标签失败',
			icon: 'none'
		})
	}
	return res.data
}

const postFeedBack = async function(content) {
	let res = await requestPromise('https://xingkong.gqt.gcu.edu.cn/qa/api/feedbook', 'POST', content)
	if (res.statusCode !== 200) {
		uni.showToast({
			title: '提交失败',
			icon: 'none'
		})
		return 0
	}
	return 1
}

module.exports = {
	getQuestion,
	getLabel,
	getList,
	getAnswer,
	postFeedBack
}
