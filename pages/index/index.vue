<template>
	<view class="content">
		<!-- top部分 -->
		<image src="../../static/image/bg.png" class="bg"></image>
		<view class="top">
			<view class="blue"></view>
			<search-bar></search-bar>
		</view>

		<!-- 轮播图 -->
		<swiper class="swiper" :autoplay="true" :circular="true" @change="swiperChange">
			<swiper-item v-for="(item, index) in swiperItems" :key="index">
				<image :src="item" @click="swiperItemClick"></image>
			</swiper-item>
		</swiper>

		<!-- 分类图标 -->
		<view class="nav">
			<view v-for="item in category" @click="directToCategory" :data-key="item.key" :data-name="item.name" :key="item.key">
				<view>
					<image :src="item.src"></image>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>


		<!-- 热门问题 -->
		<view class='question'>
			<view class='question-title'>
				<view class='question-title-line'></view>
				<text class='question-title-name'>热门问题</text>
			</view>
			<view class='hotquestion-list' :animation="slideLeft">
				<view v-for="(item, index) in hotQuestions" class="hotQuestion" :data-aid="item.aid" :data-title="item.title" @click="directToPage" :key="index" v-if="hotQuestions.length">
					<view class='tip'>HOT</view>
					<text class='item-title'>{{item.title}}</text>
				</view>
			</view>
		</view>
		
		<view class="subscript">
			<Subscript></Subscript>
		</view>
	</view>
</template>

<script>
	import searchBar from "../../components/searchBar.vue"
	import Subscript from "../../components/subscript.vue"
	const {
		getQuestion
	} = require('../../utils/request.js')
	export default {
		data() {
			return {
				swiperItems: ["https://xingkong.gqt.gcu.edu.cn/qa/img/background1.png", "https://xingkong.gqt.gcu.edu.cn/qa/img/background1.png",
					"https://xingkong.gqt.gcu.edu.cn/qa/img/background1.png"
				],
				category: [{
					name: "常见问题",
					key: "常见问题",
					src: "../../static/image/usual.png"
				}, {
					name: "学业相关",
					key: "学习资料",
					src: "../../static/image/data.png"
				}, {
					name: "校园生活",
					key: "校园生活",
					src: "../../static/image/live.png"
				}, {
					name: "吃喝玩乐",
					key: "吃喝玩乐",
					src: "../../static/image/enjoy.png"
				}],
				swiperCurrent: 0,
				hotQuestions: [],
				slideLeft: ''
			}
		},
		components: {
			searchBar,
			Subscript
		},
		async onLoad() {
			let currentQuestions = await getQuestion('https://xingkong.gqt.gcu.edu.cn/qa/api/view', {
				page: 0
			})
			this.hotQuestions = currentQuestions.splice(0, 4)
		},
		mounted() {
			const animation = uni.createAnimation({
				duration: 1000,
				timingFunction: `ease`
			})
			animation.opacity(1).translateX(0).step()
			this.slideLeft = animation
		},
		methods: {
			swiperChange(e) {
				// console.log(e)
			},
			swiperItemClick(e) {
				// console.log(e)
			},
			directToCategory(e) {
				uni.navigateTo({
					url: `../category/category?name=${e.currentTarget.dataset.name}&key=${e.currentTarget.dataset.key}`
				})
			},
			directToPage(e) {
				uni.navigateTo({
				  url: `../content/content?aid=${e.currentTarget.dataset.aid}&title=${e.currentTarget.dataset.title}`
				})
			},
			onShareAppMessage(data) {
				return {
					title: '华广百科',
					imageUrl: 'https://xingkong.gqt.gcu.edu.cn/qa/img/background1.png',
					path: '/pages/index/index'
				}
			}
		}
	}
</script>

<style scoped>
	.bg {
		width: 100%;
		height: 200rpx;
		position: fixed;
		z-index: -1;
	}

	.top {
		background-color: #6077FB;
		position: sticky;
		padding-top: 10rpx;
		top: 0rpx;
		padding: 0 50rpx;
		padding-bottom: 10rpx;
	}

	.swiper {
		margin: 0 50rpx;
		margin-top: 12rpx;
		height: 265rpx;
		border: solid 1px rgb(121, 121, 121);
		border-width: 1px;
		border-style: solid;
		border-color: rgb(121, 121, 121);
		border-radius: 15rpx;
		background-color: rgb(255, 255, 255);
		overflow: hidden;
	}

	.nav {
		margin: 0 50rpx;
		margin-top: 25rpx;
		display: flex;
		justify-content: space-around;
	}

	.nav view {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.nav view view,
	.nav view view image {
		width: 100rpx;
		height: 100rpx;
		border: solid 1rpx rgb(121, 121, 121);
		border-color: rgb(121, 121, 121);
		border-radius: 15px;
		background-color: rgb(255, 255, 255);
	}

	.nav text {
		font-size: 20rpx;
		font-weight: 700;
		margin-top: 10rpx;
	}

	.question {
		margin: 0 50rpx;
		margin-top: 40rpx;
	}

	.question-title {
		display: flex;
		margin-bottom: 20rpx;
	}

	.question-title-line {
		width: 13rpx;
		height: 45rpx;
		border-radius: 50rpx;
		background-color: rgb(96, 119, 251);
		margin-bottom: 24rpx;
	}

	.question-title-name {
		margin-left: 20rpx;
		background-color: transparent;
		font-family: Arial Negreta;
		font-size: 35rpx;
		font-weight: 700;
		line-height: normal;
		text-align: left;
		color: rgb(51, 51, 51);
	}

	.swiper image {
		width: 100%;
		height: 100%;
	}

	.hotquestion-list {
		opacity: 0;
		transform: translateX(200rpx);
	}

	.hotQuestion {
		margin-bottom: 30rpx;
		height: 78rpx;
		border-radius: 15rpx;
		background-color: rgb(96, 119, 251);
		color: white;
		font-size: 30rpx;
		font-family: Arial Bold;
		font-weight: 700;
		text-align: center;
		overflow: hidden;
	}

	.tip {
		width: 130rpx;
		height: 30rpx;
		font-size: 15rpx;
		line-height: 30rpx;
		background-color: white;
		color: rgb(96, 119, 251);
		transform: rotate(315deg) translate(-30rpx, -15rpx);
	}

	.item-title {
		position: relative;
		top: -12rpx;
	}
	
	.subscript {
	  margin-top: 80rpx;
	  margin-bottom: 50rpx;
	}
</style>
