const { requestPromise } = require('./util.js')

const getQuestion = async function(questionQuestionUrl, data) {
	try{
		let res = await requestPromise(questionQuestionUrl, 'POST', data)
		return res.data.data
	}catch(e){
		//TODO handle the exception
		uni.showToast({
			title: '获取问题失败',
			icon: 'none'
		})
	}
} 

const getLabel = async function(aid) {
	try{
		let res = await requestPromise(`https://xingkong.gqt.gcu.edu.cn/qa/api/preview/type/${aid}`, 'POST')
		return res.data
	}catch(e){
		//TODO handle the exception
		uni.showToast({
			title: '获取标签失败',
			icon: 'none'
		})
	}
}

const getList = async function(url, data) {
	let questions = await getQuestion(url, data)
	for (let i = 0; i < questions.length; i++) {
		questions[i].label = await getLabel(questions[i].aid)
	}
	
	return questions
}

const getAnswer = async function(aid) {
	try{
		let res = await requestPromise(`https://xingkong.gqt.gcu.edu.cn/qa/api/preview/${aid}`, 'POST')
		return res.data
	}catch(e){
		//TODO handle the exception
		uni.showToast({
			title: '获取内容失败',
			icon: 'none'
		})
	}
}

const postFeedBack = async function(content) {
	try{
		let res = await requestPromise('https://xingkong.gqt.gcu.edu.cn/qa/api/feedbook', 'POST', content)
	}catch(e){
		//TODO handle the exception
		uni.showToast({
			title: '提交失败',
			icon: 'none'
		})
	}
}

module.exports = {
	getQuestion,
	getLabel,
	getList,
	getAnswer,
	postFeedBack
}