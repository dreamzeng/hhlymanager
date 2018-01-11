<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li click="active">第三方管理</li>
                        <li class="active">反馈列表</li>
                        <li click="active">反馈详情</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">反馈详情</div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="panel-body">
                                        <ul class="chat">
                                            <li>
                                                <span>用户ID：</span><span>{{dataList.userId}}</span>
                                            </li>
                                            <li>
                                                <span>用户昵称：</span><span>{{dataList.userName}}</span>
                                            </li>
                                            <li>
                                                <span>联系方式：</span><span>{{dataList.contact}}</span>
                                            </li>
                                            <li>
                                                <span>反馈时间：</span><span>{{dataList.createTime}}</span>
                                            </li>
                                            <li>
                                                <div>反馈内容：</div>
                                                <div style="display:inline-block;margin-top:10px;line-height:20px;background:#F2F2F2;width:800px;padding:10px 15px;word-break: break-all;">{{dataList.content}}</div>
                                            </li>
                                            <li class="userPic">
                                                <div class="userInfo">
                                                    <h6 class="userName">图片：</h6>
                                                </div>
                                                <div class="userPicture" style="padding-left:55px;">
                                                    <img v-for="file in dataList.files" :src="file.url" alt="" @click="handlePictureCardPreview(file.url)">
                                                </div>
                                            </li>


                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog v-model="dialogVisible" size="tiny">
          <!-- <img width="100%" :src="dialogImageUrl" alt=""> -->
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<style scoped>
    .chat{padding:5px 10%;}
    .chat>li{margin-bottom:15px;}
    .userIcon{width:50px;height:50px;border-radius:25px;}
    .lawyerIcon{width:50px;height:50px;border-radius:25px;float:right;}
    .userName{display:inline-block;padding-left:8px;font-size:16px;}
    .userPicture>img{width:100px;height:100px;margin:5px 15px;}
    .userPicture>img:hover{cursor:pointer;}
</style>

<script>
    import apiThird from 'api/third';
    export default {
        name:'feedbackInfo',
        data() {
          return {
            dataList: [
                {
                    "id": 1,
                    "userId": 1195,
                    "userName": "aaa",
                    "contact": "哈哈哈哈哈哈哈哈",
                    "content": "唐山市婆婆送您婆婆哦婆婆泼墨QQ模式",
                    "type": {
                      "code": 1,
                      "value": "律师"
                    },
                    "createTime": "2016-11-22 17:05:02",
                    "files": []
                }
            ],
            dialogVisible:false,//备注弹窗开关
            dialogImageUrl:'',//预览的图片地址
          }
        },

        mounted: function () {
            this.$nextTick(function () {
                this.init();
            });
        },
        methods: {
            //图片点击预览事件
            handlePictureCardPreview(url) {
                this.dialogVisible = true;
                this.dialogImageUrl=url;
            },
            //新添加方法都在上面
            init: function () {
                let id = this.$route.params.id;
                apiThird.feedbackInfo(this, id).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1 && body.data) {
                        this.dataList = body.data;
                        return;
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