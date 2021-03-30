<template>
	<view class="base-cloud">
		<view class="leftWindow leftWindowHeight sidebar hidden father pb50" :style="{'background-color' : bgColor }">
			<scroll-view :class="{collapsed : isCollapsed}" class="fz14 white bigWidth h100p" :scroll-into-view="intoViewId" :scroll-y="true">
				
				<view class="menuItem" :id="`s_${item._id}`" v-for="( item , index) in menuListSync" :key="item._id"
				v-if="item.isShowFirstMenu">
					
					<!-- 一级菜单 -->
					<view class="father" @tap="clickFirstMenu(item)">
						<view class="flex pd pr25 firstMenu" :class="item.firstClassNames">
							<view class="ptb2">
								<text class="w20" :class="item.icon"></text>
								<text class="pl10">{{item.name}}</text>
							</view>
							<view class="fz12 op8 bIcon-arrowUp"></view>
						</view>
						<!-- 下级菜单被选中且一级菜单关闭、一级菜单被选中-->
						<view class="abs" v-if="(item.subChoosed && item.isClosed) || (!item.hasSubMenu && pageKey == item.key)">
							<view class="transBd"></view>
						</view>
					</view>
					
					
					<!-- 二级菜单 -->
					<view class="father" v-if="!item.isClosed" style="background-color: #0f1017;">
						
						<view @tap="clickSecMenu(sub)" class="pl25 father white flex" style="height: 53px;cursor: pointer;"
						v-if="isShowSecMenu(item , sub , index)" v-for="( sub , sIndex) in menuList" :key="sub._id">
							
							<view>
								<view class="abs" v-if="sub.key == pageKey">
									<view class="abs grayBg op1" ></view>
									<view class="transBd abs left"></view>
								</view>
								
								<view class="father z2">
									<view :class="sub.key != pageKey ? 'hover7' : 'brown'">
										{{sub.name}}
									</view>
									<view v-if="sub.enName" class="white  pt3 fz12 description" :class="sub.key == pageKey ? 'op3 brown' : 'op4'">
										{{sub.enName}}
									</view>
								</view>
							</view>
							
							
						</view>
						
					</view>
					
					
				</view>
				
			</scroll-view>
			
			
			<!-- 底部折叠菜单操作区域 start -->
			<view class="abs bottom toggler" @tap="changeIsShowAll" >
				<view class="flex ptb plr10 brown father z2">
					<view class="fz12 op6">
						{{appName}}
					</view>
					<view :title="isShowAll ? '收起菜单' : '展开菜单'" class="fz18 hover7" :class="isShowAll ? 'bIcon-showAll' : 'bIcon-hideAll'"></view>
				</view>
			</view>
			<!-- 底部折叠菜单操作区域 end -->
			
			
		</view>
	</view>
</template>

<script>
	import { mapGetters , mapState , mapMutations } from "vuex" ;
	export default {
		props:{
			bgColor : {
				type : String ,
				default : "#1c1d21"
			}
		},
		data() {
			return {
				isPc : uni.getSystemInfoSync().windowWidth > 768 ,
				showMenu : uni.getSystemInfoSync().windowWidth > 768 ,
				intoViewId : '' ,
				appName : process.env.VUE_APP_NAME ,
				isCollapsed : false 
			};
		},
		
		computed:{
			...mapState( 'window' , ["menuGroups","pageKey","isShowAll"]),
			...mapGetters({
				"menuList" : "window/getMenuList",
				"curGroup" : "window/getCurGroup"
			}),
			menuListSync:function(res){
				return this.menuList.map(item=>{
					item.firstClassNames = this.getFirstMenuClass(item);
					item.isShowFirstMenu = this.isShowFirstMenu(item) ;
					return item ;
				})
			},
		},
		
		mounted() {
			//监听菜单栏
			if (this.menuList.length == 0) {
				this.bcc.clearStorage();
				var curPageRoute = this.bcc.getPageRoute() ;
				if ( curPageRoute != '/' && curPageRoute != '/pages/login/login') {
					uni.setStorageSync("beforeLoginPage" , curPageRoute );
					uni.redirectTo({
						url: "/pages/login/login"
					});
				}
				return ;
			}
		},
		
		methods:{
			
			...mapMutations("window" , ["toggleClosedIds","toggleLeftWindow","changeIsShowAll"]),
			
			/**
			 * 是否渲染一级菜单
			 * @param {Object} item
			 */
			isShowFirstMenu:function(item){
				var noGroupOrIsCurGroup = item.group == this.curGroup || this.menuGroups.length == 0 ; //无分组或属于当前分组
				var notHiddenPlatform = item.platform != 4 ;
				var showInAllPlatform = !item.platform || item.platform == 1 ;
				var showInPc = item.platform == 2 && isPc ;
				var showInMb = item.platform == 3 && !isPc ;
				var isShowWithPlatform = showInAllPlatform || showInPc || showInMb ;
				return item.type == 1 && noGroupOrIsCurGroup && notHiddenPlatform && isShowWithPlatform ;
			},
			
			/**
			 * 计算一级菜单动态类名
			 * @param {Object} item
			 */
			getFirstMenuClass : function(item){
				var classNames = [] ;
				var isMatchedPages = !item.hasSubMenu && this.pageKey == item.key ; //当前页面为一级菜单对应的页面
				if(item.subChoosed || isMatchedPages ){ //下级菜单被选中、自身被选中
					classNames.push("white") ;
				}
				if ( !item.subChoosed && !isMatchedPages ) { //下级菜单未选中，自身也未选中
					classNames.push("hover6") ;
				}
				if (!item.isClosed && item.hasSubMenu) { //有下级菜单且未关闭
					classNames.push('open') ;
				}
				return classNames.join(" ") ;
			},
			
			isShowSecMenu :function(first , item ){
				var notHiddenPlatform = item.platform != 4 ;
				var showInAllPlatform = !item.platform || item.platform == 1 ;
				var showInPc = item.platform == 2 && isPc ;
				var showInMb = item.platform == 3 && !isPc ;
				var isShowWithPlatform = showInAllPlatform || showInPc || showInMb ;
				return item.parentId == first._id  && isShowWithPlatform ;
			},
			
			resetIntoViewId:function(e){
				this.$nextTick(()=>{
					var curMenu = this.menuList.find(item=>item.key == this.pageKey);
					this.intoViewId = curMenu ? 's_'+ curMenu.parentId : 's_' ;
				});
			},
			
			
			/**
			 * 点击一级菜单，如有跳转链接跳转，否则展开或收起
			 * @param {Object} item
			 * @param {Object} index
			 */
			clickFirstMenu:function(item,index){
				if (item.hasSubMenu) {
					this.toggleClosedIds(item._id);
					return ;
				}
				if (item.pages) {
					uni.navigateTo({
						url: item.pages
					});
				}
			},
			
			/**
			 * 点击二级菜单，H5中直接打开下一个页面，其他平台关闭当前页打开新页面
			 * @param {Object} item
			 */
			clickSecMenu:function(item){
				if (!this.isPc) {
					this.toggleLeftWindow(false) ;
				}
				var method = 'redirectTo' ;
				// #ifdef H5
				method = 'navigateTo' ;
				// #endif
				uni[method]({url : item.pages});
			}
			
		}
	}
</script>
<style lang="scss">
	.sidebar {
		position: fixed;
		left: 0;
		top: var(--window-top);
	}
	
	.transBd{
		cursor: pointer;
		position: relative;
		overflow: hidden;
		height: 100%;
		&::after{
			transform: rotate(-30deg);
			content: "";
			width: 20px;
			height: 80px;
			background-color: #fff;
			display: block;
			position: absolute;
			top: -10px;
			left: 0;
			opacity: 0.2;
			animation: transLight 3s infinite ;
		}
	}
	
	@keyframes transLight {
	   0% {
		   left: 0;
	   }
	   30%,100%{
		   left: 200%;
	   }
	}
	
	.description{
		font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,"\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
		font-weight: normal;
	}
	.firstMenu{
		.bIcon-arrowUp{
			transition:0.2s ;
			transform: rotate(90deg);
		}
		&.open{
			.bIcon-arrowUp{
				transform: rotate(180deg);
			}
		}
	}
	.bigWidth{
		// width: calc(100% + 12px);
		::-webkit-scrollbar-track {
			background-color:#1c1d21!important;
			box-shadow: none;
			border: none;
			border-radius:0;
		}
		::-webkit-scrollbar-thumb {
			background-color:#444444;
			background-clip:padding-box;
			border-radius:0;
		}
	}
	
	.brown{
		color: #f6ca9d;
	}
	.toggler{
		cursor: pointer;
		:after{
			content: '';
			position: absolute;
			top: -6px;
			right: 0;
			width: 0;
			height: 0;
			border-bottom: 5px solid #1c1d21;
			border-right: 5px solid transparent;
		}
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
	@media (max-width:768px) {
		.sidebar{
			width: 200px;
			animation: fadeInLeft 0.2s ;
		}
	}
	
	
</style>