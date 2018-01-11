<template>
    <div class="modal fade" id="myIconList" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document" style="width: 900px;">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                    <h4 class="modal-title"><span class="glyphicon glyphicon-heart" aria-hidden="true"></span> &nbsp;图标列表</h4>
                </div>
                <div class="modal-body">
                    <div style="height: 600px; overflow-x: hidden;" class="row-fluid fontawesome-icon-list" id="icon-list">
                        <div v-for="(item, index) in iconList" v-show="index == 'newIcon'" class="icon-con">
                            <h2 class="page-header">{{index}}</h2>
                            <div class="row the-icons">
                                <div class="col-sm-3 inconEl" v-for="el in item" @click="active(el)">
                                    <i :class="el"></i>{{el}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <ol class="carousel-indicators out" id="icon-active">
                        <li class="active"></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ol>
                </div>
                <div class="modal-footer">
                    <button @click="execute" type="button" id="btn_submit" class="btn btn-info" data-dismiss="modal"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span>确定</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>取消</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .the-icons > div {
        cursor: pointer;
    }
    .my-active{
        background: #ec6459;
        color: #fff;
    }
</style>
<script>
    export default {
        name: 'myIconList',
        data: function () {
            return {
                iconList:require('assets/data/iconList.json'),
                icon:''
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            });
        },
        methods: {
            init: function(){
                let $inconEl = $('#icon-list .inconEl');
                $inconEl.on('click',function(){
                    $inconEl.removeClass('my-active');
                    $(this).addClass('my-active');
                });
                let $liList = $('#icon-active li');
                let iconCon = $('#icon-list .icon-con');
                $liList.each(function(i){
                    let index = i;
                    let _$this = $(this);
                    _$this.on('click',function(){
                        iconCon.hide();
                        iconCon.eq(index).show();
                        $liList.removeClass('active');
                        $(this).addClass('active');
                    });
                });
            },
            active: function(el){
                this.icon = el;
            },
            execute: function () {
                this.$emit('actIcon',this.icon);
            }
        }
    }
</script>
