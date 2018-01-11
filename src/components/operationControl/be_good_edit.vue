<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li click="active">业务类型</li>
                        <li @click="back"> <a href="javascript:void(0)">擅长领域</a></li>
                        <li click="active">分类增编</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">{{title2}}</div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="panel-body">
                                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm" style="width:600px;margin-left:50px">
                                          <el-form-item label="擅长领域名称：" prop="name">
                                            <el-input v-model="ruleForm.name" placeholder="最多不超过50个字符"></el-input>
                                          </el-form-item>
                                          <el-form-item label="自身级别：" prop="typeCode">
                                            <el-select v-model="ruleForm.typeCode" placeholder="请选择自身分类级别" @change="changeParent">
                                              <el-option label="一级分类" value="1" key="1"></el-option>
                                              <el-option label="二级分类" value="2" key="2"></el-option>
                                            </el-select>
                                          </el-form-item>
                                          <el-form-item label="归属父类：" prop="parentId">
                                            <el-select v-model="ruleForm.parentId" placeholder="请选择父级分类" :disabled="parentOnoff">
                                              <el-option v-for="item in dataList" :label="item.name" :value="item.id" :key="item.id" :disabled="item.disabled"></el-option>
                                            </el-select>
                                          </el-form-item>

                                          <el-form-item label="排序：" prop="sortBy">
                                            <el-input placeholder="非必填，请输入正整数" v-model="ruleForm.sortBy"></el-input>
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
    import asking from 'api/asking';
    export default {
        name:'typeAddEdit',
        data() {
          //number数量整数符合要求；
          var checkNumber = (rule, value, callback) => {
            if (!value) return callback();
            setTimeout(() => {
              var reg=/^\d+$/;
              if (!reg.test(value)) {
                callback(new Error('请输入正整数'));
              } else callback();
            }, 1000);
          };
          return {
            dataList:[
                {
                  "id": 0,
                  "name": "顶级目录",
                  "disabled":false
                }
            ],
            // parentOnoff:false,
            ruleForm: {
              "name": "",//名称
              "sortBy": '',//排序
              "parentId": 0,//父类级别
              "typeCode": "1",//自身级别
              "bizType": ""
            },
            dataTemp:[],//下拉框的临时数据
            title2:"分类编辑",
            ruleForm2:{},//临时存放编辑页面拉取数据
            rules: {
              name: [
                { required: true, message: '请输入名称', trigger: 'blur' },
                { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
              ],
              typeCode: [
                { required: true, message: '请选择自身级别', trigger: 'change'}
              ],
              parentId: [
                { required: true, message: '请选择一级分类', trigger: 'blur',type:'number'}
              ],
              sortBy: [
                { validator: checkNumber, trigger: 'blur' }
              ]
            }
          }
        },
        computed:{
          parentOnoff(){
            if(this.ruleForm.typeCode==1)
            {
              return true;
            }
            else
            {
              return false;
            }
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
                let bizType=this.$route.params.source;
                let param={bizType};
                // 不管是新增还是编辑页面，都要加载下拉选择框
                asking.typeSelection(this,param).then(function (response) {
                    let body = response.body;
                    if (body.code == 1 && body.data) {
                        // this.dataList = body.data;
                        this.dataList=this.dataList.concat(body.data);
                        this.dataTemp=body.data;
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
                // 如果是编辑页面，加载信息
                if(this.$route.params.id!=="-1")
                {
                    if(this.$route.params.source==1) this.title2="分类编辑（角色：律师）";
                    else this.title2="分类编辑（角色：产权代理人）";
                    let id=this.$route.params.id;
                    let param={id}
                    asking.typeEditGet(this,param).then(function (response) {
                        let body = response.body;
                        if (body && body.code == 1 && body.data) {
                            // console.log(body.data);
                            this.ruleForm = body.data;
                            this.ruleForm.typeCode=this.ruleForm.typeCode.toString();
                            this.ruleForm2 =Object.assign({},this.ruleForm);
                            this.ruleForm2.typeCode=this.ruleForm2.typeCode.toString();
                            return;
                        }
                    }, function (response) {
                        console.log('error:', response);
                    });
                }
                else
                {
                  if(this.$route.params.source==1) this.title2="新增分类（律师）";
                  else this.title2="新增分类（产权代理人）";
                }
            },
            //自身级别变化，如果为1，父级不可选择
            changeParent(val){
              if(val==1)
              {
                this.dataList[0].disabled=false;
                this.ruleForm.parentId=0;
                // this.parentOnoff=true;
              }
              else if(val==2)
              {
                if(this.$route.params.id!=="-1")
                {
                  if(this.ruleForm2.parentId!="0")
                  {
                    this.ruleForm.parentId=this.ruleForm2.parentId;
                  }
                  else
                  {
                    this.ruleForm.parentId=this.dataTemp[0].id;
                  }
                }
                else
                {
                  this.ruleForm.parentId="";
                }
                this.dataList[0].disabled=true;
              }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                  // if(this.$route.params.id==-1)
                  // {
                  //   this.ruleForm.bizType.code=this.$route.params.source;
                  // }
                  if (valid)
                  {
                    if(this.ruleForm.typeCode==2&&this.ruleForm.typeCode=='')
                    {
                      this.$message('请填写归属父级');
                      // console.log('请填写归属父级');
                    }
                    else
                    {
                      if(this.$route.params.id=='-1')
                      {
                          this.ruleForm.bizType=this.$route.params.source;
                          // asking.typeSave(this,param).then(function (response) {
                          asking.typeSave(this,this.ruleForm).then(function (response) {
                              let body = response.body;
                              this.$message(body.msg);
                              if (body.code == 1 && body) {
                                  this.$router.go('-1');
                                  return;
                              }
                          }, function (response) {
                              console.log('error:', response);
                          });
                      }
                      else
                      {
                          let id=this.$route.params.id;
                          let name=this.ruleForm.name;
                          let sortBy=this.ruleForm.sortBy;
                          let parentId=this.ruleForm.parentId;
                          let typeCode=this.ruleForm.typeCode;
                          let bizType=this.$route.params.source;
                          let param={id,name,sortBy,parentId,typeCode,bizType}
                          asking.updateSave(this,param).then(function (response) {
                              let body = response.body;
                              this.$message(body.msg);
                              if (body.code == 1 && body) {
                                  this.$router.go('-1');
                                  return;
                              }
                          }, function (response) {
                              console.log('error:', response);
                          });
                      }
                    }
                  }
                  else
                  {
                    console.log('error submit!!');
                    return false;
                  }
                });
            },

            back:function(){
                this.$router.go(-1);
            }
        }
    }
</script>