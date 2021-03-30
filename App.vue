<script>
	export default {
		globalData:{
			debug : true
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		onPageNotFound:function(e){
			console.error("page is not found , please check whether registered in the pages.json",e);
		}
	}
</script>

<style lang="scss">
	@import './common/base-cloud.scss';
</style>
