<template>
    <div>
        <a @click="pictureTrue(src)" :style="{width:width , height: height }" v-if="isShow">
            <div class="warp">
                <div class="d-img"><img :src="src"></div>
                <div class="d-i">
                    <i class="el-icon-view"></i>
                </div>
            </div>
        </a>
        <el-dialog  class="picture" 
                    size="full" 
                    :visible.sync="picture" 
                    custom-class="xf-dialog" 
                    :before-close="whenClose" 
                    @open="whenOpen" 
                    :close-on-click-modal="false">
            <div ref="pic" class="main" @click="close($event)">
                <img :src="pictureSrc" :width="picW" :height="picH" @click="clickimg($event)">
            </div>
        </el-dialog>
    </div>
</template>
<script>
/* 
* 图片查看器
* @param  src  width height
*/
let vm;
export default {
    name: "picview",
    data() {
        return {
            picture: false,
            scale: 1,
            pictureSrc: "",
            picW: "",
            picH: ""
        };
    },
    props: {
        src: String,
        width: String,
        height: String,
        isShow:{
            type: Boolean,
            default: true
        }
       
    },
    methods: {
        pic() {
            document.body.onmousewheel = function(event) {
                event = event || window.event;
                if (vm.picture == true) {
                    if (event.deltaY > 0) {
                        vm.scale =
                            vm.scale > 0.2
                                ? vm.scale - 0.1
                                : vm.scale;
                    } else {
                        vm.scale += 0.1;
                    }
                    vm.$refs.pic.childNodes[0].style.transform =
                        "scale(" +
                        vm.scale +
                        ") rotate(" +
                        vm.roted +
                        "deg)";
                }
            };
            /* 拖拽 */
            setTimeout(function() {
                if (vm.picture) {
                    var oDiv = vm.$refs.pic.childNodes[0];
                    oDiv.onmousedown = function(en) {
                        var ev = ev || event;
                        var disX = en.clientX - oDiv.offsetLeft;
                        var disY = en.clientY - oDiv.offsetTop;
                        if (oDiv.setCapture) {
                            oDiv.setCapture();
                        }
                        document.onmousemove = function(en) {
                            var ev = ev || event;
                            if (
                                en.clientY > 0 &&
                                en.clientY < vm.$refs.pic.clientHeight &&
                                en.clientX > 0 &&
                                en.clientX < vm.$refs.pic.clientWidth
                            ) {
                                oDiv.style.top = en.clientY - disY + "px";
                                oDiv.style.left = en.clientX - disX + "px";
                            }
                        };
                        document.onmouseup = function() {
                            document.onmousemove = null;
                            if (oDiv.releaseCapture) {
                                oDiv.releaseCapture();
                            }
                        };
                        return false; //阻止默认行为（如果页面中有文字，则会默认拖动文字），ie8及一下不行
                    };
                }
            }, 0);
        },
        pictureTrue(src) {
            vm.pictureSrc = src;
            vm.picture = true;
            vm.pic();
        },
        whenClose(done) {
            done();
        },
        layoutImg() {
            let picW = vm.$refs.pic.childNodes[0].naturalWidth;
            let picH = vm.$refs.pic.childNodes[0].naturalHeight;
            let Width = vm.$refs.pic.offsetWidth;
            let Height = vm.$refs.pic.offsetHeight;
            if (Width / Height <= picW / picH) {
                vm.picW = Width;
                vm.picH = `${Number(picH) * Width / Number(picW)}`;
                vm.$refs.pic.childNodes[0].style.top = `${(Height -
                    vm.picH) /
                    2}px`;
                vm.$refs.pic.childNodes[0].style.left = 0;
            } else {
                vm.picH = Height;
                vm.picW = `${Number(picW) * Height / Number(picH)}`;
                vm.$refs.pic.childNodes[0].style.left = `${(Width -
                    vm.picW) /
                    2}px`;
                vm.$refs.pic.childNodes[0].style.top = 0;
            }
        },
        whenOpen() {
            setTimeout(function() {
                if (vm.$refs.pic.childNodes[0]) {
                    vm.scale = 1;
                    vm.roted = 0;
                    vm.$refs.pic.childNodes[0].style.transform = "scale(1)";
                    vm.layoutImg();
                    window.onresize = function() {
                        vm.layoutImg();
                    };
                }
            }, 0);
        },
        close(e) {
            vm.picture = false;
            e.stopPropagation();
        },
        clickimg(e) {
            e.stopPropagation();
        }
    },
    watch: {},
    mounted() {
        vm = this;
    }
};
</script>

<style lang="less" scoped>
a {
    display: block;
    img {
        width: 100%;
        height: 100%;
    }
}
.warp{
    position:relative;
    width:100%;
    height:100%;
    .d-img{
        width:100%;
        height:100%;
        position:relative;
    }
    .d-i{
        position:absolute;
        bottom: -2px;
        right: 5px;
    }
}

.picture {
    .main {
        position: relative;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        height: 100%;
        margin-top: -20px;
        overflow: hidden;
        img {
            cursor: move; // width: 100%;
            border-radius: 8px;
            position: absolute;
        }
    }
}
</style>
<style lang="less">
.xf-dialog {
    background: transparent !important;
    .el-dialog__body {
        height: 100% !important;
    }
}
</style>