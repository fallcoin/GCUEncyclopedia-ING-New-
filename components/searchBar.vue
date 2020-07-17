<template>
	<view class="search">
		<image src="../static/image/search.png" class="search-icon"></image>
		<view class="split-line"></view>
		<input class="search-input" v-model="searchstr" @confirm="toSearch" @blur="loseFocus" placeholder="有什么想问的"></input>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchstr: ""
			};
		},
		props: {
			isResultPage: {
				type: Boolean,
				value: false
			}
		},
		methods: {
			toSearch() {
				if (this.isResultPage) {
					uni.redirectTo({
						url: `../search/search?key=${this.searchstr}`
					})
				} else {
					uni.navigateTo({
						url: `../search/search?key=${this.searchstr}`
					})
				}
			},
			loseFocus() {
				this.searchstr = ""
			}
		}
	}
</script>

<style scoped>
	.search {
		height: 72rpx;
		border-width: 1rpx;
		border-radius: 15rpx;
		background-color: rgb(255, 255, 255);
		display: flex;
		align-items: center;
	}

	.search-icon {
		width: 40rpx;
		height: 40rpx;
		margin-left: 36rpx;
		margin-right: 20rpx;
	}

	.split-line {
		width: 4rpx;
		height: 51rpx;
		line-height: 72rpx;
		background-color: rgb(190, 190, 190);
	}

	.search-input {
		padding-left: 10rpx;
		width: 70%;
	}
</style>
