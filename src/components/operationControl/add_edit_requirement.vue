<!-- 规格属性增编页面 -->
<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li click="active">业务管理</li>
                        <li click="active">规格属性</li>
                        <li click="active">规格属性增编</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">规格属性增编</div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="panel-body">
                                        <el-form :model="dataList" :rules="rules" ref="dataList" label-width="130px" class="demo-ruleForm" style="width:500px;margin-left:50px">
                                          <el-form-item label="规格属性名称：" prop="specName">
                                            <el-input v-model="dataList.specName" placeholder="例如：年限" :maxlength="20"></el-input>
                                          </el-form-item>
                                          <el-form-item label="添加规格属性：">
                                            <div class="wrap" v-for="(item,index) in dataList.specAttrs">
                                              <el-input placeholder="例如：一年" v-model="item.specAttrName" :maxlength="20"></el-input>
                                              <el-button type="danger" size="small" class="el-icon-delete2" @click="deleteType(index)" style="display:inline-block"></el-button>
                                            </div>
                                            <el-button type="primary" size="small" class="el-icon-plus" @click="addType">增加一条</el-button>
                                          </el-form-item>
                                          <el-form-item>
                                            <el-button @click="back">取消</el-button>
                                            <el-button type="primary" @click="submitForm()">保存</el-button>
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
  .el-input{width: 300px;}
  .wrap{margin-bottom:15px;}
</style>

<script>
    import asking from 'api/asking';
    export default {
        name:'addEditReq',
        data() {
          return {
            dataList:{
              "specName":"",
              "specAttrs":[
                  {
                      "specAttrName": "",
                  }
                ]
              // "specId":"4fc6281591f6428b91d4111f5dbb183b",
              // "specName":"轮次",
              // "specAttrs":[
              //     {
              //         "specAttrId": "3a338c72a75344ffa6267ed942552be2",
              //         "specId": "4fc6281591f6428b91d4111f5dbb183b",
              //         "specAttrName": "A轮",
              //         "specAttrSort": 0,
              //         "symbol": "A0QT"
              //     }
              //   ]
            },
            rules:{
                specName:[
                        { required: true, message: '请输入名称', trigger: 'blur' },
                ],
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
            deleteType(idx){
               if(this.dataList.specAttrs.length!=1)
               {
                 this.dataList.specAttrs.splice(idx,1);
               }
               else
               {
                 this.$message("剩余一条数据的时候不可删除")
               }
            },
            addType(){
              let specAttrName="";
              let item={specAttrName};
              if(this.dataList.specAttrs)
              {
                this.dataList.specAttrs.push(item);
              }
              else
              {
                this.dataList.specAttrs='['+item+']';
              }
            },
            //新添加方法都在上面
            init: function () {
                //编辑新增规格属性，拉取页面内容
                if(this.$route.params.id!=='-1')
                {
                    asking.editSpecGet(this,this.$route.params.id).then(function (response)
                    {
                        let body = response.body;
                        if (body && body.code == 1 && body.data) {
                            this.dataList = body.data;
                            return;
                        }
                    }, function (response) {
                        console.log('error:', response);
                    });
                }
            },
            //保存提交按钮
            submitForm() {

                  let param=this.dataList;
                  asking.specSave(this,param).then(function (response) {
                      let body = response.body;
                      this.$message(body.msg);
                      if (body.code == 1 && body) {
                          this.$router.go('-1');
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