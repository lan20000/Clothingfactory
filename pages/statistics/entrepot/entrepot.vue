<template>
	<layout :loading="loading" pageKey="statisticsEntrepotEntrepot" title="车间列表">
		<block slot="titleLeft">
			<conditions :showCount="1" :conditions="conditions" :list="conditonList" @confirm="submitSearch">
			</conditions>
		</block>
		<block slot="titleRight">
			<auth-nav href="/pages/statistics/entrepot/newEntrepot" url="order/workshop/save" class="btn w80 flex">
				新增生产
			</auth-nav>
		</block>
		<!--移动端-->
		<view v-if="!isPc" class="example-box" v-for="( x , index) in page.list" :key="index">
			<auth-nav :href="'/pages/statistics/entrepot/newEntrepot?id='+x._id" style="width: 100%;" >
					<uni-card :title="x.customer" isShadow='true' :note="(x.takeNumber==x.produceNumber) ? '订单状态：已完成' : '订单状态：正在生产中'" :extra="'操作时间：'+x.createTimeStr" >
						<view class="content-box-text">
							<text>匹数：{{x.horse}}</text>
							<text>颜色：{{x.color}}</text>
						</view>
						<view class="content-box-text">
							<text>布料：{{x.type}}</text>
							<text>缸数：{{x.coding}}</text>
						</view>
						<view class="content-box-text">
							<text>层数：{{x.layerNumber}}</text>
							<text>生产匹数：{{x.produceNumber}}</text>
						</view>
						<view class="content-box-text">
							<text>接待者：{{x.username}}</text>
							<text>操作者：{{x.head}}</text>
						</view>
						<view class="content-box-text">
							<text>生产时间：{{x.time}}</text>
						</view>
					</uni-card>
			</auth-nav>
		</view>
		<!--PC-->
		<tables v-if="isPc" :list="page.list">
			<block slot="tbody">
				<tr class="thead">
					<td>操作时间</td>
					<td>客户姓名</td>
					<td>匹数</td>
					<td>颜色</td>
					<td>布料</td>
					<td>层数</td>
					<td>缸数</td>
					<td>生产匹数</td>
					<td>订单状态</td>
					<td>接待者</td>
					<td>操作者</td>
					<td>操作</td>
				</tr>
				<tr v-for="( x , index) in page.list" :key="index">
					<td>
						{{x.createTimeStr}}
					</td>
					<td>
						{{x.customer}}
					</td>
					<td>
						{{x.horse}}
					</td>
					<td>
						{{x.color}}
					</td>
					<td>
						{{x.type}}
					</td>
					<td>
						{{x.layerNumber}}
					</td>
					<td>
						{{x.coding}}
					</td>
					<td>
						{{x.produceNumber}}
					</td>
					<td>
						{{x.takeNumber==x.produceNumber ? '已完成' : '正在生产中'}}
					</td>
					<td>
						{{x.username}}
					</td>
					<td>
						{{x.head}}
					</td>
					<td>
						<auth-nav :href="'/pages/statistics/entrepot/newEntrepot?id='+x._id" class="plr5 bold main"
							url="order/workshop/info">
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
	import uniCard from '@/components/uni-card/uni-card';
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
						title: "客户姓名	",
						name: "customer",
						type: "varchar"
					},
					{
						title: "缸数",
						name: "coding",
						type: "varchar"
					}
				],
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
		components: {
			uniCard
		},
		onLoad(params) {
			this.conditions = params;
		},

		onShow() {
			var that = this;
			this.getPage();
		},

		methods: {
			getPage: function(e) {
				this.bcc.call({
					url: "order/workshop/list",
					data: {
						...this.conditions,
						pageNumber: this.page.pageNumber,
						pageSize: this.page.pageSize
					},
					success: e => {
						uni.hideLoading();
						console.log('分页', e)
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
