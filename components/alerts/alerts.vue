<template>
	<view class="base-cloud" v-if="isShow">
		<view class="fixed z20 flex ct plr" :class="{'wp' : showWrapper}" :animation="inData">
			
			<view  class="whiteBg rds5 shadow father hidden scaleIn" :style="style" style="padding-top: 42px;max-width: 100%;">
				<view class="pd ptb10 bb flex abs top whiteBg">
					<view class="bold">
						{{title}}
						<slot name="top"></slot>
					</view>
					<view class="bIcon-close hover pl20" @tap="hide"></view>
				</view>
				<view class="pd autoY" :style="{height : bodyHeight}">
					<slot></slot>
				</view>
				<view class="pd ptb10 bt flex rt" :class="{'op0':bottomHeight < 30}" id="bottom">
					<slot name="bottom"></slot>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		name : "alerts" ,
		props: {
			title : {
				type : String ,
				default : "提示"
			},
			width : {
				type : String ,
				default : '50%' 
			},
			height : {
				type : String ,
				default : '80%'
			}
		},
		
		data() {
			return {
				showWrapper : true ,
				isShow : false ,
				inData : null ,
				bottomHeight : 20 
			};
		},
		
		computed:{
			style(){
				return `width:${this.width};height:${this.height}` ;
			},
			bodyHeight(){
				var height = this.getRealHeight();
				return (height - 42 - this.bottomHeight) + 'px' ;
			}
		},
		
		methods: {
			
			computeBottomHeight:function(e){
				const query = uni.createSelectorQuery().in(this);
				query.select('#bottom').boundingClientRect(data => {
				  if (data && data.height > 0) {
				  	this.bottomHeight = data.height ;
				  }
				}).exec();
			},
			
			getRealHeight : function(e){
				if (!this.height) {
					return 200 ;
				}
				if (this.height.indexOf('%') > -1) {
					var winTop = uni.getSystemInfoSync().windowTop || 0 ;
					var sys = uni.getSystemInfoSync().windowHeight +  winTop;
					return sys * Number(this.height.replace("%","").trim()) * 0.01 ;
				}
				return Number(this.height.replace("px","")) ;
			},
			show:function(e){
				this.isShow = true ;
				this.showWrapper = true ;
				this.$nextTick( ()=>{
					setTimeout(res=>{
						this.computeBottomHeight();
					},320); //动画结束
				});
			},
			hide:function(e){
				this.showWrapper = false ;
				var animation = uni.createAnimation({
					duration: 300 ,
					timingFunction: 'ease',
				});
				animation.scale(1.2).opacity(0).step();
				this.inData = animation.export();
				setTimeout((e)=>{
					this.showWrapper = true ;
					this.isShow = false ;
					this.inData = null ;
				},320);
			}
		},
	}
</script>

<style lang="scss">
	.animated {
	  -webkit-animation-duration: 1s;
	  animation-duration: 1s;
	  -webkit-animation-fill-mode: both;
	  animation-fill-mode: both;
	  animation-timing-function: linear;
	}
	.scaleIn{
		animation-duration: 0.2s;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
		animation-timing-function: linear;
		animation-name: scaleIn;
		animation-timing-function: ease-in;
	}
@keyframes scaleIn{
	from{
		opacity: 0.6;
		transform: scale(1.2);
	}
	to{
		opacity: 1;
		transform: scale(1);
	}
}
</style>
