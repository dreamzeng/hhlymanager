<template>
    <!--main content start-->
    <div  id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li class="active">第三方管理</li>
                        <li class="active">增编成员</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">增编成员</div>
                            </div>
                        </div>
                        <div class="panel-body">
                            <div class="profile-nav alt green-border">
                                <div class="panel">
                                    <el-form :model="params" :rules="rules" label-width="130px" ref="params" style="width:35%;min-width:500px;">
                                          <el-form-item label="头像："  prop="logo">
                                            <el-upload
                                              class="avatar-uploader"
                                              :action="upload"
                                              :data="{type:7}"
                                              :show-file-list="false"
                                              :with-credentials="true"
                                              :on-success="(res,file)=>myDiy('logo',res,file)"
                                              :before-upload="beforeAvatarUpload">
                                              <img v-if="params.logo" :src="params.logo" class="avatar">
                                              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                            </el-upload>
                                          </el-form-item>
                                          <el-form-item label="姓名："  prop="empName">
                                            <el-input v-model="params.empName" style=""></el-input>
                                          </el-form-item>
                                          <el-form-item label="级别："  prop="leve">
                                            <el-select v-model="params.leve" placeholder="请选择" :disabled="!params.isEdit">
                                                <el-option key="1" label="带团律师" value="1"></el-option>
                                                <el-option key="2" label="专职律师" value="2"></el-option>
                                                <el-option key="3" label="律师助理" value="3"></el-option>
                                                <el-option key="4" label="实习律师" value="4"></el-option>
                                            </el-select>
                                          </el-form-item>

                                          <el-form-item label="手机号码："  prop="phone">
                                            <el-input v-model="params.phone" @blur="check"></el-input>
                                          </el-form-item>
                                          <el-form-item label="执业证号："  prop="practiceNo">
                                            <el-input v-model="params.practiceNo" style=""  maxlength="17"></el-input>
                                          </el-form-item>
                                          <el-form-item label="上传执业证："  prop="practiceNoImage">
                                            <el-upload
                                              class="avatar-uploader"
                                              :action="upload"
                                              :data="{type:7}"
                                              :show-file-list="false"
                                              :with-credentials="true"
                                              :on-success="(res,file)=>myDiy('practiceNoImage',res,file)"
                                              :before-upload="beforeAvatarUpload">
                                              <img v-if="params.practiceNoImage" :src="params.practiceNoImage" class="avatar">
                                              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                            </el-upload>
                                          </el-form-item>
                                          <el-form-item label="身份证号："  prop="idCard">
                                            <el-input v-model="params.idCard" style=""  maxlength="18"></el-input>
                                          </el-form-item>
                                          <el-form-item label="身份证正面："  prop="">
                                            <el-upload
                                              class="avatar-uploader"
                                              :action="upload"
                                              :data="{type:7}"
                                              :show-file-list="false"
                                              :with-credentials="true"
                                              :on-success="(res,file)=>myDiy('idcardFrontImage',res,file)"
                                              :before-upload="beforeAvatarUpload">
                                              <img v-if="params.idcardFrontImage" :src="params.idcardFrontImage" class="avatar">
                                              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                            </el-upload>
                                          </el-form-item>
                                          <el-form-item label="身份证背面："  prop="">
                                            <el-upload
                                              class="avatar-uploader"
                                              :action="upload"
                                              :data="{type:7}"
                                              :show-file-list="false"
                                              :with-credentials="true"
                                              :on-success="(res,file)=>myDiy('idcardBackImage',res,file)"
                                              :before-upload="beforeAvatarUpload">
                                              <img v-if="params.idcardBackImage" :src="params.idcardBackImage" class="avatar">
                                              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                            </el-upload>
                                          </el-form-item>
                                          <el-form-item>
                                              <el-button type="primary" @click="couponEditUpdate('params')">保存</el-button>
                                              <el-button @click="back">取消</el-button>
                                          </el-form-item>
                                  </el-form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <!--main content end-->
</template>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<script>
    import Page from 'components/common/Page';
    import apiOperaCon from 'api/operationControl';
    import marketing from 'api/third';
    export default {
        name: 'lawyerEdit',
        components: {Page: Page},
        data() {
          //身份证验证规则，15位或者18位带不带x都可以；
          var checkID = (rule, value, callback) => {
            setTimeout(() => {
              var reg=/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
              if (!reg.test(value))
              {
                callback(new Error('您输入的身份证不正确，请重新输入'));
              }
              else callback();
            }, 1000);
          };
          //手机号码验证规则；
          var checkPhone = (rule, value, callback) => {
            setTimeout(() => {
              var reg=/^1[3|4|5|7|8][0-9]\d{4,8}$/;
              if (!reg.test(value))
              {
                callback(new Error('您输入手机号码不正确，请重新输入'));
              }
              else callback();
            }, 1000);
          };
          return {
            apiType: 'addLawyer',
            upload: '',
            phone: true,
            msg: '',
            editPhone: '',
            params:{
                  uuid:"",
                  phone:"",
                  logo:"",
                  empName:"",
                  leve:"", //级别 1.带团律师 2.专职律师 3.律师助理 4.实习律师,
                  practiceNo:"",
                  practiceNoImage:"",
                  idCard:"",
                  idcardFrontImage:"",
                  idcardBackImage:"",
                  isEdit:true,
                  lawofficeUuid:"",//律所uuid，新增员工才有，编辑员工不需要，编辑员工设置为空吧。

                  // logo  Y   String  员工头像图片地址
                  // empName   Y   String  员工姓名
                  // leve  Y   String  级别，律师等级 1.带团律师 2.专职律师 3.律师助理 4.实习律师
                  // phone   Y   String  手机号码
                  // practiceNo  Y   String  执业证号
                  // practiceNoImage   Y   String  执业证图片地址
                  // idCard  Y   String  身份证号
                  // idcardFrontImage  N   String  身份证图片路径正面
                  // idcardBackImage   N   String  身份证图片路径反面
                  // lawofficeUuid   Y   String  律所uuid
            },
            //验证规则
            rules: {
              logo: [{ required: true,message: '必填，请输入', trigger: 'blur' }],
              practiceNo: [{ required: true,message: '必填，请输入', trigger: 'blur' },
            { min: 17, max: 17, message: '长度必须是17位', trigger: 'blur' }],
              practiceNoImage: [{ required: true,message: '必填，请输入', trigger: 'blur' }],
              empName: [{ required: true,message: '必填，请输入', trigger: 'blur' }],
              idCard: [{ required: true,validator:checkID, trigger: 'blur' }],
              // leve: [{ required: true,message: '必填，请输入', trigger: 'blur',type:'number' }],
              phone: [{ required: true,validator: checkPhone, trigger: 'blur' }],
            },
          }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            });
        },
        methods: {
          //请求优惠券详情，数据给this.params
            init: function () {
              this.upload = apiOperaCon.upload;
              if(this.$route.params.lid!=-1)
              {
                let uuid = this.$route.params.lid;
                let params={uuid};//员工uuid
                marketing.pullLawyer(this, params).then(function (response) {
                    let body = response.body;
                    if (body && body.code==1) {
                        this.params = body.data;
                        this.params.leve=this.params.leve.toString();
                        this.editPhone=body.data.phone;
                        // this.params.uuid=this.$route.params.lid;
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
              }
              else
              {
                this.params.lawofficeUuid=this.$route.params.id;//新建才有
              }
            },
            //编辑完成提交
            couponEditUpdate:function(formName){
              this.check();
              if(this.phone)
              {
                this.$refs[formName].validate((valid) => {
                  if (valid)
                  {
                    if(this.$route.params.lid!=-1)
                    {
                      this.apiType="editSaveLawyer";
                    }
                    let param=this.params;
                    marketing[this.apiType](this,param).then(function(res){
                      let body = res.body;
                      if (body && body.code == 1) {
                          this.$message(body.msg);
                          this.$router.push({name:'firm_law_manage'});
                          return;
                      }
                    },function(res){
                      console.log('error:', res);
                    });
                  }
                  else
                  {
                    console.log('error submit!!');
                    return false;
                  }
                })
              }
              else this.$message.error(this.msg);
            },
            check()
            {
              if(this.params.phone!=this.editPhone)
              {
                let phone=this.params.phone;
                let param={phone};
                marketing.lawyerContain(this,param).then(function (response) {
                    let body = response.body;
                    if (body.code==0) {
                        this.$message.error(body.msg);
                        this.msg=body.msg;
                        this.phone=false;
                      }
                      else
                      {
                        this.phone=true;
                      }
                }, function (response) {
                    console.log('error:', response);
                });

              }
            },
            myDiy(str,res,file)
            {
              if(res.msg && res.code !=1){
                  this.$message.error(res.msg);
                  return;
              }
              else
              {
                  this.$message(res.msg);
                  this.params[str]=res.data.url;
                  // console.log(str);
              }
            },
            beforeAvatarUpload(file) {
              const isJPG = file.type === 'image/jpeg';
              const isPNG = file.type === 'image/png';
              const isLt12M = file.size / 1024 / 1024 < 12;

              if (!isJPG && !isPNG) {
                  this.$message.error('上传图片只能是 JPG,PNG 格式!');
                  return false;
              }
              if (!isLt12M) {
                  this.$message.error('上传图片大小不能超过 12MB!');
                  return false;
              }
              return true;
            }
            ,
            back()
            {
              this.$router.go("-1");
            }
        },
    }
</script>
