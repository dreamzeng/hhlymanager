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
                        <li @click="back"> <a href="javascript:void(0)">问答社区</a></li>
                        <li click="active">问答详情</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">问答详情</div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="panel-body">
                                        <h5 style="text-align:center;">2017年9月7日20:09:33</h5>
                                        <ul class="chat">
                                            <li class="userText">
                                                <div class="userInfo">
                                                    <img class="userIcon" src="../../../static/img/chart-texture.jpg"></img>
                                                    <h6 class="userName">用户名</h6>
                                                </div>
                                                <p class="question" style="padding-left:60px;">婚内个人财产分割协议怎么写，如果双方签了此协议，离婚就不用财产分割了吗？婚内个人财产分割协议怎么写，如果双方签了此协议，离婚就不用财产分割了吗？婚内个人财产分割协议怎么写，如果双方签了此协议，离婚就不用财产分割了吗？婚内个人财产分割协议怎么写，如果双方签了此协议，离婚就不用财产分割了吗？婚内个人财产分割协议怎么写，如果双方签了此协议，离婚就不用财产分割了吗？</p>
                                            </li>
                                            <li class="userPic">
                                                <div class="userInfo">
                                                    <img class="userIcon" src="../../../static/img/chart-texture.jpg"></img>
                                                    <h6 class="userName">用户名</h6>
                                                </div>
                                                <div class="userPicture" style="padding-left:55px;">
                                                    <img src="../../../static/img/chart-texture.jpg" alt="" @click="handlePictureCardPreview(url)">
                                                    <img src="../../../static/img/chart-texture.jpg" alt="">
                                                    <img src="../../../static/img/chart-texture.jpg" alt="">
                                                    <img src="../../../static/img/chart-texture.jpg" alt="">
                                                    <img src="../../../static/img/chart-texture.jpg" alt="">
                                                    <img src="../../../static/img/chart-texture.jpg" alt="">
                                                    <img src="../../../static/img/chart-texture.jpg" alt="">
                                                    <img src="../../../static/img/chart-texture.jpg" alt="">
                                                    <img src="../../../static/img/chart-texture.jpg" alt="">
                                                    <img src="../../../static/img/chart-texture.jpg" alt="">
                                                    <img src="../../../static/img/chart-texture.jpg" alt="">
                                                    <img src="../../../static/img/chart-texture.jpg" alt="">
                                                </div>
                                            </li>

                                            <li class="lawyer">
                                                <div class="lawyerInfo clearfix">
                                                    <img class="lawyerIcon" src="../../../static/img/chart-texture.jpg"></img>
                                                    <h6 class="lawyerName">律师名</h6>
                                                </div>
                                                <p class="answer" style="padding-right:60px;">婚内个人财产分割协议怎么写，如果双方签了此协议，离婚就不用财产分割</p>
                                            </li>
                                            <li class="lawyerPic">
                                                <div class="lawyerInfo clearfix">
                                                    <img class="lawyerIcon" src="../../../static/img/chart-texture.jpg"></img>
                                                    <h6 class="lawyerName">用户名</h6>
                                                </div>
                                                <div class="lawyerPicture" style="padding-left:55px;">
                                                    <img src="../../../static/img/chart-texture.jpg" alt="">
                                                    <img src="../../../static/img/chart-texture.jpg" alt="">
                                                    <img src="../../../static/img/chart-texture.jpg" alt="">
                                                </div>
                                            </li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
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
          <img width="100%" src="../../../static/img/chart-texture.jpg" alt="">
        </el-dialog>
    </div>
</template>

<style scoped>
    .chat{padding:5px 10%;}
    .chat>li{margin-bottom:15px;}
    .userIcon{width:50px;height:50px;border-radius:25px;}
    .lawyerIcon{width:50px;height:50px;border-radius:25px;float:right;}
    .userName{display:inline-block;padding-left:8px;font-size:16px;}
    .lawyerName{padding-right:8px;font-size:16px;float:right;}
    .lawyerInfo{clear:both;}
    .lawyer{clear:both;}
    .answer{float:right;}
    .lawyerPicture{float:right;}
    .question{line-height:25px;}
    .userPicture>img{width:100px;height:100px;margin:5px 15px;}
    .lawyerPicture>img{width:100px;height:100px;margin:5px 15px;}
    .userPicture>img:hover{cursor:pointer;}
    .lawyerPicture>img:hover{cursor:pointer;}

    .clearfix:after { content: "."; display: block; height: 0; clear: both; visibility: hidden}
    .clearfix:before { content: "."; display: block; height: 0; clear: both; visibility: hidden}
    .clearfix { *+height: 1%; }

</style>

<script>
    import Page from 'components/common/Page';
    import asking from 'api/asking';
    export default {
        name:'couponList',
        components: {Page: Page},
        data() {
          return {
            dataList:{
                "createDate": "2017-08-21 16:36:20",
                "finishDate": "2017-08-21 17:36:20",
                "id": 1,
                "lawyerId": 1927,
                "lawyerLogo": "http://localhost:8080/pic/1927.jpg",
                "lawyerName": "李雄",
                "question": "婚内个人财产分割协议怎么写",
                "readQuantity": 1,
                "subCaseName": "一般民事",
                "userId": 1926,
                "userLogo": "http://localhost:8080/pic/1926.jpg",
                "userName": "毛祥"
            },
            dialogVisible:false,//备注弹窗开关
            dialogImageUrl:'',//预览的图片地址
          }
        },

        mounted: function () {
            // this.couponId= this.$route.params.id;
            this.$nextTick(function () {
                this.init();
            });
        },
        methods: {
            handlePictureCardPreview() {
                this.dialogVisible = true;
            },


            //新添加方法都在上面
            init: function () {
                let id = this.$route.params.id;
                asking.showInfo(this, id).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1 && body.data) {
                        this.dataList = body.data.items;
                        this.todopage.total = data.total;
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