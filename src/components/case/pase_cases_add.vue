<template>
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li @click="back"> <a href="javascript:void(0)">过往案例</a></li>
                        <li click="active">过往案例详情</li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">过往案例详情</div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="panel-body">
                                        <el-form :model="ruleForm" :rules="rules" ref="ruleForms" label-width="100px" class="demo-ruleForm" >
                                          <el-form-item label="案件名称：" prop="name">
                                             <el-input v-model="ruleForm.name" placeholder="请输入案件名称" :maxlength=32></el-input>
                                          </el-form-item>
                                          <el-form-item label="案件年份：" prop="year">
                                             <el-input placeholder="请输入案件年份" v-model="ruleForm.year"></el-input>
                                          </el-form-item>
                                          <el-form-item label="审理法院：" prop="court">
                                             <el-input v-model="ruleForm.court" placeholder="请输入审理法院" :maxlength=32></el-input>
                                          </el-form-item>
                                          <el-form-item label="详情编辑：" prop="content">
                                             <webEditor editorId="serInfoEditor" ref="serInfoEditor"></webEditor>
                                          </el-form-item>
                                          <el-form-item label="关联律师：" prop="phone">
                                             <el-input v-model="ruleForm.phone" @keyup.native="checkPhone(ruleForm)" placeholder="请输入律师手机号" :maxlength=32 style="width:20%"></el-input>
                                             <el-button type="primary" @click ='searchLawyer'>查找</el-button>
                                          </el-form-item>
                                          <el-form-item label="律师信息：" prop="lawyerName">
                                             <span v-text="ruleForm.lawyerName" ></span>
                                          </el-form-item>
                                          <el-form-item>
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
<style scoped>
</style>

<script>
    import apiCase from 'api/case';
    import webEditor from 'components/common/webEditor';
    export default {
        name:'pase_cases_add',
        components: {'webEditor':webEditor},
        data: function(){
          return {
            options: [{
            }],
            serInfoEditor:null,
            dataStr:'',
            ruleForms:'',
            ruleForm: {
              name:'',
              year: '',
              court:'',
              lawyerId:'',
              lawyerName:'',
              content:'',
              phone:''
            },
            rules: {
               name:[
                   {required:true,message:'案件名称不能为空',trigger:'blur' }
                   ],
               year:[
                   {required:true,message:'案件年份不能为空',trigger:'blur' }
                   ],
               court:[
                   {required:true,message:'审理法院不能为空',trigger:'blur' }
               ],
               content:[
                   {required:true,message:'案件详情不能为空',trigger:'blur'}
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
               this.webEditor = this.$refs.webEditor;
            },
            submitForm:function(formName){
                   if(this.ruleForm.content == '<p><br></p>'){
                      this.ruleForm.content = '';
                   }else{
                      this.ruleForm.content = this.$refs['serInfoEditor'].getContent();
                    }
                  
                   let _this = this;
                   this.$refs[formName].validate(function(valid){
                     if (valid) {
                         if(_this.ruleForm.lawyerId == ''&& _this.ruleForm.lawyerName == ''){
                            _this.$message({message:'请输入关联律师', type: 'warning'});
                            return false;
                         }
                        let params = {
                            caseName: _this.ruleForm.name, 
                            caseYear: _this.ruleForm.year,
                            courtName: _this.ruleForm.court,
                            caseDetail: _this.ruleForm.content,
                            lawyerId: _this.ruleForm.lawyerId,
                            lawyerName: _this.ruleForm.lawyerName
                           };
                           console.log(params);
                        apiCase.newCase(_this,params).then(function (response){
                              let body = response.body;
                              if (body && body.code == 1) {
                                   _this.$message({message: body.msg, type: 'success'});
                                   _this.$router.go(-1);
                              }
                          }, function (response) {
                              console.log('error:', response);
                          });
                    }
                      return false;
                  });
              
            },
            checkPhone:function(){
              this.ruleForm.phone = this.ruleForm.phone.replace(/[^\d|.]/g, '');
            },
            searchLawyer:function(){
                  let phone = this.ruleForm.phone,
                      params = {
                        phone: phone
                      };
                  apiCase.searchLawyer(this,params).then(function (response){
                        let body = response.body;
                        if (body && body.code == 1 && body.data) {
                           this.ruleForm.lawyerName = body.data.lawyerName;
                           this.ruleForm.lawyerId = body.data.lawyerId;
                           console.log( this.ruleForm.lawyerId+ this.ruleForm.lawyerName);
                        }
                    }, function (response) {
                        console.log('error:', response);
                    });
            },
            back:function(){
                this.$router.go(-1);
            }
        }
    }
</script>