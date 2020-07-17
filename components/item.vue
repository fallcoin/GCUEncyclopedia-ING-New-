<template>
	<view class="question" @click="toContent" :animation="slideLeft">
	  <text class="question-title">{{title}}</text>
	  <text class="question-label">{{label}}</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				slideLeft: ''
			};
		},
		props: {
			title: {
			  type: String,
			  value: ""
			},
			aid: {
			  type: Number,
			  value: 0
			},
			label: {
			  type: String,
			  value: ""
			}
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
			toContent() {
				uni.navigateTo({
				  url: `../content/content?aid=${this.aid}&title=${this.title}`
				})
			}
		}
	}
</script>

<style scoped>
	.question {
	  display: flex;
	  flex-direction: column;
	  padding-left: 70rpx;
	  padding-right: 92rpx;
	  padding-top: 48rpx;
	  padding-bottom: 58rpx;
	  background-color: rgb(255, 255, 255);
	  opacity: 0;
	  transform: translateX(100rpx);
	}
	.question-title {
	  font-weight: 700;
	  font-size: 25rpx;
	  font-family: Arial Normal;
	}
	.question-label {
	  margin-top: 12rpx;
	  font-size: 20rpx;
	  font-weight: 400;
	  font-family: Arial Normal;
	}
</style>
