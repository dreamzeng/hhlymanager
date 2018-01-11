<template>
  <el-dialog
            :visible.sync="imgDialog"
            size="full"
            @close="imgShow = false"
            class="light-box-dialog"
            >
            <div class="light-box-container">
                <i @click="preImg" class="light-box-arrow el-icon-arrow-left"></i>
                <div class="img-container">
                    <transition 
                        mode="out-in" 
                        name="fade"
                        >
                        <img v-if="imgShow" style="max-width:1024px;" :src="currentSrc" alt="图片加载失败" />
                    </transition>
                    <div class="current-tip">{{currentIndex+1}}/{{imgCount}}</div>
                </div>
                <i @click="nextImg" class="light-box-arrow el-icon-arrow-right"></i>
            </div>
        </el-dialog>
</template>

<script>
export default {
    name: 'img-light-box',
    props: {
        index:{
            type: Number,
            default: -1
        },
        images:Array
    },
    data(){
        return {
            imgDialog: false,
            currentSrc:'',
            currentIndex: -1,
            imgCount:0,
            imgShow:false
        }
    },
    created(){
        this.initEvent()
    },
    methods: {
        preImg(){
            this.imgShow = false
            this.currentIndex = this.currentIndex - 1
            if(this.currentIndex < 0){
                this.currentIndex = this.imgCount-1
            }
            this.currentSrc = this.images[this.currentIndex] 
            this.showImg()
        },
        nextImg(){
            this.imgShow = false
            this.currentIndex = this.currentIndex + 1
            if(this.currentIndex >= this.imgCount){
                this.currentIndex = 0
            }
            this.currentSrc = this.images[this.currentIndex] 
            this.showImg()
        },
        showImg(){
            this.tout && clearTimeout(this.tout)
            this.tout = setTimeout(() =>{
                this.imgShow = true
            }, 200);
        },
        initEvent(){
            window.addEventListener('keyup', (event) => {
                if (event.which === 27) {
                    this.imgDialog = false;
                }
                if (event.which === 39) {
                    this.nextImg();
                }
                if (event.which === 37) {
                    this.preImg();
                }
            });
        }
    },
    destroyed(){
        
    },
    watch:{
        index(newVal){
            if(newVal != -1){
                this.currentIndex = newVal
                this.currentSrc = this.images[this.currentIndex]
                this.imgCount = this.images.length
                this.showImg()
                this.imgDialog = true
            }else{
                this.imgDialog = false
            }
        },
        imgDialog(newVal){
            if(!newVal){
                this.$emit('close')
            }
        }
    }
}
</script>

<style>
    .light-box-dialog .el-dialog{
        background: rgba(0,0,0,0.7)
    }
    .light-box-container{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .light-box-container .img-container{
        position: relative;
    }
    .light-box-container .img-container .current-tip {
        position: absolute;
        right:0px;
        bottom: 0px;
        width:100%;
        text-align: center;
        font-size:14px;
        background: rgba(0,0,0,0.6);
        color:#fff;
    }
    .light-box-arrow{
        font-size: 50px;
        position: absolute;
        color:#fff;
        top: 50%;
        cursor: pointer;
        transition: all 0.8s;
    }
    .light-box-arrow:hover{
        color:#20A0FF
    }
    .light-box-container .el-icon-arrow-left{
        left:10px;
    }
    .light-box-container .el-icon-arrow-right{
        right:10px;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .2s ease;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
