<template>
    <div>
        <el-table :data="table_data" style="margin-top: 20px" v-loading="loading">
            <el-table-column  :prop="prop_name[index]" :key="item.label" :label="item.label" v-for="(item,index) in index_list"></el-table-column>
            <slot></slot>
        </el-table>
        <div style="margin-top: 20px;display: flex;align-items: center;justify-content: center">
            <el-pagination
                @current-change="handleCurrentChange"
                layout="total,prev, pager, next, jumper"
                :total="page_total"
                :page-size="limit">
            </el-pagination>
            <div class="demonstration">共{{Math.ceil(page_total/limit)}}页</div>
        </div>
    </div>
</template>
<style>
    .el-table .cell{
        text-align: center;
    }
</style>
<script>
    export default {
        data(){
            return{
                loading:false,
            }
        },
        methods:{
            handleCurrentChange(val){
                this.$emit("isPage",val);
            }
        },
        mounted(){
        },
        props:['table_data','index_list','prop_name',"limit","page_total"],
        watch:{
            "table_data" (to,from){
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                }, 500);
            },
        }
    }
</script>
