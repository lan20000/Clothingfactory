<template>
	<layout :loading="loading" pageKey="orderListOrderList" :title="id ? '修改用户':'新增用户'">
		<form @submit="submit" data-action="user-center/user/save">
			<view class="w650">
				<datepicker title="时间" type="datetime" name="x.time|时间" :value="data.time"></datepicker>
				<view style="display: flex;">
					<inputs title="客户姓名" style="flex: 1;padding-right: 0rpx;" v-model="customerName" placeholder="请输入客户姓名" :disabled="orderid"></inputs>
					<view class="" style="display: flex;align-items: center;" v-if="!orderid">
						<button class="btn greenBg w80" @click="getlist">查询</button>
					</view>
				</view>
				<inputs title="已选客户" :disabled="true"
					:value="customerSpan.username ? customerSpan.username+' | '+customerSpan.mobile : data.username">
				</inputs>
				<!--客户列表-->
				<tables :list="userPage.list" v-if="!orderid" :showEmpty="false">
					<block slot="tbody">
						<tr class="thead">
							<td>序号</td>
							<td>客户姓名</td>
							<td>手机号码</td>
							<td>操作</td>
						</tr>
						<tr v-for="( x , index) in userPage.list" :key="index">
							<td class="main bold">{{index+1}}</td>
							<td>
								{{x.username}}
							</td>
							<td>
								{{x.mobile}}
							</td>
							<td>
								<button class="choose" :data-index="index" @click="chooseUser">选择</button>
							</td>
						</tr>
					</block>
				</tables>
				<paginate :page="userPage" :showPageSize="true" @switchPage="changePaginate"></paginate>
				<!--其他选项-->
				<inputs name="x.type|布料类型" title="布料类型" :disabled="orderid" :value="data.type"></inputs>
				<inputs name="x.color|颜色" title="颜色" :disabled="orderid" :value="data.color"></inputs>
				<inputs name="x.coding|缸号" title="缸号" :disabled="orderid" :value="data.coding"></inputs>
				<inputs name="x.horse|匹数" type="number" title="匹数" :disabled="orderid" :value="data.horse"></inputs>
				<!-- <inputs name="x.amount|匹数" type="number" title="匹数" :disabled="orderid" :value="data.amount"></inputs> -->
				<!-- <inputs name="x.comment|备注|0~200|empty" :disabled="orderid" title="备注" :value="data.comment"
					placeholder="选填"></inputs> -->
				<textareas title="备注" name="x.comment|备注|0~200|empty" 
				:value="data.comment" placeholder="备注内容"></textareas>
				<uploads title="附图" name="x.images" v-model="data.images" :count="orderid ? data.images.length : 20">
				</uploads>
				<labels class="mt40" v-if="orderid">
					<button class="btn greenBg w80" @click="bcc.goBack()">返回</button>
				</labels>
				<!--订单追踪列表-->
				<quote class="titleRow" v-if="orderid" :title="'订单跟踪  |  当前生产匹数:'+data.output" color="#0295f9"></quote>
				<tables v-if="orderid" :list="userPage.list" :showEmpty="false">
					<block slot="thead">
						<th>创建时间</th>
						<th>预产匹数</th>
						<th>已完成量</th>
						<th>操作人</th>
						<th>操作</th>
					</block>
					<block slot="tbody">
						<tr v-for="( x , index) in userPage.list" :key="index">
							<td>{{x.createTimeStr}}</td>
							<td>{{x.produceNumber}}</td>
							<td>{{x.takeNumber}}</td>
							<td>{{x.username}}</td>
							<td >
								<auth-nav :href="'/pages/statistics/entrepot/newEntrepot?id='+x._id" class="plr5 bold main"
									url="order/workshop/info">
									查看
								</auth-nav>
							</td>
						</tr>
					</block>
				</tables>
				<paginate :page="userPage" :showPageSize="true" @switchPage="changePaginate"></paginate>
			</view>
			<labels class="mt40" v-if="!orderid">
				<button class="btn greenBg w80" form-type="submit">确定</button>
				<button class="btn grayBg line w80" @click="bcc.goBack()">取消</button>
			</labels>

		</form>

	</layout>
</template>

<script>
	export default {
		data() {
			return {
				user: uni.getStorageSync("user") || {},
				orderid: null, //订单号
				loading: true,
				id: '',
				data: {
					userType: "",
					images: []
				},
				customerName: null, //查询用户名
				customerSpan: {
					mobile: '',
					username: ''
				}, //用户名数据
				userPage: {
					pageNumber: 1,
					lastPage: true,
					totalPage: 1,
					list: [],
					totalRow: 0,
					pageSize: 10
				}
			}
		},
		computed: {

		},
		onLoad(params) {
			this.orderid = params.orderid;
			this.loadData();
		},

		methods: {
			/**
			 * 选择手机号
			 */
			chooseUser(e) {
				if (e.currentTarget.dataset.index == undefined) return;
				this.customerSpan = this.userPage.list[e.currentTarget.dataset.index];
				console.log(this.customerSpan)
			},
			/**
			 * @param {Object} 切换分页
			 */
			changePaginate: function(e) {
				this.userPage.pageSize = e.pageSize;
				this.userPage.pageNumber = e.pageNumber;
				this.switchPage();
			},
			/**
			 * @param {Object} pageNumber 数据请求
			 */
			switchPage: function(pageNumber) {
				uni.showLoading({
					title: "加载中…"
				});
				this.userPage.pageNumber = pageNumber || this.userPage.pageNumber;
				this.getuserlist();
			},
			submitSearch: function(e) {
				this.conditions = e.conditions;
			},
			/**
			 * 记录列表
			 */
			gettrace: function() {
				console.log('this.data.coding', this.data.coding)
				//查看详情
				this.bcc.call({
					url: 'order/order/traceList',
					data: {
						codingid: this.data.coding,
						pageNumber: this.page.pageNumber,
						pageSize: this.page.pageSize
					},
					success: res => {
						console.log(res)
						// uni.hideLoading();
						// e.page.list = e.page.list.map(item=>{
						// 	item.createTimeStr = this.bcc.date.toStr(item.createTime);
						// 	return item ;
						// });
						// this.page = e.page ;
						// this.loading = false ;
					}
				});
			},
			/**
			 * 查询列表
			 */
			getlist: function() {
				if (!this.customerName && !this.orderid) {
					uni.showToast({
						title: "请输入正确的用户名",
						icon: 'none'
					});
					return;
				}
				uni.showLoading({
					title: "正在查询中...",
					mask: true
				});
				this.bcc.call({
					url: this.orderid ? 'order/workshop/workshopRecord' : 'user-center/user/queryUser',
					data: this.orderid ? {
						oid: this.orderid,
						pageNumber: this.userPage.pageNumber,
						pageSize: this.userPage.pageSize
					} : {
						username: this.customerName,
						pageNumber: this.userPage.pageNumber,
						pageSize: this.userPage.pageSize
					},
					success: e => {
						uni.hideLoading();
						e.page.list = e.page.list.map(item => {
							item.createTimeStr = this.bcc.date.toStr(item.createTime);
							return item;
						});
						this.userPage = e.page;
						this.loading = false;
					}
				});
			},
			/**
			 * @param {Object} 提交
			 */
			submit: function(e) {
				var {
					fail,
					data
				} = this.bcc.checkData(e);
				if (fail) {
					return;
				}
				if (!this.customerSpan) {
					uni.showToast({
						title: "请输入正确的用户名",
						icon: 'none'
					});
					return
				};
				uni.showLoading({
					title: "请稍后…",
					mask: true
				});
				console.log(data);
				data['x.customer'] = this.customerSpan.username; //客户姓名
				data['x.output'] = 0; //已产出
				data['x.username'] = this.user.username; //操作者
				data['x.customerID'] = this.customerSpan._id; //客户ID
				data['x.orderNum'] = this.customerSpan.codingTotal; //用户订单匹数
				this.bcc.call({
					keepStr: true,
					url: 'order/order/save',
					data: data,
					success: res => {
						this.bcc.goBack();
						uni.hideLoading();
					}
				});
			},
			//初始化
			loadData: function(e) {
				if (!this.orderid) {
					this.loading = false;
					return;
				}
				//查看详情
				this.bcc.call({
					url: 'order/order/info',
					data: {
						id: this.orderid
					},
					success: res => {
						this.getlist();
						this.customerName = res.data.customer;
						res.data.images = res.data.images.split(',');
						this.data = res.data || this.data;
						console.log(this.data)
						this.loading = false;
					}
				});
			}
		}
	}
</script>

<style scoped>
	.selectedCustomer {
		padding: 20rpx 12px;
		display: block;
	}

	.pb10 {
		padding: 0rpx;
	}

	.choose {
		line-height: 36rpx;
		width: 88rpx;
		font-size: 24rpx;
		background-color: #07c160;
		color: #FFFFFF;
		border-radius: 12rpx;
		padding: 0rpx;
	}

	.titleRow {
		margin: 30rpx 0rpx 0rpx;
	}

	.titleRow /deep/ .pb10 {
		padding-bottom: 0rpx !important;
	}
</style>
