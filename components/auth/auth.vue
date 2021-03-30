<template>
	<view class="base-cloud" :style="style" v-if="hasAuth || noAuth">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name : "auth" ,
		props:{
			url : { //请求权限地址
				type : String , 
				default : ""
			},
			noAuth:{
				type : Boolean , //是否验证无权限
				default : false
			}, 
			isInline : {
				type : Boolean ,
				default : true 
			}
		},
		computed:{
			hasAuth : function(e){
				return this.bcc.hasAuth(this.url) ;
			},
			style:function(res){
				return this.isInline ? 'display:inline-block' : ''
			},
		}
	}
</script>

<style>

</style>
