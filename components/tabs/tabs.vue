<template>
	<view class="baseCloud tabRefs" id="tabs">
		<block v-if="isAuto || computing">
			<view class="father">
				<scroll-view @scroll="onScroll" :scroll-x="true" :scroll-into-view="`t_${curIndex}`" class="bb noBreak" :show-scrollbar="false">
					<!-- 标签元素 -->
					
					<view :id="`t_${index}`" v-for="( item , index) in listSync" :key="index" @tap="changeItem(index,item)"
					
					:style="item.style"
					
					class="inline tabRefs" :class="item.classNames">
						
						<view class="flex lt">
							<view class="mr5" v-if="item[iconKey]" :class="item[iconKey]"></view>
							
							<view class="father">
								{{item[titleKey]}}
								<view class="abs top-5 right-20">
									<view v-if="item.count" class="rds redBg fz12 flex ct  toBig" :class="item[countKey] < 10 ? 'w15 h15' : 'plr5 h20'">
										{{item[countKey]}}
									</view>
								</view>
							</view>
							
						</view>
						
					</view>
					
				</scroll-view>
				
				<!-- 底部的滚动棒 -->
				<view class="abs left bottom bb2 rds23 transition" 
				:style="{ 
					'border-color' : activeColor , 
					'margin-left' : (currentEleData.width - lineWidth)/2 + 'px' , 
					'width' : lineWidth + 'px' ,
					'left' : barLeft + 'px' }"></view>
			</view>
		</block>
		
		
		<!-- 可均分 -->
		<block v-else-if="isAverage">
			
			<view class="father">
				
				<view class="gridNoPd gridNoMb bb" :class="collumnClassName">
					<view class="tabRefs" v-for="( item , index) in list" :key="index" @tap="changeItem(index,item)"
					:style="{color : index == curIndex ? activeColor : ( item.disabled ? '#777' : color ) }"
					
					:class="{ 
						'disabled' : item.disabled ,
						'hover7' : !item.disabled && index != curIndex ,
						'plr ptb8 fz12' : size == 'sm' , 
						'plr ptb10' : size == 'md' ,
						'plr20 ptb fz16' : size == 'lg' }">
						<view class="flex ct">
							
							<view class="mr5" v-if="item[iconKey]" :class="item[iconKey]"></view>
							
							<view class="father">
								{{item[titleKey]}}
								<view class="abs top-5 right-20">
									<view v-if="item.count" class="rds redBg fz12 flex ct h20 toBig" :class="item[countKey] < 100 ? 'w20  ' : 'plr5'">
										{{item[countKey]}}
									</view>
								</view>
							</view>
							
						</view>
					</view>
				</view>
				
				<!-- 底部的滚动棒 -->
				<view class="abs left bottom bb2 rds23 transition"
				:style="{ 
					'border-color' : activeColor , 
					'width' : lineWidth + 'px' ,
					'left' : averageBarLeft + 'px' }"></view>
				
			</view>
			
		</block>
		
	</view>
</template>

<script>
	export default {
		name : 'tabs' ,
		model:{
			prop:"current" ,
			event : "bindModel"
		},
		props:{
			list : {
				type : Array ,
				default : function(e){
					return [] ; //title、value、icon、disabled
				}
			},
			current : {
				type : Number ,
				default : 0
			},
			color : { //未选中时的颜色
				type : String ,
				default : '#000'
			},
			activeColor:{
				type : String ,
				default : "#0e0d0c"
			},
			titleKey :{
				type : String ,
				default : "title"
			},
			valueKey :{
				type : String ,
				default : "value"
			},
			iconKey :{
				type : String ,
				default : "icon"
			},
			countKey :{ //数量
				type : String ,
				default : "count"
			},
			mode:{
				type : String , //average：均分、auto：自适应、justify：屏幕宽度小于476且可均分时为average，否则为auto
				default : "auto"
			},
			justifyWidth : {
				type : Number , //自适应屏幕宽度，mode=justify有效
				default : 476
			},
			plr:{
				type : Number , //左右边距，average模式下无效
				default : 15
			},
			ptb:{
				type : Number , //上下边距，average模式下无效
				default : 12
			},
			lineWidth : {
				type : Number , //底部线条长度
				default : 30
			}
		},
		
		data(e){
			return {
				curIndex : -1 ,
				refData : null ,
				scrollLeft : 0 ,
				computing : true 
			} ;
		},
		
		mounted() {
			//组件渲染完成后，查询组件的坐标信息
			this.$nextTick(()=>{
				const query = uni.createSelectorQuery().in(this);
				query.selectAll('.tabRefs').boundingClientRect(data => {
					if(null === this.refData){ //仅初始化一次
						this.refData = data || [] ;
						this.computing = false ;
					}
				}).exec();
			});
		},
		
		computed:{
			
			listSync:function(res){
				return this.list.map((item,index)=>{
					item.style = this.getItemAutoStyle(item,index);
					item.classNames = this.getItemAutoClass(item,index);
					return item ;
				});
			},
			
			collumnClassName:function(res){
				return `g${this.list.length}` ;
			},
			
			
			
			/**
			 * 子元素的总宽度小于父级的总宽度时可平均分布
			 */
			canAverage : function(res){
				if( null == this.refData || this.refData.length == 0 ){
					return false ;
				}
				var maxWidth = this.refData.find(item=>item.id == 'tabs').width ;
				var perWidth = maxWidth / this.list.length ; //若均分，每一份的宽度
				var allContain = true ; //均分的宽度是否可以容纳所有的元素
				var totalWidth = this.refData.reduce( (total,item)=>{
					if(item.id == 'tabs'){
						return total ;
					}
					if (item.width > perWidth) {
						allContain = false ;
					}
					return total + item.width ;
				},0);
				return totalWidth <= maxWidth && allContain ;
			},
			
			currentEleData:function(res){
				if(null == this.refData){
					return {} ;
				}
				return this.refData.find(item => item.id == `t_${this.curIndex}`) ;
			},
			
			tabsEleData : function(res){
				if(null == this.refData){
					return {} ;
				}
				return this.refData.find(item => item.id == 'tabs') ;
			},
			
			averageBarLeft:function(res){
				var perWidth = this.tabsEleData.width/this.list.length ;
				return perWidth * this.curIndex + perWidth/2 - this.lineWidth/2 ;
			},
			
			isAuto : function(res){
				var windowWidth = uni.getSystemInfoSync().windowWidth ;
				var isJustifyAuto = this.mode == 'justify' && ( !this.canAverage || windowWidth > this.justifyWidth ) ;
				return this.mode == 'auto' || !this.canAverage || isJustifyAuto ;
			},
			
			isAverage : function(res){
				var windowWidth = uni.getSystemInfoSync().windowWidth ;
				var isJustifyAverage = this.mode == 'justify' && this.canAverage && windowWidth <= this.justifyWidth ;
				return this.mode =='average' || isJustifyAverage ;
			},
			
			barLeft : function(res){
				return this.currentEleData.left - this.tabsEleData.left - this.scrollLeft ;
			},
			
		},
		
		watch:{
			current : {
				handler : function(e){
					this.curIndex = this.current ;
				},
				immediate: true
			}
		},
		
		methods:{
			
			getItemAutoClass : function(item,index){
				var classes = [] ;
				if (item.disabled) {
					classes.push("disabled") ;
				}
				if (!item.disabled && index != this.curIndex) {
					classes.push("hover7") ;
				}
				return classes.join(" ") ;
			},
			
			getItemAutoStyle : function(item,index){
				var color = index == this.curIndex ? this.activeColor : ( item.disabled ? '#777' : this.color ) ;
				return `color : ${color} ; padding: ${this.ptb}px ${this.plr}px ;` ;
			},
			
			changeItem : function(current , item){
				if(this.curIndex == current || item.disabled){
					return ;
				}
				this.curIndex = current ;
				this.$emit("bindModel" , current ) ;
				this.$emit("change" , {
					detail : { current , item , value : item[this.valueKey] }
				});
			},
			
			onScroll:function(res){
				this.scrollLeft = res.detail.scrollLeft ;
			},
		},
		
	}
</script>

<style lang="scss">
	@keyframes toBig{
		from{
			transform: scale(0);
		}
		to{
			transform:scale(1);
		}
	}
	.toBig{
		animation : toBig 0.2s ease-in-out;
	}
	.transition{
		transition:all 0.2s ease-in-out;
	}
</style>
