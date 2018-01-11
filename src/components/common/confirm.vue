<template>
    <div class="modal fade" id="myConfirm" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header" style="background: #f7ba2a">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                    <h4 class="modal-title"><span class="glyphicon glyphicon-flash" aria-hidden="true"></span>警告</h4>
                </div>
                <div class="modal-body">
                    <label style="font-size: 16px;">{{title}}</label>
                    <div style="margin-top: 10px; color: red;">{{message}}</div>
                </div>
                <div class="modal-footer">
                    <button @click="execute" type="button" id="btn_submit" class="btn btn-danger" data-dismiss="modal"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span>确定</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>关闭</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'myConfirm',
        props: ['message', 'title'],
        methods: {
            execute: function () {
                this.$emit('confirm');
            }
        }
    }
</script>
