<template>
	<layout :loading="loading" pageKey="statisticsEntrepotEntrepot" :title="workshopId ? '查看车间任务':'新增车间任务'">
		<form @submit="submit" data-action="order/workshop/save">
			<view class="w650">
				<view style="display: flex;">
					<inputs title="缸号" v-model="DyelotNumber" placeholder="请输入缸号" :disabled="workshopId"></inputs>
					<view class="" style="display: flex;align-items: center;" v-if="!workshopId">
						<button class="btn greenBg w80" @click="queryDyelotNumber">查询</button>
					</view>
				</view>
				<!--客户列表-->
				<tables :list="page.list" v-if="!workshopId" :showEmpty="false">
					<block slot="tbody">
						<tr class="thead">
							<td>姓名</td>
							<td>缸号</td>
							<td>剩余量</td>
							<td>已产出</td>
							<td>操作</td>
						</tr>
						<tr v-for="( x , index) in page.list" :key="index">
							<td>
								{{x.customer}}
							</td>
							<td>
								{{x.coding}}
							</td>
							<td>
								{{ Number(x.horse)-x.output}}
							</td>
							<td>
								{{x.output}}
							</td>
							<td>
								<button class="choose" :data-index="index" @click="chooseUser">选择</button>
							</td>
						</tr>
					</block>
				</tables>
				<paginate :page="page" :showPageSize="true" @switchPage="changePaginate"></paginate>
				<inputs type="number" name="x.produceNumber|匹数" title="匹数" :disabled="workshopId"
					:value="data.produceNumber"></inputs>
				<inputs type="number" name="x.layerNumber|层数" v-if="workshopId" title="层数" :disabled="workshopId" :value="data.layerNumber">
				</inputs>
				<uploads title="附图" name="x.images" v-model="data.images" :count="workshopId ? data.images.length : 5">
				</uploads>
				<inputs type="number" v-model="takeNum" title="提货匹数" v-if="workshopId" :value="takeNum"></inputs>
				<textareas title="备注" name="x.comment|备注|0~200|empty"
				:value="data.comment" placeholder="备注内容"></textareas>
			</view>
			<labels class="mt40" v-if="workshopId">
				<button class="btn greenBg w80" @click="submiCargo">提货</button>
				<button class="btn grayBg w80" @click="Backto">退回</button>
				<button class="btn grayBg line w80" @click="bcc.goBack()">返回</button>
			</labels>
			<labels class="mt40" v-if="!workshopId">
				<button class="btn greenBg w80" form-type="submit">确定</button>
				<button class="btn grayBg line w80" @click="bcc.goBack()">返回</button>
			</labels>
			<!--订单追踪列表-->
			<quote class="titleRow" v-if="workshopId"
				:title="'订单跟踪  |  '+'已提货：'+data.takeNumber+'  |  剩余提货：'+(data.produceNumber-data.takeNumber)"
				color="#0295f9">
			</quote>
			<tables v-if="workshopId" :list="page.list">
				<block slot="thead">
					<th>序号</th>
					<th>提货匹数</th>
					<th>缸号</th>
					<th>操作人</th>
				</block>
				<block slot="tbody">
					<tr v-for="( x , index) in page.list" :key="index">
						<td>{{index+1}}</td>
						<td>{{x.takeNum}}</td>
						<td>{{x.production.coding}}</td>
						<td>{{x.operator}}</td>
					</tr>
				</block>
			</tables>
		</form>
	</layout>
</template>

<script>
	export default {
		data() {
			return {
				user: uni.getStorageSync("user") || {},
				loading: true,
				id: '',
				data: {
					images: []
				},
				DyelotNumber: null, //缸号
				Dyelotdata: [], //订单数据
				customer: '', //客户id
				roleList: [],
				workshopId: null, //车间ID
				takeNum: 0, //提货匹数
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
		computed: {},
		onLoad(params) {
			if (params.id != undefined) {
				this.workshopId = params.id;
			}
			this.loadData();
		},

		methods: {
			/**
			 * @param {Object} 提货
			 */
			submiCargo() {
				uni.showModal({
					title: '提货',
					content: '您确定是否提货',
					success: res => {
						if (res.confirm) {
							if (this.takeNum == 0) {
								return uni.showToast({
									icon: 'none',
									title: '提货不能大于生产匹数',
									duration: 2000
								});
							}
							if (this.takeNum > Number(this.data.produceNumber) || (Number(this.data
									.produceNumber) - Number(this.data.takeNumber)) < this.takeNum) {
								uni.showToast({
									icon: 'none',
									title: '提货不能大于生产匹数',
									duration: 2000
								});
								return;
							}
							this.bcc.call({
								url: 'order/workshop/takeCargo',
								data: {
									takeNumber: this.data.takeNumber,
									productionId: this.data._id,
									takeNum: this.takeNum,
									production: this.data,
									operator: this.user.username
								},
								success: res => {
									this.loadData();
								}
							});
							console.log('用户点击确定');
						}
					}
				});
			},
			/**
			 * 选择手机号
			 */
			chooseUser(e) {
				if (e.currentTarget.dataset.index == undefined) return;
				this.Dyelotdata = this.page.list[e.currentTarget.dataset.index];
				console.log(this.Dyelotdata)
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
			//退回
			Backto: function() {
				console.log(this.data);
				// return;
				uni.showModal({
					title: '退回',
					content: '确定是否退回该生产订单',
					success: (res) => {
						if (res.confirm) {
							this.bcc.call({
								url: 'order/workshop/backOrder',
								data: {
									id: this.data._id,
									orderid: this.data.orderid,
									uid: this.data.customerID
								},
								success: res => {
									// console.log(res.)
									this.bcc.goBack();
									// uni.hideLoading();
									// this.Dyelotdata[data] = res.data || this.data ;
									// console.log('Dyelotdata============', this.Dyelotdata)
								}
							});
						}
					}
				});
			},
			submitSearch: function(e) {
				this.conditions = e.conditions;
			},
			/**
			 * 查询订单 / 查询记录
			 */
			queryDyelotNumber: function() {
				if (!this.DyelotNumber && !this.workshopId) {
					uni.showToast({
						title: "请输入缸号。",
						icon: 'none'
					});
					return;
				}
				uni.showLoading({
					title: "正在查询中...",
					mask: true
				});
				var data = this.workshopId ? {
					productionId: this.data._id,
					pageNumber: this.page.pageNumber,
					pageSize: this.page.pageSize
				} : {
					codingid: this.DyelotNumber,
					pageNumber: this.page.pageNumber,
					pageSize: this.page.pageSize
				};

				//查看详情
				this.bcc.call({
					url: this.workshopId ? 'order/workshop/takeList' : 'order/workshop/queryDyelot',
					data: data,
					success: e => {
						uni.hideLoading();
						e.page.list = e.page.list.map(item => {
							item.createTimeStr = this.bcc.date.toStr(item.createTime);
							return item;
						});
						this.page = e.page;
						this.loading = false;
						// this.Dyelotdata = res || this.data;
					}
				});
			},
			//提交
			submit: function(e) {
				var {
					fail,
					data
				} = this.bcc.checkData(e);
				if (fail) {
					return;
				}
				if (Number(data['x.produceNumber']) > ((this.Dyelotdata.horse) - (this.Dyelotdata.output))) {
					uni.showToast({
						title: '生产匹数已超量',
						icon: 'none'
					});
					return;
				}
				if(!this.Dyelotdata){
					return uni.showToast({
						title: '请选择缸号',
						icon: 'none'
					});
				}
				data['x.oid'] = this.Dyelotdata._id; //订单ID
				data['x.head'] = this.user.username; //操作者信息
				data['x.customerID'] = this.Dyelotdata.customerID; //用户ID
				data['x.takeNumber'] = 0; //提货匹数记录
				uni.showLoading({
					title: "正在处理中...",
					mask: true
				});
				this.bcc.call({
					keepStr: true,
					url: 'order/workshop/save',
					data: data,
					success: res => {
						uni.hideLoading();
						this.bcc.goBack();
					}
				});
			},
			//查看详情
			loadData: function(e) {
				if (!this.workshopId) {
					this.loading = false;
					return;
				}
				//查看详情
				this.bcc.call({
					url: 'order/workshop/info',
					data: {
						id: this.workshopId
					},
					success: res => {
						res.data.images = res.data.images.split(',');
						this.data = res.data || this.data;
						this.DyelotNumber = res.data.coding;
						console.log(this.data)
						this.loading = false;
						if (this.workshopId) {
							this.queryDyelotNumber();
						}
					}
				});
			},
		}
	}
</script>

<style scoped>
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
