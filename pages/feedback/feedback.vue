<template>
	<view>
		<nav-bar></nav-bar>
		<view class="home-page" :style="'margin-top:' + height + 'px'">
			<view class="communication">
				<view v-for="(item, index) in feedbackData" :key="index">
					<dialog-box :isUser="item.isUser" :avatar="item.avatar" :comstr="item.comstr" />
				</view>
			</view>

			<!-- 底部输入部分 -->
			<view class="hidden-bottom"></view>
			<view class="bottom">
				<textarea v-model="feedBackStr" class="bottom-input" auto-height="true"></textarea>
				<image src="../../static/image/send.png" class="bottom-send" @click="submit"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import dialogBox from '../../components/dialogBox.vue'
	import navBar from '../../components/navBar.vue'
	const app = getApp()
	const {
		postFeedBack
	} = require('../../utils/request.js')
	export default {
		data() {
			return {
				feedBackStr: '',
				feedbackData: [{
					isUser: false,
					avatar: '../static/image/icon.jpg',
					comstr: '欢迎使用华广信息搜索引擎，有什么想反馈的吗？'
				}],
				userInfo: {
					avatarUrl: ''
				},
				height: app.globalData.height * 2 + 30
			}
		},
		methods: {
			async submit() {
				this.feedBackStr = this.feedBackStr.trim()
				if (this.feedBackStr.length > 50) {
					uni.showToast({
						title: '内容不得多于50字',
						icon: 'none'
					})
					return
				}
				if (this.feedBackStr.length == 0)
					return
				await postFeedBack({
					title: this.feedBackStr
				})
				this.feedbackData.push({
					isUser: true,
					avatar: this.userInfo.avatarUrl,
					comstr: this.feedBackStr
				})
				this.feedBackStr = ''
				this.feedbackData.push({
					isUser: false,
					avatar: this.feedbackData[0].avatar,
					comstr: '感谢您的反馈'
				})
			}
		},
		components: {
			dialogBox,
			navBar
		},
		onLoad() {
			uni.getStorage({
				key: "avatar_key",
				success: (res) => {
					this.userInfo.avatarUrl = res.data
				},
				fail() {
					uni.showToast({
						title: '获取头像失败',
						icon: 'none'
					})
				}
			})
		}
	}
</script>

<style>
	page {
		background-image: url('https://chenxuan.online/storage/QA/background.jpg');
		background-attachment: fixed;
		background-size: 100% 93.5%;
		background-repeat: no-repeat;
	}
</style>
<style scoped>
	.communication {
		padding-top: 70rpx;
		display: flex;
		flex-direction: column;
		z-index: 999;
	}

	.communication view {
		margin-bottom: 10rpx;
	}

	.hidden-bottom {
		height: 10%;
		width: 150rpx;
	}

	.bottom {
		min-height: 7%;
		width: 100%;
		background-color: rgb(244, 244, 244);
		position: fixed;
		bottom: 0;
		display: flex;
		align-items: center;
		padding-left: 40rpx;
		padding-right: 40rpx;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
	}

	.bottom-input {
		padding-left: 15rpx;
		padding-right: 15rpx;
		width: 580rpx;
		border-radius: 15rpx;
		background-color: rgb(255, 255, 255);
		margin-right: 25rpx;
		font-size: 45rpx;
	}

	.bottom-send {
		width: 50rpx;
		height: 50rpx;
		margin-right: 20rpx;
	}
</style>
