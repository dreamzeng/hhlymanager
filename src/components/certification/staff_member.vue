<!--liangyingmei-2017-12-21 企业认证-员工列表-->
<template>
	<div id="main-content">
		<div class="wrapper">
			<div class="row">
				<div class="col-md-12">
					<!--breadcrumbs start -->
					<ul class="breadcrumb">
						<li>
							<router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link>
						</li>
						<li @click="cancer">
							<a href="javascript:void(0)">认证管理</a>
						</li>
						<li>
							<router-link :to="{name: 'en_certification'}">
								<a href="javascript:void(0)">企业认证列表</a>
							</router-link>
						</li>
						<li click="active">员工列表</li>
					</ul>
					<!--breadcrumbs end -->
				</div>
			</div>
			<div class="row">
				<div class="col-lg-12">
					<div class="panel">
						<div class="panel-heading">
							<div class="row">
								<div class="col-md-4">员工列表</div>
								<div class="col-md-4 col-md-offset-4" style="text-align: right">
									<a href="javascript:;"  @click="enCertificationAdd" class="btn btn-info  btn-sm">
										<span class="glyphicon glyphicon-plus" aria-hidden="true"></span> 新增
									</a>
								</div>
							</div>
						</div>
						<div class="panel-body">
							<div class="row">
								<div class="col-lg-12">
									<div style="position: relative;width: 100%;">
										<input type="file" id="cImage" @change="chooseExcel" style="position: absolute;width: 170px;height: 36px;opacity: 0;cursor: pointer" title="上传名单">
										<el-button type="primary">批量导入员工名单<i class="el-icon-upload el-icon--right"></i></el-button>
										<el-button type="text" @click="downLoad">下载员工通讯录模板.xls</el-button>
										
										<!-- 搜索 -->
										<el-form :inline="true" :model="param" @submit.prevent="" style='padding-top: 15px;'>
											<el-input v-model="param.name" placeholder="搜索用户" style="width: 250px;"></el-input>
											<el-input v-model="param.phone" placeholder="手机号" style="width: 150px;"></el-input>
											<el-button type="danger" @click="searchCou">搜索</el-button>
										</el-form>
										<!-- 搜索结束 -->
										<tableList @isPage="isPage" ref="table" :indexNo="indexNo" :select="select" :page_total="page_total" :limit="param.limit" :table_data="table_data" :index_list="index_list" :prop_name="prop_name">
											<el-table-column label="操作">
												<template slot-scope="scope">
													<el-button type="text" @click="del(scope.row.uuid,scope.row.name)">剔除</el-button>
												</template>
											</el-table-column>
										</tableList>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
		</div>
		
		<!--新建类型-->
		<el-dialog  v-model="dialogVisible" size="tiny">
			<el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" onsubmit="return false" style="min-width:300px">
				<el-form-item label="用户名：" prop="name">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
				<el-form-item label="手机号码：" prop="phone">
					<el-input v-model="ruleForm.phone"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleSave" :loading="editLoading">确认</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		
	</div>
</template>
<style scoped>
	.flex {
		display: flex;
		text-align: right;
		width: 80%;
		margin-top: 20px;
	}
	
	.flex-title {
		min-width: 150px;
		font-size: 16px
	}
	
	.red {
		color: red;
	}
</style>
<script>
	import tableList from 'components/common/Ele-table.vue'
	import certification from 'api/certification';
	export default {
		data() {
			var checkMoney = (rule, value, callback) => {
				if(!value) {
					return callback(new Error('输入不能为空'));
				}
				setTimeout(() => {
					var reg = /^\d+(\.\d+)?$/;
					if(!reg.test(value)) {
						callback(new Error('请输入电话'));
					} else callback();
				}, 1000);
			};
			return {
				multipleSelection: [],
				msgId: this.$route.query.uuid,
				isClass: true,
				isStatus: "push",
				dialogVisible: false,
				editLoading: false,
				indexNo: true,
				select: false,
				page_total: 0,
				param: {
					limit: 10,
					page: 1,
				},
				table_data: [],
				index_list: [
					{ "label": "姓名" },
					{ "label": "联系人电话" },
					{ "label": "审核时间" }
				],
				prop_name: ["name", "phone", "authTime"],
				ruleForm: {
					companyUuid: this.$route.query.uuid,
					name: '',
					phone: '',
				},
				rules: {
					name: [
						{ required: true, message: '请输入名称', trigger: 'blur' },
						{min:0, max:30, message:"最多可输入30字符", trigger:'blur'}
					],
					phone: [
						{ validator: checkMoney, required: true, message: '请输入电话', trigger: 'blur' },
						{min:11, max:11, message:"最多可输入30字符", trigger:'blur'}
					]
				},
				value: '',
			}
		},
		methods: {
			cancer() {
				this.$router.go(-1);
			},
			downLoad() {
				let url = process.env.NODE_ENV == 'development' ? 'static' : 'resource';
				window.open(url + '/excel/user_export_templete.xlsx')
			},
			
			chooseTime(data) {
				this.value = data;
			},
			del(id, userName) {
				this.$confirm('确认删除' + userName + '用户？', '提示')
					.then(_ => {
						certification.msg_userDelete(this, id).then(res => {
							this.$message(res.body.msg);
							this.msg_userPage();
						})
					})
					.catch(_ => {});
			},
			chooseExcel() {
				let formData = new FormData(),
					$file = document.getElementById("cImage").files;
					formData.append('file', $file[0]);
				if($file.length > 0) {
					if($file[0].name.substring($file[0].name.lastIndexOf('.') + 1) == "xlsx") {
						certification.upload_exlsUser(this,this.msgId,formData).then(res => {
							if(res.body.code === 1) {
								this.$message('上传'+res.body.data.total+'条，成功了'+res.body.data.success+'条');
								this.msg_userPage();
							} else {
								this.$alert(res.body.msg, '注意事项', {
									confirmButtonText: '确定',
								});
							}
						})
					} else {
						this.$alert("仅支持上传后缀为*.xlsx的excel表格，请确认上传文件正确", '注意事项', {
							confirmButtonText: '确定',
						});
					}
				}
			},
			msg_userPage() {
				let data = {
					companyUuid: this.msgId,
					name:this.param.name,
					phone:this.param.phone,
					page: this.param.page,
					limit: this.param.limit
				};
				certification.msg_userPage(this, data).then(res => {
					if(res.body.code === 1) {
						console.log(res.body.data.items);
						this.table_data = res.body.data.items;
						this.page_total = res.body.data.total;
					}
				});
			},
			isPage(data) {
				this.param.page = data;
			},
			init() {
				this.msg_userPage();
			},
			searchCou(){
				this.init();
			},
			enCertificationAdd(){
				this.dialogVisible = true;
			},
			handleSave(){
				//员工信息单个添加
				let userdata = {
					companyUuid: this.ruleForm.companyUuid,
					name:this.ruleForm.name,
					phone:this.ruleForm.phone
				};
				certification.msg_userAdd(this,userdata).then(function(response){
	                    let body = response.body;
	                    this.$message(body.msg);
	                    if (body && body.code == 1) {
	                    	this.dialogVisible = false;
	                    	this.msg_userPage();
	                    	return;
	                    }
	                },function(res){
	                    console.log('error:',res);
	                });
			}
		},
		mounted() {
			this.ruleForm.companyUuid = this.$route.query.uuid;
			this.init();
		},
		
		components: {
			tableList
		},
		watch: {
			"param.page" (to, from) {
				this.msg_userPage();
			}
		}

	}
</script>