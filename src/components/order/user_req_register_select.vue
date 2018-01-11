<template>
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                         <li class="active" >订单管理</li>
                        <li class="active"  @click="back"> <a href="javascript:void(0)">H5用户需求登记</a></li>
                        <li click="active">H5用户需求登记</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">用户需求</div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline reqcontent" id="list-content">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="panel-body">
                                     <el-form :model="ruleForm" :rules="rules" ref="ruleForms" label-width="100px" class="demo-ruleForm" >
                                       <el-form-item label="用户名:" prop="nickName" class="el-col el-col-12 unable">
                                                <el-input v-model="ruleForm.nickName" placeholder="请输入内容" style="width:99%"></el-input>   
                                            </el-form-item>
                                            <el-form-item label="选择的律师:" prop="lawyerName" class="el-col el-col-12 unable">
                                                 <el-input v-model="ruleForm.lawyerName" placeholder="请输入内容"  style="width:99%"></el-input>
                                             </el-form-item>
                                           <el-form-item label="联系方式:" prop="userMobile" class="el-col el-col-12 unable">
                                                 <el-input v-model="ruleForm.userMobile" placeholder="请输入内容" @keyup.native="checkPrice" :maxlength=11 style="width:99%"></el-input>
                                              </el-form-item>
                                           <el-form-item label="律师联系方式:" prop="lawyerMobile" class="el-col el-col-12 unable">
                                                 <el-input v-model="ruleForm.lawyerMobile" placeholder="请输入内容"  style="width:99%"></el-input>
                                              </el-form-item>
                                           <el-form-item label="公司名称:" prop="companyName" class="el-col el-col-12 unable">
                                                 <el-input v-model="ruleForm.companyName" placeholder="请输入内容"  style="width:99%"></el-input>
                                               </el-form-item>
                                            <el-form-item label="服务:" prop="serviceName" class="el-col el-col-12 unable">
                                                 <el-input v-model="ruleForm.serviceName" placeholder="请输入内容"  style="width:99%"></el-input>
                                               </el-form-item>
                                           <el-form-item label="律师地址:" prop="city" class="el-col el-col-24 unable">
                                                 <el-input v-model="ruleForm.city" placeholder="请输入内容"   style="width:99.5%"></el-input>
                                              </el-form-item>
                                           <el-form-item label="需求描述:" prop="demandDescr" class="el-col el-col-24 unable">
                                               <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="ruleForm.demandDescr" style="width:99.5%" >
                                                </el-input>
                                               </el-form-item>
                                            <div class="row tit">
                                                <div class="col-md-4">相关操作</div>
                                            </div>
                                             <el-form-item label="状态:" class="el-col el-col-24">
                                               <el-select v-model="ruleForm.state" placeholder="筛选状态" >
                                                    <el-option
                                                      v-for="item in options"
                                                      :key="item.value"
                                                      :label="item.label"
                                                      :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="提供服务律师:"  class="el-col el-col-24">
                                              <!--    <el-input  v-model="ruleForm.lawyerName" placeholder="请输入内容"  @change="onChange" style="width:99.5%"></el-input> -->
                                                <el-autocomplete
                                                    class="inline-input" 
                                                    v-model="ruleForm.lawyerName"
                                                    :fetch-suggestions="querySearch"
                                                    placeholder="请输入内容"
                                                     :trigger-on-focus="false"
                                                    @select="handleSelect">
                                                </el-autocomplete>
                                             </el-form-item>
                                            <el-form-item label="律师联系方式:"  class="el-col el-col-24">
                                                 <el-input  v-model="ruleForm.lawyerMobile" placeholder="请输入内容"  style="width:99.5%"></el-input>
                                            </el-form-item>
                                           <el-form-item label="服务名称:" class="el-col el-col-24">
                                                 <el-input v-model="ruleForm.serviceName" placeholder="请输入内容"  style="width:99.5%"></el-input>
                                              </el-form-item>
                                           <el-form-item label="备注:" prop="remark" class="el-col el-col-24">
                                                 <el-input v-model="ruleForm.remark" placeholder="请输入内容"  style="width:99.5%"></el-input>
                                              </el-form-item>
                                           <el-form-item class="el-col el-col-24">
                                             <el-button @click="back">取消</el-button>
                                             <el-button type="primary" @click="submitForm('ruleForms')">保存</el-button>
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
    </div>
</template>

<style>
.tit{
    margin-bottom: 15px;
    line-height: 50px;
    border:1px solid #eff2f7;
    font-size: 16px;
    clear: both;
  }
</style>

<script>
    import apiUser from 'api/order';
    export default {
        name:'user_req_register_select',
        data() {
          return {
             options: [{
                  value: '1',
                  label: '待处理'
                }, {
                  value: '2',
                  label: '律师服务中'
                }, {
                  value: '3',
                  label: '再考虑'
                }, {
                  value: '4',
                  label: '需求作废'
                },{
                  value: '5',
                  label: '结束'
                }],

            ruleForm: {
              state:'',
              nickName:'',
              remark:this.$route.params.remark||'',
              lawyerName:'',
              lawyerMobile:'',
              serviceName:''
            },
            dataList: [],
            loadAll:[],
            rules: {
               nickName:[
                   {required:true,message:'用户名称不能为空',trigger:'blur' }
                   ],
               userMobile:[
                   {required:true,message:'用户手机号不能为空',trigger:'blur' }
                   ],
               companyName:[
                   {required:true,message:'公司名称不能为空',trigger:'blur' }
               ]
               // city:[
               //     {required:true,message:'律师服务城市不能为空',trigger:'blur'}
               // ]      
            },
          }
        },

        mounted: function () {
            this.$nextTick(function () {
                this.init();
            });
        },
        methods: {
            //新添加方法都在上面
            init: function () {
                let id = this.$route.params.id,
                   param ={
                    uuid:id
                   };
                if(id == '-1'){
                   $('.unable input,.unable textarea').attr('readonly',false)
                }else{
                   $('.unable input,.unable textarea').attr('readonly',true)
                }
               
                apiUser.selectUserReqList(this,param).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1 && body.data) {
                         //判断状态
                          if(body.data.state.code == 1){
                               this.ruleForm.state = '待处理'
                          }else if(body.data.state.code == 2){
                               this.ruleForm.state = '律师服务中'

                          }else if(body.data.state.code == 3){
                               this.ruleForm.state = '再考虑'
                            
                          }else if(body.data.state.code  == 4){
                               this.ruleForm.state = '需求作废'
                          }else if(body.data.state.code  == 5){
                               this.ruleForm.state = '结束'
                          }
                        this.ruleForm.nickName = body.data.nickName,
                        this.ruleForm.userMobile = body.data.userMobile,
                        this.ruleForm.companyName = body.data.companyName,
                        this.ruleForm.city = body.data.city,
                        this.ruleForm.lawyerId = body.data.lawyerId,
                        this.ruleForm.lawyerName = body.data.lawyerName,
                        this.ruleForm.lawyerMobile = body.data.lawyerMobile,
                        this.ruleForm.serviceName = body.data.serviceName,
                        this.ruleForm.demandDescr = body.data.demandDescr,
                        this.ruleForm.remark = body.data.remark;
                        return;
                    }
                });
     
            },
            checkPrice:function(val){
              this.ruleForm.userMobile = this.ruleForm.userMobile.replace(/[^\d|.]/g, '');
            },   
            submitForm:function(formName){
                let _this = this;
                _this.$refs[formName].validate(function(valid){
                    if (valid) {
                        if(_this.$route.params.id=='-1'){
                          if(_this.ruleForm.userMobile.length<11){
                             _this.$message({message: '请输入正确的手机号码', type: 'warning'}); 
                              return false;
                           }
                           let params = {
                            nickName: _this.ruleForm.nickName,
                            userMobile: _this.ruleForm.userMobile, 
                            companyName: _this.ruleForm.companyName,
                            city: _this.ruleForm.city,
                            lawyerName: _this.ruleForm.lawyerName,
                            lawyerMobile: _this.ruleForm.lawyerMobile,
                            serviceName: _this.ruleForm.serviceName,
                            demandDescr: _this.ruleForm.demandDescr,
                            remark: _this.ruleForm.remark,
                           };
                            apiUser.newUserReqList(_this,params).then(function (response){
                                let body = response.body;
                                if (body && body.code == 1) {
                                   _this.$message({message: body.msg, type: 'success'});
                                   _this.$router.go(-1);
                                  }else{
                                    _this.$message({message: body.msg, type: 'warning'}); 
                                  }
                               
                            }, function (response) {
                               console.log('error:', response);
                           });
                        }else{
                            var subState = '';
                            if(_this.ruleForm.state == '待处理'){
                                subState = 1
                            }else if(_this.ruleForm.state == '律师服务中'){
                                subState = 2
                            }else if(_this.ruleForm.state == '再考虑'){
                                subState = 3
                            }else if(_this.ruleForm.state == '需求作废'){
                                subState = 4
                            }else if(_this.ruleForm.state == '结束'){
                                subState = 5
                            }
                            console.log(isNaN(_this.ruleForm.state));
                            let params = {
                            uuid:_this.$route.params.id,
                            lawyerId: _this.ruleForm.lawyerId,
                            lawyerName: _this.ruleForm.lawyerName,
                            lawyerMobile: _this.ruleForm.lawyerMobile,
                            serviceName: _this.ruleForm.serviceName,
                            remark: _this.ruleForm.remark,
                            state:isNaN(_this.ruleForm.state)?subState:_this.ruleForm.state
                           };
                           apiUser.editUserReqList(_this,params).then(function (response){
                                let body = response.body;
                                if (body && body.code == 1) {
                                   _this.$message({message: body.msg, type: 'success'});
                                  }else{
                                    _this.$message({message: body.msg, type: 'warning'}); 
                                  }
                               
                            }, function (response) {
                            console.log('error:', response);
                           });
                        }
                    }
                    return false;
                });
              
            },
            querySearch(queryString, cb) {
              let _this = this, arr = [],
                   params = {
                    lawyerName:queryString
                };
               apiUser.selectLawyer(_this,params).then(function (response){
                    let body = response.body;
                    if (body && body.code == 1) {
                        _this.loadAll = body.data.items;
                        let restaurants = _this.loadAll;
                    let results = queryString ? restaurants.filter(_this.createFilter(queryString)) : restaurants;
                    // 调用 callback 返回建议列表的数据
                    results.forEach(item=>{
                      item.value = item.lawyerName
                      arr.push(item)
                    })
                    cb(arr);
                  }
                }, function (response) {
                console.log('error:', response);
               });  
            },
            createFilter(queryString) {
              return (restaurant) => {
                return (restaurant.lawyerName.indexOf(queryString.toLowerCase()) === 0);
              };
            }, 
            handleSelect(item) {
              console.log(item.lawyerName);
              this.ruleForm.lawyerName = item.lawyerName
            },
            back:function(){
                this.$router.go(-1);
            }
         }
    }
</script>