var historyOption = {
    backgroundColor:"#fff",
    color :['#0ec1ff', '#10cdff', '#12daff', '#15ebff', '#17f8ff', '#1cfffb', '#1dfff1'],
    tooltip: {
        trigger: 'axis',
        formatter: function(params, ticket, callback) {

            var res = params[0].name;

            for (var i = 0, l = params.length; i < l; i++) {
                if (params[i].seriesType === 'line') {
                    res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? params[i].value : '-') + '%';
                } else {
                    res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? formatterOneMoney(params[i].value) : '-') + 'k';
                }
            }
            return res;

        }
    },
    grid: {
        top: '8%',
        left: '1%',
        right: '1%',
        bottom: '8%',
        containLabel: true,
    },

    legend: {
        itemGap: 50,
        data: ['销售额' ,'指标','达成率'],
        textStyle: {
            color: '#000',
            borderColor: '#000'
        },
    },

    calculable: true,

    xAxis: [{
        type: 'category',
        boundaryGap: true,
        axisLine: { //坐标轴轴线相关设置。数学上的x轴
            show: true,
            lineStyle: {
                color: '#000'
            }
        },
        axisLabel: { //坐标轴刻度标签的相关设置
            textStyle: {
                color: '#000',
                margin: 15,
            }
        },
        axisTick: {
            show: false,
        },
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    }],

    yAxis: [{
        type: 'value',
        // max: 140,
        splitNumber: 7,
        splitLine: {
            show: false,
            lineStyle: {
                color: '#0a3256'
            }
        },
        axisLine: {
            show: true,
        },
        axisLabel: {
            margin: 20,
            formatter: '{value}k',
            textStyle: {
                color: '#000',

            },
        },
        axisTick: {
            show: true,
        }
    },
        {
            type: 'value',
            min: 0,
            // max: 140,
            splitNumber: 7,
            splitLine: {
                show: false,
                lineStyle: {
                    color: '#0a3256'
                }
            },
            axisLine: {
                show: true,
            },
            axisLabel: {
                margin: 20,
                formatter: '{value}%',
                textStyle: {
                    color: '#000',
                }
            },
            axisTick: {
                show: true,
            }

        }],
    toolbox: {        show: true,        feature: { myDownload: {
                show: true,
                title: '数据导出',
                icon: 'image://http://localhost:8080/smbi/image/excel.svg',
                onclick: function (){
                    alert('暂不支持');
                }
            },           saveAsImage: {}  ,

            myTool2: {
                show: true,
                title: '数据导出',
                icon: 'root/image/excel.svg',
                onclick: function (){
                    alert('myToolHandler2')
                }
            }
        }    },series: [
        {
            name: '销售额',
            type: 'bar',
            barWidth: 20,
            tooltip: {
                show: true
            },
            label: {
                show: true,
                position: 'top',
                textStyle: {
                    color: '#fff',
                }
            },
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        formatter:function(params){
                            return parseInt(params.data);
                        }
                    },
                    color: "#9bbff2",
                }
            },
            data: [70620.99, 51620.86, 70770.32, 81280.29, 81600.30, 70690.38, 93690.66,81970.22,99150.02,73280.66,891129030,1220890930.8]
        },

        {
            name: '指标',
            type: 'bar',
            barWidth: 20,
            barGap: '10%',
            tooltip: {
                show: true
            },
            label: {
                show: true,
                position: 'top',
                textStyle: {
                    color: '#467abd',
                }
            },
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        formatter:function(params){
                            return parseInt(params.data);
                        }
                    },
                    color: "#339ddf"
                }
            },
            data: [52510.88, 52510.88, 52510.88, 52510.88, 52510.88, 52510.88, 56890.54, 56890.54, 56890.54, 56890.54, 56890.54, 56890.54]
        },

        {
            name: '达成率',
            type: 'line',
            smooth:true,
            yAxisIndex:1,
            // smooth: true, //是否平滑曲线显示
            // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbol: 'emptyCircle',
            symbolSize: 6,
            lineStyle: {
                normal: {
                    label: {
                        show: true,
                    },
                    color: "#303a40", // 线条颜色
                },
                borderColor: '#000'
            },
            label: {
                show: true,
                position: 'top',
                textStyle: {
                    color: '#000',
                }
            },
            itemStyle: {
                normal: {
                    color: "#4356e6",

                }
            },
            tooltip: {
                show: true
            }
        }

    ]
};
var middleOption = {
    backgroundColor:"#fff",
    tooltip : {
        formatter: "{a} <br/>{b} = {c}%"
    },
    toolbox: {
        show: true,
        feature: {
            myDownload: {
                show: true,
                title: '数据导出',
                icon: 'image://http://localhost:8080/smbi/image/excel.svg',
                onclick: function (){
                    alert('暂不支持');
                }
            },
            saveAsImage: {},
        }
    },
    series: [{
        name: '总达成',
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 150,
        radius: "150%",
        center: ["50%", "80%"],
        axisLine: {
            show: false,
            lineStyle: {
                width: 16,
                color: [ [0.6, '#67e0e3'],[0.8, '#37a2da'],[1, '#fd666d']]
            }
        },
        splitLine:{
            length:'20%'
        },
        axisTick:{

            length:'6'
        },
        pointer:{
            width:'5'
        },
        axisLabel:{
            distance:'2'
        },
        itemStyle: {
            normal: {
                shadowBlur: 10
            }
        },
        detail: {
            fontSize: 25,
            offsetCenter:[0, '20%'],
            formatter:'{value}%'
        },
        data: [{value:50}]
    }]
};

changeOption(middleOption, "series[0];data[0];value", 140);

var saleachieveOption = clone(middleOption);

changeOption(middleOption, "series[0];data[0];value", 133);

var businessachieveOption = clone(middleOption);

changeOption(historyOption, "series[2];data", salesData.overview.achieve);
changeOption(historyOption, "series[0];data", salesData.overview.amt);
changeOption(historyOption, "series[1];data", salesData.overview.target);
var salehistoryOption = clone(historyOption);

changeOption(historyOption, "series[2];data", bizData.overview.achieve);
changeOption(historyOption, "series[0];data", bizData.overview.amt);
changeOption(historyOption, "series[1];data", bizData.overview.target);

var businesshistoryOption = clone(historyOption);


var topicMap = [
    {
        id:"saleachieve",
        topicCode: "achieve",
        fields: "",
        dataname:"getGaugeAchieve",
        dataType:'sellout',
        elementMap:{
            "series[0];data[0];value":"achieve",
            "#saletarget":"target",
            "#salereal":"sumdata"

        },
    }
    ,
    {
        id:"businessachieve",
        topicCode: "achieve",
        fields: "",
        dataname:"getGaugeAchieve",
        dataType:'sellin',
        elementMap:{
            "series[0];data":"achieve",
            "#businesstarget":"target",
            "#businessreal":"sumdata"

        },
    }
    ,
    {
        id:"salehistory",
        topicCode: "achieve",
        fields: "",
        dataname:"getMonthAchieve",
        type:"total",
        dataType:"sellout",
        elementMap:{
            "series[0];data":"sumdata",
            "series[1];data":"target",
            "series[2];data":"achieve"

        },
        filterCode:"ytd"
    },

    {
        id:"businesshistory",
        topicCode: "achieve",
        fields: "",
        dataname:"getMonthAchieve",
        type:"total",
        dataType:"sellin",
        elementMap:{
            "series[0];data":"sumdata",
            "series[1];data":"target",
            "series[2];data":"achieve"

        },
        filterCode:"ytd"
    }

];