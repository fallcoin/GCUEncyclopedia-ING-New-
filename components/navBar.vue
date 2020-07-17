<template>
	<view class='nav-wrap' :style="'height:' + (height*2 + 20) + 'px;'">
		<view class='nav-title' :style="'line-height:' + (height*2 + 44) + 'px;'">{{navbarData.title}}</view>
		<view style='display: flex; justify-content: space-around;flex-direction: column'>
			<view class='nav-capsule' :style="'height:' + (height*2 + 44) + 'px;'" v-if='navbarData.showCapsule'>
				<view class='nav-cir'>
					<view @click='_navback' v-if='!share'>
						<image src='../static/image/pre.png' mode='aspectFill' class='back-pre'></image>
					</view>
					<view class='navbar-v-line' v-if='!share'></view>
					<view @click='_backhome'>
						<image src='../static/image/home.png' mode='aspectFill' class='back-home'></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		data() {
			return {
				height: '',
				share: '',
				navbarData: {
				  showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
				  title: '华广信息搜索引擎' //导航栏 中间的标题
				}
			};
		},
		props: {
		},
		created() {
			this.share = app.globalData.share
			this.height = app.globalData.height
		},
		methods: {
			// 返回上一页面
			_navback() {
				uni.navigateBack()
			},
			//返回到首页
			_backhome() {
				uni.reLaunch({
					url: '../index/index',
				})
			}
		}
	}
</script>

<style scoped>
	/* 顶部要固定定位   标题要居中   自定义按钮和标题要和右边微信原生的胶囊上下对齐 */
	.nav-wrap {
		position: fixed;
		width: 100%;
		top: 0;
		background: #6077FB;
		color: #000;
		z-index: 9999999;
	}

	/* 标题要居中 */
	.nav-title {
		position: absolute;
		text-align: center;
		max-width: 400rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		font-size: 27rpx;
		color: #fff;
	}

	.nav-capsule {
		display: flex;
		align-items: center;
		margin-left: 30rpx;
		justify-content: space-between;
		height: 100%;
	}

	.navbar-v-line {
		width: 1px;
		height: 32rpx;
		background-color: #7d8ce0;
	}

	.back-pre,
	.back-home {
		width: 32rpx;
		height: 32rpx;
		margin-top: 10rpx;
		padding: 10rpx;
	}

	.nav-cir {
		border: 1rpx solid #7d8ce0;
		display: flex;
		align-items: center;
		width: 170rpx;
		justify-content: space-around;
		border-radius: 55rpx;
		background-color: #5265d6;
		height: 60rpx;
		padding-left: 5rpx;
		padding-right: 5rpx;
	}
</style>
