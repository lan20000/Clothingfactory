<template>
	<view class="father">
		
		<view class="base-cloud">
			
			<top-window v-if="!isPc"></top-window>
			
			<!-- 顶部区域 -->
			<view id="layout_header" >
				<view :class="isPc?'pd15 pb0':''" v-if="showHeader">
					<view class="whiteBg  father">
						<view class="flex pd10 plr15 bb">
							<view class="flex">
								<view class="mr10 noBreak" v-if="isPc">
									{{title ? title : currentTitle}}
								</view>
								<slot name="titleLeft"></slot>
							</view>
							<view>
								<slot name="titleRight"></slot>
							</view>
						</view>
					</view>
				</view>
				<view class="pt" v-else></view>
			</view>
			
		</view>
		
		<!-- 内容区域 -->
		<view class="layout-content" v-if="innerScroll">
			<scroll-view :scroll-y="true" class="shadow" style="background-color: #fff;overflow-y: auto;"  :style="{'height': contentHeight + 'px'}">
				<block v-if="loading">
					<empty :loading="true"></empty>
				</block>
				<block v-else>
					<view class="pb">
						<!-- 自定义内容 -->
						<slot></slot>
					</view>
				</block>
			</scroll-view>
		</view>
		<view class="layout-content " :style="{'min-height': contentHeight + 'px'}" v-else>
			<view class="shadow" style="background-color: #fff;"  >
				<block v-if="loading">
					<empty :loading="true"></empty>
				</block>
				<block v-else>
					<view class="pb">
						<!-- 自定义内容 -->
						<slot></slot>
					</view>
				</block>
			</view>
		</view>
		
	</view>
</template>

<script>
	import { mapMutations , mapGetters } from "vuex" ;
	import topWindow from "../window/top-window" ;
	export default {
		components:{
			topWindow
		},
		name: "layout",
		props: {
			loading: {
				default: false
			},
			innerScroll: {
				default: true
			},
			showHeader: {
				default: true
			},
			title : {
				default : ""
			},
			pageKey : {
				default : ""
			}
		},
		data() {
			return {
				admin: uni.getStorageSync("admin") || {} ,
				menuList: [],
				isShowAll : true ,
				headerHeight : 0 ,
				isPc : uni.getSystemInfoSync().windowWidth > 768 ,
				showMenu : uni.getSystemInfoSync().windowWidth > 768 ,
				fadeOutData : null
			};
		},
		
		created() {
			//更新store中的pageKey
			this.setPageKey({pageKey : this.pageKey}) ;
			// #ifdef MP-WEIXIN
			//隐藏小程序端的返回首页按钮
			uni.hideHomeButton();
			// #endif
		},
		
		mounted() {
			uni.setNavigationBarTitle({
				title: this.title ? this.title : this.currentTitle
			});
			
			
			
			this.$nextTick( ()=>{
				const query = uni.createSelectorQuery().in(this);
				query.select('#layout_header').boundingClientRect(data => {
				  if (data && data.height > 0) {
				  	this.headerHeight = data.height ;
				  }
				}).exec();
			});
		},
		computed:{
			...mapGetters({
				currentTitle : "window/getCurrentTitle"
			}),
			contentHeight:function(e){
				var bottom = this.isPc ? 15 : 55 ;
				return uni.getSystemInfoSync().windowHeight - this.headerHeight - bottom ;
			}
		},
		
		methods:{
			
			...mapMutations( "window" , ["setPageKey"]),
			
			changeMenuStatus:function(e){
				if (this.isPc) {
					return ;
				}
				if (!this.showMenu) {
					this.showMenu = true ;
					return ;
				}
				var animation = uni.createAnimation({
					duration: 300 ,
					timingFunction: 'ease',
				});
				animation.translateX(-300).step();
				this.fadeOutData = animation.export();
				setTimeout((e)=>{
					this.showMenu = false ;
					this.fadeOutData = null ;
				},320);
			}
		}
	}
</script>

<style lang="scss" scoped>
.shadow{
	box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.1);
}
.lightBackBg{
	background-color: #191919;
	color: #fff;
}
.mainLightBg{
	background-color: rgba($main,0.1);
}
.father{
	position: relative;
}

.grayBd{
	border-color: #f7f7f7;
}
.fadeInLeft{
	animation: fadeInLeft 0.2s ease-in-out;
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@media (min-width:768px) {
	.layout-content{
		padding: 15px;
		padding-top: 0;
	}
}
</style>
