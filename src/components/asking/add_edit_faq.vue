<!-- 常见问答 -->
<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li click="active">问答管理</li>
                        <li @click="back"> <a href="javascript:void(0)">客服与帮助</a></li>
                        <li click="active">常见问答</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">常见问答</div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="panel-body">
                                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width:1200px;margin-left:50px">
                                          <el-form-item label="问题：" prop="title">
                                            <el-input v-model="ruleForm.title" placeholder="最多不超过32个字符" :maxlength=32></el-input>
                                          </el-form-item>
                                          <el-form-item label="排序：" prop="sort">
                                            <el-input placeholder="非必填，请输入正整数" v-model="ruleForm.sort"></el-input>
                                          </el-form-item>
                                          <!-- <el-form-item label="选择分类：" prop="region">
                                            <el-select v-model="ruleForm.region" placeholder="请选择一级分类">
                                              <el-option label="区域一" value="shanghai"></el-option>
                                              <el-option label="区域二" value="beijing"></el-option>
                                            </el-select>
                                          </el-form-item> -->
                                          <el-form-item  label="上级目录：" prop="parentIds">
                                              <el-cascader
                                                  expand-trigger="click"
                                                  :options="options"
                                                  v-model="ruleForm.parentIds"
                                                  @change="handleChange"
                                                  change-on-select>
                                              </el-cascader>
                                              <!-- <el-cascader
                                                  expand-trigger="click"
                                                  :options="tests"
                                                  v-model="ruleForm.test"

                                                  change-on-select>
                                              </el-cascader> -->
                                          </el-form-item>
                                          <el-form-item label="回答：">
                                              <div id="web-editor" style="height: 300px; max-height:300px;"></div>
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

<style scoped></style>

<script>
    import asking from 'api/asking';
    export default {
        name:'addEditFAQ',
        data() {
          //sort数量整数符合要求；
          var checksort = (rule, value, callback) => {
            if (!value) {
              return callback();
            }
            setTimeout(() => {
              var reg=/^\d+$/;
              if (!reg.test(value)) {
                callback(new Error('请输入正整数'));
              } else callback();
            }, 1000);
          };
          return {
            options: [{
              // value: 'zhinan',
              // label: '指南',
              // children: []
            }],
            // tests: [{
            //   value: 1,
            //   label: '1',
            //   children: [{
            //     value: 11,
            //     label: '11',
            //     children:[{value: 111,label: '111',},{value: 112,label: '112',}]
            //   }],},
            //   {
            //   value: 2,
            //   label: '2',
            //   children: [{
            //     value: 22,
            //     label: '22',
            //     children:[{
            //       value: 222,
            //       label: '222',
            //     }]
            //   }],
            // }],
            dataStr:'',//获取的下拉框对象转换成字符串
            parentId:"",//获取
            // options:[
            //   {
            //     "helpCenterId": 4,
            //     "title": "产品介绍",
            //     "levels": 1,
            //     "list": [
            //       {
            //         "id": 6,
            //         "title": "合同定制",
            //         "levels": 2
            //       }]
            //   },
            //   {
            //     "id": 5,
            //     "title": "订单与咨询",
            //     "levels": 1
            //   }
            // ],
            ruleForm: {
              title: '',
              sort:'',
              answer:'',
              parentId:'',
              parentIds:[],
              // test:[1,11,111],
            },
            rules: {
              title: [
                { required: true, message: '请输入名称', trigger: 'blur' },
                { min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur' }
              ],
              parentIds: [
                { required: true,type:'array', message: '请选择分类', trigger: 'change' }
              ],
              sort: [
                // { required: true, message: '请选择一级分类', trigger: 'change' },
                // { message: '请输入正整数', trigger: 'blur' },
                { validator: checksort, trigger: 'blur' }
              ],
              // answer: [
              //   { required: true, message: '请输入名称', trigger: 'blur' }
              // ]
            }
          }
        },

        mounted: function () {
            // this.couponId= this.$route.params.id;
            this.$nextTick(function () {
                this.init();
            });
        },
        methods: {
            //Cascader 级联选择器，change事件
            handleChange(value) {
              this.ruleForm.parentId=value[value.length-1];
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                  if (valid)
                  {
                    // alert('submit!');
                    //借鉴小飞
                    let _answer = this.webEditor.$txt.html();
                    if(_answer == '<p><br></p>') _answer = '';
                    this.ruleForm.answer = _answer;

                    let title=this.ruleForm.title;
                    let sort=this.ruleForm.sort;
                    let parentId=this.ruleForm.parentId;
                    let answer=this.ruleForm.answer;
                    let param={title,sort,parentId,answer}
                    if(param.parentId==-1)
                    {
                      param.parentId="";
                    }

                    //新建问答的提交
                    if(this.$route.params.id=='-1')
                    {
                        $("body").mLoading("show");
                        asking.addFAQSave(this,param).then(function (response)
                        {
                            let body = response.body;
                            this.$message(body.msg);
                            if (body && body.code == 1) {
                                this.$router.go(-1);
                                return;
                            }
                        }, function (response) {
                            console.log('error:', response);
                        });
                    }
                    //编辑页面提交
                    else
                    {
                        $("body").mLoading("show");
                        asking.editFAQSave(this,param,this.$route.params.id).then(function (response)
                        {
                            let body = response.body;
                            this.$message(body.msg);
                            if (body && body.code == 1) {
                                this.$router.go(-1);
                                return;
                            }
                        }, function (response) {
                            console.log('error:', response);
                        });
                    }
                  }
                  else
                  {
                    console.log('error submit!!');
                    return false;
                  }
                });
            },

            //新添加方法都在上面
            init: function () {
                //新增或者编辑问答的时候，获取下拉框数据
                asking.selectOption(this).then(function (response)
                {
                    let body = response.body;
                    if (body && body.code == 1 && body.data) {
                        this.dataStr = JSON.stringify(body.data);
                        this.options=JSON.parse(this.dataStr.replace(/helpCenterId/gi,'value').replace(/title/gi,'label').replace(/list/gi,'children'));
                        // if(this.$route.params.id!=-1)
                        // {
                        //   this.options[0].disabled=true;
                        // }
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
                //编辑问答页面，拉去页面内容
                if(this.$route.params.id!=='-1')
                {
                    asking.editFAQGet(this,this.$route.params.id).then(function (response)
                    {
                        let body = response.body;
                        if (body && body.code == 1 && body.data) {
                            this.ruleForm = body.data;
                            // console.log(Array.isArray(body.data.parentIds));
                            let arr=body.data.parentIds;
                            // 此处是防止顶级目录，归属问题为空
                            if(body.data.parentIds.length==0)
                            {
                              this.ruleForm.parentIds=['-1'];
                            }
                            else
                            {
                              this.ruleForm.parentId=arr[arr.length-1];
                            }

                            //因为提交的时候，还是parentId，是字符串不是数组
                            this.webEditor.$txt.html(this.ruleForm.answer);
                            return;
                        }
                    }, function (response) {
                        console.log('error:', response);
                    });
                }



                // 富文本上传 配置
                let editor = new wangEditor('web-editor');
                let _config = ['menus','uploadImgUrl','uploadImgFileName'];
                let _configList = asking.getWebEditorCfg();
                for(let i= 0;i<4;i++){
                    editor.config[_config[i]] = _configList[_config[i]];
                }
                editor.config.uploadImgFns.onload = function (resultText, xhr) {
                    if(typeof resultText == 'undefined' || resultText == '') return;
                    let result = JSON.parse(resultText);
                    if(result.code == 1){
                        let data = result.data;
                        editor.command(null, 'insertHtml', '<img src="' + data.url + '" alt="' + data.name + '" style="max-width:100%;"/>');
                    }else{
                        _this.$message(result.msg);
                    }
                };
                this.webEditor = editor;
                editor.create();
            },
            back:function(){
                this.$router.go(-1);
            }
        }
    }
</script>