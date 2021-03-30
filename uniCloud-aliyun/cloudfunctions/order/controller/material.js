'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
const $ = db.command.aggregate;
const Material = db.collection("t_rawMaterial");

module.exports = {
	/**
	 * @param {Object} e
	 * 原材料查询
	 */
	list: async function(e) {
		var {
			pageNumber,
			pageSize
		} = this.params;
		var page = await this.paginate({
			pageNumber,
			pageSize,
			collection: Material,
			eq: ["actionName", "userName"],
			range: ["createTime,createTimeStart,createTimeEnd"],
			like: ["name"],
			orderBy: "createTime desc"
		});
		return {
			page
		};
	}
};
