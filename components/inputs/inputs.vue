<template>
	<view class="baseCloud">
		
		<labels 
			:noPadding="noPadding" 
			:isVertical="isVertical" 
			:title="title" 
			:titleWidth="titleWidth" 
			:class="{'none' : type == 'hidden'}"
		>
			<view class="bd rds2">
				<view class="fixAutoNoPd middle">
					<view class="addOn plr15 w1p noBreak text-center bt bb bl rdsTl2 rdsBl2 hover" v-if="addOnLeft"  @tap="tapAddOnLeft">
						{{addOnLeft}}
					</view>
					<view class="" :class="{'grayBg disabled':disabled || hasHiddenValue}" >
						
						<!-- #ifdef H5 || APP-PLUS -->
						<input v-on="inputListeners" :name="name" v-bind="$attrs"  v-bind:value="valueSync" :type="type" :disabled="disabled" class="pd10" :class="{'black disabled':disabled || hasHiddenValue}" :maxlength="maxlength"/>
						<input type="text" :name="name" :value="value" :maxlength="-1" class="none" v-if="hasHiddenValue">
						<!-- #endif -->
						
						
						<!-- #ifdef MP-WEIXIN || MP-QQ -->
						<input
							@input="onInput"
							:name="name"
							:value="valueSync" 
							:type="type" 
							:disabled="disabled" 
							class="pd10" 
							:class="{'black disabled':disabled || hasHiddenValue}" 
							:maxlength="maxlength"
						/>
						<input 
							v-if="hasHiddenValue"
							type="text" 
							:value="value" 
							:maxlength="-1" 
							class="none" 
						/>
						<!-- #endif -->
						
						
					</view>
					<view class="w20 bIcon-close op2 hover" v-if="isShowClearIcon" @tap="clear"></view>
					<view class="addOn plr15 w1p text-center bt bb br rdsTr2 rdsBr2 hover noBreak" v-if="addOn" @tap="tapAddOn">
						{{addOn}}
					</view>
				</view>
			</view>
		</labels>
		
		
	</view>
	
</template>

<script>
	export default {
		name: "inputs",
		// #ifndef APP-PLUS || H5
		behaviors: ['uni://form-field'],
		// #endif
		model: {
			prop: "value",
			event: "bindModel"
		},
		props: {
			noPadding: {
				type: Boolean,
				default: false
			},
			name:{
				default : "" 
			},
			value:{
				default : "" 
			},
			title:{
				default : "" 
			},
			titleWidth:{
				default : 90
			},
			isVertical:{
				default :  uni.getSystemInfoSync().windowWidth <= 476  
			},
			hiddenValue: {
				default: ""
			},
			type: {
				default: "text"
			},
			disabled:{
				default : false 
			},
			addOn: {
				default: ""
			},
			addOnLeft: {
				default: ""
			},
			showClearIcon:{
				default : true 
			},
			maxlength:{
				default:-1
			}
		},
		
		computed: {
			// #ifdef APP-PLUS || H5
			inputListeners: function() {
				var vm = this ;
				return Object.assign({}, this.$listeners , {
					input: (event) => {
						vm.valueSync =  event.target.value ;
						vm.$emit('input', event);
						vm.$emit('bindModel', event.target.value);
					}
				});
			},
			// #endif
			hasHiddenValue:function(e){
				return !!this.hiddenValue || this.hiddenValue === false || this.hiddenValue === 0 ;
			},
			isShowClearIcon:function(e){
				return this.showClearIcon && (!!this.valueSync || this.valueSync === false || this.valueSync === 0 ) && !this.disabled && !this.hasHiddenValue ;
			},
		},
		watch:{
			value : {
				handler : function(e){
					this.valueSync = this.value ;
				},
				immediate : true 
			},
		},
		data() {
			return {
				valueSync: ''
			};
		},
		methods: {
			tapAddOn:function(e){
				this.$emit("tapAddOn",e);
			},
			tapAddOnLeft:function(e){
				this.$emit("tapAddOnLeft",e);
			},
			clear:function(e){
				this.valueSync = "" ;
				e.detail.value = "" ;
				this.$emit('input', e);
				this.$emit('bindModel', "");
			},
			// #ifndef APP-PLUS || H5
			onInput:function(e){
				this.$emit('input', e.detail.value );
			},
			// #endif
			
		}
	}
</script>

<style>
.addOn{
	color: #555;
	background-color: #eee;
	border: 1px solid #e6e6e6;
}
</style>
