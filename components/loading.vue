<template>
	<view class="lds-ring">
		<view></view>
		<view></view>
		<view></view>
		<view></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style>
	.lds-ring {
		display: inline-block;
		position: relative;
		width: 64px;
		height: 64px;
	}

	.lds-ring view {
		box-sizing: border-box;
		display: block;
		position: absolute;
		width: 51px;
		height: 51px;
		margin: 6px;
		border: 6px solid #238acc;
		border-radius: 50%;
		animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
		border-color: #238acc transparent transparent transparent;
	}

	.lds-ring view:nth-child(1) {
		animation-delay: -0.45s;
	}

	.lds-ring view:nth-child(2) {
		animation-delay: -0.3s;
	}

	.lds-ring view:nth-child(3) {
		animation-delay: -0.15s;
	}

	@keyframes lds-ring {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}
</style>
