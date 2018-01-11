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
                        <li class="active">第三方管理</li>
                        <li class="active">新建律师</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">新建律师</div>
                        <div class="panel-body">
                            <el-row>
                                <el-col :span="6" v-for="(o, index) in uploadOptions" :key="index">
                                    <lawyer-upload 
                                        ref="laywerUpload"
                                        :tips="o.tips" 
                                        accept="image/*" 
                                        :beforeUpload="beforeUpload"
                                        :name="o.name"></lawyer-upload>
                                </el-col>
                                
                            </el-row>
                            <el-row class="lawyer-form">
                                <el-col :span="24">
                                    <el-form ref="newLawyerForm" :rules="rules" :model="lawyerObj" label-width="10px">
                                         <el-form-item prop="phone">
                                            <span class="require-tip">*</span><el-input  placeholder="请输入手机号" class="lawyer-input" v-model="lawyerObj.phone"></el-input>
                                             <el-select disabled v-model="status" placeholder="未认证">
                                                <el-option
                                                v-for="item in statusOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                                </el-option>
                                            </el-select>
                                         </el-form-item>
                                         <el-form-item>
                                             <el-form-item prop="code" style="float:left;">
                                                <span class="require-tip">*</span><el-input  placeholder="请输入职业证号" class="lawyer-input" v-model="lawyerObj.code"></el-input>
                                             </el-form-item>
                                             <el-form-item prop="idCard" style="float:left;">
                                               <span class="require-tip">*</span><el-input  placeholder="请输入身份证号" class="lawyer-input" v-model="lawyerObj.idCard"></el-input>
                                             </el-form-item>
                                         </el-form-item>
                                         <el-form-item prop="realName">
                                            <span class="require-tip">*</span><el-input  placeholder="请输入姓名" class="lawyer-input" v-model="lawyerObj.realName"></el-input>
                                         </el-form-item>
                                         <div class="address-container">
                                            <el-form-item class="company"  prop="company" >
                                                <span class="require-tip">*</span><el-input  placeholder="请律师事务所名称" class="lawyer-input" v-model="lawyerObj.company"></el-input>
                                                <!-- <el-input  placeholder="请选择地区" class="lawyer-input" v-model="lawyerObj.name"></el-input> -->
                                                
                                            </el-form-item>
                                            <el-form-item class="address-input">
                                                <span class="require-tip">*</span><distpicker
                                                    @province="provinceHandler"
                                                    @city="cityObj=>lawyerObj.city=cityObj.code? cityObj.value :''"
                                                    @area="areaObj=>{lawyerObj.district=(areaObj.code ? areaObj.value : '') + address; this.areaObj=areaObj}"
                                                    ></distpicker>
                                                <span class="require-tip">*</span><el-input  placeholder="律师事务所地址" class="lawyer-input lawyer-input-address" @change="address=>lawyerObj.district=(areaObj.value ||'') + address"  v-model.trim="address"></el-input>
                                            </el-form-item>
                                         </div>
                                         
                                         <el-form-item>
                                             <el-form-item prop="position" style="float:left;">
                                                <span class="require-tip">*</span><el-input  placeholder="担任职位" class="lawyer-input" v-model="lawyerObj.position"></el-input>
                                             </el-form-item>
                                            <span class="require-tip">*</span><div class="el-input__inner lawyer-case">
                                                <span v-if="selectCaseType.length==0" class="tips">请点击下方选择擅长类型</span>
                                                <div class="case-type-container">
                                                    <span class="case-type-tag" title="点击删除" @click="removeCaseTypeHandler(index)" v-for="(o, index) in selectCaseType" :key="index">
                                                        <el-tag class="case-type-tag">{{o.name}}</el-tag>
                                                    </span>
                                                </div>
                                                <div class="case-type-select">
                                                    <span class="case-type-tag" title="点击选择" @click="selectCaseTypeHandler(index)" v-for="(o, index) in caseTypeArray" :key="index">
                                                        <el-tag type="primary" >{{o.name}}</el-tag>
                                                    </span>
                                                </div>
                                            </div>
                                         </el-form-item>
                                         <el-form-item>
                                            <el-button type="primary" @click.native="onSubmit('newLawyerForm')">保存</el-button>
                                            <el-button @click="goBack()">取消</el-button>
                                        </el-form-item>
                                    </el-form>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    <!--main content end-->
</template>

<script>
import LawyerUpload from '../common/lawyerUpload'
import Distpicker from '../common/distpicker/Distpicker'
import apiThird from 'api/third';
import { Loading } from 'element-ui';
const checkPhone = (rule, value, callback) => {
    setTimeout(() =>{
        if(!/^1(3|4|5|7|8)\d{9}$/.test(value)){
            callback(new Error('请输入正确的手机号码'));
        }else{
            callback()
        }
    }, 200);
}
export default {
    components:{
        LawyerUpload,
        Distpicker
    },
    data(){
        return {
            uploadOptions:[
                {
                    tips:'头像',
                    name:'logoFile'
                },
                {
                    tips:'身份证正面（必填）',
                    name:'cardPicFile'
                },
                {
                    tips:'身份证反面（必填）',
                    name:'cardBackPicFile'
                },
                {
                    tips:'职业证照（必填）',
                    name:'picFile'
                }
            ],
            headerUrl:'',
            status:1,
            address:'',
            areaObj:{},
            caseTypeArray:[],
            selectCaseType:[],
            lawyerObj:{
                phone:'',
                code:'', //执业证号
                idCard:'', //身份证号
                realName:'', //姓名
                company:'', //律师事务所名称
                position:'', //职位
                caseIds:'', //擅长类型
                logoFile:'', //头像
                picFile:'', //职业证照
                cardPicFile:'', //身份证正面照片
                cardBackPicFile:'', //身份证反面照片
                province:'',
                city:'',
                district:''
            },
            statusOptions:[
                {
                    value:1,
                    label:'未认证'
                }
            ],
            rules:{
                phone:[
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { validator: checkPhone, trigger: 'blur' }
                ],
                code:[
                    { required: true, message: '请输入职业证号', trigger: 'blur' }
                ],
                idCard:[
                    { required: true, message: '请输入身份证号', trigger: 'blur' }
                ],
                position:[
                    { required: true, message: '请输入担任职位', trigger: 'blur' }
                ],
                realName:[
                    {required: true, message: '请输入姓名', trigger: 'blur'},
                    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                ],
                company:[
                    {required: true, message: '请输入律师事务所名称', trigger: 'blur'},
                    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    created(){
        this.getCaseType()
    },
    methods:{
        headerUploadSuccess(){

        },
        provinceHandler(provinceObj){
            if(provinceObj.code){
                this.lawyerObj.province=provinceObj.value
            }else{
                this.lawyerObj.province = ''
                this.lawyerObj.city = ''
                this.lawyerObj.district = ''
            }
        },
        getCaseType(){
            apiThird.getCaseType(this).then(res=>{
                this.caseTypeArray = res.body.data
            }).catch(res=>{
                this.$message.error('请求擅长类型失败')
            })
        },
        selectCaseTypeHandler(index){
            this.selectCaseType.push(this.caseTypeArray.splice(index,1)[0])
        },
        removeCaseTypeHandler(index){
            this.caseTypeArray.push(this.selectCaseType.splice(index,1)[0])
        },
        beforeUpload(){

        },
        goBack(){
            this.$router.replace({name:'lawyer_list'})
        },
        onSubmit(formRef){
            this.$refs[formRef].validate((valid) => {
                if(valid){
                    //校验是否所有图片都已经上传
                    try{
                        this.$refs['laywerUpload'].forEach(item=>{
                            if(item.name != 'logoFile' && !item.file){
                                throw item.tips
                            }else{
                                this.lawyerObj[item.name] = item.file
                            }
                        })
                    } catch(msg){
                        msg = msg.replace('（必填）', '')
                        this.$message.error(msg+"不能为空，请先上传");
                        return
                    }

                    //验证省市
                    if(!this.lawyerObj.province || this.lawyerObj.province == '省'){
                        this.$message.error("请选择律师所在省份");
                        return
                    }
                    if(!this.lawyerObj.city || this.lawyerObj.city == '市'){
                        this.$message.error("请选择律师所在市区");
                        return
                    }
                    //验证事务所地址
                    if(this.address == ''){
                        this.$message.error("请输入律师事务所地址");
                        return
                    }

                    let caseIds = ''
                    this.selectCaseType.forEach(item=>{
                        caseIds += item.id + ','
                    })
                    caseIds = caseIds.replace(/,$/, '')
                    this.lawyerObj.caseIds = caseIds
                    //验证擅长类型
                    if(caseIds == ''){
                        this.$message.error("请选择至少一项擅长类型");
                        return
                    }

                    const formData = new FormData();

                    Object.keys(this.lawyerObj).map(key => {
                        formData.append(key, this.lawyerObj[key]);
                    });
                    let loading = Loading.service({
                        text:"律师数据上传中，请等待...",
                        customClass:'lawyer-loading'
                    })
                    apiThird.registerLawyer(this, formData).then(resData=>resData.body).then(res=>{
                        if(res.code != 0){
                            this.$message.success("创建律师数据成功");
                            this.goBack()
                        }else{
                            this.$message.error("创建律师数据失败：" + res.msg + "，请重新输入");
                        }
                        loading.close()
                    }).catch(res=>{
                        console.log('err=' + res)
                        this.$message.error("创建律师数据失败，请重试");
                        loading.close()
                    })
                }
                
            })
            
        }
    }
}
</script>

<style lang="less">
  
  .lawyer-loading{
        background: rgba(0,0,0,0.01);
        .el-loading-spinner{
                background: rgba(0,0,0,0.4);
                width: 300px;
                left: 43%;
                border-radius: 8px;
                padding: 15px;
                .path{
                    stroke:#fff;
                }
                .el-loading-text{
                    color:#fff;
                }
        }
  }
  .lawyer-form{
      margin-top: 30px;
      .require-tip{
          /*display: inline-block;*/
          float: left;
          margin-left: -9px;
          color:red;
          margin-right: 2px;
      }
      .lawyer-input{
          width: 300px;
          float: left;
          margin-right: 30px;
      }
      .address-container{
          position: relative;
          .address-input{
              position: absolute;
              top:0px;
              left:330px;
          }
          .lawyer-input-address{
              position: absolute;
          }
      }
      .address {
          float: left;
          margin-right: 30px;
          select{
              height: 35px;
              line-height: 35px;
          }
      }
      .lawyer-case{
          line-height:30px;
          width:auto;
          min-width: 300px;
          position: relative;
          span.tips{
              color:#97a7ca
          }
          .case-type-select{
              position: absolute;
              left:0px;
              top:36px;
              z-index: 20;
          }
          .case-type-tag{
                margin-right: 5px;
                cursor: pointer;
          }
          
      }
  }
</style>
