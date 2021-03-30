'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
const $ = db.command.aggregate;
const Order = db.collection("t_order_production");
const Orderlist = db.collection("t_order_list");
const User = db.collection("uni-id-users");
const takecargo = db.collection("t_order_takecargo");
const orderLog = db.collection("t_order_log");

module.exports = {
	/**
	 * @param {Object} oid 车间ID
	 * 订单下车间操作记录
	 */
	workshopRecord: async function(e) {
		var {
			pageNumber,
			pageSize,
			oid,
			type
		} = this.params;
		let P = oid ? {'orderid': oid} : {'type': String(type)};
		// return this.fail(pageNumber,pageSize);
		var page = await this.paginate({
			where: P,
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
	/**
	 * @param {Object} productionId / 车间ID
	 * 提货记录
	 */
	takeList: async function(e) {
		var {
			pageNumber,
			pageSize,
			productionId
		} = this.params;
		var page = await this.paginate({
			where: {
				productionId: productionId
			},
			pageNumber,
			pageSize,
			collection: takecargo,
			eq: ["actionName", "userName"],
			range: ["createTime,createTimeStart,createTimeEnd"],
			like: ["name"],
			orderBy: "createTime desc"
		});
		return {
			page
		};
	},
	/**
	 * 提货
	 */
	takeCargo: async function(e) {
		var data = this.params;
		if (!this.isNumber(data.takeNum)) {
			return this.fail("请输入数字");
		}
		if (data) {
			var updated = await Order.doc(data.productionId).update({
				takeNumber: Number(data.takeNumber) + Number(data.takeNum)
			});
			if (updated != 1) this.fail("更新失败");
			await takecargo.add(data);
		}
		return this.ok();
	},
	/**
	 * @param {Object} id车间记录id，orderid订单id，uid用户id / 退单
	 */
	backOrder: async function(e) {
		var ids = this.params;
		//生产信息
		var output = this.findFirst(await Order.doc(ids.id).get());
		//用户信息
		var Userdata = this.findFirst(await User.doc(ids.uid).get());
		//订单信息
		var order = this.findFirst(await Orderlist.doc(ids.orderid).get());
		if (null == output || null == order) {
			return this.fail("数据错误");
		}
		//更新订单数量
		var updateOutput = await Orderlist.doc(ids.orderid).update({
			output: Number(order.output) - Number(output.produceNumber)
		});
		//更新订单数量
		await User.doc(ids.uid).update({
			produceTotal: Number(Userdata.produceTotal) - Number(output.produceNumber)
		});
		if (updateOutput != 1) this.fail("更新失败");
		await Order.doc(ids.id).remove();
		return this.ok();
	},
	/**
	 * @param {Object} 查询订单信息
	 */
	queryDyelot: async function(e) {
		var {
			pageNumber,
			pageSize,
			codingid
		} = this.params;
		var page = await this.paginate({
			where: {
				coding: new RegExp(`${codingid}`)
			},
			pageNumber,
			pageSize,
			collection: Orderlist,
			eq: ["actionName", "userName"],
			range: ["createTime,createTimeStart,createTimeEnd"],
			like: ["name"],
			orderBy: "createTime desc"
		});
		return {
			page
		};
	},
	/**
	 * @param {Object} 详情
	 */
	info: async function(e) {
		var id = this.params.id;
		if (!id) {
			return {};
		}
		var data = this.findFirst(await Order.doc(id).get());
		if (null == data) {
			return {};
		}
		return {
			data
		};
	},
	save: async function(e) {
		var data = this.getModel();
		//查询订单详情
		var ordetails = this.findFirst(await Orderlist.doc(data.oid).get());
		//
		if (null != ordetails) {
			var updatedoid = await Orderlist.doc(data.oid).update({
				output: Number(data.produceNumber) + Number(ordetails.output)
			});
			if (updatedoid != 1) this.fail("更新失败");
			//用户数据产量更新
			var Userdata = this.findFirst(await User.doc(data['customerID']).get());
			await User.doc(data['customerID']).update({
				produceTotal: Userdata.produceTotal + (Number(data.produceNumber) + Number(ordetails
					.output))
			});
			data = Object.assign(data, ordetails);
			data.orderid = data._id;
			delete data._id;
			delete data.oid;
			data.createTime = Date.now();
			// await orderLog.add(data);
			await Order.add(data);
			return this.ok();
		}
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
