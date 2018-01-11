<!--liangyingmei-2017-01-04 企业认证列表--单个认证信息添加或编辑-->
<template>
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li @click="back"> <a href="javascript:void(0)">认证管理</a></li>
                        <li click="active">企业认证列表</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">企业认证</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">
								</div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline reqcontent" id="list-content">
                            <!--企业信息结束-->
							<div class="row" style="margin-right: 0;margin-left: 0;">
								<div class="col-lg-12">
									<div class="panel-body">
										<el-form ref="enReparam" :model="enReparam" :rules="rules" label-width="120px" onsubmit="return false">
											<el-form-item label="企业目前处于：" prop="companyStage">
												<el-select v-model="enReparam.companyStage" filterable label="孵化期" value="INCUBATION" class="elinput500">
													<el-option  key="INCUBATION" label="孵化期" value="INCUBATION">
													</el-option>
													<el-option  key="STARTUP" label="初创期" value="STARTUP">
													</el-option>
													<el-option  key="DEVELOPMENT" label="发展期" value="DEVELOPMENT">
													</el-option>
													<el-option  key="MATURE" label="成熟期" value="MATURE">
													</el-option>
													<el-option  key="OTHER" label="其他" value="OTHER">
													</el-option>
													
												</el-select>
											</el-form-item>
											<el-form-item label="企业名称：" prop="companyName">
												<el-input v-model="enReparam.companyName" class="elinput500" ></el-input>
											</el-form-item>
											<el-form-item label="联系人：" prop="contactName">
												<el-input v-model="enReparam.contactName" class="elinput500" ></el-input>
											</el-form-item>
											
											<el-form-item label="联系方式：" prop="contactTel">
												<el-input v-model="enReparam.contactTel" class="elinput500"></el-input>
											</el-form-item>
											<el-form-item label="营业执照号：" prop="businessLicenseNo">
												<el-input v-model="enReparam.businessLicenseNo" class="elinput500" ></el-input>
											</el-form-item>
											<el-form-item label="企业地址：" prop="address">
												<el-input v-model="enReparam.address" class="elinput500" ></el-input>
											</el-form-item>
											<el-form-item label="分类展示图片" id="form-data-case" class="elinput600">
												<el-row>
													<el-col :span="8" style="padding: 0 10px;">
														<el-select placeholder="请选择" v-model="urlType">
															<el-option label="远程图片URL" value="1"></el-option>
															<el-option label="本地上传" value="2"></el-option>
														</el-select>
													</el-col>
													<el-col :span="16" v-if="urlType == 1">
														<input type="text" required class="form-control" placeholder="远程图片URL" v-model="enReparam.businessLicenseImage">
													</el-col>
													<el-col :span="16" v-if="urlType == 2">
														<vue-core-image-upload text="上传营业执照" inputOfFile="file" v-bind:class="['btn','btn-primary','btn-sm']" v-bind:crop="false" v-bind:url="uploadUrl" v-bind:isXhr="true" v-bind:data="{type:3}" extensions="png,gif,jpeg,jpg" v-on:imageuploaded="imageuploaded" v-on:imageuploading="imageuploading">
														</vue-core-image-upload>
													</el-col>
												</el-row>
											</el-form-item>
											<el-form-item v-if="businessLicenseImageURL.length >0"> 
												<ul class="imgBox">
													<li  v-for="(image,index) in businessLicenseImageURL" >
														<div class="closeBouncedBtn"  @click="imageupDel(index)">
				                                        	<img src="../../../static/img/close.png"/>
				                                        </div>
														<img class="lazy" :src="image" data-src="" alt="图片信息">
													</li>
												</ul>
											</el-form-item>
											<el-form-item>
												<el-button type="primary" @click="editSave('enReparam')" :loading="editLoading">确认</el-button>
											</el-form-item>
										</el-form>
									</div>
								</div>
							</div>
							<!--企业信息结束-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style type="text/css">
	.imgBox{float: left;}
	.imgBox li {
		 position:relative;display: inline; list-style: none;width: 250px;height: 185px;background: #FFF;border: 1px solid #fff;text-align: center;margin: 5px;line-height: 180px;float: left;
	}
	.imgBox li:hover{box-shadow:0px 0px 10px 5px #C0C0C0;}
	.imgBox li:hover>.closeBouncedBtn{display: block;}
	.closeBouncedBtn{display: none;}
	.closeBouncedBtn img{position: absolute;top: 0;right: 0;width: 30px;height: 30px;}
	.imgBox .lazy {max-width: 250px;/*max-height: 150px;*/vertical-align: middle;border:none}
	.elinput500{width:500px;}
	.elinput600{width:600px;}
</style>

<script>
    import certification from 'api/certification';
    import VueCoreImageUpload from 'components/common/vue.core.file.upload';
    export default {
        components: {'vue-core-image-upload': VueCoreImageUpload },
        data() {
          return {
            dataList: [],
            urlType: '2',
            uploadUrl: '',
            editLoading: false,
            businessLicenseImageURL:[],//图片多条数据
            enReparam: {
            	uuid:'',//公司uuid
            	companyStage:'',//公司目前所处阶段
            	companyName:'',//公司名称
            	contactName:'',//联系人
            	contactTel:'',//联系电话
            	businessLicenseNo:'',//企业营业编码
            	address:'',//公司地址
            	businessLicenseImage:''//企业营业执照复印件,
            },
            rules: {
            	companyName:[
                   {required:true,message:'公司名称不能为空',trigger:'blur' },
                   {min:0, max:30, message:"最多可输入30字符", trigger:'blur'}
                ],
                contactName:[
                   {required:true,message:'用户名称不能为空',trigger:'blur' },
                   {min:0, max:30, message:"最多可输入30字符", trigger:'blur'}
                ],
                contactTel:[
                   {required:true,message:'用户手机号不能为空',trigger:'blur' },
                   {min:11, max:11, message:"请输入正确的手机号码", trigger:'blur'}
                ],
                businessLicenseNo:[
                	{min:0, max:30, message:"最多可输入30字符", trigger:'blur'}
                ],
                address:[
                	{min:0, max:30, message:"最多可输入30字符", trigger:'blur'}
                ]
            }
          }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            });
        },
        methods: {
            init: function () {
            	this.uploadUrl = certification.upload;
            	
            	let uuid = this.$route.query.uuid;
               	if(uuid == 1){
               		//添加企业信息
               		this.enReparam.uuid = '';
               		this.enReparam.companyStage = 'INCUBATION';
                    this.enReparam.companyName = '';
                    this.enReparam.contactName = '';
                    this.enReparam.contactTel = '';
                    this.enReparam.businessLicenseNo = '';
                    this.enReparam.address = '';
                    this.enReparam.businessLicenseImage = '';
               	}else{
               		//查看企业信息
               		certification.enReqcertification(this,uuid).then(function (response) {
	                    let body = response.body;
	                    if (body && body.code == 1 && body.data) {
	                        let dataList = body.data;
	                        this.dataList = dataList;
	                        this.enReparam.uuid = uuid;
	                        var str=dataList.companyStage.value;
	                        switch(str)
	                        {
	                        	case "孵化期":
	                        	this.enReparam.companyStage="INCUBATION";
	                        	break;
	                        	
	                        	case "初创期":
	                        	this.enReparam.companyStage="STARTUP";
	                        	break;
	                        	
	                        	case "发展期":
	                        	this.enReparam.companyStage="DEVELOPMENT";
	                        	break;
	                        	
	                        	case "成熟期":
	                        	this.enReparam.companyStage="MATURE";
	                        	break;
	                        	
	                        	case "其他":
	                        	this.enReparam.companyStage="OTHER";
	                        	break;

	                        }
	                        this.enReparam.companyName = dataList.companyName;
	                        this.enReparam.contactName = dataList.contactName;
	                        this.enReparam.contactTel = dataList.contactTel;
	                        this.enReparam.businessLicenseNo = dataList.businessLicenseNo;
	                        this.enReparam.address = dataList.address;
	                        
	                        //根据数据将字符串转变为图片数组
	                        this.enReparam.businessLicenseImage = dataList.businessLicenseImage;
							if(dataList.businessLicenseImage){
								let businessLicenseImageArr = dataList.businessLicenseImage.split(",");
	                        	this.businessLicenseImageURL = businessLicenseImageArr;
	                        	console.log('this.businessLicenseImageURL---',businessLicenseImageArr);
							}
							
	                        
	                        return;
	                    }
	                }, function (response) {
	                    console.log('error:', response);
	                });
               	}
                
            },
			editSave: function(formName) {
				let _this = this;
				let uuid = _this.$route.query.uuid;
				console.log(uuid);
				if(uuid == 1){
					//uuid为1的时，添加企业信息，否则为修改
					this.$refs[formName].validate(function(valid) {
						if(valid) {
							_this.editLoading = true;
							//校验企业名称是否存在
							certification.enExistscertification(_this, _this.enReparam.contactTel,uuid).then(function(response) {
								let body = response.body;
								_this.$message(body.msg);
								_this.editLoading = false;
								if(body && body.code == 1) {
									 if(body.data == ture){
									 	_this.$message({message: '企业名称已经存在', type: 'warning'}); 
									 }
									return;
								}
							}, function(response) {
								console.log('error:', response);
							});
							
							//校验查询企业营业编码是否已经被认证
							if(_this.enReparam.businessLicenseNo){
								certification.enlicenseNoExists(_this, _this.enReparam.businessLicenseNo,uuid).then(function(response) {
									let body = response.body;
									_this.$message(body.msg);
									_this.editLoading = false;
									if(body && body.code == 1) {
										 if(body.data == ture){
										 	_this.$message({message: '企业营业编码已存在', type: 'warning'}); 
										 }
										return;
									}
								}, function(response) {
									console.log('error:', response);
								});
							}
							
							//申请添加企业信息
							certification.enAddcertification(_this, _this.enReparam).then(function(response) {
								let body = response.body;
								_this.$message(body.msg);
								_this.editLoading = false;
								if(body && body.code == 1) {
									_this.$router.go(-1);
									
								}
							}, function(response) {
								console.log('error:', response);
							});
						}
						return false;
					});
				}else{
					this.$refs[formName].validate(function(valid) {
						if(valid) {
							_this.editLoading = true;
							certification.enEditcertification(_this, _this.enReparam).then(function(response) {
								let body = response.body;
								_this.$message(body.msg);
								_this.editLoading = false;
								if(body && body.code == 1) {
									_this.$router.go(-1);
									return;
								}
							}, function(response) {
								console.log('error:', response);
							});
						}
						return false;
					});
				}
			},
            back:function(){
                this.$router.go(-1);
            },
            imageupDel: function(i) {
            	//删除其中一个验证图片图片
                this.businessLicenseImageURL.splice(i,1);
                this.enReparam.businessLicenseImage = this.businessLicenseImageURL.join(",");
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
					let imgUrl = data.url;
					if(this.businessLicenseImageURL.length<=2){
						this.businessLicenseImageURL.push(imgUrl);
					}else{
						this.$message({message: '最多只能上传3张图片', type: 'warning'}); 
					}
					this.enReparam.businessLicenseImage =  this.businessLicenseImageURL.join(",");
					return;
				}
			}
        }
    }
</script>