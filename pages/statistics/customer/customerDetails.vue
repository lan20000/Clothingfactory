<template>
	<layout :loading="loading" pageKey="pagesStatisticsCustomerCustomer" title="客户详情">
		<!-- '订单跟踪  |  '+'已提货：'+data.takeNumber+'  |  剩余提货：'+(data.produceNumber-data.takeNumber) -->
		<!-- <quote class="titleRow" :title="222" color="#0295f9">
		</quote>
		<block slot="titleLeft">
			<conditions :showCount="1" :conditions="conditions" :list="conditonList" @confirm="submitSearch">
			</conditions>
		</block> -->
		<view class="topData">
			<view class="fx1">
				<text>{{page.totalRow}}</text>
				<view class="">
					用户总订单
				</view>
			</view>
			<view class="fx1">
				<!-- <text>11</text>
				<view class="">
					已完成的订单
				</view> -->
			</view>
			<view class="fx1">
				<!-- <text>11</text>
				<view class="">
					未完成订单
				</view> -->
			</view>
		</view>
		<!--移动端-->
		<view v-if="!isPc" class="example-box" v-for="( x , index) in page.list" :key="index">
			<uni-card :title="x.customer" :isFull="true" isShadow='true' :note="'预计时间：'+x.time"
				:extra="'操作时间：'+x.createTimeStr" @click="clickCard">
				<view class="content-box-text">
					<text>匹数：{{x.horse}}</text>
					<text>颜色：{{x.color}}</text>
				</view>
				<view class="content-box-text">
					<text>布料：{{x.type}}</text>
					<text>缸数：{{x.coding}}</text>
				</view>
				<view class="content-box-text">
					<text>层数：{{x.type}}</text>
				</view>
				<view class="content-box-text">
					<text>生产数量：{{x.produceNumber}}</text>
					<text>订单状态：</text>
				</view>
				<view class="content-box-text">
					<text>接待者：{{x.username}}</text>
					<text></text>
				</view>
				<view class="">
					<auth-nav :href="`/pages/orderList/newOrder?orderid=${x._id}`" class="plr5 bold main"
						url="user-center/user/info">
						查看
					</auth-nav>
				</view>
			</uni-card>
		</view>
		<!--PC-->
		<tables :list="page.list" v-if="isPc">
			<block slot="tbody">
				<tr class="thead">
					<td>操作者</td>
					<td>操作时间</td>
					<td>生产时间</td>
					<td>客户</td>
					<td>匹数</td>
					<td>类型</td>
					<td>颜色</td>
					<td>缸号</td>
					<td>备注</td>
					<!-- <td>数量</td> -->
					<td>状态</td>
					<td>生产匹数</td>
					<td>查看</td>
				</tr>

				<tr v-for="( x , index) in page.list" :key="index">
					<td>
						{{x.username}}
					</td>
					<td>
						{{x.createTimeStr}}
					</td>
					<td>
						{{x.time}}
					</td>
					<td>
						{{x.customer}}
					</td>
					<td>
						{{x.horse}}
					</td>
					<td>
						{{x.type}}
					</td>
					<td>
						{{x.color}}
					</td>
					<td>
						{{x.coding}}
					</td>
					<td>
						{{x.comment}}
					</td>
					<td>
						{{x.amount==x.output ? '订单完成':'生产中'}}
					</td>
					<td>
						{{ x.output}}
					</td>
					<td>
						<auth-nav :href="`/pages/orderList/newOrder?orderid=${x._id}`" class="plr5 bold main"
							url="user-center/user/info">
							查看
						</auth-nav>
						<!-- <auth-btn v-if="!x.isSuperAdmin" :url="'user-center/user/delete?id='+x._id" confirm="delete" @success="remove(index,1)" class="plr5 bold main">
							删除
						</auth-btn> -->
					</td>
				</tr>
			</block>
		</tables>
		<paginate :page="page" :showPageSize="true" @switchPage="changePaginate"></paginate>
	</layout>
</template>

<script>
	export default {
		data() {
			return {
				user: uni.getStorageSync("user") || {},
				isPc: uni.getSystemInfoSync().windowWidth > 768,
				conditonList: [{
						title: "时间",
						name: "createTimeStart",
						endName: "createTimeEnd",
						type: "time",
						timeType: "rangetime",
						valueType: "timestamp"
					},
					{
						title: "请求路径",
						name: "actionName",
						type: "varchar"
					},
					{
						title: "操作菜单",
						name: "name",
						type: "text"
					},
					{
						title: "用户名",
						name: "userName",
						type: "varchar"
					}
				],
				conditions: {},
				loading: true,
				uid:null,//用户id
				page: {
					pageNumber: 1,
					lastPage: true,
					totalPage: 1,
					list: [],
					totalRow: 0,
					pageSize: 10
				}//分页
			}
		},

		onLoad(params) {
			this.uid = params.uid;
		},

		onShow() {
			this.getPage();
			// this.getOngoingOrder();
		},

		methods: {
			getOngoingOrder:function(){
				console.log('e==========》','11111111111111111')
				this.bcc.call({
					url: 'order/order/ongoingOrder',
					data: {
						uid: this.uid
					},
					success: e => {
						uni.hideLoading();
						
						console.log('e==========》',e)
					}
				});
			},
			clickCard(e) {

			},
			getPage: function(e) {
				this.bcc.call({
					url: 'order/order/customerOrderList',
					data: {
						uid: this.uid,
						...this.conditions,
						pageNumber: this.page.pageNumber,
						pageSize: this.page.pageSize
					},
					success: e => {
						uni.hideLoading();
						console.log(e)
						e.page.list = e.page.list.map(item => {
							item.createTimeStr = this.bcc.date.toStr(item.createTime);
							return item;
						});
						this.page = e.page;
						this.conditonList[1].list = e.statusList;
						this.loading = false;
					}
				});
			},

			submitSearch: function(e) {
				this.conditions = e.conditions;
				this.switchPage();
			},

			switchPage: function(pageNumber) {
				uni.showLoading({
					title: "加载中…"
				});
				this.page.pageNumber = pageNumber || this.page.pageNumber;
				this.getPage();
			},

			changePaginate: function(e) {
				this.page.pageSize = e.pageSize;
				this.page.pageNumber = e.pageNumber;
				this.switchPage();
			},

			remove: function(index) {
				uni.showToast({
					title: '已删除',
					icon: 'success'
				});
				this.page.list.splice(index, 1);
			},
		}
	}
</script>
<style>
	table {
		border: 0px !important;
	}
</style>
<style scoped>
	.example-box {
		margin: 30rpx 20rpx;
	}

	.content-box-text {
		display: flex;
	}

	.content-box-text>text {
		flex: 1;
		font-size: 28rpx;
		color: #82939c;
	}


	.titleRow {
		margin: 30rpx 0rpx 0rpx;
	}

	.titleRow /deep/ .pb10 {
		padding-bottom: 0rpx !important;
	}

	.topData {
		display: flex;
		margin: 20rpx 30rpx;
		color: #FFFFFF;
		font-size: 28rpx;
		font-weight: bold;
		border-radius: 20rpx;
		text-align: center;
	}

	.topData>.fx1 {
		padding: 20rpx 0rpx;
		flex-direction: column;
		padding: 20rpx 0rpx;
		flex: 1;
		margin: 0rpx 20rpx;
		border-radius: 12rpx;
		background-color: #34a0e7;
	}
</style>
