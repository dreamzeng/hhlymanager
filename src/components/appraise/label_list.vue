<!--liangyingmei-2017-12-19 标签列表页面-->
<template>
	<!--main content start-->
	<div id="main-content">
		<div class="wrapper">
			<div class="row">
				<div class="col-md-12">
					<!--breadcrumbs start -->
					<ul class="breadcrumb">
						<li>
							<router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link>
						</li>
						<li class="active">评价管理</li>
						<li class="active">标签列表</li>
					</ul>
					<!--breadcrumbs end -->
				</div>
			</div>
			<div class="row">
				<div class="col-lg-12">
					<div class="panel" :data="processdataList">
						<div class="panel-heading">
							<div class="row">
								<div class="col-md-4">标签列表</div>
								<div class="col-md-4 col-md-offset-4" style="text-align: right">
									<a href="javascript:;" @click="labelAdd" class="btn btn-info  btn-sm">
										<span class="glyphicon glyphicon-plus" aria-hidden="true"></span> 新增标签
									</a>
								</div>
							</div>
						</div>
						<div class="panel-heading" style="border: 0;padding-bottom: 0;" v-for="item in optionsTitle">
							<div class="row">
								<div class="col-md-4">{{item.title}}</div>
							</div>
							<div class="dataTables_wrapper form-inline" id="list-content">
								<div class="table-scrollable">
									<div class="panel-body panel-body-rest">
										<table class="table table-bordered">
											<thead>
												<tr>
													<th style="min-width: 350px;">标签</th>
													<th>分值</th>
													<th>评论次数</th>
													<th>操作</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="item2 in item.labels">
													<th style="min-width: 350px;">{{item2.name}}</th>
													<th>{{item2.score}}</th>
													<th>{{item2.commentNum}}</th>
													<th>
														<button title="编辑" class="btn btn-primary btn-xs" @click="modify(item2)"><i class="icon-pencil"></i>编辑</button>
														<button title="删除" class="btn btn-danger btn-xs" @click="confirm(item2)"><i class="icon-trash"></i>删除</button>
													</th>
												</tr>
												<tr v-show="item.labels.length<1">
		                                            <td colspan="4" align="center">暂无无数据。。。</td>
		                                        </tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--新建类型-->
		<el-dialog :title="infoTitle" v-model="dialogVisible" size="tiny">
			<el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" onsubmit="return false">
				<el-form-item label="标签名称" prop="name">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
				<el-form-item label="分值" prop="score">
					<el-input v-model="ruleForm.score"></el-input>
				</el-form-item>
				<el-form-item label="标签分组" prop="category">
					<el-select v-model="ruleForm.category" filterable placeholder="请选择标签类型">
						<el-option v-for="item in options" :key="item.category" :label="item.title" :value="item.category">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button @click="dialogVisible = false">取消</el-button>
					<el-button type="primary" @click="handleSave('ruleForm')" :loading="editLoading">确认</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

		<!-- 删除确认 -->
		<confirm v-on:confirm="deleteItem()" :message="message" :title="title"></confirm>
	</div>
	<!--main content end-->
</template>

<script>
	import appraise from 'api/appraise';
	import confirm from 'components/common/confirm';

	export default {
		components: { confirm: confirm },
		data: function() {
			var checkMoney = (rule, value, callback) => {
				if(!value) {
					return callback(new Error('输入不能为空'));
				}
				setTimeout(() => {
					var reg = /^([1-5]){1}$/;
					if(!reg.test(value)) {
						callback(new Error('请输入1-5的数字'));
					} else callback();
				}, 1000);
			};
			return {
				delUuid: "",
				optionsTitle: [],
				options: [
					{"title":"律师态度",category:2},
					{"title":"服务过程",category:1}
				],
				processdataList: [],
				ruleForm: {
					category: '',
					name: '',
					score: '',
				},
				rules: {
					name: [
						{ required: true, message: '请输入名称', trigger: 'blur' }
					],
					score: [
						{ validator: checkMoney, required: true, message: '请输入1-5的分值', trigger: 'blur' }
					],
					category: [
						{ required: true, message: '请选择标签类型', trigger: 'change', type: "number" }
					]
				},
				dialogVisible: false,
				editLoading: false,
				type: 1,
				rowItemId: -9999,
				message: '',
				title: '是否删除该条信息? ',
				infoTitle: '新增'
			}
		},
		mounted: function() {
			this.$nextTick(function() {
				this.init();
			});
		},
		methods: {
			init: function() {
				appraise.labelList(this).then(function(response) {
					let body = response.body;
					if(body && body.code == 1) {
						let data = body.data;
						this.optionsTitle = data;
				
						return;
					}
				}, function(response) {
					console.log('error:', response);
				});
			},
			confirm: function(item) { //删除确认
				this.delUuid = item.uuid;
				//				this.rowItemId = item.id;
				this.message = '标签名称：' + item.name;
				$('#myConfirm').modal();
			},
			// 删除按钮
			deleteItem: function() {
				//				console.log(uuid);
				//				this.delUuid = item.uuid;
				if(this.delUuid < 0) return;
				$("body").mLoading("show");
				appraise.labelDel(this, this.delUuid).then(function(response) {
					let body = response.body;
					this.$message(body.msg);
					if(body && body.code == 1) {
						this.init();
					}
				}, function(response) {
					console.log('error:', response);
				});
			},
			labelAdd: function() {
				this.dialogVisible = true;
				this.infoTitle = '新增标签';
				this.ruleForm.name = '';
				this.ruleForm.score = '';
				this.ruleForm.category = '';
				this.type = 1;
				this.init();
			},
			modify: function(item) {
				this.delUuid = item.uuid;
				console.log(item);
				this.dialogVisible = true;
				this.infoTitle = '编辑标签';
				this.ruleForm.name = item.name;
				this.ruleForm.score = item.score;
				this.ruleForm.category = item.category;
				this.type = 2;
				this.init();
			},
			handleSave: function(formName) {
				let _this = this;
				let commitType = 'labelAdd';
				if(this.type == 2) {
					commitType = 'labelPut';
					this.$refs[formName].validate(function(valid) {
						if(valid) {
							_this.editLoading = true;
							appraise[commitType](_this, _this.ruleForm, _this.delUuid).then(function(response) {
								let body = response.body;
								_this.$message(body.msg);
								_this.editLoading = false;
								if(body && body.code == 1) {
									_this.dialogVisible = false;
									this.init();
									return;
								}
							}, function(response) {
								console.log('error:', response);
							});
						}
						return false;
					});
				} else {
					this.$refs[formName].validate(function(valid) {
						if(valid) {
							_this.editLoading = true;
							appraise[commitType](_this, _this.ruleForm).then(function(response) {
								let body = response.body;
								_this.$message(body.msg);
								_this.editLoading = false;
								if(body && body.code == 1) {
									_this.dialogVisible = false;
									this.init();
									return;
								}
							}, function(response) {
								console.log('error:', response);
							});
						}
						return false;
					});
				}

			}
		}
	}
</script>