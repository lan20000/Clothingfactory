<template>
	<layout :loading="loading" pageKey="pagesStatisticsCustomerCustomer" title="客户列表">

		<block slot="titleLeft">
			<conditions :showFirst="true" :conditions="conditions" :list="conditonList" @confirm="submitSearch">
			</conditions>
		</block>

		<block slot="titleRight">
			<auth-nav :href="'/pages/user/userEdit?isCustomer=1'" url="user-center/user/info" class="btn w80 flex">
				<text class="bIcon-addCircle mr5"></text>
				添加
			</auth-nav>
		</block>
		<!--移动端-->
		<view v-if="!isPc" class="example-box" v-for="( x , index) in page.list" :key="index">
			<auth-nav :href="'/pages/user/userEdit?isCustomer=1'" style="width: 100%;" url="user-center/user/info">
				<uni-card :title="x.customer" :isFull="true" isShadow='true'
					:note="(x.takeNumber==x.produceNumber) ? '订单状态：已完成' : '订单状态：正在生产中'" :extra="'操作时间：'+x.createTimeStr"
					@click="clickCard">
					<view class="content-box-text">
						<text>客户姓名：{{x.username}}</text>
					</view>
					<view class="content-box-text">
						<text>手机号码：{{x.mobile}}</text>
					</view>
					<view class="content-box-text">
						<text>入库订单：{{x.produceTotal}}</text>
					</view>
					<view class="content-box-text">
						<text>加工订单：{{x.codingTotal}}</text>
					</view>
					<view class="content-box-text">
						<text>加入时间：{{x.createTime}}</text>
					</view>
					<view class="content-box-text">
						<text>操作人：{{x.operation}}</text>
					</view>
				</uni-card>
			</auth-nav>
		</view>
		<!--PC-->
		<tables v-if="isPc" :list="page.list">
			<block slot="tbody">
				<tr class="thead">
					<td>序号</td>
					<td>客户姓名</td>
					<td>手机号码</td>
					<td>入库订单</td>
					<td>加工订单</td>
					<td>加入时间</td>
					<td>操作人</td>
					<td>操作</td>
				</tr>
				<tr v-for="( x , index) in page.list" :key="index">
					<td class="main bold">{{index+1}}</td>
					<td class="main bold">{{x.username}}</td>
					<td>{{x.mobile}}</td>
					<td>
						{{x.produceTotal}}
					</td>
					<td>
						{{x.codingTotal}}
					</td>
					<td>
						{{x.createTime}}
					</td>
					<td>
						{{x.operation}}
					</td>
					<td>
						<auth-nav :href="'/pages/user/userEdit?isCustomer=1'" class="plr5 bold main"
							url="user-center/user/info">
							编辑
						</auth-nav>
						<auth-nav :href="'/pages/statistics/customer/customerDetails?uid='+x._id" class="plr5 bold main"
							url="user-center/user/info">
							详情
						</auth-nav>
						<auth-btn v-if="!x.isSuperAdmin" :url="'user-center/user/delete?id='+x._id" confirm="delete"
							@success="remove(index,1)" class="plr5 bold main">
							删除
						</auth-btn>
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
					title: "客户姓名",
					name: "username",
					type: "varchar"
				}],
				conditions: {},
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
			this.conditions = params;
		},

		onShow() {
			this.getPage();
		},

		methods: {
			getPage: function(e) {
				this.bcc.call({
					url: 'user-center/user/customerList',
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
						});
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
</style>
