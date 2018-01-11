<template>
    <div :class="className" :style="{height:height,width:width}"></div>
</template>
<script>
    import echarts from 'echarts';
    require('echarts/theme/macarons'); // echarts 主题
    import { debounce } from 'src/lib/utils';


    export default {
        props: {
            className: {
                type: String,
                default: 'chart'
            },
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '400px'
            },
            autoResize: {
                type: Boolean,
                default: true
            },
            theme: {
                type:String,
                default:'macarons'
            },
            group: String,
            options: Object
        },
        data() {
            return {
                chart: null
            };
        },
        watch: {
            // use assign statements to tigger "options" and "group" setters
            options: {
                handler (options) {
                    if (!this.chart && options) {
                        this.$_init()
                    } else {
                        this.chart.setOption(this.options, true)
                    }
                },
                deep: true
            },
            group: {
                handler (group) {
                    this.chart.group = group
                }
            }
        },
        mounted() {
            // auto init if `options` is already provided
            if (this.options) {
                this.$_init()
            }
        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            if (this.autoResize) {
                window.removeEventListener('resize', this.__resizeHanlder)
            }
            this.chart.dispose();
            this.chart = null;
        },
        methods: {
            $_init () {
                if (this.chart) {
                    return
                }
                let chart = echarts.init(this.$el, this.theme)
                if (this.group) {
                    chart.group = this.group
                }
                chart.setOption(this.options, true)

                if (this.autoResize) {
                    this.__resizeHanlder = debounce(() => {
                        this.chart.resize()
                    }, 100)
                    window.addEventListener('resize', this.__resizeHanlder)
                }

                this.chart = chart;
            },
            //重置 chart
            rest(){
                if(this.chart){
                    if (this.autoResize) {
                        window.removeEventListener('resize', this.__resizeHanlder)
                    }
                    this.chart.dispose();
                    this.chart = null;
                }
                this.$_init();
            },
            mergeOptions (options,isRest=true) {
                if(isRest){
                    this.rest();
                }
                this._delegateMethod('setOption', options)
            },
            showLoading (type={
                text: '正在加载',
                color: '#4ea397',
                maskColor: 'rgba(255, 255, 255, 0.4)'
            }, options) {
                this._delegateMethod('showLoading', type, options)
            },
            hideLoading () {
                this._delegateMethod('hideLoading')
            },
            _delegateMethod (name, ...args) {
                if (!this.chart) {
                    Vue.util.warn(`Cannot call [${name}] before the chart is initialized. Set prop [options] first.`, this)
                    return
                }
                return this.chart[name](...args);
            }
        }
    }
</script>
