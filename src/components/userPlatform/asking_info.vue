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
                        <li click="active">问答增编</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">问答增编</div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="panel-body">
                                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" label-position="right">
                                            <el-form-item label="用户昵称：" prop="userName">
                                                <el-input v-model.trim="ruleForm.userName" style="width:300px"></el-input>
                                            </el-form-item>
                                            <el-form-item label="用户ID：" prop="userId" required>
                                                <el-input v-model.trim="ruleForm.userId" style="width:300px" :disabled="onOff"></el-input>
                                            </el-form-item>
                                            <el-form-item label="律师昵称：" prop="userName">
                                                <el-input v-model.trim="ruleForm.lawyerName" style="width:300px"></el-input>
                                            </el-form-item>
                                            <el-form-item label="律师ID：" prop="lawyerId" required>
                                                <el-input v-model.trim="ruleForm.lawyerId" style="width:300px" :disabled="onOff"></el-input>
                                            </el-form-item>
                                            <el-form-item label="问答标题：" prop="title">
                                                <el-input v-model.trim="ruleForm.title" style="width:300px"></el-input>
                                            </el-form-item>
                                            <el-form-item label="金额：" prop="amount">
                                                <el-input v-model.trim="ruleForm.amount" style="width:300px"></el-input>
                                            </el-form-item>

                                            <el-form-item  label="问答分类：" required  prop="caseId">
                                                <el-select v-model="ruleForm.caseId" placeholder="请选择">
                                                    <el-option
                                                      v-for="item in options"
                                                      :key="item.id"
                                                      :label="item.name"
                                                      :value="item.id">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>


                                            <el-form-item label="问答详情：" required>
                                                <div class="chatBox">
                                                    <audio :src="srcTemp" controls="controls" style="visibility:hidden" ref="audioId" id="audioId"></audio>
                                                    <ul class="chat" v-for="(item,index) in ruleForm.chatData">
                                                        <li :class="[item.usetType==1?'fr':'']">
                                                        <!-- <li> -->
                                                            <div class="userInfo">
                                                                <!-- <img class="userIcon" src="../../../static/img/chart-texture.jpg"></img> -->
                                                                <h6 class="userName" v-if="item.usetType==2">{{ruleForm.userName}}</h6>
                                                                <h6 class="userName" v-if="item.usetType==1">{{ruleForm.lawyerName}}</h6>
                                                                <h6 class="time">&emsp;{{item.sendTime}}</h6>
                                                            </div>
                                                            <div class="content">
                                                                <!-- <el-input class="text" v-if="item.msgType==3901" v-model="item.content"></el-input> -->
                                                                <div contenteditable="true" class="text" v-if="item.msgType==3901" v-html="item.content" @blur="(event)=>twoWayBind(event,index)"></div>
                                                                <!-- <editableDiv class="text" v-if="item.msgType==3901" v-model="item.content"></editableDiv> -->
                                                                <el-button type="success" v-if="item.msgType==3903">声音文件</el-button>
                                                                <!-- <el-button type="success" @click="playAudio(item.content)"  v-if="item.msgType==3903">声音文件</el-button> -->
                                                                <el-upload v-if="item.msgType==3902"
                                                                  class="avatar-uploader"
                                                                  :with-credentials="true"
                                                                  :action="upload"
                                                                  :data="{type:8}"
                                                                  :show-file-list="false"
                                                                  :on-success="(res,file)=>updateUrl(index,res,file)"
                                                                  :before-upload="beforeAvatarUpload">
                                                                  <img v-if="item.content" :src="item.content" class="avatar">
                                                                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                                                </el-upload>
                                                            </div>
                                                            <div class="delete">
                                                               <span>在此条下方插入一条：</span>
                                                                <el-button-group>
                                                                  <el-button style="background:#0000FF" type="primary" size="mini" icon=" el-icon-plus " @click="addItem('user','txt',index)">用户文本</el-button>
                                                                  <el-button style="background:#0000FF" type="primary" size="mini" icon=" el-icon-plus " @click="addItem('user','img',index)">用户图片</el-button>
                                                                  <!-- <el-button style="background:#0000FF" type="primary" size="mini" icon=" el-icon-plus ">用户声音</el-button> -->
                                                                </el-button-group>
                                                                <el-button type="danger" icon="delete" size="mini" @click="deleteItem(index)">删除该条</el-button>
                                                                <el-button-group>
                                                                  <el-button style="background:#008040" type="primary" size="mini" icon=" el-icon-plus " @click="addItem('lawyer','txt',index)">律师文本</el-button>
                                                                  <el-button style="background:#008040" type="primary" size="mini" icon=" el-icon-plus " @click="addItem('lawyer','img',index)">律师图片</el-button>
                                                                  <!-- <el-button style="background:#008040" type="primary" size="mini" icon=" el-icon-plus ">律师声音</el-button> -->
                                                                </el-button-group>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    <br>
                                                    <el-button type="primary" icon=" el-icon-plus " v-if="ruleForm.chatData.length==0" @click="addItem('user','txt',0)">添加一条问答</el-button>
                                                </div>
                                            </el-form-item>
                                            <!-- <el-form-item>
                                                <template>
                                                  <el-checkbox v-model="ruleForm.checked">隐藏律师姓名</el-checkbox>
                                                </template>
                                            </el-form-item> -->
                                            <el-form-item label="是否公开：" required>
                                                <el-radio-group v-model="ruleForm.publicState">
                                                  <el-radio :label="0">否</el-radio>
                                                  <el-radio :label="1">是</el-radio>
                                                </el-radio-group>
                                            </el-form-item>
                                            <el-form-item label="推荐到首页：" required>
                                                <el-radio-group v-model="ruleForm.hotStatus">
                                                  <el-radio :label="0">否</el-radio>
                                                  <el-radio :label="1">是</el-radio>
                                                </el-radio-group>
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
            </div>
        </div>
        <el-dialog v-model="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<style>
    .chatBox{height:600px;overflow:auto;border:2px solid #dedede;text-align:center;}
    .chat {padding:3px 3%;}
    .chat>li{margin-bottom:15px;position:relative;border:1px dashed #fff;padding-bottom:10px;border-radius:3px;}
    .chat>li:hover{border-color:#dedede;}
    .chat>li:hover .delete{display:block;}
    .chat .delete{position:absolute;top:-16px;right:35%;display:none;}
    .userIcon{width:50px;height:50px;border-radius:25px;}
    .chat li .userInfo{overflow:hidden;}
    .chat li .userInfo h6{float:left;}
    .userName{display:inline-block;font-size:16px;color:#0000FF;}
    h6 {display:inline-block;font-size:16px;color:#0000FF;}
    .fr .userName{display:inline-block;font-size:16px;color:#008040;}
    .fr h6 {display:inline-block;font-size:16px;color:#008040;}
    .content{margin-left:20px;text-align:left;}
    .content>img{width:100px;max-height:100px;margin:5px;}
    .content .text{line-height:25px;word-break:break-word;padding:5px;border-radius:10px;}
    .content>img:hover{cursor:pointer;}


    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
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
    import asking from 'api/asking';
    export default {
        name:'couponList',
        components: {Page},
        data() {
            //number数量整数符合要求；
            var checkNumber = (rule, value, callback) => {
              if (!value) {
                return callback(new Error('输入不能为空'));
              }
              setTimeout(() => {
                var reg=/^\d+$/;
                if (!reg.test(value)) {
                  callback(new Error('请输入正整数'));
                } else callback();
              }, 1000);
            };
            //money面额的验证规则，小数或者整数都符合要求；
            var checkMoney = (rule, value, callback) => {
              if (!value) {
                return callback();
              }
              setTimeout(() => {
                var reg=/^\d+(\.\d+)?$/;
                var reg2=/^\d+(\.\d{1,2})?$/;
                if (!reg.test(value))
                {
                  callback(new Error('请输入数字'));
                }
                else if(!reg2.test(value))
                {
                  callback(new Error('小数位数不超过2位'));
                }
                else callback();
              }, 1000);
            };
          return {
            dialogImageUrl: '',
            dialogVisible: false,
            upload: '',
            imageUrl: '',

            options:[],
            onOff:false,
            ruleForm:{
                lawyerName:'',
                userName:'',
                amount:'',
                caseId:'',
                hotStatus:'',
                publicState:'',
                lawyerId:'',
                title: "",
                userId:'',
                chatData: [
                    // {
                    //     id: 1,
                    //     uuid: "",
                    //     matchUuid: "",
                    //     chatIndex: '',
                    //     msgType: "",
                    //     sendUserid: "",
                    //     targetid: "",
                    //     sendTime: "",
                    //     content: "",
                    //     createTime: "",
                    //     updateTime: "",
                    //     isDelete: '',
                    //     userType: ''
                    //     publicState: ''
                    // },
                ]

            },
            rules: {
                userName:[{required: true, message: '用户昵称必填', trigger: 'blur' },{ min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }],
                lawyerName:[{required: true, message: '用户昵称必填', trigger: 'blur' },{ min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }],
                caseId:[{message: '问答分类必选', trigger: 'blur' ,type:"number"}],
                amount:[{trigger: 'blur',validator:checkMoney }],
                userId:[{trigger: 'blur',validator:checkNumber }],
                lawyerId:[{trigger: 'blur',validator:checkNumber}],
                title:[{required: true, trigger: 'blur' },{ min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }],
                hotStatus:[{message: '问答分类必填', trigger: 'blur'}],
                publicState:[{message: '问答分类必填', trigger: 'blur'}],
            },
            dialogVisible:false,//备注弹窗开关
            dialogImageUrl:'',//预览的图片地址
            srcTemp:'',//音频文件地址
          }
        },

        mounted: function () {
            // this.couponId= this.$route.params.id;
            this.$nextTick(function () {
                this.init();
            });
        },
        methods: {
            init: function () {
                //分类下拉框内容
                this.upload = apiOperaCon.upload;
                asking.optionSelect(this).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1 && body.data) {
                        this.options=body.data;
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
                //拿到数据对数据进行处理，每条里面的sendUserid 等于userId，就是true用户发送的消息，否则就是律师false
                let id = this.$route.params.id;
                if(id!=-1)
                {
                    this.onOff=true;
                    asking.askingInfoPull(this, id).then(function (response) {
                        // useType:1是律师，2是用户
                        let body = response.body;
                        if (body && body.code == 1 && body.data) {
                            this.ruleForm = body.data;
                            // this.ruleForm.caseId = this.ruleForm.caseId.toString();
                            // this.ruleForm.caseId = ""+this.ruleForm.caseId;
                            // console.log(typeof(this.ruleForm.caseId));
                            var userId=this.ruleForm.userId;
                            var arr=this.ruleForm.chatData;
                            if(arr.length!=0)
                            {
                                for(var i=0;i<arr.length;i++)
                                {
                                    if(arr[i].sendUserid==userId)
                                    {
                                        arr[i].usetType=2;
                                    }
                                    else
                                    {
                                        arr[i].usetType=1;
                                    }
                                }
                            }
                            return;
                        }
                    }, function (response) {
                        console.log('error:', response);
                    });
                }
                else
                {
                    this.ruleForm.hotStatus=0;
                    this.ruleForm.publicState=0;
                    this.ruleForm.chatData=[];
                }
            },
            // handleAvatarSuccess(res, file) {
            //     this.imageUrl = URL.createObjectURL(file.raw);
            // },
            // 改写如下
            updateUrl(index,res, file) {
                this.ruleForm.chatData[index].content = URL.createObjectURL(file.raw);
                // this.ruleForm.chatData[index].content = res.data.url;
                // console.log(res)
                // console.log(file)
                // console.log(res.data.url)
                // console.log(this.ruleForm.chatData[index].content)
                // if(res.msg && res.code !=1){
                //     this.$message.error(res.msg);
                //     return;
                // }
                // else
                // {
                //     this.$message(res.msg);
                //     this.params[str]=res.data.url;
                // }
            },

            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPng = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 10;

                if (!isJPG&&!isPng) {
                  this.$message.error('上传头像图片只能是 JPG或者PNG 格式!');
                  return false;
                }
                if (!isLt2M) {
                  this.$message.error('上传头像图片大小不能超过 10MB!');
                  return false;
                }
                return true;
            },
            // handlePictureCardPreview(file) {
            //     this.dialogImageUrl = file.url;
            //     this.dialogVisible = true;
            // },
            // handlePictureCardPreview(url) {
            //     this.dialogVisible = true;
            // },
            playAudio(url) {
                // console.log(url);
                // console.log("this.$refs"+this.$refs);
                // console.log("this.$refs.audioId"+this.$refs.audioId);
                // console.log("document.getElementById('audioId')"+document.getElementById('audioId'));
                document.getElementById("audioId").pause();
                this.urlTemp = url;
                document.getElementById("audioId").play();
                // this.$refs.audioId.pause();
                // this.urlTemp = url;
                // this.$refs.audioId.play();
            },
            // div数据的双向绑定
            twoWayBind(event,index){
                if(event.target) this.ruleForm.chatData[index].content=event.target.innerText;
                else this.ruleForm.chatData[index].content=event.srcElement.innerText;
                // console.log("event.srcElement==>"+event.srcElement);
                // console.log("event.target==>"+event.target);
                // console.log("event.srcElement.nodeName==>"+event.srcElement.nodeName);
                // console.log("event.srcElement.nodeType==>"+event.srcElement.nodeType);
                // console.log("event.srcElement.nodeValue==>"+event.srcElement.nodeValue);
                // console.log("event.srcElement.value==>"+event.srcElement.value);
                // console.log("event.srcElement.innerText==>"+event.srcElement.innerText);
                // console.log("event.type==>"+event.type);
                // console.log("event.srcElement==event.target==>");
                // console.log(event.srcElement==event.target);
                // console.log("event.button==>"+event.button);

            },
            deleteItem(index){
                this.ruleForm.chatData.splice(index,1);
            },
            addItem(name,type,index){

                if(this.ruleForm.userName=="")
                {
                    this.$message.error("请先输入用户昵称");
                    return;
                }
                if(this.ruleForm.lawyerName=="")
                {
                    this.$message.error("请先输入律师昵称");
                    return;
                }
                // if(this.$route.params.id==-1) this.ruleForm.lawyerName="律师";
                var obj={
                    usetType:1,
                    msgType:3901,
                    content:""
                }
                if(name=="user") obj.usetType=2;
                if(type=="img") obj.msgType=3902;
                obj.sendTime=new Date(+new Date()+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
                this.ruleForm.chatData.splice(index+1,0,obj);
            },
            //编辑完成提交
            submitForm:function(formName){
                if(this.ruleForm.chatData.length<1)
                {
                    this.$message.error("聊天内容不能为空");
                    return;
                }
                this.$refs[formName].validate((valid) => {
                  if (valid)
                  {
                    if(this.$route.params.id!=-1)
                    {
                        let param=this.ruleForm;
                        asking.askingInfoUpdate(this,param,this.$route.params.id).then(function(res){
                          let body = res.body;
                          if (body && body.code == 1) {
                              this.$message(body.msg);
                              this.$router.push({name:'asking_man_list'});
                              return;
                          }
                        },function(res){
                          console.log('error:', res);
                        });
                    }
                    else
                    {
                        // let params=Object.assign({},this.ruleForm.chatData);
                        // let param=JSON.stringify(params);
                        // this.ruleForm.chatData=JSON.stringify(this.ruleForm.chatData);
                        // let param=JSON.stringify(params);
                        let param=this.ruleForm;
                        asking.askingInfoAdd(this,param).then(function(res){
                          let body = res.body;
                          if (body && body.code == 1) {
                              this.$message(body.msg);
                              this.$router.push({name:'asking_man_list'});
                              return;
                          }
                        },function(res){
                          console.log('error:', res);
                        });
                    }
                  }
                  else
                  {
                    console.log('error submit!!');
                    return false;
                  }
                })
            },
            back:function(){
                this.$router.go(-1);
            }
        }
    }
</script>