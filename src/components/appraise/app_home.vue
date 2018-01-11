<!--liangyingmei-2017-12-14 APP首页-->
<template>
	<!--main content start-->
	<div id="main-content">
		<div class="wrapper">
			<div class="row" style="margin-right: 0;margin-left: 0;">
				<div class="col-md-12">
					<!--breadcrumbs start -->
					<ul class="breadcrumb">
						<li>
							<router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link>
						</li>
						<li class="active">{{titleName}}</li>
						<!--<li class="active">app首页</li>-->
					</ul>
					<!--breadcrumbs end -->
				</div>
			</div>
			<div class="row" style="margin-right: 0;margin-left: 0;">
				<div class="col-lg-12" id="appHomeList" :data="dataList">
					<div class="panel">
						<div class="panel-heading" v-for="item in dataList">
							<div class="row">
								<div class="col-md-4">{{item.name}}</div>
							</div>
							<div class="row" style="min-width:850px;margin-right: 0;margin-left: 0;">
								<div v-for="item2 in item.goods" class="col-lg-12" style="width: 300px;border: 1px solid #CCCCCC;padding: 10px;margin: 10px;float: left;">
									<div class="wow zoomIn text-center animated">
										<ul class="imgBox">
											<li><img class="lazy" :src="item2.logo" data-src="" alt="sss"></li>
										</ul>
										<div class="who-we-are-content text-center">
											<h5>服务ID： <span v-if = "item2.goodsId === -1">无</span><span v-else>{{item2.goodsId}}</span></h5>
											<h5>服务名称： <span>{{item2.name}}</span></h5>
										</div>
										<button title="编辑" class="btn btn-primary btn-xs" @click="modify(item2)"><i class="icon-pencil"></i>编辑</button>
										<button title="清空" class="btn btn-danger btn-xs" @click="confirm(item2)"><i class="icon-trash"></i>清空</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--修改app首页-->
		<div class="row" style="margin-right: 0;margin-left: 0;">
			<div class="col-lg-12">
				<div class="panel-body">
					<el-dialog :title="infoTitle" v-model="dialogVisible" size="tiny" >
						<el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" onsubmit="return false">
							<el-form-item label="图片预览">
                                <ul class="imgBox">
									<li><img class="lazy" :src="ruleForm.logo" data-src="" alt="sss"></li>
								</ul>
							</el-form-item>
							<el-form-item label="分类展示图片" id="form-data-case">
								<el-row>
									<el-col :span="8">
										<el-select placeholder="请选择" v-model="urlType">
											<el-option label="远程图片URL" value="1"></el-option>
											<el-option label="本地上传" value="2"></el-option>
										</el-select>
									</el-col>
									<el-col :span="16" v-if="urlType == 1">
										<input type="text" required class="form-control" placeholder="远程图片URL" v-model="ruleForm.logo">
									</el-col>
									<el-col :span="16" v-if="urlType == 2">
										<vue-core-image-upload text="分类展示图片" inputOfFile="file" v-bind:class="['btn','btn-primary','btn-sm']" v-bind:crop="false" v-bind:url="uploadUrl" v-bind:isXhr="true" v-bind:data="{type:3}" extensions="png,gif,jpeg,jpg" v-on:imageuploaded="imageuploaded" v-on:imageuploading="imageuploading">
										</vue-core-image-upload>
									</el-col>
								</el-row>
							</el-form-item>
							<el-form-item label="服务ID：" prop="goodsId">
								<el-input v-model="ruleForm.goodsId"></el-input>
							</el-form-item>
							<el-form-item label="服务名称：" prop="name">
								{{ruleForm.name}}
							</el-form-item>
							<el-form-item>
								<el-button @click="dialogVisible = false">取消</el-button>
								<el-button type="primary" @click="handleSave('ruleForm')" :loading="editLoading">确认</el-button>
							</el-form-item>
						</el-form>
					</el-dialog>
				</div>
			</div>
		</div>
		<!-- 清空确认 -->
		<confirm v-on:confirm="deleteItem" :message="message" :title="title"></confirm>
	</div>
	<!--main content end-->
</template>
<style type="text/css">
	.imgBox li {
		list-style: none;width: 270px;height: 180px;background: #FFF;border: 1px solid #FFF;text-align: center;margin: 5px;line-height: 180px;
	}
	.imgBox img {max-width: 270px;max-height: 150px;margin: 15px 0;vertical-align: middle;
	}
	.el-dialog{width: 500px;}
</style>
<script>
	import Page from 'components/common/Page';
	import appHome from 'api/appraise';
	import confirm from 'components/common/confirm';
	import VueCoreImageUpload from 'components/common/vue.core.file.upload';

	export default {
		components: { confirm: confirm, 'vue-core-image-upload': VueCoreImageUpload },

		data: function() {
			var checkMoney = (rule, value, callback) => {
				if(!value) {
					return callback(new Error('输入不能为空'));
				}
				setTimeout(() => {
					var reg = /^\d+(\.\d+)?$/;
					if(!reg.test(value)) {
						callback(new Error('请输入数字'));
					} else callback();
				}, 1000);
			};
			return {
				dataList: [],
				delUuid: "",
				ruleForm: {
					uuid: '',
					name: '',
					logo: '', //展示图片
					goodsId: '',
					appType:'',
					homeType:''
					
				},
				rules: {
					goodsId: [
						{ validator: checkMoney, required: true, message: '请输入正整数ID', trigger: 'blur' }
					]
				},
				urlType: '2',
				uploadUrl: '',
				dialogVisible: false,
				editLoading: false,
				type: 1,
				message: '',
				title: '是否	清除该条信息? ',
				infoTitle: '编辑标签'
			}
		},
		computed: {
			appType: function() {
				return this.$route.meta.type;
			},
			titleName: function() {
				return this.$route.meta.titleName;
			}
		},
		watch: {
			$route() {
				this.init();
			}
		},
		mounted: function() {
			this.$nextTick(function() {
				this.init();
			});
		},
		methods: {
			init: function() {
				this.uploadUrl = appHome.upload;
				//let appType = 1;//appType:1;//Y	int	1:APP首页,2:微信公众号首页
				appHome.appHomeList(this, 0, this.appType).then(function(response) {
					let body = response.body;
					let opt = [];
					if(body && body.code == 1) {
						this.dataList = body.data;
						return;
					}
				}, function(response) {
					console.log('error:', response);
				});

			},
			confirm: function(item) { //清除首页数据确认
				this.ruleForm.uuid = item.uuid;
				this.message = '服务名称：' + item.name;
				$('#myConfirm').modal();
			},
			// 删除按钮
			deleteItem: function() {
				if(this.ruleForm.uuid < 0) return;
				$("body").mLoading("show");
				appHome.delappHomeList(this, this.ruleForm.uuid).then(function(response) {

					let body = response.body;
					this.$message(body.msg);
					if(body && body.code == 1) {
						this.init();
					}
				}, function(response) {
					console.log('error:', response);
				});
			},
			modify: function(item) { //编辑服务ID和图片

				this.dialogVisible = true;
				this.infoTitle = '修改';
				this.ruleForm.uuid = item.uuid;
				this.ruleForm.name = item.name;
				this.ruleForm.logo = item.logo;
				this.ruleForm.appType = item.appType;
				this.ruleForm.homeType = item.homeType;
				if(item.goodsId == -1) {
					this.ruleForm.goodsId = "无";
				} else {
					this.ruleForm.goodsId = item.goodsId;
				}
				this.type = 2;
				
			},
			handleSave: function(formName) {
				let _this = this;
				this.$refs[formName].validate(function(valid) {
					if(valid) {
						_this.editLoading = true;
						appHome.editappHomeList(_this, _this.ruleForm).then(function(response) {
							let body = response.body;
							_this.$message(body.msg);
							_this.editLoading = false;
							if(body && body.code == 1) {
								_this.dialogVisible = false;
								_this.init();
								return;
							}
						}, function(response) {
							console.log('error:', response);
						});
					}
					return false;
				});
			},
			imageuploading: function(response) {
				$('#form-data-case').mLoading({
					text: '正在上传，请稍后...'
				});
			},
			imageuploaded: function(response) {
				$('#form-data-case').mLoading("hide");
				this.$message(response.msg);
				if(response && response.code == 1) {
					let data = response.data;
					this.ruleForm.logo = data.url;
					return;
				}
			}
		}
	}
</script>