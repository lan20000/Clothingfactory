<template>
	<view class="base-cloud">
		
		
		<view class="topWindow shadow fz14 white bb blackBd fixed z20" style="background-color: #1c1d21;">
			
			<!-- 没有分组或只有一个分组、PC、移动端 -->
			<view class="flex h100p" v-if="isPc || menuGroups.length < 2">
				
				<!-- logo与菜单组 -->
				<view class="flex lt fz16"  v-if="isPc">
					<!-- logo -->
					<view class="leftWindow plr">
						<image class="block topWindow" src="../../static/logoTextLight.png" mode="aspectFit"></image>
					</view>
					
					<!-- 顶部菜单分组 -->
					<view class="flex lt topWindow">
						
						<!-- <view class="topItem plr20 father h100p flex ct" :class="{active : curGroup == item.value && pageKey != 'setting'}" 
						v-for="( item , index) in menuGroups" :key="index" @tap="changeGroup(item.value)">
							<view class="item">
								<text :class="item.icon"></text>
								<text class="pl10">
									{{item.title}}
								</text>
								<view class="abs bottom flex ct">
									<view class="bb3"></view>
								</view>
							</view>
						</view> -->
						
					</view>
					
					
				</view>
				
				<button @tap="toggleSidebar" hover-class="op9" class="showInMb plr ptb10 brown">
					<view class="bIcon-listFill"></view>
				</button>
				
				<view class="flex rt father" v-if="user.username">
					<view class="plr15 white bold" :class="{brown : !isPc}" @tap="toggleAdminMenu">
						{{user.username}}
						<text class="bIcon-arrowDown fz12 ml5" v-if="!isPc"></text>
					</view>
					<block v-if="isPc">
						<view class="white "  :class="pageKey == 'setting'?'brown op10':'op7'">
							<auth-nav href="/pages/setting/setting" url="user-center/user/modify" class="plr15">
								<text class="bIcon-set mr5"></text>
								设置
							</auth-nav>
						</view>
						<view class="hover plr15 op7" @tap="quit">退出</view>
					</block>
				</view>
				
			</view>
			<scroll-view v-else :scroll-x="true" class="noBreak" :scroll-into-view="scrollId" :scroll-with-animation="true">
				
				<view class="inline" id="admin" @tap="toggleAdminMenu">
					<view class="topItem plr father topWindow flex ct">
						{{user.username}} 
						<text class="bIcon-arrowDown fz12 ml5"></text>
					</view>
				</view>
				
				<view class="inline " :id="`g_${item.value}`" v-for="( item , index) in menuGroups" :key="index">
					<view class="topItem plr father topWindow flex ct" :class="{active : curGroup == item.value && pageKey != 'setting'}"
					 @tap="changeGroup(item.value , true )">
						<view class="item">
							<text :class="item.icon"></text>
							<text class="pl10">
								{{item.title}}
							</text>
							<view class="abs bottom flex ct">
								<view class="bb3"></view>
							</view>
						</view>
					</view>
				</view>
				
				
			</scroll-view>
			
			
		</view>
		
		<!-- 移动端渲染 -->
		<view class="topWindow" v-if="!isPc"></view>
		<view class="fixed z20" v-if="!isPc && showLeftWindow">
			<view class="abs wp2" @tap="toggleSidebar"></view>
			<view class="abs z11 left w220">
				<left-window :pageKey="pageKey"></left-window>
			</view>
		</view>
		
	</view>
</template>

<script>
	import { mapState , mapGetters , mapMutations } from "vuex" ;
	import leftWindow from "../window/left-window" ;
	export default {
		components:{
			leftWindow
		},
		data() {
			return {
				isPc : uni.getSystemInfoSync().windowWidth > 768 ,
				scrollId : '' ,
				showAdminMenu : false 
			};
		},
		
		computed:{
			...mapState( 'window' , ["menuGroups","pageKey","isShowAll","user","showLeftWindow"]),
			...mapGetters({
				"menuList" : "window/getMenuList" ,
				"curGroup" : "window/getCurGroup" 
			})
		},
		
		methods:{
			
			...mapMutations("window" , ["clearData" , "toggleLeftWindow","willShowLeftWindow"]),
			
			toggleAdminMenu:function(res){
				if(this.isPc){
					return ;
				}
				this.scrollId = 'admin' ;
				var hasSettingAuth = this.bcc.hasAuth("user-center/user/modify") ;
				if(hasSettingAuth){
					uni.showActionSheet({
						itemList: ['修改个人资料' , '退出'] ,
						success: (e) => {
							if(e.tapIndex == 0){
								// #ifdef H5
								uni.navigateTo({
									url:"/pages/setting/setting"
								});
								// #endif
								// #ifndef H5
								uni.redirectTo({
									url:"/pages/setting/setting"
								});
								// #endif
								return ;
							}
							this.quit();
						}
					});
					return ;
				}
				uni.showActionSheet({
					itemList: ['退出'] ,
					success: (e) => {
						this.quit();
					}
				});
			},
			
			toggleSidebar : function() {
				this.toggleLeftWindow(!this.showLeftWindow) ;
			},
			
			quit: function(e) {
				uni.showLoading({
					title:"退出中…"
				});
				this.bcc.call({
					url : 'user-center/user/logout' ,
					success : res => {
						this.clearData();
						uni.reLaunch({
							url: "/pages/login/login"
						});
					},
					complete : res=>{
						uni.hideLoading();
					}
				});
			},
			
			/**
			 * 根据菜单组查找该组的第一个可跳转菜单页面链接
			 * @param {String} curGroup
			 */
			getPagesByGroup : function(curGroup){
				for (var i = 0; i < this.menuList.length; i++) {
					var firstMenu = this.menuList[i] ;
					if(firstMenu.type != 1 || firstMenu.group != curGroup ){
						continue ;
					}
					if(firstMenu.pages && !firstMenu.hasSubMenu){
						return firstMenu.pages ;
					}
					var secMenu = this.menuList.find(item=>item.parentId == firstMenu._id && item.type == 2) ;
					if (secMenu && secMenu.pages) {
						return secMenu.pages
					}
				}
			},
			
			/**
			 * 切换菜单组，跳转至该菜单组下的第一个页面
			 * @param {String} curGroup
			 */
			changeGroup:function(curGroup){
				if (curGroup == this.curGroup) {
					this.toggleLeftWindow(true);
					return ;
				}
				var url = this.getPagesByGroup(curGroup) ;
				if(!url){
					if (process.env.NODE_ENV === 'development') {
						console.error("未找到该分组下定义的可跳转菜单路径") ;
					}
					return ;
				}
				if (process.env.NODE_ENV === 'development') {
					console.log("即将跳转至：" + url);
				}
				uni.redirectTo({
					url ,
					success: () => {
						this.willShowLeftWindow();
					}
				});
			},
		}
	}
</script>
<style lang="scss">
	.topWindow{
		height: var(--window-top);
	}
	.brown{
		color: #f6ca9d;
	}
	.topItem{
		color: rgba(#f6ca9d,.7);
		cursor: pointer;
		transition:background-color 0.8s;
		background-color: rgba($gray, 0);
		&.active , &:hover{
			color: #f6ca9d;
		}
		&:hover{
			background-color: rgba(246,202,157,.05);
		}
		.bb3{
			display: block;
			width: 0;
			transition:width 0.2s;
		}
		&.active{
			.bb3{
				width: calc(100% - 40px );
				-webkit-border-radius: 23px;
				-moz-border-radius: 23px;
				border-radius: 23px;
				border-color: #f6ca9d;
			}
		}
	}
	@keyframes fadeInTop {
	  from {
	    opacity: 0;
	    transform: translate3d(0, 100%, 0);
	  }
	
	  to {
	    opacity: 1;
	    transform: translate3d(0, 0, 0);
	  }
	}
	.fadeInTop{
		animation:fadeInTop 0.2s ease-in-out ;
	}
	
	@media (max-width:768px) {
		.topWindow{
			height: 55px;
		}
	}
	
</style>