<template>
    <div>
        <div :id="editorId" :style="cstyle"></div>
    </div>
</template>
<script>
    import INDEX from 'api/index';
    import { Message,MessageBox } from 'element-ui';

    export default {
        name: 'webEditor',
        props: {
            editorId:{
                type: String,
                default: 'web-editor'
            },
            height:{
                type: String,
                default: '420px'
            },
            cstyle:{
                type:Object,
                default: function(){
                    return {height: '420px',position: 'static',width: '100%'};
                }
            },
            isInit:{
                type:Boolean,
                default:true
            },
            editorConfig: {
                type: Array,
                default: function () {
                    return ['menus','uploadImgUrl','uploadImgFileName']
                }
            }

        },
        data: function () {
            return {
                webEditor:null
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.isInit && this.init();
            });
        },
        destroyed: function() {
           this.webEditor = null;
        },
        methods: {
            init: function () {
                if(this.webEditor) return;
                let editor = new wangEditor(this.editorId);
                let _config = this.editorConfig;
                let _configList = {
                    menus:$.map(wangEditor.config.menus, function (item, key) {
                        if (item === 'location' || item === 'fullscreen') {
                            return null;
                        }
                        return item;
                    }),
                    uploadImgUrl:INDEX.API_URL+'/upload-image',
                    uploadImgFileName:'file'
                };
                for(let i= 0;i<4;i++){
                    editor.config[_config[i]] = _configList[_config[i]];
                }
                editor.config.uploadImgFns.onload = function (resultText, xhr) {
                    if(typeof resultText == 'undefined' || resultText == '') return;
                    let result = JSON.parse(resultText);
                    if(result.code == 1){
                        let data = result.data;
                        editor.command(null, 'insertHtml', '<img src="' + data.url + '" alt="' + data.name + '" style="max-width:100%;"/>');
                    }else{
                        Message({
                            message: result.msg,
                            type: 'error',
                            duration: 5 * 1000
                        });
                    }
                };
                this.webEditor = editor;
                editor.create();
            },
            setContent: function(content){
                this.webEditor.$txt.html(content);
            },
            getContent:function(){
                let content = this.webEditor.$txt.html();
                if(content == '<p><br></p>') return '';
                return content;
            }
        }
    }

</script>
