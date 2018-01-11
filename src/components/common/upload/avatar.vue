<template>
    <div>
        <el-upload 
            class="avatar-uploader"
            :action="action"
            :data="fdata"
            :with-credentials="withCredentials"
            :show-file-list="false" 
            :on-change="handleChange"
            :on-success="handleAvatarSuccess" 
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" :class="avatar" :style="{ width,height }">
            <i v-else :class="['el-icon-plus','avatar-uploader-icon']" :style="{ width,height,'line-height':height }"></i>
        </el-upload>
    </div>
</template>

<script>
import INDEX from 'api/index';
const URL = INDEX.API_URL;

export default {
    name: 'uploadAvatar',
    props: {
        uploadApi: {
            type: String,
            default: '/upload'
        },
        //上传文件要提交的数据  
        fdata: {
            type: Object,
            default: function() {
                return {
                    'type': 'xf-test'
                }
            }
        },
        //文件大小 2M  
        fsize: {
            type: Number,
            default: 2
        },
        //文件格式 传空数组时可以上传任意图片
        fileFormat: {
            type: Array,
            default: function() {
                return ['.jpeg', '.png'];
            }
        },
        //初始化imageUrl
        image: {
            type: String,
            default: ''
        },
        //显示图片的宽
        width:{
            type:String,
            default:'120px'
        },
        //显示图片的高
        height:{
            type:String,
            default:'120px'
        }
    },
    computed:{
        strFormat(){
            if(this.fileFormat.length > 0){
                return '只能上传' + this.fileFormat.join(',') + '文件';
            }
            return '';
        },
        action(){
            return URL+this.uploadApi
        }
    },
    data() {
        return {
            withCredentials:true,
            imageUrl: '',
            codeMap: {
                ".jpeg": "image/jpeg",
                ".png": "image/png"
            }
        };
    },
    mounted(){
        this.imageUrl = this.image;
    },
    methods: {
        getImageUrl(){
            console.log(this.imageUrl);
            return this.imageUrl;
        }, 
        handleAvatarSuccess(res, file) {
            console.log(res,file);
            //this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < this.fsize;

            let flag = false;
            for(let i = 0,l=this.fileFormat.length;i<l;i++){
                if(file.type == this.codeMap[this.fileFormat[i]]){
                    flag = true;
                    break;
                }
            }
            if(!flag && this.fileFormat.length > 0){
                this.$message.error(`上传图片只能是 ${this.strFormat} 格式!`);
                return false;
            }
            if (!isLt2M) {
                this.$message.error(`上传图片大小不能超过 ${this.fsize}MB!`);
                return false;
            }
            return true;
        },
        handleChange(file, fileList) {
            if(file.response && file.response.code == 10){
                let _l = fileList.length-1;
                fileList.splice(_l, 1);
                this.$confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('USER_SIGNOUT');
                    location.reload();// 为了重新实例化vue-router对象 避免bug
                }).catch(() => {

                });
                return;
            }
            if(file.response && file.response.code !=1){
                file.response.msg && this.$message.error(file.response.msg);
                let _l = fileList.length-1;
                fileList.splice(_l, 1);
                this.fileList = fileList;
                return;
            }
            if(file.response && file.response.code == 1){
                file.response.msg && this.$message({
                    message: file.response.msg,
                    type: 'success'
                });
                if(this.flength != -1 && fileList.length > this.flength){
                    fileList.splice(0, 1);
                }
                this.fileList = fileList;
            }
        }
    }
}
</script>

<style>
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
    text-align: center;
}

.avatar {
    display: block;
}
</style>
