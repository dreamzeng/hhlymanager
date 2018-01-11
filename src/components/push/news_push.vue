<template>
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li class="active">推送管理</li>
                        <li class="active">短息推送</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">短息推送</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">
                                </div>
                            </div>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="flex">
                                        <div class="flex-title">
                                            输入要推送的内容：
                                        </div>
                                        <el-input
                                            type="textarea"
                                            :autosize="{ minRows: 4}"
                                            placeholder="请输入内容"
                                            :maxlength="200"
                                            v-model="textarea">
                                        </el-input>
                                    </div>
                                    <div class="flex">
                                        <div class="flex-title">
                                        </div>
                                        <div style="display: flex;justify-content: space-between;width: 100%">
                                            <div>短信模板：【法义】法义提示：<span style="color: red">短信内容</span>。感谢您的使用。</div>
                                            <div>{{textarea.length}}/200字</div></div>
                                    </div>

                                    <div class="flex">
                                        <div class="flex-title">
                                            <span style="padding-top: 6px;display: inline-block">
                                                    是否定时发送：
                                            </span>
                                        </div>
                                        <div style="display: flex;align-items: center;height: 36px">
                                                <el-radio v-model="radio" label="0">否</el-radio>
                                                <el-radio v-model="radio" label="1">是</el-radio>
                                                <el-date-picker
                                                    @change="chooseTime"
                                                    style="margin-left: 20px"
                                                    v-if="radio == 1"
                                                    v-model="value"
                                                    type="datetime"
                                                    placeholder="选择日期时间"
                                                    align="right"
                                                    :picker-options="pickerOptions">
                                                </el-date-picker>
                                            </div>
                                        </div>
                                    <div class="flex">
                                        <div class="flex-title">
                                            选择推送的用户：
                                        </div>
                                        <div style="position: relative;width: 100%;">
                                            <el-button type="text" @click="downLoad">下载模板</el-button>
                                            <el-button type="primary" @click="chooseUser">选择用户<i class="el-icon-search el-icon--right"></i></el-button>
                                                <input type="file" id="cImage" @change="chooseExcel" style="position: absolute;width: 107px;height: 36px;opacity: 0;cursor: pointer" title="上传名单">
                                                <el-button type="primary">上传名单<i class="el-icon-upload el-icon--right"></i></el-button>
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
            <el-dialog v-model="isShow" size="large">
                <el-radio-group v-model="radio2">
                    <el-radio-button label="用户"></el-radio-button>
                    <el-radio-button label="律师"></el-radio-button>
                </el-radio-group>
                <div style="margin-left: -200px;max-height: 600px;overflow-y: scroll">
                    <userCommon :isStatus="isStatus" :isClass="isClass" ref="isS" v-if="radio2=='用户'"></userCommon>
                    <lawyer :isStatus="isStatus" :isClass="isClass" ref="isS" v-if="radio2=='律师'"></lawyer>
                </div>
                <div style="text-align: center">
                    <el-button type="primary" @click="confirm">确定</el-button>
                    <el-button  @click="isShow=false">取消</el-button>
                </div>
            </el-dialog>
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
                multipleSelection:[],
                msgId:'',
                radio2:'用户',
                isClass:true,
                isStatus:"push",
                isShow:false,
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
                radio:'0',
                value:'',
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
            chooseUser(){
              this.isShow=true;
            },
            chooseTime(data){
              this.value=data;
            },
            save(){
                let data={
                    uuid:this.msgId,
                    sendTimeType:parseInt(this.radio),
                    sendTime:this.value,
                    msgContent:this.textarea,
                };
                if(this.textarea.length>0){
                    if(this.table_data.length>0){
                        if(this.radio == 1 && this.value == ''){
                            this.$message("请选择定时发送时间")
                        }else{
                            if(new Date(this.value).getTime()<=new Date().getTime()){
                                this.$message("定时发送时间要大于本地时间")
                            }else{
                                if(this.$route.query.uuid){
                                    apiPush.schedule_MsgUpdate(this,data).then(res=>{
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
                                    apiPush.schedule_MsgAdd(this,data).then(res=>{
                                        this.$message(res.body.msg);
                                        this.$router.push({
                                            name:'push_record',
                                            params:{
                                                isState:'1'
                                            }
                                        });
                                    })
                                }
                            }
                        }
                    }else{
                        this.$message("请上传用户")
                    }
                }else{
                    this.$message("请输入要发送的内容")
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
                        this.value=res.body.data.sendTime;
                        this.textarea=res.body.data.msgContent;
                        this.radio=res.body.data.sendTimeType.code.toString();
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
