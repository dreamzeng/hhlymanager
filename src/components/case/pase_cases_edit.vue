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
                                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
                                          <el-form-item label="案件名称：" prop="name">
                                             <el-input v-model="ruleForm.name" :maxlength=32></el-input>
                                          </el-form-item>
                                          <el-form-item label="案件年份：" prop="year">
                                             <el-input v-model="ruleForm.year"></el-input>
                                          </el-form-item>
                                          <el-form-item label="审理法院：" prop="court">
                                             <el-input v-model="ruleForm.court" :maxlength=32></el-input>
                                          </el-form-item>
                                          <el-form-item label="详情编辑：" prop="content">
                                             <webEditor editorId="serInfoEditor" ref="serInfoEditor"></webEditor>
                                          </el-form-item>
                                          <el-form-item label="关联律师：" prop="phone">
                                             <el-input v-model="ruleForm.phone" @keyup.native="checkPhone(ruleForm)"  placeholder="请输入律师手机号" :maxlength=32 style="width:20%"></el-input>
                                             <el-button type="primary" @click ='searchLawyer'>查找</el-button>
                                          </el-form-item>
                                          <el-form-item label="律师信息：">
                                             <span v-text="ruleForm.lawyerName"></span>
                                          </el-form-item>
                                          <el-form-item>
                                             <el-button @click="back">取消</el-button>
                                             <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
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
            parentId:"",
            ruleForm: {
              uuid: this.$route.params.uuid,
              name: this.$route.params.caseName,
              year: this.$route.params.caseYear,
              court:this.$route.params.office,
              lawyerName:this.$route.params.lawyerName,
              lawyerId:this.$route.params.lawyerId,
              phone: '',
              content:''
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
                this.serInfoEditor = this.$refs.serInfoEditor;
                let _this = this,param = {
                  uuid: _this.$route.params.uuid
                };
                if(_this.$route.params.id!=='-1'){
                   apiCase.detailCase(_this,param).then(function(response){
                     let body = response.body;
                        if (body && body.code == 1) {
                            _this.ruleForm.content = body.data.caseDetail;
                             //因为提交的时候，还是parentId，是字符串不是数组
                            _this.$refs['serInfoEditor'].setContent(this.ruleForm.content);
                          }
                   }, function (response) {
                        console.log('error:', response);
                   });
                  
                }

            },
            submitForm:function(formName){  
                let _this = this;
                _this.ruleForm.content = _this.$refs['serInfoEditor'].getContent();
                _this.$refs[formName].validate(function(valid){
                    if (valid) {
                      if(_this.ruleForm.lawyerId == ''&& _this.ruleForm.lawyerName == ''){
                            _this.$message({message:'请输入关联律师', type: 'warning'});
                            return false;
                         }
                        let params = {
                            uuid: _this.ruleForm.uuid,
                            caseName: _this.ruleForm.name, 
                            caseYear: _this.ruleForm.year,
                            caseDetail: _this.ruleForm.content,
                            courtName: _this.ruleForm.court,
                            lawyerId: _this.ruleForm.lawyerId,
                            lawyerName: _this.ruleForm.lawyerName
                           };
                        apiCase.editCase(_this,params).then(function (response){
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
                    return false;
                });
              
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
                        }
                    }, function (response) {
                        console.log('error:', response);
                    });
            },
            checkPhone:function(){
              this.ruleForm.phone = this.ruleForm.phone.replace(/[^\d|.]/g, '');
            },
            back:function(){
                this.$router.go(-1);
            }
        }
    }
</script>