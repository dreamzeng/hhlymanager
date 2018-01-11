<template>
    <div class="row">
        <div class="panel">
            <div class="col-sm-6">
                <div class="dataTables_info">
                    <span style="padding:0 8px;">当前第&nbsp;{{number}}&nbsp;页</span><span>共&nbsp;{{countPage}}&nbsp;页</span><span style="padding:0 8px;">{{count}}&nbsp;条记录</span>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="dataTables_paginate paging_bootstrap pagination">
                    <ul>
                        <li @click="changePage(0)"><a href="javascript:;">首页</a></li>
                        <li @click="changePage(-1)"><a href="javascript:;">上一页</a></li>
                        <li @click="changePage(1)"><a href="javascript:;">下一页</a></li>
                        <li @click="changePage(4)"><a href="javascript:;">尾页</a></li>
                        <li>
                            <input class="span1" type="text" style="height: 28px;width: 40px; padding: 5px;font-size: 13px;border: none;" v-model.number.lazy="number" @keyup="inputNum()" @keyup.13="goto()">
                        </li>
                        <li @click="go()"><a href="javascript:;">GO</a></li>
                        <li>
                            <select size="1" class="form-control" style="height: 28px; line-height: 28px;border: none;" v-model.number="size" @change="changePage(3)">
                                <option value="10" selected="selected">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                            </select>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'page',
        props: {
            total: { // 总条数
                type: Number
            },
            limit: { //每页显示多少条 limit
                type: Number,
                default:  10
            },
            page: { //当前页码 page
                type: Number,
                default:  1
            }
        },
        data: function () {
            let page = this.page;
            let limit = this.limit;
            return {
                count: 1, // 总条数
                countPage: 1, // 总页码
                number: page, //当前页码 page
                size: limit //每页显示多少条 limit
            }
        },
        watch: {
            total: function (curVal,oldVal) {
                this.count = curVal;
                if (curVal % this.size == 0) {
                    this.countPage = curVal / this.size;
                } else {
                    this.countPage = (curVal - (curVal % this.size)) / this.size + 1;
                }
            },
            page: function (curVal,oldVal) {
                this.number = curVal;
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            })
        },
        methods: {
            init: function () {
                this.goto();
            },
            //翻页
            changePage: function (type) {
                if (type == 1 && ((this.number * this.size) < this.count)) {
                    this.number++;
                    this.goto();
                    return;
                }
                if (type == -1 && this.number > 1) {
                    this.number--;
                    this.goto();
                    return;
                }
                if (type == 3) {
                    if (this.count % this.size == 0) {
                        this.countPage = this.count / this.size;
                    } else {
                        this.countPage = (this.count - (this.count % this.size)) / this.size + 1;
                    }
                    this.number = 1;
                    this.goto();
                    return;
                }
                if (type == 0) {
                    this.number = 1;
                    this.goto();
                    return;
                }
                if (type == 4) {
                    this.number = this.countPage;
                    this.goto();
                    return;
                }
            },
            //往input中输入值
            inputNum: function () {
                var reg = new RegExp("^[0-9]*$");
                console.log('number:'+this.number);
                if (!reg.test(this.number)) {
                    this.number = 1;
                    return;
                }
                if (this.number > this.countPage) {
                    this.number = 1;
                    return;
                }

            },
            go: function(){
                this.inputNum();
                this.goto();
            },
            //获取数据
            goto: function () {
                this.$emit('todoPage', this.number, this.size);
                return;
            }
        }
    }
    //
</script>
