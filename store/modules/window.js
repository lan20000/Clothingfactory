import bcc from "../../common/js/base-cloud-client" ;

function getDefaultTitle(menuList , pageKey){
	var curMenu = menuList.find(item=>item.key == pageKey);
	if (!curMenu) {
		return ;
	}
	if (curMenu.type == 1) {
		return curMenu.name ;
	}
	var parentMenu = menuList.find(item => item._id == curMenu.parentId);
	return `${ parentMenu.name} > ${curMenu.name}` ;
}

export default {
	namespaced: true,
	state: {
		inited: false,
		menuList : uni.getStorageSync("menuList") || [] ,
		menuGroups : uni.getStorageSync("menuGroups") || [] ,
		user : uni.getStorageSync("user") || {} ,
		pageKey : '' ,
		curGroup : -1 ,
		isShowAll : true ,
		showLeftWindow : false ,
		willShowLeftWindow : false ,
		closedMenuIds : [] //已关闭的菜单IDs
	},
	mutations: {
		/**
		 * 初始化窗口数据
		 */
		initData : (state, { menuList , menuGroups , user }) => {
			state.inited = true
			state.menuList = menuList ;
			state.menuGroups = menuGroups ;
			state.user = user ;
			uni.setStorageSync("menuList" , menuList);
			uni.setStorageSync("menuGroups" , menuGroups );
			uni.setStorageSync("user" , user );
		},
		
		/**
		 * 清理窗口数据
		 * @param {Object} state
		 */
		clearData:function(state){
			state.inited = false ;
			state.menuList = [] ;
			state.menuGroups = [] ;
			state.user = {} ;
			state.curGroup = -1 ;
			state.pageKey = '' ;
			bcc.clearStorage();
		},
		
		/**
		 * 设置pageKey
		 */
		setPageKey:function(state , {pageKey}){
			state.pageKey = pageKey ;
			if (state.willShowLeftWindow) {
				state.willShowLeftWindow = false ;
				state.showLeftWindow = true ;
			}
		},
		
		changeIsShowAll : function(state){
			state.isShowAll = !state.isShowAll ;
			if (state.isShowAll) {
				state.closedMenuIds = [] ;
			}else{
				state.closedMenuIds = state.menuList.map(item=>item._id);
			}
		},
		
		toggleLeftWindow : function(state , isShow ){
			state.showLeftWindow = isShow ;
		},
		
		willShowLeftWindow:function(state){
			state.willShowLeftWindow = true ;
		},
		
		/**
		 * 从全局变量中移除、放入菜单id
		 * @param {Object} state
		 * @param {Object} _id
		 */
		toggleClosedIds :function(state , _id ){
			var index = state.closedMenuIds.findIndex( curId => curId == _id ) ;
			if (index > -1) {
				state.closedMenuIds.splice( index , 1) ;
			}else{
				state.closedMenuIds.push(_id) ;
			}
		},
		
	},
	getters : {
		/**
		 * 权限菜单中的第一个pages
		 */
		getFirstPages : function(state){
			var menuList = state.menuList ;
			for (var i = 0; i < menuList.length; i++) {
				var cur = menuList[i];
				if (cur.type == 1) {
					if(cur.pages){
						var hasSecMenu = menuList.findIndex(item=>item.parentId == cur._id) > -1 ;
						if(!hasSecMenu){
							return cur.pages ;
						}
					}
					//二级菜单跳转地址
					var subMenu = menuList.find(item => item.parentId == cur._id && item.pages && item.type == 2 ) ;
					if (subMenu) {
						return subMenu.pages ;
					}
				}
			}
		},
		
		/**
		 * 对外获取菜单列表数据
		 */
		getMenuList : function(state){
			var menuList = state.menuList ;
			return menuList.map(item=>{
				//是否含有下级菜单
				item.hasSubMenu = menuList.findIndex(cur=>cur.parentId == item._id) > -1 ;
				//下级菜单是否被选中
				item.subChoosed = menuList.findIndex( cur => cur.type == 2 && cur.parentId == item._id && cur.key == state.pageKey ) > -1 ;
				//是否关闭该菜单
				item.isClosed = state.closedMenuIds.findIndex(curId => curId == item._id) > -1 ;
				return item ;
			});
		},
		
		getCurGroup : function (state){
			var menuList = state.menuList ;
			var curMenu = menuList.find(item => (item.type == 1 || item.type == 2) && item.key == state.pageKey ) ;
			if (!curMenu) {
				return -1 ;
			}
			if (curMenu.type == 1) {
				return curMenu.group ;
			}
			var firstMenu = menuList.find(item => item.type == 1 && item._id == curMenu.parentId ) ;
			return firstMenu ? firstMenu.group : -1 ;
		},
		
		/**
		 * 获取当前页面的默认标题
		 * @param {Object} state
		 */
		getCurrentTitle :function(state){
			return getDefaultTitle(state.menuList , state.pageKey) ;
		},
		
	},
	actions: {
		
	}
}
