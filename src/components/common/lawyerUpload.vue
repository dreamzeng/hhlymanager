<template>
   <div class="lawyer-uploader">
      <div class="el-upload el-upload--text" @click="$refs['upload-input'].click()">
          <i class="el-icon-plus lawyer-uploader-icon" :style="{ width,height ,'line-height':height}"></i>
          <div class="lawyer-upload-tips">上传{{tips}}</div>
          <img :src="previewSrc" v-if='(preview && previewSrc!="")' class="avatar lawyer-img" :style="{ width,height}">
          <input type="file" ref="upload-input"  :name="name" @change="uploadChange($event)" :accept="accept" class="el-upload__input"></div>
    </div>
</template>

<script>
export default {
    name:'lawyer-upload',
    props:{
        name:{
            type: String,
            required:true
        },
        //描述
        tips:{
            type: String,
            required:true
        },
        accept:{
            type: String,
            default:'image/*'
        },
        preview:{
            type:Boolean,
            default:true
        },
        onRemove: {
            type: Function,
            default: function(ev) {
                ev.target.value=""
                this.previewSrc = ""
            }
        },
        beforeUpload: {
            type:Function,
            default:function(ev) {
               
            }
        },
        viewSrc:{
            type:String,
            default:''
        },
        //显示图片的宽
        width:{
            type:String,
            default:'178px'
        },
        //显示图片的高
        height:{
            type:String,
            default:'178px'
        }
    },
    created(){
        this.showPreview = this.preview;
        this.previewSrc = this.viewSrc;
    },
    data(){
        return {
            previewSrc:"",
            showPreview:false,
            file: null
        }
    },
    methods:{
        uploadChange(ev){
            const files = ev.target.files;
            if (!files) return;
            let file = files[0]
            let before = this.beforeUpload(file)
            if(before && before.then){
               before.then((file)=>{
                   if(this.showPreview){
                       this.previewHandler(file)
                   }
                   this.file = file
               }, () => {
                   this.onRemove(ev)
               })
            }else if(before != false){
                if(this.showPreview){
                   this.previewHandler(file)
                }
                this.file = file
            }
            if(!before){
               this.onRemove(ev)
            }
        },
        previewHandler(file){
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = ()=>{
                this.previewSrc = reader.result
            }
        }
    }
}
</script>

<style lang=less>
.lawyer-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .lawyer-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .lawyer-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .lawyer-img {
    width: 178px;
    height: 178px;
    display: block;
    position: absolute;
    z-index: 0;
    top:0px;
  }

  .lawyer-upload-tips{
      background: rgba(0,0,0,.5);
      position: absolute;
      width: 100%;
      height: 30px;
      line-height: 30px;
      bottom: 0px;
      color: #fff;
      z-index: 1;
  }
</style>
