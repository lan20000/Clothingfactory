<template>
	<layout :loading="loading" pageKey="statisticsWarehouseWarehouse" title="仓库报表">

		<block slot="titleLeft">
			<conditions :showFirst="true" :conditions="conditions" :list="conditonList" @confirm="submitSearch"></conditions>
		</block>
		<!--移动端-->
		<view v-if="!isPc" class="example-box" v-for="( x , index) in page.list" :key="index">
			<auth-nav :href="`/pages/orderList/newOrder?orderid=${x._id}`" style="width: 100%;">
				<uni-card isShadow='true'>
					<view class="content-box-text">
						<text>材料名称：{{x.type}}</text>
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
		<tables v-if="isPc" :list="page.list">
			<block slot="tbody">
				<tr class="thead">
					<td>序号</td>
					<td>加入时间</td>
					<td>材料名称</td>
					<td>剩余数量</td>
					<td>属于客户</td>
					<td>操作者</td>
					<td>操作</td>
				</tr>
				<tr v-for="( x , index) in page.list" :key="index">
					<td class="main bold">{{index+1}}</td>
					<td>
						{{x.createTime}}
					</td>
					<td>
						{{x.type}}
					</td>
					<td>
						{{x.horse}}
					</td>
					<td>
						{{x.customer}}
					</td>
					<td>
						{{x.operator}}
					</td>
					<td>
						<auth-nav :href="'/pages/statistics/warehouse/warehouseDetails?type='+x.type" class="plr5 bold main" >
							查看
						</auth-nav>
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
						title: "状态",
						name: "status",
						type: "select",
						list: []
					},
					{
						title: "用户名",
						name: "username"
					},
				],
				conditions: {
					username: ""
				},
				loading: true,
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
			console.log(params)
			this.conditions = params;
		},

		onShow() {
			this.getPage();
		},

		methods: {

			getPage: function(e) {
				this.bcc.callInCache({
					url: "order/material/list",
					data: {
						...this.conditions,
						pageNumber: this.page.pageNumber,
						pageSize: this.page.pageSize
					},
					success: e => {
						uni.hideLoading();
						e.page.list = e.page.list.map(item => {
							item.createTime = this.bcc.date.toStr(item.createTime);
							return item;
						})
						this.page = e.page;
						this.conditonList[0].list = e.statusList;
						this.loading = false;
					}
				});
			},

			submitSearch: function(e) {
				this.loading = true;
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
				this.bcc.clearCache(this.action);
			},

			statusChanged: function(e) {
				this.bcc.clearCache(this.action);
			},
		}
	}
</script>

<style scoped>
	.example-box {
		margin: 30rpx 0rpx;
	}

	.content-box-text {
		display: flex;
	}

	.content-box-text>text {
		flex: 1;
		font-size: 28rpx;
		color: #82939c;
	}
</style>
