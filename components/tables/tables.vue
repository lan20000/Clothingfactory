<template>
	<view class="base-cloud">
		<view class="pd15 ">
			<view class="table-responsive" v-if="list.length > 0 || !showEmpty">
				<table class="table">
					<tbody>
						<tr class="thead">
							<slot name="thead"></slot>
						</tr>
						<slot name="tbody"></slot>
						<slot></slot>
					</tbody>
				</table>
			</view>
			
			<empty v-if="showEmpty" :list="list"></empty>
			
		</view>
	</view>
</template>

<script>
	export default {
		name:"tables" ,
		props:{
			list : {
				default : function(e){
					return [] ;
				}
			},
			showEmpty:{
				default : true 
			}
		}
	}
</script>
<style lang="scss">
	.table-responsive{
		width: 100%;
		margin-bottom: 10px;
		overflow-y: hidden;
		-ms-overflow-style: -ms-autohiding-scrollbar;
		min-height: .01%;
		overflow-x: auto;
		.table,table{
			width: calc(100% - 1px);
		}
	}
</style>
