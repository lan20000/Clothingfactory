<template>
	<layout :loading="loading" pageKey="orderListOrderList" title="订单列表">
		<block slot="titleLeft">
			<conditions :showCount="1" :conditions="conditions" :list="conditonList" @confirm="submitSearch">
			</conditions>
		</block>

		<block slot="titleRight">
			<auth-nav href="/pages/orderList/newOrder" url="order/order/save" class="btn w80 flex">
				新增订单
			</auth-nav>
		</block>
		<!--移动端-->
		<view v-if="!isPc" class="example-box" v-for="( x , index) in page.list" :key="index">
			<auth-nav :href="`/pages/orderList/newOrder?orderid=${x._id}`" style="width: 100%;" >
			<uni-card :title="x.customer" isShadow='true' :note="'预计时间：'+x.time"
				:extra="'操作时间：'+x.createTimeStr" >
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
					<!-- <auth-nav :href="`/pages/orderList/newOrder?orderid=${x._id}`" class="plr5 bold main"
						url="user-center/user/info">
						查看
					</auth-nav> -->
				</view>
			</uni-card>
			</auth-nav>
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
						title: "客户姓名",
						name: "customer",
						type: "varchar"
					},
					{
						title: "缸号",
						name: "coding",
						type: "varchar"
					}
				],
				conditions: {},
				loading: true,
				action: "order/order/list",
				page: {
					pageNumber: 1,
					lastPage: true,
					totalPage: 1,
					list: [],
					totalRow: 0,
					pageSize: 10
				}
			}
		},

		onLoad(params) {
			this.conditions = params;
		},

		onShow() {
			var that = this;
			this.getPage();
		},

		methods: {
			clickCard:function(e){
				console.log(e)
			},
			getPage: function(e) {
				this.bcc.call({
					url: this.action,
					data: {
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
	table{border: 0px !important;}
</style>
<style scoped>
	.example-box {
		margin: 30rpx 0rpx;
	}
	.content-box-text{display: flex;}
	.content-box-text>text{
		flex: 1;
		font-size: 28rpx;
		color: #82939c;
	}
</style>