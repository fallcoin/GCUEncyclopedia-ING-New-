<template>
	<view class="content">
		<nav-bar></nav-bar>
		
		<view :style="'margin-top:' + height + 'px'">
			<search-bar :isResultPage="true"></search-bar>
			<view class='question-list' v-if="questionTitleData.length">
				<view v-for="(item, index) in questionTitleData" class="item" :key="index">
					<Item :title="item.title" :aid="item.aid" :label="item.label" />
				</view>
			</view>

			<view v-if="questionTitleData.length === 0 && isLoading === false" v-once>
				<image src="../../static/image/canNotFind.png" class="canNotFind"></image>
				<view class="empty-bottom">
					<view class="feedback">
						<view class="feedback2">
							<view class="feedback3" bindtap="directToFeedback">没有任何结果？ 点击反馈</view>
						</view>
					</view>
				</view>
			</view>

			<view class="subscript">
				<Subscript></Subscript>
			</view>

			<view v-show="isLoading" class="loading">
				<Loading></Loading>
			</view>
		</view>
	</view>
</template>

<script>
	import Item from '../../components/item.vue'
	import Loading from '../../components/loading.vue'
	import Subscript from "../../components/subscript.vue"
	import searchBar from "../../components/searchBar.vue"
	import navBar from "../../components/navBar.vue"
	const app = getApp()
	const {
		getList
	} = require('../../utils/request.js')
	let searchUrl = 'https://xingkong.gqt.gcu.edu.cn/qa/api/search'
	export default {
		data() {
			return {
				questionTitleData: [],
				page: 1,
				isLoading: true,
				height: app.globalData.height * 2 + 30
			}
		},
		components: {
			Item,
			Loading,
			Subscript,
			searchBar,
			navBar
		},
		async onLoad(option) {
			this.questionTitleData = await getList(searchUrl, {
				q: option.key,
				page: this.page++
			})
			this.isLoading = false
		},
		methods: {

		},
		async onReachBottom() {
			if (this.isLoading === false) {
				this.isLoading = true
				let questionTitleData = await getList(searchUrl, this.page++)
				this.questionTitleData = this.questionTitleData.concat(questionTitleData)
				this.isLoading = false
			}
		}
	}
</script>

<style scoped>
	.content {
		background-color: rgba(215, 215, 215, 0.2);
		position: fixed;
		height: 100%;
		width: 100%;
		margin: 0;
	}

	.question-list {
		border-radius: 15rpx 15rpx 0px 0px;
		overflow: hidden;
		margin-top: 20rpx;
		margin-left: 35rpx;
		margin-right: 35rpx;
	}

	.item {
		margin-bottom: 10rpx;
	}

	.loading {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.subscript {
		margin-top: 30rpx;
		margin-bottom: 50rpx;
	}

	.empty-bottom {
		position: absolute;
		bottom: 10%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.feedback {
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

	.canNotFind {
		width: 300rpx;
		height: 300rpx;
		margin-left: 50%;
		margin-top: 50%;
		transform: translateX(-50%);
	}

	.subscript {
		margin-right: 30rpx;
		margin-top: 30rpx;
	}
</style>
