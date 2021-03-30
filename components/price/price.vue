<template>
	<text class="base-cloud">
		<text class="price avanti" :class="{noPrefix:!showPrefix}">
			<block v-if="price != 0">
				<text v-if="isBill && isPosive">
					+
				</text>
				<text v-if="!isPosive">
					-
				</text>
			</block>
			{{intPrice}}
			<text class="point" v-if="dotPrice">.{{dotPrice}}</text>
		</text>
	</text>
</template>

<script>
	export default {
		name: 'price',
		props: {
			price: {
				type: [Number,String],
				default: 0.00
			},
			showPrefix:{
				default : true 
			},
			fixed:{ //保留小数点的位数，如需自适应请填写-1
				default:-1
			},
			isBill :{
				default : false 
			},
		},
		data() {
			return {
				
			};
		},
		computed: {
			
			isPosive : function(e){
				return this.price > 0 ;
			},
			
			intPrice:function(e){
				if(typeof this.price == "undefined"){
					return "" ;
				}
				return Math.abs(parseInt(this.price)) ;
			},
			
			dotPrice:function(e){
				if(typeof this.price == "undefined"){
					return "" ;
				}
				var dotPrice = Math.abs(this.price)%1 ;
				if (this.fixed == -1) {
					dotPrice = parseInt(dotPrice.toFixed(2)*100)/100 ;
					return dotPrice == 0 ? "" : dotPrice.toString().replace("0.","") ;
				}
				dotPrice = dotPrice.toFixed(this.fixed) ;
				return dotPrice.toString().replace("0.","") ;
			}
			
		}
	}
</script>

<style>

</style>
