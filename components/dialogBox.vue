<template>
	<view :class="isUser ? 'user' : 'service'">
		<image class="avatar" :src="avatar"></image>
		<view :class="isUser ? 'user-communication' : 'service-communication'">
			<view :class="isUser ? 'user-triangle' : 'service-triangle'"></view>
			<view class="communication">{{comstr}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: {
			isUser: {
				type: Boolean,
				value: false
			},
			avatar: {
				type: String,
				value: ''
			},
			comstr: {
				type: String,
				value: ''
			}
		}
	}
</script>

<style>
	.service {
		display: flex;
		margin-left: 40rpx;
		align-items: flex-start;
	}

	.user {
		display: flex;
		flex-direction: row-reverse;
		margin-right: 40rpx;
		align-items: flex-start;
	}

	.avatar {
		width: 65rpx;
		height: 65rpx;
		border-radius: 15rpx;
		background-color: rgb(255, 255, 255);
	}

	.communication {
		padding-left: 18rpx;
		padding-right: 18rpx;
		border-radius: 15rpx;
		background-color: rgb(255, 255, 255);
		max-width: 400rpx;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		word-break: break-all;
	}

	.service-communication {
		margin-left: 45rpx;
		display: flex;
	}

	.user-communication {
		margin-right: 45rpx;
		display: flex;
		flex-direction: row-reverse;
	}

	.service-triangle {
		margin-left: -30rpx;
		width: 0rpx;
		height: 0rpx;
		border-width: 0 15rpx 40rpx;
		border-style: solid;
		border-color: transparent transparent #fff;
		transform: rotate(-90deg);
		margin-top: 10rpx;
		margin-right: -10rpx;
	}

	.user-triangle {
		margin-right: -30rpx;
		width: 0rpx;
		height: 0rpx;
		border-width: 0 15rpx 40rpx;
		border-style: solid;
		border-color: transparent transparent #fff;
		transform: rotate(-270deg);
		margin-top: 8rpx;
		margin-left: -12rpx;
	}
</style>
