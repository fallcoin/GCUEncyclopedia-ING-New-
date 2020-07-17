<template>
	<view class="content">
		<nav-bar></nav-bar>
		<view :style="'margin-top:' + height + 'px'">
			<search-bar :isResultPage="true"></search-bar>
			<view class='question-list' v-if="questionTitleData.length">
				<view v-for="(item, index) in questionTitleData" class="item" :key="index">
					<Item :title="item.title" :aid="item.aid" :label="item.label" />
				</view>
				<view class="subscript">
					<Subscript></Subscript>
				</view>
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

	let categoryUrl = 'https://xingkong.gqt.gcu.edu.cn/qa/api/preview/class/'
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
			categoryUrl = categoryUrl + option.key
			console.log(categoryUrl)
			this.questionTitleData = await getList(categoryUrl, {
				page: this.page++
			})
			this.isLoading = false
		},
		destroyed() {
			categoryUrl = 'https://xingkong.gqt.gcu.edu.cn/qa/api/preview/class/'
		},
		methods: {

		},
		async onReachBottom() {
			if (this.isLoading === false) {
				this.isLoading = true
				let questionTitleData = await getList(categoryUrl, {
					page: this.page++
				})
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
</style>
