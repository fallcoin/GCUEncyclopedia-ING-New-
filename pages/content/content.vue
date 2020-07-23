<template>
	<view class="home-page">
		<nav-bar></nav-bar>
		
		<view :style="'margin-top:' + height + 'px'">
			<view class="title">{{title}}</view>
			<view class="content">
				<rich-text :nodes="content"></rich-text>
				<view class="feedback">
					<view class="feedback2">
						<view class="feedback3" @click="toFeedback">没有想问的问题？ 点击反馈</view>
					</view>
				</view>
			</view>
			<view class="loading" v-if="isLoading">
				<Loading></Loading>
			</view>
		</view>
	</view>
</template>

<script>
	import navBar from "../../components/navBar.vue"
	const app = getApp()
	const {
		getAnswer
	} = require("../../utils/request.js")
	import Loading from "../../components/loading.vue"
	export default {
		data() {
			return {
				content: "",
				title: "",
				aid: "",
				isLoading: true,
				height: app.globalData.height * 2 + 30
			}
		},
		components: {
			Loading,
			navBar
		},
		async onLoad(option) {
			this.title = option.title
			this.aid = option.aid
			this.content = await getAnswer(this.aid)
			this.isLoading = false
		},
		methods: {
			toFeedback() {
				uni.navigateTo({
					url: '../feedback/feedback'
				})
			}
		},
		onShareAppMessage(data) {
			return {
				title: '华广百科',
				path: `/pages/content/content?aid=${this.aid}&title=${this.title}`
			}
		}
	}
</script>

<style scoped>
	.home-page {
		background-color: rgba(215, 215, 215, 0.2);
	}

	.title {
		margin-top: 15rpx;
		margin-left: 35rpx;
		margin-right: 35rpx;
		height: 80rpx;
		border-width: 1px;
		border-style: solid;
		border-radius: 15px;
		background-color: rgb(96, 119, 251);
		font-family: Arial Bold;
		line-height: 80rpx;
		font-size: 35rpx;
		font-weight: 700;
		text-align: center;
		color: rgb(255, 255, 255);
	}

	.content {
		margin-top: 20rpx;
		margin-left: 35rpx;
		margin-right: 35rpx;
		border-width: 1rpx;
		border-radius: 15px;
		background-color: rgb(255, 255, 255);
		padding-top: 20rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		padding-bottom: 50rpx;
	}

	.feedback {
		margin-top: 50rpx;
		margin-left: auto;
		margin-right: auto;
		width: 457rpx;
		height: 60rpx;
		opacity: 0.5;
		border-radius: 0px 15px 15px;
		background-color: rgb(217, 0, 27);
	}

	.feedback2 {
		position: relative;
		left: 3rpx;
		top: 3rpx;
		width: 457rpx;
		height: 60rpx;
		border-radius: 0px 15px 15px;
		background-color: rgba(255, 255, 0, 0.804);
	}

	.feedback3 {
		position: relative;
		top: 5rpx;
		left: 5rpx;
		width: 473rpx;
		height: 60rpx;
		border-radius: 0px 55px 55px;
		background-color: rgb(16, 48, 224);
		font-family: Arial-Black;
		font-size: 30rpx;
		font-weight: 900;
		line-height: 60rpx;
		text-align: center;
		color: rgb(255, 255, 255);
	}

	.loading {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
</style>
