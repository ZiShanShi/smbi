
//**********************1.最左面，年度总达成
	var middleOption = {
        backgroundColor:"#fff",
		tooltip : {
			formatter: "{a} <br/>{b} = {c}%"
		}, toolbox: {
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
		series: [{
			name: '总达成',
			type: "gauge",
			startAngle: 180,
			endAngle: 0,
			min: 0,
			max: 200,
			radius: "100%",
			center: ["50%", "70%"],

			axisLine: {
				show: true,
				lineStyle: {
					width: 20,
					shadowBlur: 0,
					color: [ [0.6, '#fd666d'],[0.8, '#37a2da'],[1, '#67e0e3']]
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

	
//**********************2.中间，区域达成
	var barlineoption = {
	        backgroundColor: "#fff",
	        tooltip: {
	            trigger: 'axis',
	            formatter: function(params, ticket, callback) {

	                var res = params[0].name;

	                for (var i = 0, l = params.length; i < l; i++) {
	                    if (params[i].seriesType === 'line') {
	                        res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? params[i].value : '-') + '%';
	                    } else {
	                        res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? params[i].value : '-') + 'k';
	                    }
	                }
	                return res;

	            }
	        },
	        "grid": {
	        	containLabel: true,
	        	top:"25%",
	        	bottom:"12%",
	        	left:"3%",
	        	right:"2%",
	            textStyle: {
	                color: "#222"
	            }
	        },
	        "legend": {
	            textStyle: {
	                color: '#222',
	            },
	            "data": ['采购', '指标', '达成','增长']
	        },
	
	
	        "calculable": true,
	        "xAxis": [{
	        	name:"大区",
	            "type": "category",
	            "axisLine": {
	                lineStyle: {
	                    color: '#222'
	                }
	            },
	            "splitLine": {
	                "show": false
	            },
	            "axisTick": {
	                "show": false
	            },
	            "splitArea": {
	                "show": false
	            },
	            "axisLabel": {
	                "interval": 0,
	
	            },
	            "data": ['east','south','west','north','northeast'],
	        }],
	        "yAxis": [{
	        	name:"采购数额(k)",
	            "type": "value",
	            "splitLine": {
	                "show": false
	            },
	            "axisLine": {
	                lineStyle: {
	                    color: '#222'
	                }
	            },
	            "axisTick": {
	                "show": true
	            },
	            "axisLabel": {
	                "interval": 0,
	
	            },
	            "splitArea": {
	                "show": false
	            },
	            axisLabel: {
                    margin: 20,
                    formatter: '{value}k',
                    textStyle: {
                        color: '#000',
                    },
                },
	        },{
	        		name:"达成率(%)",
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
                        formatter: '{value}%',
                        textStyle: {
                            color: '#000',
                        },
                    },
                    axisTick: {
                        show: true,
                    }
	
	        }],
	
	        toolbox: {        show: true,        feature: {    myDownload: {
                        show: true,
                        title: '数据导出',
                        icon: 'image://http://localhost:8080/smbi/image/excel.svg',
                        onclick: function (){
                            alert('暂不支持');
                        }
                    },        saveAsImage: {}        }    },series: [{
	            "name": "采购",
	            "type": "bar",
	            "barGap": "10%",
	            "itemStyle": {
	                "normal": {
	                    "color": "rgba(255,144,128,1)",
	                }
	            },
	            "data": [34888,11227,9582,31655,11256],
	        },
	
	            {
	                "name": "指标",
	                "type": "bar",
	                "itemStyle": {
	                    "normal": {
	                        "color": "rgba(0,191,183,1)",
	                    }
	                },
	                "data": [
							11807,
							11442,
							11246,
							34529,
							5313
	                ]
	            }, {
	                "name": "达成",
	                "type": "line",
	                symbolSize:12,
	                symbol:'circle',
	                yAxisIndex: 1,
	                "itemStyle": {
	                    "normal": {
	                        "color": "rgba(152,130,128,13)",
	                        "barBorderRadius": 0,
	                    }
	                },
	                "data": [
						295.47,
						98.13,
						85.21,
						91.68,
						211.84


	                ]
	            },{
	                "name": "增长",
	                "type": "line",
	                symbolSize:12,
	                symbol:'circle',
	                yAxisIndex: 1,
	                "itemStyle": {
	                    "normal": {
	                        "barBorderRadius": 0,
	                    }
	                },
	                "data": [
						95.47,
						98.13,
						65.21,
						91.68,
						81.84

	                ]
	            },
	        ]
	    };
	
	
//**********************3.上右，品牌达成
	var productlineoption = {
			 tooltip: {
			        trigger: 'axis',
			        formatter: function(params, ticket, callback) {

			            var res = params[0].name;

			            for (var i = 0, l = params.length; i < l; i++) {
			                if (params[i].seriesType === 'line') {
			                    res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? params[i].value : '-') + '%';
			                } else {
			                    res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? params[i].value : '-') + 'k';
			                }
			            }
			            return res;

			        }
			    },
	        backgroundColor: "#fff",
	        "title": {
	            "text": "",
	            x: "4%",
	
	            textStyle: {
	                color: '#fff',
	                fontSize: '22'
	            },
	        },
	        "grid": {
	        	containLabel :true,
	        	top:"24%",
	        	bottom:"8%",
	        	left:"5%",
	        	right:"12%",
	            textStyle: {
	                color: "#222"
	            }
	        },
	        "legend": {
	            textStyle: {
	                color: '#222',
	            },
	            "data": ['采购', '指标', '达成','增长']
	        },
	
	
	        "calculable": true,
	        "xAxis": [{
	        	name:"产品线",
	            "type": "category",
	            "axisLine": {
	                lineStyle: {
	                    color: '#222'
	                }
	            },
	            "splitLine": {
	                "show": false
	            },
	            "axisTick": {
	                "show": false
	            },
	            "splitArea": {
	                "show": false
	            },
	            "axisLabel": {
	                "interval": 0,
	
	            },
	            "data": ['Straumann','Anthogyr'],
	        }],
	        "yAxis": [{
	        	name:"采购数额(k)",
	            "type": "value",
	            "splitLine": {
	                "show": false
	            },
	            "axisLine": {
	                lineStyle: {
	                    color: '#222'
	                }
	            },
	            "axisTick": {
	                "show": false
	            },
	            "axisLabel": {
	                "interval": 0,
	                formatter:'{value}k',
	            },
	            "splitArea": {
	                "show": false
	            }
	        },{
	        		name:"达成率(%)",
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
                        },
                    },
                    axisTick: {
                        show: true,
                    }
	
	        }],
	
	        toolbox: {        show: true,        feature: {   myDownload: {
                        show: true,
                        title: '数据导出',
                        icon: 'image://http://localhost:8080/smbi/image/excel.svg',
                        onclick: function (){
                            alert('暂不支持');
                        }
                    },         saveAsImage: {}        }    },series: [{
	            "name": "采购",
	            "type": "bar",
	            "barGap": "10%",
	            "itemStyle": {
	                "normal": {
	                    "color": "rgba(255,144,128,1)",
	                }
	            },
	            "data": [
	                   91612,
	                   6979
	            ],
	            
	        },
	
	            {
	                "name": "指标",
	                "type": "bar",
	                "itemStyle": {
	                    "normal": {
	                        "color": "rgba(0,191,183,1)",
	                    }
	                },
	                "data": [
						67602,
						6730
	                ]
	            }, {
	                "name": "达成",
	                "type": "line",
	                symbolSize:12,
	                symbol:'circle',
	                yAxisIndex: 1,
	                "itemStyle": {
	                    "normal": {
	                        "color": "rgba(152,130,128,13)",
	                        "barBorderRadius": 0,
	                    }
	                },
	                "data": [
						135,
						103
	                ]
	            },{
	                "name": "增长",
	                "type": "line",
	                symbolSize:12,
	                symbol:'circle',
	                yAxisIndex: 1,
	                "itemStyle": {
	                    "normal": {
	                        "barBorderRadius": 0,
	                    }
	                },
	                "data": [
						65.21,
						81.84
	                ]
	            },
	        ]
	    };	

	
//**********************4.下中，经销商排名
	
    var distributorOption = {
    		 tooltip: {
    		        trigger: 'axis',
    		        formatter: function(params, ticket, callback) {

    		            var res = params[0].name;

    		            for (var i = 0, l = params.length; i < l; i++) {
    		                if (params[i].seriesType === 'line') {
    		                    res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? params[i].value : '-') + '%';
    		                } else {
    		                    res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? params[i].value : '-') + 'k';
    		                }
    		            }
    		            return res;

    		        }
    		    },
            legend:{
            	show:true,
            	data:['2018','2019','2019target']
            },
            grid:{
            	left:'12%',
            	bottom:'20%',
	        	top:'15%',
	        	right:'5%',
            },
            
            xAxis: {
                data: ['上海思创', '杭州昆德', '广东益升', '北京医健通', '江苏美安', '成都众合', '山东瑞康德', '北京麦创', '北京同心', '北京德诺'],
                boundaryGap: true,
                axisLine: { //坐标轴轴线相关设置。数学上的x轴
                    show: true,
                    lineStyle: {
                        color: '#222'
                    },
                },

                axisLabel: { //坐标轴刻度标签的相关设置
                    textStyle: {
                        color: '#222',
                        margin: 15,
                    },
                    rotate:40
                },


            },
            dataZoom:[
                      {
                        type:'slider',
                        show:true,
                      }
                    ],
            yAxis: [{
                left:'10%',
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
                    formatter: '{value}k',
                    textStyle: {
                        color: '#222',
                    },
                },
                axisTick: {
                    show: false,
                },
            },{
                type: 'value',
                // max: 140,
                splitNumber: 7,
                splitLine: {
                    show: false,
                },
                axisLine: {
                    show: true,
                },
                axisLabel: {
                    formatter: '{value}%',
                    textStyle: {
                        color: '#000',
                    },
                },
                axisTick: {
                    show: true,
                }

        }],
           toolbox: {        show: true,        feature: {      myDownload: {
                       show: true,
                       title: '数据导出',
                       icon: 'image://http://localhost:8080/smbi/image/excel.svg',
                       onclick: function (){
                           alert('暂不支持');
                       }
                   },      saveAsImage: {}        }    },series: [{
                type: 'bar',
                name:'2019',

                data: [10150, 8337, 7568, 7377, 5078, 4689, 4486, 4420, 2789, 2507]
            }
            ,
            {
                type: 'bar',
                name:'2018',

                data: [10500, 8337, 7582, 7237, 5507, 4668, 4446, 7420, 1278, 9250]
            },
            {
                type: 'bar',
                name:'2019target',

                data: [11505, 4887, 4182, 3705, 48257, 10048, 4586, 1870, 4878, 9000]
            }

            ]
        };
    
//**********************5.右下，省份排名
    var provienceOption = {
	        backgroundColor: "#fff",
	        tooltip: {
	            trigger: 'axis',
	            formatter: function(params, ticket, callback) {

	                var res = params[0].name;

	                for (var i = 0, l = params.length; i < l; i++) {
	                    if (params[i].seriesType === 'line') {
	                        res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? params[i].value : '-') + '';
	                    } else {
	                        res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? params[i].value : '-') + '';
	                    }
	                }
	                return res;

	            }
	        },
	        "grid": {
	        	bottom:'15%',
	        	top:'15%',
	        	right:'12%',
	            textStyle: {
	                color: "#222"
	            }
	        },
	        "legend": {
	            textStyle: {
	                color: '#222',
	            },
	            "data": ['Abutment', 'implant', 'A/i']
	        },
	
	
	        "calculable": true,
	        "xAxis": [{
	            "type": "category",
	            "axisLine": {
	                lineStyle: {
	                    color: '#222'
	                }
	            },
	            "splitLine": {
	                "show": false
	            },
	            "axisTick": {
	                "show": false
	            },
	            "splitArea": {
	                "show": false
	            },
	            "axisLabel": {
	                "interval": 0,
	
	            },
	            "data": ['east','south','west','north','northeast'],
	        }],
	        "yAxis": [{
	            "type": "value",
	            "splitLine": {
	                "show": false
	            },
	            "axisLine": {
	                lineStyle: {
	                    color: '#222'
	                }
	            },
	            "axisTick": {
	                "show":  true
	            },
	            "axisLabel": {
	                "interval": 0,
	
	            },
	            "splitArea": {
	                "show": false
	            }
	        },{
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
                        formatter: '{value}',
                        textStyle: {
                            color: '#000',
                        },
                    },
                    axisTick: {
                        show: true,
                    }
	
	        }],
	
	        toolbox: {        show: true,        feature: {     myDownload: {
                        show: true,
                        title: '数据导出',
                        icon: 'image://http://localhost:8080/smbi/image/excel.svg',
                        onclick: function (){
                            alert('暂不支持');
                        }
                    },       saveAsImage: {}        }    },series: [{
	            "name": "Abutment",
	            "type": "bar",
	            "barGap": "10%",
	            "itemStyle": {
	                "normal": {
	                    "color": "rgba(255,144,128,1)",
	                }
	            },
	            "data": [
	                30677,
	                19696,
	                12798,
	                24275,
	                4278
	            ],
	        },
	
	            {
	                "name": "implant",
	                "type": "bar",
	                "itemStyle": {
	                    "normal": {
	                        "color": "rgba(0,191,183,1)",
	                    }
	                },
	                "data": [
	                    31022,
	                    10832,
	                    8833,
	                    9175,
	                    5656
	                ]
	            }, {
	                "name": "A/i",
	                "type": "line",
	                symbolSize:12,
	                symbol:'circle',
	                yAxisIndex: 1,
	                "itemStyle": {
	                    "normal": {
	                        "color": "rgba(152,130,128,13)",
	                        "barBorderRadius": 0,
	                    }
	                },
	                "data": [
	                    0.89,
	                    1.83,
						1.90,
						2.57,
						0.76
	                ]
	            },
	        ]
	    };
var pieclick = false;
var growthdata = [{
		    value: 9315,
		    name: 'east'
		},
		{
		    value: 3110,
		    name: 'south'
		},
		{
		    value: 2314,
		    name: 'west'
		},
		{
		    value: 1315,
		    name: 'north'
		},
		{
		    value: 3815,
		    name: 'northeast'
		}];
var purchasedata = [{
    value: 335,
    name: 'east'
},
{
    value: 310,
    name: 'south'
},
{
    value: 234,
    name: 'west'
},
{
    value: 135,
    name: 'north'
},
{
    value: 135,
    name: 'northeast'
}
];

var pieoption = {
	    tooltip: {
	        trigger: 'item',
	        formatter: "{b}: <br/>  {c} ({d}%)"
	    },
	    color: ['#ff9080', '#00bfb7', '#988280', '#ffcc00','#37a2da'],
	    legend: {
	        data: ['east', 'south', 'west', 'north', 'northeast'],
	    },
	   toolbox: {        show: true,        feature: {   myDownload: {
                   show: true,
                   title: '数据导出',
                   icon: 'image://http://localhost:8080/smbi/image/excel.svg',
                   onclick: function (){
                       alert('暂不支持');
                   }
               },         saveAsImage: {}        }    },series: [{
	        type: 'pie',
	        radius : '60%',
	        center:['50%', '60%'],
	        data: purchasedata,
	        itemStyle: {
	            emphasis: {
	                shadowBlur: 10,
	                shadowOffsetX: 0,
	                shadowColor: 'rgba(0, 0, 0, 0.5)'
	            }
	        },
	        itemStyle: {
	            normal: {
	                label: {
	                    show: true,
	                    //	                            position:'inside',
	                    formatter: '{b}: \n({d}%)'
	                }
	            },
	            labelLine: {
	                show: true,
	                length:1,
	                length2:1,
	                smooth:0.5
	            }
	        }
	    }],
	};

var topicMap = [
    {
        id:"saleachieve",
        topicCode: "achieve",
        fields: "",
        dataname:"getGaugeAchieve",
        type:"total",
        dataType:"Distributor",
        elementMap:{
            "series[0];data[0];value":"achieve",
            "#saletarget":"target",
            "#salereal":"sumdata"

        },
        filterCode:"ytd"
    }
    ,
    {
        id:"salehistory",
        topicCode: "achieve",
        fields: "",
        dataname:"getAreaAchieve",
        type:"total",
        dataType:"Distributor",
        elementMap:{
            "xAxis[0];data":"Region",
            "series[0];data":"sumdata",
            "series[1];data":"target",
            "series[2];data":"achieve",
            "series[3];data":"growth"
        },

    },
    {
        id:"productlineSale",
        topicCode: "achieve",
        fields: "",
        dataname:"getBrandAchieve",
        type:"total",
        dataType:"Distributor",
        elementMap:{
            "xAxis[0];data":"Brand",
            "series[0];data":"sumdata",
            "series[1];data":"target",
            "series[2];data":"achieve",
            "series[3];data":"growth"

        },

    }

];