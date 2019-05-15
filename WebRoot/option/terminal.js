//******************************地图   
var mapoption = {
        backgroundColor: '#fff',
        tooltip: {
            trigger: 'item',
            formatter : function(params) {
            	var name = params.seriesName;
            	var data = params.data;
            	if("终端个数" == name) {
            		return data.name + ":<br/>" + data.value +"个";
            	}else if("终端销售额" == name) {
            		return data.name + ":<br/>" + data.value +"k";
            	}
            }
        },
        visualMap: {
            textStyle: {
                color: '#222'
            },
            min: 0,
            max: 2500,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'],           // 文本，默认为数值文本
            calculable: true
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['终端个数', '终端销售额'],
            selectedMode: 'single',
        },
        grid: {
            height: 200,
            width: 8,
            right: 80,
            bottom: 10
        },
        xAxis: {
            type: 'category',
            data: [],
            splitNumber: 1,
            show: false
        },
        yAxis: {
            position: 'right',
            splitNumber: 20,
            inverse: true,
            axisLabel: {
                show: true
            },
            axisLine: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            data: []
        },
       toolbox: {        show: true,        feature: {    myDownload: {
                   show: true,
                   title: '数据导出',
                   icon: 'image://http://localhost:8080/smbi/image/excel.svg',
                   onclick: function (){
                       alert('暂不支持');
                   }
               },        saveAsImage: {}        }    },series: [
            {
                zlevel: 1,
                name: '终端个数',
                type: 'map',
                mapType: 'china',

                roam: true,
                left: 0,
                right: '15%',
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: data1
            },
            {
                zlevel: 1,
                name: '终端销售额',
                type: 'map',
                mapType: 'china',

                roam: true,
                left: 0,
                right: '15%',
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: data2
            }
        ]
    };


    //--------------左下 终端占比饼图---------------------------
    var constituteoption = {

            backgroundColor: '#fff',
            color: ['#585247', '#31C5C0', '#009D85', '#265cc5d1'],
            title: {
                text: '终端总数',
                subtext: 2843,
                textStyle: {
                    color: '#222',
                    fontSize: 16,
                    // align: 'center'
                },
                subtextStyle: {
                    fontSize: 12,
                    color: ['#ff9d19']
                },
                x: 'center',
                y: '56%',
            },
            grid: {
                left: 100,
                right: '10%'
            },
            legend: {
                top: '5%',
                textStyle: {
                    color: '#222',
                    fontSize: 12,

                },
                icon: 'roundRect',
                data: [{
                    "name": "非活跃",
                    "value": 12
                }, {
                    "name": "overlap",
                    "value": 20
                }, {
                    "name": "新增",
                    "value": 10
                }, {
                    "name": "普通",
                    "value": 58
                }],
            },
           toolbox: {        show: true,        feature: {myDownload: {
                       show: true,
                       title: '数据导出',
                       icon: 'image://http://localhost:8080/smbi/image/excel.svg',
                       onclick: function (){
                           alert('暂不支持');
                       }
                   },            saveAsImage: {}        }    },
        series: [
                // 主要展示层的
                {
                    radius: ['40%', '80%'],
                    center: ['50%', '60%'],
                    type: 'pie',
                    label: {
                        normal: {
                            show: true,
                            formatter: "{c}家",
                            textStyle: {
                                fontSize: 12,

                            },
                            position: 'inside'
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true,
                            length: 12,
                            length2: 25
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data: [{
                        "name": "非活跃",
                        "value": 49
                    }, {
                        "name": "overlap",
                        "value": 255
                    }, {
                        "name": "新增",
                        "value": 120
                    }],

                },
                // 边框的设置
                {
                    radius: ['30%', '40%'],
                    center: ['50%', '60%'],
                    type: 'pie',
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    animation: false,
                    tooltip: {
                        show: false
                    },
                    data: [{
                        value: 1,
                        itemStyle: {
                            color: "rgba(250,250,250,0.3)",
                        },
                    }],
                }, {
                    name: '外边框',
                    type: 'pie',
                    clockWise: false, //顺时加载
                    hoverAnimation: false, //鼠标移入变大
                    center: ['50%', '60%'],
                    radius: ['88%', '88%'],
                    label: {
                        normal: {
                            show: false
                        }
                    },
                    data: [{
                        value: 9,
                        name: '',
                        itemStyle: {
                            normal: {
                                borderWidth: 2,
                                borderColor: '#0b5263'
                            }
                        }
                    }]
                },
            ]

        };
    //-----------右上 波动仪表板---------------------------


    
var accountOption = {

		tooltip: {
	        trigger: 'axis',
	        formatter: function(params, ticket, callback) {

	            var res = params[0].name;

	            for (var i = 0, l = params.length; i < l; i++) {
	                if (params[i].seriesType === 'line') {
	                    res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? params[i].value : '-') + '%';
	                } else {
	                    res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? params[i].value : '-') + '家';
	                }
	            }
	            return res;

	        }
	    },
	    legend: {
	        data:['2018YTD','2019YTD','全年指标','新增','overlap']
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis : [
	        {
	            type : 'category',
	            data : ['east','south','west','north','northeast']
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
	            axisLabel: {
                    margin: 20,
                    formatter: '{value}家',
                    textStyle: {
                        color: '#000',
                    },
                },
	        }
	    ],
    toolbox: {
        show: true,
        feature: {myDownload: {
                show: true,
                title: '数据导出',
                icon: 'image://http://localhost:8080/smbi/image/excel.svg',
                onclick: function (){
                    alert('暂不支持');
                }
            },
            saveAsImage: {}
        }
    },
	    series : [
	        {
	            name:'2018YTD',
	            type:'bar',
	          
	            data:[10.68, 10.36, 7.91, 7.92, 11.04]
	        },
	        {
	            name:'2019YTD',
	            type:'bar',
	            data:[51.95, 50.98, 51.95, 59.76, 69.5]
	        },
	        {
	            name:'指标',
	            type:'bar',
	            data:[41.15, 35.98, 37.47, 41.38, 48.28]
	        },
	        
	        {
	            name:'新增',
	            type:'bar',
	         
	            data:[31.72, 34.66, 36.13, 35.91, 36.74]
	        },
	        {
	            name:'overlap',
	            type:'bar',
	            data:[115.9, 118.56, 111.54, 111.82, 113.28],
	            
	        },
	        
	    ]
};

//-----------------------
var accountsoption = {
	    tooltip : {
	        trigger: 'item',
	        formatter: function(params) {
	            if ('士卓曼' == params.name || '安卓健' == params.name) {
                   return params.name  + "<br/> 仅:" + params.value + "家<br/> 总:" +(params.value + accountsoption.series[0].data[1].value) + "家";
                }else {
                     return params.name  + "<br/> :" +(params.value) + "家";
                }
	        }
	    },
	    color:['#8fc31f','#f35833','#00ccff','#ffcc00'],
    toolbox: {
        show: true,
        feature: {myDownload: {
                show: true,
                title: '数据导出',
                icon: 'image://http://localhost:8080/smbi/image/excel.svg',
                onclick: function (){
                    alert('暂不支持');
                }
            },
            saveAsImage: {}
        }
    },
	    series : [
	        {
	            type: 'pie',
	            radius : '90%',
	            center: ['50%', '50%'],
	            data:[
	                {value:4926, name:'士卓曼'},
	                {value:421, name:'overlap'},
	                {value:961, name:'安卓健'},
	            ],
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            },
	            itemStyle: {
	                normal: {
	                    label:{ 
                            show: true, 
//	                            position:'inside',
                            formatter: '{b} : {c} ({d}%)' 
                        }
	                },
                    labelLine :{show:true}
	            }
	        }
	    ]
	};