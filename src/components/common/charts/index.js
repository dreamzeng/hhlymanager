export let yType = function(name,data) {
    return {
        name: name,
        type: 'line',
        smooth: true,
        itemStyle: {
            normal: {
                areaStyle: {}
            }
        },
        data: data
    }
};
export let barType = function(name,data) {
    return {
        name: name,
        type: 'bar',
        smooth: true,
        barWidth: 10,
        itemStyle: {
            normal: {
                areaStyle: {}
            }
        },
        data: data
    }
};
export let legend = function(data){
    return  {
        icon: 'rect',
        itemWidth: 14,
        itemHeight: 5,
        itemGap: 13,
        data: data,
        right: '4%',
        textStyle: {
            fontSize: 12,
            color: '#000'
        }
    }
};
export let xAxis = function(data){
    return {
        type: 'category',
        boundaryGap: false,
        axisLine: {
            lineStyle: {
                color: '#57617B'
            }
        },
        splitLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        splitArea: {
            show: false
        },
        axisLabel: {
            interval: 0
        },
        data: data
    }
};
export let initial = {
    title: {
        text: ''
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    grid: {
        left: 10,
        right: 40,
        bottom: 40,
        containLabel: true,
    },
    legend: legend(['data']),
    dataZoom: [{
         show: true,
         height: 30,
         xAxisIndex: [0],
         bottom: 0,
         start: 10,
         end: 80,
         handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
         handleSize: '110%',
         handleStyle: {
            color: '#d3dee5'
         },
         textStyle: {
            color: '#fff'
         },
         borderColor: '#90979c'
    }, {
         type: 'inside',
         show: true,
         height: 15,
         start: 1,
         end: 35
    }],
    xAxis: {
        data: []
    },
    yAxis: {

    },
    series: [{
        name: '',
        type: 'line',
        data: []
    }]
};


let asyncData = {
    categories: ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55'],
    data: [[220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122],[120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150],[220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122]]

};

//用于测试
export let async = {
    legend: legend(['data1', 'data2', 'data3']),
    xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLine: {
            lineStyle: {
                color: '#57617B'
            }
        },
        data: asyncData.categories
    },
    yAxis: {
        axisLabel: {show: true}
    },
    series: [yType('data1',asyncData.data[0]), yType('data2',asyncData.data[1]), yType('data3',asyncData.data[2])]
};
