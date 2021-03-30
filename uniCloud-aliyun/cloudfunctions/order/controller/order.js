'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
const $ = db.command.aggregate;
const Order = db.collection("t_order_list");
const Material = db.collection("t_rawMaterial");
const User = db.collection("uni-id-users");
const Production = db.collection("t_order_production");
module.exports = {
	/**
	 * @param {Object} 查询进行中的订单
	 * 
	 */
	ongoingOrder: async function(e) {
		var {
			uid
		} = this.params;
		if (this.isNull(uid)) {
			return;
		}
		// let count = await Order.where({
		// 	'customerID': uid
		// }).count();
		return count;
	},
	/**
	 * 查询用户订单总数
	 */
	customerOrderTotal: async function(e) {

	},
	/**
	 * @param {Object} 用户订单列表
	 */
	customerOrderList: async function(e) {
		var {
			uid,
			pageNumber,
			pageSize
		} = this.params;
		var page = await this.paginate({
			where: {
				'customerID': uid
			},
			pageNumber,
			pageSize,
			collection: Order,
			eq: ["actionName", "userName"],
			range: ["createTime,createTimeStart,createTimeEnd"],
			like: ["name"],
			orderBy: "createTime desc"
		});

		return {
			page
		};
	},
	info: async function(e) {
		var id = this.params.id;
		if (!id) {
			return {};
		}
		var data = this.findFirst(await Order.doc(id).get());
		if (null == data) {
			return {};
		}
		if (data.url) {
			data.url = data.url.join(";");
		}
		if (data.saveLogUrl) {
			data.saveLogUrl = data.saveLogUrl.join(";");
		}
		return {
			data
		};
	},
	save: async function(e) {
		var data = this.getModel();
		var Serial = await Order.where({
			'coding': data.coding
		}).get();
		if (Serial.data.length > 0) {
			return this.fail('请重新输入缸号！该缸号已重复');
		}
		//查询材料实际数量
		var record = this.findFirst(await Material.where({
			'type': data.type
		}).get());
		//订单入库
		data.createTime = Date.now();
		await Order.add(data);
		//用户数据订单量更新
		// await User.doc(data['customerID']).update({
		// 	codingTotal: Number(data['orderNum']) + 1
		// });
		if (record!=null) {
			await Material.doc(record._id).update({
				horse: Number(record.horse) + Number(data.horse)
			});
			return this.ok();
		}
		//新材料入库
		await Material.add({
			createTime: data.createTime, //创建时间
			operator: data.username, //操作者姓名
			type: data.type, //布料类型
			customer: data.customer, //客户姓名
			color: data.color, //颜色
			horse: data.horse //数量
		});
		return this.ok();
	},
	list: async function(e) {
		var {
			pageNumber,
			pageSize
		} = this.params;
		var page = await this.paginate({
			pageNumber,
			pageSize,
			collection: Order,
			eq: ["customer", "coding"],
			range: ["createTime,createTimeStart,createTimeEnd"],
			like: ["name"],
			orderBy: "createTime desc"
		});

		return {
			page
		};
	}
};
