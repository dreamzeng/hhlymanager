<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li>文章列表</li>
                        <li>增编文章</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">增编文章</div>
                        <div class="panel-body">
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" label-position="right">
                                <el-form-item label="标题：" prop="title">
                                    <el-input v-model="ruleForm.title" style="width:300px" max-length="100"></el-input>
                                </el-form-item>
                                <el-form-item label="是否发布：" required>
                                    <el-radio-group v-model="ruleForm.publishState">
                                      <el-radio :label="0">否</el-radio>
                                      <el-radio :label="1">是</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="分类：" prop="">
                                    <el-select v-model="ruleForm.categoryUuid" placeholder="请选择">
                                        <el-option
                                          v-for="item in options"
                                          :key="item.id"
                                          :label="item.name"
                                          :value="item.id">
                                        </el-option>
                                      </el-select>
                                </el-form-item>
                                <el-form-item label="文章封面：" prop="">
                                    <el-upload class="upload-demo" :action="upload"
                                               :file-list="fileListBizi"
                                               :data="{type:3}"
                                               :with-credentials="true"
                                               :on-remove="handleRemoveBizi"
                                               :before-upload="beforeAvatarUpload"
                                               :on-change="handleChangeBizi"
                                               list-type="picture">
                                        <el-button size="small" type="primary">点击上传</el-button>
                                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，仅限1张（图片大小不超过 12MB!）</div>
                                    </el-upload>
                                </el-form-item>
                                <el-form-item label="正文：">
                                    <webEditor editorId="serInfoEditor" ref="serInfoEditor"></webEditor>
                                </el-form-item>
                                <el-form-item label="初始阅读数：" prop="initReadNum">
                                    <el-input v-model="ruleForm.initReadNum" style="width:205px" :disabled="onoff"></el-input>
                                </el-form-item>

                                <el-form-item>
                                    <el-button type="info" @click="submitForm('ruleForm')">提交</el-button>
                                    <el-button @click="back">取消</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--main content end-->
</template>
<style scoped>
</style>

<script>
    import apiOperaCon from 'api/userPlatform';
    import webEditor from 'components/common/webEditor';
    import VueCoreImageUpload from 'components/common/vue.core.file.upload';

    export default {
        components:{webEditor,VueCoreImageUpload},
        name: 'goodsEdit',
        data: function () {
            //阅读数量
            var checkMoney2 = (rule, value, callback) => {
              if (!value) {
                return callback();
              }
              setTimeout(() => {
                var reg=/^\d+$/;
                if (!reg.test(value))
                {
                  callback(new Error('请输入正整数'));
                }
                else callback();
              }, 1000);
            };
            return {
                options:[
                    {
                        id:"1",
                        name:"合同定制"
                    }
                ],
                commitType:'newSave',
                forever:[],//编辑页面选中组合的永久保存区，用于判断组合是否改变，决定组合按钮是否可以点击
                serInfoEditor:'',
                FAQEditor:'',
                onoff:false,

                type: 1, // type 为1时为添加，为2时修改
                id:'',
                urlType:1,
                liveId:'', //活动id
                liveTitle:'', //活动标题
                fileListBizi: [],

                taskId:'',
                upload:'',
                ruleForm:{
                    "id":"",
                    "title":"",
                    "publishState":1,
                    "categoryUuid":"1",
                    "pic":"",
                    "initReadNum":"",
                    "content":""
                },
                rules: {
                    title:[{required: true, message: '请输入文章名称', trigger: 'blur' },{ min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'blur' }],
                    // categoryUuid:[{required: true, message: '请选择文章分类', trigger: 'blur',type:"number" }],
                    initReadNum:[{ validator: checkMoney2, trigger: 'blur' }],
                }
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            });
        },
        methods: {
            // 弹窗提交按钮
            popSubmit(){
                let specCombId=this.specCombId;
                let _content =this.$refs.webEditorPop.getContent();
                if(_content == '<p><br></p>') _content = '';
                // this.popContent=_content;
                let content=this.popContent=_content;
                let param={specCombId,content}
                // console.log(param);
                apiOperaCon.popSubmit(this,param).then(function (response) {
                    let body = response.body;
                    this.$message(body.msg);
                    if (body&& body.code == 1) {
                        // this.dialogVisible=false;
                         $('#myModalYWL').modal('hide');
                        this.combinationData[this.idx].content=this.$refs.webEditorPop.getContent();
                        // console.log(this.combinationData[this.idx].content());
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            init: function () {
                this.upload = apiOperaCon.upload;
                // 基础信息-选择分类下拉框
                apiOperaCon.options(this).then(function (response) {
                    let body = response.body;
                    if (body&&body.data && body.code == 1) {
                        this.options=body.data;
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
                if (this.$route.params.id != -1) {
                    this.onoff=true;
                    apiOperaCon.pullEdit(this, this.$route.params.id).then(function (response) {
                        let body = response.body;
                        if (body && body.code == 1 && body.data) {
                            this.ruleForm = body.data;
                            this.ruleForm.categoryUuid = this.ruleForm.categoryUuid-0;


                            this.$refs['serInfoEditor'].setContent(this.ruleForm.content);

                            this.ruleForm.uuid=this.$route.params.id;

                            //下面我是我模仿上面写的代码
                            if(this.ruleForm.pic)
                            {
                                let urls =this.ruleForm.pic;
                                console.log("this.ruleForm.pic="+this.ruleForm.pic);
                                let temp = urls.split('/');
                                console.log("this.ruleForm.pic2="+this.ruleForm.pic);
                                let name = temp[temp.length-1];
                                this.fileListBizi.push({name,url:urls});
                            }
                            return;
                        }
                        if (body && body.code == 0) {
                            this.$message.error({message: body.msg});
                        }
                    }, function (response) {
                        console.log('error:', response);
                    });
                }
            },
            // 表单提交
            submitForm:function(formName) {

                this.ruleForm.content=this.$refs['serInfoEditor'].getContent();
                if(this.ruleForm.content == '<p><br></p>') this.ruleForm.content = '';

                if(this.fileListBizi[0])
                {
                    // this.ruleForm.pic = this.fileListBizi[0].url.substring(5);
                    // console.log(this.ruleForm.pic);
                }
                //判断是新增还是编辑，使用不同的提交接口函数
                // let this.commitType = 'goodsAdd';
                if (this.$route.params.id != -1) {
                    this.commitType = 'editSave';
                }

                let _this = this;
                this.$refs[formName].validate(function(valid){
                    if (valid) {
                        $("body").mLoading("show");
                        apiOperaCon[_this.commitType](_this, _this.ruleForm).then(function (response) {
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
                    return false;
                });
            },
            handleRemoveBizi:function(file, fileListBizi) {
                this.fileListBizi = fileListBizi;
                this.ruleForm.pic="";
            },
            beforeAvatarUpload:function(file) {
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
            handleChangeBizi:function(file, fileListBizi) {
                if(file.response && file.response.code !=1){
                    this.$message.error(file.response.msg);
                    let _l = fileListBizi.length-1;
                    fileListBizi.splice(_l, 1);
                    this.fileListBizi = fileListBizi;
                    return;
                }
                if(file.response && file.response.code ==1){
                    let len = fileListBizi.length;
                    this.ruleForm.pic=file.response.data.url
                    if(len>1)
                    {
                        fileListBizi.splice(0,1);
                    }
                    this.fileListBizi = fileListBizi;
                    return;
                }
                this.fileListBizi = fileListBizi;


            },
            back:function(){
                this.$router.go(-1);
            },
        }
    }
    //
</script>
