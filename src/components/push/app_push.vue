<template>
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li class="active">推送管理</li>
                        <li class="active">App推送</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">APP推送</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">
                                </div>
                            </div>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="flex">
                                        <div class="flex-title">
                                            标题：
                                        </div>
                                        <div>
                                            <el-input v-model="form.msgTitle" placeholder="请输入消息标题"></el-input>
                                        </div>
                                    </div>
                                    <div class="flex">
                                        <div class="flex-title">
                                            内容：
                                        </div>
                                        <el-input
                                            type="textarea"
                                            :autosize="{ minRows: 4}"
                                            placeholder="请输入内容"
                                            :maxlength="200"
                                            v-model="form.msgContent">
                                        </el-input>
                                    </div>
                                    <div class="flex mt10">
                                        <div class="flex-title">
                                        </div>
                                        <div style="display: flex;justify-content:flex-end;width: 100%">
                                            <div>{{form.msgContent.length}}/200字</div></div>
                                    </div>
                                    <div class="flex">
                                        <div class="flex-title">
                                            通知形式：
                                        </div>
                                        <el-checkbox-group v-model="checkList">
                                            <el-checkbox label="站内消息" key="2"></el-checkbox>
                                            <el-checkbox label="通知消息栏" key="1" disabled></el-checkbox>
                                        </el-checkbox-group>
                                    </div>
                                    <div class="flex">
                                        <div class="flex-title">
                                            点击操作：
                                        </div>
                                        <el-radio-group v-model="form.appClickType">
                                            <el-radio label="1">无</el-radio>
                                            <el-radio label="2">打开应用指定页</el-radio>
                                            <el-radio label="3">打开URL</el-radio>
                                        </el-radio-group>
                                    </div>
                                    <div class="flex" v-if="form.appClickType != 1">
                                        <div class="flex-title">
                                        </div>
                                        <div style="display: flex;width: 100%" v-if="form.appClickType == 2">
                                                <el-input v-model="form.linkUrlIos" placeholder="IOSurl" style="margin-right: 10%"></el-input>
                                                <el-input v-model="form.linkUrlAndroid" placeholder="安卓url"></el-input>
                                        </div>
                                        <div style="display: flex;width: 50%" v-if="form.appClickType == 3">
                                            <el-input v-model="form.linkUrl" placeholder="url"></el-input>
                                        </div>
                                    </div>
                                    <div class="flex">
                                        <div class="flex-title">
                                            <span style="padding-top: 6px;display: inline-block">
                                                    是否定时发送：
                                            </span>
                                        </div>
                                        <div style="display: flex;align-items: center;height: 36px">
                                                <el-radio v-model="form.sendTimeType" label="0">否</el-radio>
                                                <el-radio v-model="form.sendTimeType" label="1">是</el-radio>
                                                <el-date-picker
                                                    @change="chooseTime"
                                                    style="margin-left: 20px"
                                                    v-if="form.sendTimeType == 1"
                                                    v-model="form.sendTime"
                                                    type="datetime"
                                                    placeholder="选择日期时间"
                                                    align="right"
                                                    :picker-options="pickerOptions">
                                                </el-date-picker>
                                            </div>
                                        </div>
                                    <div class="flex">
                                        <div class="flex-title">
                                            推送对象：
                                        </div>
                                        <div>
                                            <el-select v-model="form.msgReceiveEnd" placeholder="请选择" @change="msgReceiveEnd">
                                                <el-option value="0" label="全部"></el-option>
                                                <el-option value="1" label="用户端"></el-option>
                                                <el-option value="2" label="律师端"></el-option>
                                            </el-select>
                                            <el-select v-model="form.msgReceiveUserType" placeholder="请选择">
                                                <el-option value="0" label="全部"></el-option>
                                                <el-option value="1" v-if="form.msgReceiveEnd != 2" label="个人"></el-option>
                                                <el-option value="2" v-if="form.msgReceiveEnd != 1" label="律师"></el-option>
                                                <el-option value="3" v-if="form.msgReceiveEnd != 1" label="产权代理人"></el-option>
                                            </el-select>
                                            <el-select v-model="form.msgReceiveCustom" placeholder="请选择">
                                                <el-option value="0" label="全部"></el-option>
                                                <el-option value="1" label="自定义"></el-option>
                                            </el-select>
                                            <el-button type="primary" @click="allP" v-if="form.msgReceiveCustom == 0">生成列表<i class="el-icon-search el-icon--right"></i></el-button>
                                        </div>
                                    </div>
                                    <div class="flex">
                                        <div class="flex-title">
                                            选择推送的用户：
                                        </div>
                                        <div style="position: relative;width: 100%;">
                                            <div v-if="form.msgReceiveCustom == 1">
                                                <el-button type="text" @click="downLoad">下载模板</el-button>
                                                <input type="file" id="cImage" @change="chooseExcel" style="position: absolute;width: 107px;height: 36px;opacity: 0;cursor: pointer" title="上传名单">
                                                <el-button type="primary">上传名单<i class="el-icon-upload el-icon--right"></i></el-button>
                                            </div>
                                            <tableList @isPage="isPage" ref="table" :indexNo="indexNo" :select="select"  :page_total="page_total" :limit="param.limit" :table_data="table_data" :index_list="index_list" :prop_name="prop_name">
                                                <el-table-column  label="操作">
                                                    <template slot-scope="scope">
                                                        <el-button type="text" @click="del(scope.row.uuid,scope.row.userName)">剔除</el-button>
                                                    </template>
                                                </el-table-column>
                                            </tableList>
                                            <div style="text-align: center;margin-top: 20px;margin-bottom: 10px;">
                                                <el-button type="primary" @click="save">保存</el-button>
                                                <el-button  @click="cancer">取消</el-button>
                                            </div>
                                        </div>
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
.flex {
    display: flex;
    text-align: right;
    width: 80%;
    margin-top: 20px;
}
    .flex-title{
        min-width: 150px;font-size: 16px
    }
    .red{
        color: red;
    }
    .mt10{
        margin-top: 10px;
    }
</style>
<script>
    import tableList from 'components/common/Ele-table.vue'
    import apiPush from 'api/push';
    import userCommon from "components/third/user_common.vue"
    import lawyer from "components/third/lawyer_list.vue"
    import api from "api/index"
    export default {
        data() {
            return {
                isState:'',
                checkList:["站内消息"],
                form:{
                    sendTime:'',
                    msgTitle:'',
                    msgContent:'',
                    appMsgForm:2,
                    msgReceiveEnd:'',
                    appClickType:'1',
                    sendTimeType:'0',
                    msgReceiveUserType:'',
                    msgReceiveCustom:'',
                    linkUrlIos:'',
                    linkUrlAndroid:'',
                    linkUrl:'',
                },
                multipleSelection:[],
                msgId:'',
                radio2:'用户',
                isClass:true,
                isStatus:"push",
                indexNo:true,
                select:false,
                page_total:0,
                param:{
                    limit:10,
                    page:1,
                },
                table_data:[],
                index_list:[
                    {"label":"用户名"},
                    {"label":"姓名"},
                    {"label":"类型"},
                ],
                prop_name:["userName","realName","userType.value"],
                textarea:'',
                pickerOptions: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '明天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周后',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
            }
        },
        methods:{
            allP(){
                let data={
                    msgId:this.msgId,
                    msgReceiveEnd:this.form.msgReceiveEnd,
                    msgReceiveUserType:this.form.msgReceiveUserType,
                    msgReceiveCustom:this.form.msgReceiveCustom,
                    page:this.param.page,
                    limit:this.param.limit
                };
                if(this.form.msgReceiveEnd.length>0){
                    if(this.form.msgReceiveUserType.length>0){
                        if(this.form.msgReceiveCustom.length>0){
                            apiPush.condition_msgUser(this,data).then(res=>{
                                if(res.body.code === 1){
                                    this.table_data=res.body.data.items;
                                    this.page_total=res.body.data.total;
                                }else{
                                    this.$alert(res.body.msg, '注意事项', {
                                        confirmButtonText: '确定',
                                    });
                                }
                            })
                        }else{
                            this.$alert("请选择上传方式", '注意事项', {
                                confirmButtonText: '确定',
                            });
                        }
                    }else{
                        this.$alert("请选择推送用户", '注意事项', {
                            confirmButtonText: '确定',
                        });
                    }
                }else{
                    this.$alert("请选择推送平台", '注意事项', {
                        confirmButtonText: '确定',
                    });
                }

            },
            msgReceiveEnd(val){
                if(!this.$route.query.uuid){
                    this.form.msgReceiveUserType='';
                }
            },
            cancer(){
              this.$router.go(-1);
            },
            downLoad(){
                let url= process.env.NODE_ENV=='development' ? 'static' : 'resource';
                window.open(url+ '/excel/excel_export.xlsx')
            },
            confirm(){
                let _this=this,multipleSelection=this.$refs.isS.multipleSelection,data;
                multipleSelection.forEach(function (v,a) {
                    if(_this.radio2 == "用户"){
                        v.type="User";
                    }else{
                        v.type="Lawyer";
                    }

                });
                data={
                    userJson:JSON.stringify(multipleSelection),
                    msgId:this.msgId
                };
                apiPush.select_msgUser(this,data).then(res=>{
                    if(res.body.code === 1){
                        this.isShow=false;
                        this.$message("选择成功！！！")
                        this.msg_userPage();
                    }
                })
            },
            chooseTime(data){
              this.form.sendTime=data;
            },
            save(){
                this.form.uuid=this.msgId;
                if(this.form.msgTitle == ''){
                    this.$alert("请输入消息标题", '注意事项', {
                        confirmButtonText: '确定',
                    });
                }else{
                    if(this.form.msgContent == ''){
                        this.$alert("请输入消息内容", '注意事项', {
                            confirmButtonText: '确定',
                        });
                    }else{
                        if(this.checkList.length>0){
                            if(this.form.msgReceiveEnd.length>0){
                                if(this.form.msgReceiveUserType.length>0){
                                    if(this.form.msgReceiveCustom.length>0){
                                        if(this.$route.query.uuid){
                                            apiPush.schedule_MsgUpdate(this,this.form).then(res=>{
                                                if(res.body.code === 1){
                                                    this.$message(res.body.msg);
                                                    this.$router.push({
                                                        name:'push_record',
                                                        params:{
                                                            isState:this.isState
                                                        }
                                                    });
                                                }else{
                                                    this.$alert(res.body.msg, '注意事项', {
                                                        confirmButtonText: '确定',
                                                    });
                                                }
                                            })
                                        }else{
                                            apiPush.schedule_appMsgAdd(this,this.form).then(res=>{
                                                if(res.body.code === 1){
                                                    this.$message(res.body.msg);
                                                    this.$router.push({
                                                        name:'push_record',
                                                        params:{
                                                            isState:'2'
                                                        }
                                                    });
                                                }else{
                                                    this.$alert(res.body.msg, '注意事项', {
                                                        confirmButtonText: '确定',
                                                    });
                                                }
                                            })
                                        }
                                    }else{
                                        this.$alert("请选择上传方式", '注意事项', {
                                            confirmButtonText: '确定',
                                        });
                                    }
                                }else{
                                    this.$alert("请选择推送用户", '注意事项', {
                                        confirmButtonText: '确定',
                                    });
                                }
                            }else{
                                this.$alert("请选择推送平台", '注意事项', {
                                    confirmButtonText: '确定',
                                });
                            }
                        }else{
                            this.$alert("请选择通知形式", '注意事项', {
                                confirmButtonText: '确定',
                            });
                        }
                    }
                }
            },
            del(id,userName){
                this.$confirm('确认删除'+userName+'用户？','提示')
                    .then(_ => {
                        apiPush.msg_userDelete(this,id).then(res=>{
                            this.$message(res.body.msg);
                            this.msg_userPage();
                        })
                    })
                    .catch(_ => {});
            },
            chooseExcel(){
                let formData = new FormData(),$file=document.getElementById("cImage").files;
                formData.append('file',$file[0]);
                formData.append('msgId',this.msgId);
                formData.append('limit',10);
                if($file.length>0){
                    if($file[0].name.substring($file[0].name.lastIndexOf('.')+1) == "xlsx"){
                        apiPush.upload_msgUser(this,formData).then(res=>{
                            if(res.body.code === 1){
                                this.table_data=res.body.data.items;
                                this.page_total=res.body.data.total;
                            }else{
                                this.$alert(res.body.msg, '注意事项', {
                                    confirmButtonText: '确定',
                                });
                            }
                        })
                    }else{
                        this.$alert("仅支持上传后缀为*.xlsx的excel表格，请确认上传文件正确", '注意事项', {
                            confirmButtonText: '确定',
                        });
                    }
                }
            },
            msg_userPage(){
                let data={
                    msgId:this.msgId,
                    page:this.param.page,
                    limit:this.param.limit
                };
              apiPush.msg_userPage(this,data).then(res=>{
                  if(res.body.code === 1){
                      this.table_data=res.body.data.items;
                      this.page_total=res.body.data.total;
                  }
              })
            },
            isPage(data){
                this.param.page=data;
            },
            init(){
                if(this.$route.query.uuid){
                    this.msgId=this.$route.query.uuid;
                    apiPush.schedule_MsgGet(this,this.msgId).then(res=>{
                        this.form.sendTime=res.body.data.sendTime;
                        this.form.msgTitle=res.body.data.msgTitle;
                        this.form.msgContent=res.body.data.msgContent;
                        this.form.linkUrlIos=res.body.data.linkUrlIos;
                        this.form.linkUrlAndroid=res.body.data.linkUrlAndroid;
                        this.form.linkUrl=res.body.data.linkUrl;
                        this.form.msgContent=res.body.data.msgContent;
                        this.form.appMsgForm=res.body.data.appMsgForm.code;
                        this.form.appClickType=res.body.data.appClickType.code.toString();
                        this.form.sendTimeType=res.body.data.sendTimeType.code.toString();
                        this.form.msgReceiveCustom=res.body.data.msgReceiveCustom.code.toString();
                        this.form.msgReceiveUserType=res.body.data.msgReceiveUserType.code.toString();
                        this.form.msgReceiveEnd=res.body.data.msgReceiveEnd.code.toString();
                    });
                    this.msg_userPage();
                }else{
                    apiPush.getId(this).then(res=>{
                        if(res.body.code === 1){
                            this.msgId=res.body.data.uuid;
                        }
                    })
                }
            }
        },
        mounted(){
            if(this.$route.query.isState)this.isState=this.$route.query.isState;
            this.init();
        },
        components:{
            tableList,userCommon,lawyer
        },
        watch:{
            "param.page"(to,from){
                this.msg_userPage();
            }
        }

    }
</script>
