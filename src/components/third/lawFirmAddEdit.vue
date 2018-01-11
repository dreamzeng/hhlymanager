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
                        <li class="active">增编律所</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">增编律所</div>
                            </div>
                        </div>
                        <div class="panel-body">
                            <div class="profile-nav alt green-border">
                                <div class="panel">
                                    <el-form :model="ruleForm" :rules="rules" label-width="130px" ref="ruleForm">
                                    <el-row>
                                      <el-col :span="8">
                                        <h5 style="font-size:15px;color:#797979;border-bottom:#EDF0F6 1px solid;line-height:35px;">律所信息</h5>
                                        <div class="grid-content bg-purple">
                                          <el-form-item label="律所logo："  prop="logo">
                                            <el-upload
                                              class="avatar-uploader" :action="upload"
                                              :data="{type:7}"
                                              :show-file-list="false"
                                              :with-credentials="true"
                                              :on-success="(res,file)=>myDiy('logo',res,file)"
                                              :before-upload="beforeAvatarUpload">
                                              <img v-if="ruleForm.logo" :src="ruleForm.logo" class="avatar">
                                              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                            </el-upload>
                                          </el-form-item>


                                          <el-form-item label="律所名称："  prop="lawofficeName">
                                            <el-input v-model.trim="ruleForm.lawofficeName" style=""></el-input>
                                          </el-form-item>
                                          <el-form-item label="执业证号："  prop="practiceNo">
                                            <el-input v-model.trim="ruleForm.practiceNo" style="" maxlength="17"></el-input>
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
                                              <img v-if="ruleForm.practiceNoImage" :src="ruleForm.practiceNoImage" class="avatar">
                                              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                            </el-upload>
                                          </el-form-item>
                                          <el-form-item label="税务登记证号："  prop="taxRegistrationno">
                                            <el-input v-model.trim="ruleForm.taxRegistrationno" style=""></el-input>
                                          </el-form-item>
                                          <el-form-item label="上传登记证："  prop="taxRegistrationnoImage">
                                            <el-upload
                                              class="avatar-uploader"
                                              :action="upload"
                                              :data="{type:7}"
                                              :show-file-list="false"
                                              :with-credentials="true"
                                              :on-success="(res,file)=>myDiy('taxRegistrationnoImage',res,file)"
                                              :before-upload="beforeAvatarUpload">
                                              <img v-if="ruleForm.taxRegistrationnoImage" :src="ruleForm.taxRegistrationnoImage" class="avatar">
                                              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                            </el-upload>
                                          </el-form-item>
                                          <el-form-item label="开户许可证号："  prop="openAccountno">
                                            <el-input v-model.trim="ruleForm.openAccountno" style=""></el-input>
                                          </el-form-item>
                                          <el-form-item label="上传许可证："  prop="openAccountnoImage">
                                            <el-upload
                                              class="avatar-uploader"
                                              :action="upload"
                                              :data="{type:7}"
                                              :show-file-list="false"
                                              :with-credentials="true"
                                              :on-success="(res,file)=>myDiy('openAccountnoImage',res,file)"
                                              :before-upload="beforeAvatarUpload">
                                              <img v-if="ruleForm.openAccountnoImage" :src="ruleForm.openAccountnoImage" class="avatar">
                                              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                            </el-upload>
                                          </el-form-item>
                                          <el-form-item label="律所地址："  prop="lawofficeAddress">
                                            <el-input v-model="ruleForm.lawofficeAddress" style=""></el-input>
                                          </el-form-item>
                                          <el-form-item label="律所简介："  prop="lawofficeDesc" style="position:relative;">
                                            <el-input type="textarea" v-model="ruleForm.lawofficeDesc" :maxlength=108 :rows=5></el-input>
                                            <span style="position:absolute;right:0;bottom:-30px;">{{remainedNum}}/108&ensp;</span>
                                          </el-form-item>
                                        </div>
                                      </el-col>
                                      <el-col :span="8" :offset="4">
                                        <div class="">
                                          <h5 style="font-size:15px;color:#797979;border-bottom:#EDF0F6 1px solid;line-height:35px;">带团律师信息</h5>
                                          <el-form-item label="头像："  prop="logo2">
                                            <el-upload
                                              class="avatar-uploader"
                                              :action="upload"
                                              :data="{type:7}"
                                              :show-file-list="false"
                                              :with-credentials="true"
                                              :on-success="(res,file)=>myDiy('logo2',res,file)"
                                              :before-upload="beforeAvatarUpload">
                                              <img v-if="ruleForm.logo2" :src="ruleForm.logo2" class="avatar">
                                              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                            </el-upload>
                                          </el-form-item>
                                          <el-form-item label="姓名："  prop="empName">
                                            <el-input v-model.trim="ruleForm.empName" style=""></el-input>
                                          </el-form-item>

                                          <el-form-item label="级别："  prop="">
                                            <el-select v-model="default1" placeholder="请选择" disabled>
                                                <el-option key="1" label="带团律师" value="1"></el-option>
                                                <el-option key="2" label="专职律师" value="2"></el-option>
                                                <el-option key="3" label="律师助理" value="3"></el-option>
                                                <el-option key="4" label="实习律师" value="4"></el-option>
                                            </el-select>
                                          </el-form-item>

                                          <el-form-item label="手机号码："  prop="phone">
                                            <el-input v-model.trim="ruleForm.phone" style="" @blur="check"></el-input>
                                          </el-form-item>
                                          <el-form-item label="执业证号："  prop="practiceNo2">
                                            <el-input v-model.trim="ruleForm.practiceNo2" style=""  maxlength="17"></el-input>
                                          </el-form-item>
                                          <el-form-item label="上传执业证："  prop="practiceNoImage2">
                                            <el-upload
                                              class="avatar-uploader"
                                              :action="upload"
                                              :data="{type:7}"
                                              :show-file-list="false"
                                              :with-credentials="true"
                                              :on-success="(res,file)=>myDiy('practiceNoImage2',res,file)"
                                              :before-upload="beforeAvatarUpload">
                                              <img v-if="ruleForm.practiceNoImage2" :src="ruleForm.practiceNoImage2" class="avatar">
                                              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                            </el-upload>
                                          </el-form-item>
                                          <el-form-item label="身份证号："  prop="idCard">
                                            <el-input v-model.trim="ruleForm.idCard" style="" maxlength="18"></el-input>
                                          </el-form-item>
                                          <el-form-item label="身份证正面："  prop="">
                                            <el-upload
                                              class="avatar-uploader"
                                              :action="upload"
                                              :data="{type:7}"
                                              :show-file-list="false"
                                              :with-credentials="true"
                                              :on-success="(res,file)=>myDiy('idcardBackImage',res,file)"
                                              :before-upload="beforeAvatarUpload">
                                              <img v-if="ruleForm.idcardBackImage" :src="ruleForm.idcardBackImage" class="avatar">
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
                                              :on-success="(res,file)=>myDiy('idcardFrontImage',res,file)"
                                              :before-upload="beforeAvatarUpload">
                                              <img v-if="ruleForm.idcardFrontImage" :src="ruleForm.idcardFrontImage" class="avatar">
                                              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                            </el-upload>
                                          </el-form-item>
                                        </div>
                                      </el-col>
                                      </el-row>
                                      <el-row>
                                        <el-form-item>
                                        <el-col :span='1' :offset="9"><el-button type="pramary" @click="submitForm2('ruleForm')">保存</el-button></el-col>
                                        <el-col :span='1' :offset="3"><el-button type="danger" @click="back">取消</el-button></el-col>
                                        </el-form-item>
                                      </el-row>
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
        name: 'lawFirmAddEdit',
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
              var reg=/^1[3|4|5|7|8][0-9]\d{8}$/;
              if (!reg.test(value))
              {
                callback(new Error('您输入手机号码不正确，请重新输入'));
              }
              else callback();
            }, 1000);
          };
          return {
            upload: '',
            // remainedNum: 108,
            msg: '',
            registerPhone: true,
            phone:true,
            editPhone:"",//编辑页面用来存放从后端获取的手机号，如果这个值不变，则不调用两个验证接口，否则就调用
            default1: "1",//默认为1，这里只能为1，不管是新建还是编辑
            imageUrl: '',
            // 从后端获取的优惠券信息
            apiType:"addSave",
            ruleForm:
            {
                lawOfficeEmpVOList: [{
                    uuid:"",
                    empName: "",
                    idCard: "",
                    idcardBackImage: "",
                    idcardFrontImage: "",
                    leve: "1",// 律师等级 1.带团律师 2.专职律师 3.律师助理 4.实习律师
                    logo: "",
                    phone: "",
                    practiceNo: "",
                    practiceNoImage: "",
                    isEdit:true
                }],
                // 下面是拿出来的带团律师信息
                uuid2:"",
                empName: "",
                idCard: "",
                idcardBackImage: "",
                idcardFrontImage: "",
                leve:"", //律师等级 1.带团律师 2.专职律师 3.律师助理 4.实习律师
                logo2: "",
                phone: "",
                practiceNo2: "",
                practiceNoImage2: "",
                // 带团律师信息结束，为了验证需要拿出来了

                uuid:"",
                lawofficeAddress: "",
                lawofficeDesc: "",
                lawofficeName: "",
                logo: "",
                openAccountno: "",
                openAccountnoImage: "",
                practiceNo: "",
                practiceNoImage: "",
                taxRegistrationno: "",
                taxRegistrationnoImage: ""
            },
            rules:
            {
              lawofficeAddress: [{ required: true,message: '必填，请输入', trigger: 'blur' }],
              lawofficeDesc: [{ required: true,message: '必填，请输入', trigger: 'blur' }],
              lawofficeName: [{ required: true,message: '必填，请输入', trigger: 'blur' }],
              logo: [{ required: true,message: '必填，请输入', trigger: 'blur' }],

              openAccountno: [{ required: true,message: '必填，请输入', trigger: 'blur' }],
              openAccountnoImage: [{ required: true,message: '必填，请输入', trigger: 'blur' }],

              practiceNo: [{ required: true,message: '必填，请输入', trigger: 'blur' },
            { min: 17, max: 17, message: '长度必须是17位', trigger: 'blur' }],
              practiceNoImage: [{ required: true,message: '必填，请输入', trigger: 'blur' }],

              taxRegistrationno: [{ required: true,message: '必填，请输入', trigger: 'blur' }],
              taxRegistrationnoImage: [{ required: true,message: '必填，请输入', trigger: 'blur' }],

              empName: [{ required: true,message: '必填，请输入', trigger: 'blur' }],
              idCard: [{ required: true,validator:checkID, trigger: 'blur' }],
              leve: [{ required: true,message: '必填，请输入', trigger: 'blur',type:'number' }],
              logo2: [{ required: true,message: '必填，请输入', trigger: 'blur' }],
              phone: [{ required: true,validator: checkPhone, trigger: 'blur' }],
              practiceNo2: [{ required: true,message: '必填，请输入', trigger: 'blur' },
            { min: 17, max: 17, message: '长度必须是17位', trigger: 'blur' }],
              practiceNoImage2: [{ required: true,message: '必填，请输入', trigger: 'blur' }],
            },
            remainNum:100,//新加备注的字数限制
            dialogFormVisible:false,//弹窗显示隐藏开关
          }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            });
        },
        computed:{
          remainedNum:function(){
            return 108-this.ruleForm.lawofficeDesc.length;
          }
        },
        methods: {
          //请求优惠券详情，数据给this.ruleForm
            init: function () {
                this.upload = apiOperaCon.upload;
                if(this.$route.params.id!=-1)
                {
                  // console.log(this.$route.params.id);
                  marketing.pullEdit(this, this.$route.params.id).then(function (response) {
                      let body = response.body;
                      if (body && body.code==1) {
                          this.ruleForm = body.data;
                          // console.log(body.data);

                          this.ruleForm.uuid2=this.ruleForm.lawOfficeEmpVOList[0].uuid;
                          this.ruleForm.empName=this.ruleForm.lawOfficeEmpVOList[0].empName;
                          // this.ruleForm.empName=this.ruleForm.lawOfficeEmpVOList[0].empName;
                          this.ruleForm.idCard=this.ruleForm.lawOfficeEmpVOList[0].idCard;
                          this.ruleForm.idcardBackImage=this.ruleForm.lawOfficeEmpVOList[0].idcardBackImage;
                          this.ruleForm.idcardFrontImage=this.ruleForm.lawOfficeEmpVOList[0].idcardFrontImage;

                          this.ruleForm.leve=this.ruleForm.lawOfficeEmpVOList[0].leve.toString();
                          this.ruleForm.logo2=this.ruleForm.lawOfficeEmpVOList[0].logo;
                          this.ruleForm.phone=this.ruleForm.lawOfficeEmpVOList[0].phone;
                          this.ruleForm.practiceNo2=this.ruleForm.lawOfficeEmpVOList[0].practiceNo;
                          this.ruleForm.practiceNoImage2=this.ruleForm.lawOfficeEmpVOList[0].practiceNoImage;
                          this.ruleForm.isEdit=this.ruleForm.lawOfficeEmpVOList[0].isEdit;
                          this.editPhone=this.ruleForm.lawOfficeEmpVOList[0].phone;//临时存放从后端获取的手机号


                          // "uuid2":"唯一业务ID",下面是拿出来的带团律师信息
                          // "empName": "姓名",
                          // "idCard": "身份证号",
                          // "idcardBackImage": "身份证图片路径背面",
                          // "idcardFrontImage": "身份证图片路径正面",
                          // "leve": 1, 律师等级 1.带团律师 2.专职律师 3.律师助理 4.实习律师
                          // "logo2": "头像图片地址",
                          // "phone": "手机号码",
                          // "practiceNoImage2": "执业证号",
                          // "practiceNoImage2": "执业证图片地址"

                          return;
                      }
                  }, function (response) {
                      console.log('error:', response);
                  });
                }
            },

            // 更改剩余字数
            // changeNum(val){
            //   this.remainNum=100-val.length;
            // },
            // deduce(val){
            //   this.remainedNum=108-this.ruleForm.lawofficeDesc.length;
            // },

            //编辑完成提交
            submitForm2(formName){
              this.check();
              if(this.registerPhone&&this.phone)
              {
                this.$refs[formName].validate((valid) => {
                  if (valid)
                  {
                    if(this.$route.params.id!=-1)
                    {
                      this.apiType="editSave";
                    }
                    console.log(this.apiType);
                    this.ruleForm.lawOfficeEmpVOList[0].uuid=this.ruleForm.uuid2;
                    this.ruleForm.lawOfficeEmpVOList[0].empName=this.ruleForm.empName;
                    this.ruleForm.lawOfficeEmpVOList[0].idCard=this.ruleForm.idCard;
                    this.ruleForm.lawOfficeEmpVOList[0].idcardBackImage=this.ruleForm.idcardBackImage;
                    this.ruleForm.lawOfficeEmpVOList[0].idcardFrontImage=this.ruleForm.idcardFrontImage;

                    // this.ruleForm.lawOfficeEmpVOList[0].leve=this.ruleForm.leve;
                    this.ruleForm.lawOfficeEmpVOList[0].leve=1;
                    this.ruleForm.lawOfficeEmpVOList[0].logo=this.ruleForm.logo2;
                    this.ruleForm.lawOfficeEmpVOList[0].phone=this.ruleForm.phone;
                    this.ruleForm.lawOfficeEmpVOList[0].practiceNo=this.ruleForm.practiceNo2;
                    this.ruleForm.lawOfficeEmpVOList[0].practiceNoImage=this.ruleForm.practiceNoImage2;

                    let param=this.ruleForm;
                    marketing[this.apiType](this,param).then(function(res){
                      let body = res.body;
                      if (body && body.code == 1) {
                          this.$message(body.msg);
                          this.$router.push({name:'law_firm_manage'});
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
              // else this.$message.error(this.msg);
            },
            check()
            {
              if(this.ruleForm.phone!=this.editPhone)
              {
                let phone=this.ruleForm.phone;
                let param={phone};
                marketing.lawyerOne(this,param).then(function (response) {
                    let body = response.body;
                    if (body.code==0) {
                        this.$message.error(body.msg);
                        this.msg=body.msg;
                        this.registerPhone=false;
                      }
                      else
                      {
                        this.registerPhone=true;
                      }
                }, function (response) {
                    console.log('error:', response);
                });
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
                  this.ruleForm[str]=res.data.url;
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
            },
            back()
            {
              this.$router.go("-1");
            }
        },
    }
</script>
