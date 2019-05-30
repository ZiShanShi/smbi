//---------------左上
var piesoption = {

    toolbox: {
        show: true, feature: {
            myDownload: {
                show: true,
                title: '数据导出',
                icon: 'image://http://localhost:8080/smbi/image/excel.svg',
                onclick: function () {
                    alert('暂不支持');
                }
            }, saveAsImage: {}
        }
    }, series: [
        {
            name: ' 总销售额（k）',
            type: 'pie',
            radius: ['60%', '80%'],
            center: ['15%', '50%'],
            startAngle: 225,
            color: [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#00a2ff'
            }, {
                offset: 1,
                color: '#70ffac'
            }]), "transparent"],
            labelLine: {
                normal: {
                    show: false
                }
            },
            label: {
                normal: {
                    position: 'center'
                }
            },
            data: [{
                value: 75,
                name: '总销售额',
                label: {
                    normal: {
                        formatter: '总销售额\n',
                        textStyle: {
                            color: '#222',
                            fontSize: 16,
                            padding: [10, 0, 0, 0],
                        }
                    }
                }
            }, {
                value: 25,
                name: '%',
                label: {
                    normal: {
                        formatter: '300',
                        textStyle: {
                            color: '#007ac6',
                            fontSize: 25,
                            padding: [10, 0, 0, 0],
                        }
                    }
                }
            },
                {
                    value: 0,
                    name: '%',
                    label: {
                        normal: {
                            formatter: 'k',
                            textStyle: {
                                color: '#222',
                                fontSize: 16,
                                padding: [10, 0, 0, 0],
                            }
                        }
                    }
                }]
        },
        {
            name: '平均账期',
            type: 'pie',
            radius: ['60%', '80%'],
            center: ['46%', '50%'],
            startAngle: 225,
            color: [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#00a2ff'
            }, {
                offset: 1,
                color: '#70ffac'
            }]), "transparent"],
            labelLine: {
                normal: {
                    show: false
                }
            },
            label: {
                normal: {
                    position: 'center'
                }
            },
            data: [{
                value: 75,
                name: '平均账期',
                label: {
                    normal: {
                        formatter: '平均账期\n',
                        textStyle: {
                            color: '#222',
                            padding: [10, 0, 0, 0],
                            fontSize: 16

                        }
                    }
                }
            }, {
                value: 25,
                name: '%',
                label: {
                    normal: {
                        formatter: '85',
                        textStyle: {
                            color: '#007ac6',
                            padding: [10, 0, 0, 0],
                            fontSize: 25

                        }
                    }
                }
            },
                {
                    value: 0,
                    name: '%',
                    label: {
                        normal: {
                            formatter: '天',
                            textStyle: {
                                color: '#222',
                                padding: [10, 0, 0, 0],
                                fontSize: 16

                            }
                        }
                    }
                }]
        },
        {
            name: ' 平均库存天数',
            type: 'pie',
            radius: ['60%', '80%'],
            center: ['80%', '50%'],
            startAngle: 225,
            labelLine: {
                normal: {
                    show: false
                }
            },
            label: {
                normal: {
                    position: 'center'
                }
            },
            data: [{
                value: 75,
                "itemStyle": {
                    "normal": {
                        "color": new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            "offset": 0,
                            "color": '#f125ff'
                        }, {
                            "offset": 1,
                            "color": '#2dcbff'
                        }]),
                    }
                },
                name: '平均库存天数',
                label: {
                    normal: {
                        formatter: '平均库存天数\n',
                        textStyle: {
                            color: '#222',
                            padding: [10, 0, 0, 0],
                            fontSize: 12

                        }
                    }
                }
            }, {
                value: 25,
                name: '%',
                label: {
                    normal: {
                        formatter: '34',
                        textStyle: {
                            color: '#f125ff',
                            padding: [10, 0, 0, 0],
                            fontSize: 25

                        }
                    }
                }
            },
                {
                    value: 0,
                    name: '%',
                    label: {
                        normal: {
                            formatter: '天',
                            textStyle: {
                                color: '#222',
                                padding: [10, 0, 0, 0],
                                fontSize: 16

                            }
                        }
                    }
                }]
        },

    ]
};

//----------------右上

var purchasedata = [{
    value: 335,
    name: '公立'
},
    {
        value: 310,
        name: '民营'
    },
    {
        value: 234,
        name: '连锁诊所'
    },
    {
        value: 135,
        name: '技工加工所'
    },
    {
        value: 135,
        name: '二级分销商'
    }
];
var salesAcountOption = {

    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            var data = params.data.value;
            var percent = params.percent;
            var name = params.name;
            return name + ":\n" + formatterOneMoney(data) + "k (" + percent+")";
        }
    },
    color: ['#ff9080', '#00bfb7', '#988280', '#ffcc00', '#37a2da'],
    legend: {
        data: ['公立', '民营', '连锁诊所', '技工加工所', '二级分销商'],
    },
    toolbox: {
        show: true, feature: {
            myDownload: {
                show: true,
                title: '数据导出',
                icon: 'image://http://localhost:8080/smbi/image/excel.svg',
                onclick: function () {
                    alert('暂不支持');
                }
            }, saveAsImage: {}
        }
    }, series: [{
        type: 'pie',
        radius: '60%',
        center: ['50%', '60%'],
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
                    formatter: function (params) {
                        var data = params.data.value;
                        var percent = params.percent;
                        var name = params.name;
                        return name + ":\n" + formatterOneMoney(data) + "k (" + percent+")";
                    }
                }
            },
            labelLine: {
                show: true,
                length: 1,
                length2: 1,
                smooth: 0.5
            }
        }
    }],

};

//------------------------
var geoCoordMap = {
    "上海": [121.48, 31.22],
    "珠海": [113.52, 22.3],
    "三亚": [109.31, 18.14],
    "惠州": [114.4, 23.09],
    "海口": [110.35, 20.02],
    "合肥": [117.27, 31.86],
    "南京": [118.78, 32.04],
    "杭州": [120.19, 30.26],
    "苏州": [120.62, 31.32],
    "无锡": [120.29, 31.59],
    "昆山": [120.95, 31.39],
    "广州": [113.23, 23.16],
    "深圳": [114.07, 22.62],
    "佛山": [113.11, 23.05],
    "东莞": [113.75, 23.04],
    "福州": [119.3, 26.08],
    "厦门": [118.1, 24.46],
    "南宁": [108.33, 22.84],
    "郑州": [113.65, 34.76],
    "武汉": [114.31, 30.52],
    "长沙": [113, 28.21],
    "南昌": [115.89, 28.68],
    "北京": [116.46, 39.92],
    "长春": [125.35, 43.88],
    "大连": [121.62, 38.92],
    "沈阳": [123.38, 41.8],
    "哈尔滨": [126.63, 45.75],
    "天津": [117.2, 39.13],
    "济南": [117, 36.65],
    "青岛": [120.33, 36.07],
    "太原": [112.53, 37.87],
    "石家庄": [114.48, 38.03],
    "西安": [108.95, 34.27],
    "成都": [104.06, 30.67],
    "重庆": [106.54, 29.59],
    "昆明": [102.73, 25.04],
};

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};

var mapoption = {
    tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
        backgroundColor: 'rgba(0,0,0,.8)',
        borderColor: '#3574c8',
        borderWidth: '2',
        extraCssText: 'padding:10px;box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);',
        show: true,
        formatter: function (params) {
            var res;
            if (params.value > 0) {
                if (params.seriesType == 'map') {
                    res = params.data.value2 + '<br/>经销商个数：' + parseInt(Math.random() * 50) + params.value + "个";
                } else {
                    res = params.data.value2 + '<br/>经销商个数：' + params.value + "个";
                }
            } else {
                res = '';
            }
            return res;
        }

    },
    legend: {
        show: true,
        selectedMode: 'single',
        data: ["士卓曼", '安卓健']
    },
    visualMap: {
        min: 0,
        max: 7,
        seriesIndex: 2,
        left: 'left',
        top: 'bottom',
        text: ['高', '低'],
        show: false,
        inRange: {
            color: ['#ffffff', '#ffc188', '#479fd2', '#fba853', '#48c7c0', '#fa8737', '#4bbdd6', '#ff6f5b']
        }
        //北京：1      四川：2    河南：3     内蒙：4     安徽：5    新疆：6     福建：7
    },
    geo: {
        map: 'china',
        zoom: 1.1,
        roam: true,
        label: {
            normal: {
                show: true,
                color: '#333'
            },
            emphasis: {
                show: true,
                color: '#fff'
            }
        },
        itemStyle: {
            normal: {
                areaColor: '#fbfbfb',
            },
            emphasis: {
                areaColor: '#3574c8'
            }
        }
    },
    toolbox: {
        show: true, feature: {
            myDownload: {
                show: true,
                title: '数据导出',
                icon: 'image://http://localhost:8080/smbi/image/excel.svg',
                onclick: function () {
                    alert('暂不支持');
                }
            }, saveAsImage: {}
        }
    }, series: [{
        name: '士卓曼',
        type: 'scatter',
        coordinateSystem: 'geo',
        tooltip: {
            show: true,
            formatter: function (params) {
                var res;
                if (params.data) {
                    res = params.data.name + ':<br/>' + params.data.value[2] +
                        "个";
                } else {
                    res = '';
                }
                return res;
            }

        },
        data: convertData([
            {name: "郑州", value: 94.7},
            {name: "武汉", value: 97.4},
            {name: "长沙", value: 95.5},
            {name: "南昌", value: 97.9},
            {name: "北京", value: 92.1},
            {name: "长春", value: 93.0},
            {name: "大连", value: 87.9},
            {name: "沈阳", value: 97.4},
            {name: "哈尔滨", value: 97.7},
            {name: "天津", value: 94.9},
            {name: "济南", value: 93.2},
            {name: "青岛", value: 95.4},
            {name: "太原", value: 98.4},
            {name: "石家庄", value: 95.1},
            {name: "西安", value: 95.6},
            {name: "成都", value: 96.3},
            {name: "重庆", value: 98.0},
            {name: "昆明", value: 98.4},
            {name: "苏州", value: 90.5},
            {name: "无锡", value: 95.4},
            {name: "昆山", value: 91.8},
            {name: "广州", value: 97.0},
            {name: "深圳", value: 87.7},
            {name: "佛山", value: 98.6},
            {name: "东莞", value: 94.9},
        ]),
        symbolSize: 12,
        label: {
            normal: {
                show: false
            },
            emphasis: {
                show: true
            }
        },
        itemStyle: {
            color: "#000",
            emphasis: {
                borderColor: '#fff',
                borderWidth: 1
            }
        }
    },
        {
            name: '安卓健',
            type: 'scatter',
            coordinateSystem: 'geo',
            tooltip: {
                show: true,
                formatter: function (params) {
                    var res;
                    if (params.data) {
                        res = params.data.name + ':<br/>' + params.data.value[2] +
                            "个";
                    } else {
                        res = '';
                    }
                    return res;
                }

            },
            data: convertData([
                {name: "郑州", value: 94.7},
                {name: "武汉", value: 97.4},
                {name: "长沙", value: 95.5},
                {name: "南昌", value: 97.9},

                {name: "上海", value: 88.6},
                {name: "珠海", value: 91.5},
                {name: "三亚", value: 98.4},
                {name: "惠州", value: 92.8},
                {name: "海口", value: 99.6},
                {name: "合肥", value: 87.2},
                {name: "南京", value: 94.8},
                {name: "杭州", value: 93.9},
                {name: "苏州", value: 90.5},
                {name: "无锡", value: 95.4},
                {name: "昆山", value: 91.8},
                {name: "广州", value: 97.0},
                {name: "深圳", value: 87.7},
                {name: "佛山", value: 98.6},
                {name: "东莞", value: 94.9},
                {name: "福州", value: 95.2},
                {name: "厦门", value: 89.6},
                {name: "南宁", value: 98.6},

            ]),
            symbolSize: 15,
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                emphasis: {
                    borderColor: '#fff',
                    borderWidth: 1
                }
            }
        }, {
            type: 'map',
            mapType: 'china',
            geoIndex: 0,
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: true
                }
            },
            data: [{
                name: '北京',
                value: 1,
                value2: 'east',
                value3: '包括北京、天津、河北（环京津部分）。<br />选择自然条件较为优越、年均降水量在 600 毫米左右的适宜区域，<br />发展杨树、刺槐、榆树、柳树等乡土树种用材林和落叶松、<br />樟子松、油松、侧柏等珍稀树种和大径级用材林。'
            }, {
                name: '天津',
                value: 1,
                value2: 'east',
                value3: '包括北京、天津、河北（环京津部分）。<br />选择自然条件较为优越、年均降水量在 600 毫米左右的适宜区域，<br />发展杨树、刺槐、榆树、柳树等乡土树种用材林和落叶松、<br />樟子松、油松、侧柏等珍稀树种和大径级用材林。'
            }, {
                name: '河北',
                value: 1,
                value2: 'east',
                value3: '包括北京、天津、河北（环京津部分）。<br />选择自然条件较为优越、年均降水量在 600 毫米左右的适宜区域，<br />发展杨树、刺槐、榆树、柳树等乡土树种用材林和落叶松、<br />樟子松、油松、侧柏等珍稀树种和大径级用材林。'
            }, {
                name: '重庆',
                value: 2,
                value2: 'south',
                value3: '自然条件较为优越，年均降水量在 800 毫米以上。<br />在适宜地区培育桢楠、红椿、降香黄檀、铁刀木<br />等珍稀树种和大径级用材林。'
            }, {
                name: '云南',
                value: 2,
                value2: 'south',
                value3: '自然条件较为优越，年均降水量在 800 毫米以上。<br />在适宜地区培育桢楠、红椿、降香黄檀、铁刀木<br />等珍稀树种和大径级用材林。'
            }, {
                name: '贵州',
                value: 2,
                value2: 'south',
                value3: '自然条件较为优越，年均降水量在 800 毫米以上。<br />在适宜地区培育桢楠、红椿、降香黄檀、铁刀木<br />等珍稀树种和大径级用材林。'
            }, {
                name: '四川',
                value: 2,
                value2: 'south',
                value3: '自然条件较为优越，年均降水量在 800 毫米以上。<br />在适宜地区培育桢楠、红椿、降香黄檀、铁刀木<br />等珍稀树种和大径级用材林。'
            }, {
                name: '河南',
                value: 3,
                value2: 'west',
                value3: '自然条件较为优越，年均降水量多在 600-800 毫米<br />之间。主要培育适宜该区域生长的毛白杨、欧美杨<br />等浆纸和人造板工业原料林，发展栎类、榉树等珍稀树种和<br />大径级用材林。'
            }, {
                name: '山东',
                value: 3,
                value2: 'west',
                value3: '自然条件较为优越，年均降水量多在 600-800 毫米<br />之间。主要培育适宜该区域生长的毛白杨、欧美杨<br />等浆纸和人造板工业原料林，发展栎类、榉树等珍稀树种和<br />大径级用材林。'
            }, {
                name: '辽宁',
                value: 4,
                value2: 'northeast',
                value3: '选择自然条件较为优越、年均降水量在 400-600 毫米<br />的适宜区域，发展杨树、樟子松、落叶松等中短周期用材林<br />和红松、水曲柳等珍稀树种和大径级用材林。'
            }, {
                name: '黑龙江',
                value: 4,
                value2: 'northeast',
                value3: '选择自然条件较为优越、年均降水量在 400-600 毫米<br />的适宜区域，发展杨树、樟子松、落叶松等中短周期用材林<br />和红松、水曲柳等珍稀树种和大径级用材林。'
            }, {
                name: '内蒙古',
                value: 4,
                value2: 'northeast',
                value3: '选择自然条件较为优越、年均降水量在 400-600 毫米<br />的适宜区域，发展杨树、樟子松、落叶松等中短周期用材林<br />和红松、水曲柳等珍稀树种和大径级用材林。'
            }, {
                name: '吉林',
                value: 4,
                value2: 'northeast',
                value3: '选择自然条件较为优越、年均降水量在 400-600 毫米<br />的适宜区域，发展杨树、樟子松、落叶松等中短周期用材林<br />和红松、水曲柳等珍稀树种和大径级用材林。'
            }, {
                name: '湖南',
                value: 5,
                value2: 'north',
                value3: '自然条件优越，年均降水量在 1000 毫米以上。<br />主要培育欧美杨和松类、杉类、竹类为主的中短周期用材林，<br />适地适树发展周期较长的楠木、红豆杉、红椿、樟树等<br />珍稀树种和大径级用材林。'
            }, {
                name: '安徽',
                value: 5,
                value2: 'north',
                value3: '自然条件优越，年均降水量在 1000 毫米以上。<br />主要培育欧美杨和松类、杉类、竹类为主的中短周期用材林，<br />适地适树发展周期较长的楠木、红豆杉、红椿、樟树等<br />珍稀树种和大径级用材林。'
            }, {
                name: '浙江',
                value: 5,
                value2: 'north',
                value3: '自然条件优越，年均降水量在 1000 毫米以上。<br />主要培育欧美杨和松类、杉类、竹类为主的中短周期用材林，<br />适地适树发展周期较长的楠木、红豆杉、红椿、樟树等<br />珍稀树种和大径级用材林。'
            }, {
                name: '江西',
                value: 5,
                value2: 'north',
                value3: '自然条件优越，年均降水量在 1000 毫米以上。<br />主要培育欧美杨和松类、杉类、竹类为主的中短周期用材林，<br />适地适树发展周期较长的楠木、红豆杉、红椿、樟树等<br />珍稀树种和大径级用材林。'
            }, {
                name: '湖北',
                value: 5,
                value2: 'north',
                value3: '自然条件优越，年均降水量在 1000 毫米以上。<br />主要培育欧美杨和松类、杉类、竹类为主的中短周期用材林，<br />适地适树发展周期较长的楠木、红豆杉、红椿、樟树等<br />珍稀树种和大径级用材林。'
            }, {
                name: '江苏',
                value: 5,
                value2: 'north',
                value3: '自然条件优越，年均降水量在 1000 毫米以上。<br />主要培育欧美杨和松类、杉类、竹类为主的中短周期用材林，<br />适地适树发展周期较长的楠木、红豆杉、红椿、樟树等<br />珍稀树种和大径级用材林。'
            }, {
                name: '新疆',
                value: 6,
                value2: '西北地区',
                value3: '选择自然条件较为优越、年均降水量在 200-600毫米<br />或具有灌溉基础的绿洲适宜区域，发展杨树、榆树、落叶松、夏橡等<br />中短周期用材林，云杉、水曲柳等珍稀树种和大径级用材林。'
            }, {
                name: '甘肃',
                value: 6,
                value2: '西北地区',
                value3: '选择自然条件较为优越、年均降水量在 200-600毫米<br />或具有灌溉基础的绿洲适宜区域，发展杨树、榆树、落叶松、夏橡等<br />中短周期用材林，云杉、水曲柳等珍稀树种和大径级用材林。'
            }, {
                name: '山西',
                value: 6,
                value2: '西北地区',
                value3: '选择自然条件较为优越、年均降水量在 200-600毫米<br />或具有灌溉基础的绿洲适宜区域，发展杨树、榆树、落叶松、夏橡等<br />中短周期用材林，云杉、水曲柳等珍稀树种和大径级用材林。'
            }, {
                name: '青海',
                value: 6,
                value2: '西北地区',
                value3: '选择自然条件较为优越、年均降水量在 200-600毫米<br />或具有灌溉基础的绿洲适宜区域，发展杨树、榆树、落叶松、夏橡等<br />中短周期用材林，云杉、水曲柳等珍稀树种和大径级用材林。'
            }, {
                name: '陕西',
                value: 6,
                value2: '西北地区',
                value3: '选择自然条件较为优越、年均降水量在 200-600毫米<br />或具有灌溉基础的绿洲适宜区域，发展杨树、榆树、落叶松、夏橡等<br />中短周期用材林，云杉、水曲柳等珍稀树种和大径级用材林。'
            }, {
                name: '宁夏',
                value: 6,
                value2: '西北地区',
                value3: '选择自然条件较为优越、年均降水量在 200-600毫米<br />或具有灌溉基础的绿洲适宜区域，发展杨树、榆树、落叶松、夏橡等<br />中短周期用材林，云杉、水曲柳等珍稀树种和大径级用材林。'
            }, {
                name: '广西',
                value: 7,
                value2: '西北地区',
                value3: '选择自然条件较为优越、年均降水量在 200-600毫米<br />或具有灌溉基础的绿洲适宜区域，发展杨树、榆树、落叶松、夏橡等<br />中短周期用材林，云杉、水曲柳等珍稀树种和大径级用材林。'
            }, {
                name: '福建',
                value: 7,
                value2: '西北地区',
                value3: '选择自然条件较为优越、年均降水量在 200-600毫米<br />或具有灌溉基础的绿洲适宜区域，发展杨树、榆树、落叶松、夏橡等<br />中短周期用材林，云杉、水曲柳等珍稀树种和大径级用材林。'
            }, {
                name: '广东',
                value: 7,
                value2: '西北地区',
                value3: '选择自然条件较为优越、年均降水量在 200-600毫米<br />或具有灌溉基础的绿洲适宜区域，发展杨树、榆树、落叶松、夏橡等<br />中短周期用材林，云杉、水曲柳等珍稀树种和大径级用材林。'
            }, {
                name: '海南',
                value: 7,
                value2: '西北地区',
                value3: '选择自然条件较为优越、年均降水量在 200-600毫米<br />或具有灌溉基础的绿洲适宜区域，发展杨树、榆树、落叶松、夏橡等<br />中短周期用材林，云杉、水曲柳等珍稀树种和大径级用材林。'
            }, {
                name: '上海',
                value: 0
            }, {
                name: '西藏',
                value: 0
            }, {
                name: '台湾',
                value: 0
            }, {
                name: '香港',
                value: 0
            }, {
                name: '澳门',
                value: 0
            }, {
                name: '南海诸岛',
                value: 0
            }]
        }]
};

//--------------
var distributordata = ['江苏美安医药股份有限公司', '大连金诺利尔医疗器械有限公司', '北京乐章商贸有限公司', '哈尔滨斯迪沃医疗器械经销有限公司', '贵州昕烨医疗器械有限公司', '黑龙江博士利医疗器械有限责任公司'];
var accountdata = [6.23, 6.99, 7.54, 7.97, 8.07, 11.36];
var inventorydata = [15, 42, 5, 2, 2, 34];
inventorydata.sort(function (a, b) {
    return a - b;
});
accountdata.sort(function (a, b) {
    return a - b;
});
var accountOption = {

    grid: {
        containLabel: true,
        bottom: '0',
        right: '5%'
    },

    tooltip: {
        trigger: 'axis',
        formatter: function (params, ticket, callback) {

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
    xAxis: {
        type: 'value',
        axisTick: {
            show: true
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: '#222',
            }
        },
        splitLine: {
            show: true
        },
    },
    yAxis: [{
        type: 'category',
        axisTick: {
            show: false
        },
        axisLabel: {
            formatter: function (params, ticket, callback) {

                var res = params[0].name;

                for (var i = 0, l = params.length; i < l; i++) {
                    if (params[i].seriesName === '账期') {
                        res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? params[i].value : '-') + '月';
                    } else {
                        res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? params[i].value : '-') + '天';
                    }
                }
                return res;

            },
            textStyle: {
                color: '#222',
            },
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: '#222',
            }
        }, data: distributordata
    }

    ],
    toolbox: {
        show: true, feature: {
            myDownload: {
                show: true,
                title: '数据导出',
                icon: 'image://http://localhost:8080/smbi/image/excel.svg',
                onclick: function () {
                    alert('暂不支持');
                }
            }, saveAsImage: {}
        }
    }, series: [{
        name: '账期',
        type: 'bar',

        itemStyle: {
            normal: {
                show: true,
                color: '#277ace',
                barBorderRadius: 50,
                borderWidth: 0,
                borderColor: '#333',
            }
        },
        barGap: '0%',
        barCategoryGap: '50%',
        data: accountdata
    }]

};

var inventorysOption = {
    color: ['#ff9080', '#00bfb7', '#988280', '#ffcc00','#37a2da'],
    grid: {
        containLabel: true,
        bottom: '0',
        right: '5%'
    },

    tooltip: {
        show: "true",
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    xAxis: {
        type: 'value',
        axisTick: {
            show: true
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: '#222',
            }
        },
        splitLine: {
            show: true
        },
    },
    yAxis: [{
        type: 'category',
        axisTick: {
            show: false
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: '#222',
            }
        }, data: distributordata
    }

    ],
    toolbox: {
        show: true, feature: {
            myDownload: {
                show: true,
                title: '数据导出',
                icon: 'image://http://localhost:8080/smbi/image/excel.svg',
                onclick: function () {
                    alert('暂不支持');
                }
            }, saveAsImage: {}
        }
    }, series: [{
        name: '库存天数',
        type: 'bar',

        itemStyle: {
            normal: {
                show: true,
                color: '#277ace',
                barBorderRadius: 50,
                borderWidth: 0,
                borderColor: '#333',
            }
        },
        barGap: '0%',
        barCategoryGap: '50%',
        data: inventorydata
    }]

};
//--------------------------
var barData1 = [7062.98, 5162.85, 7077.31, 8128.29, 8160.30, 7069.38, 9369.64, 8197.22, 9915.02, 7328.66, 8911.29, 12208.91];
var barData2 = [7646.61, 3676.97, 3676.97, 7102.17, 7861.35, 8374.55, 7696.98, 7798.31, 7653.95, 8287.94, 7514.01, 9116.28, 8998.56];

var compareoption = {
    color: ['#ff9080', '#00bfb7', '#988280', '#ffcc00','#37a2da'],
    tooltip: {
        trigger: 'axis',
        formatter: function (params, ticket, callback) {

            var res = params[0].name;

            for (var i = 0, l = params.length; i < l; i++) {
                if (params[i].seriesType === 'line') {
                    res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? params[i].value : '-') + '';
                } else {
                    res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? formatterOneMoney(params[i].value) : '-') + 'k';
                }
            }
            return res;

        }
    },
    legend: {
        data: ['sellin', 'sellout', 'in/out'],
        textStyle: {
            color: '#222'
        }
    },
    grid: {
        containLabel: true,
        bottom: 50,
        left: 10,
        right: 10
    },
    xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        axisTick: {
            alignWithLabel: true
        },

        splitLine: {
            show: false,

        },
        axisLabel: {
            //fontWeight:10,
            //interval:2,
            fontsize: 2,
            align: 'center',
            color: 'rgba(0,0,0,0.3)'
        }
    },
    dataZoom: {
        type: 'slider',
        show: true
    },
    yAxis: [{
        type: 'value',
        splitLine: {
            show: true,
            lineStyle: {
                color: 'rgba(0,0,0,0.2)'
            }
        },
        axisLine: {
            show: false
        },
        axisLabel: {
            fontWeight: 10,
            fontsize: 5,
            color: 'rgba(0,0,0,0.3)',
            formatter: '{value}k',
        }

    },
        {
            type: 'value',
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(0,0,0,0.2)'
                }
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                fontWeight: 10,
                fontsize: 5,
                color: 'rgba(0,0,0,0.3)',
                formatter: '{value}',
            }

        }

    ],
    toolbox: {
        show: true, feature: {
            myDownload: {
                show: true,
                title: '数据导出',
                icon: 'image://http://localhost:8080/smbi/image/excel.svg',
                onclick: function () {
                    alert('暂不支持');
                }
            }, saveAsImage: {}
        }
    }, series: [{
        name: 'sellin',
        type: 'bar',
        barWidth: 10,

        data: barData1
    }, {
        name: 'sellout',
        type: 'bar',
        barWidth: 10,

        data: barData2
    },
        {
            name: 'in/out',
            type: 'line',
            yAxisIndex:1,
            barWidth: 10,

            data: barData2
        }
    ]
};

//-----------------------------
function getVirtulData(year) {
    year = year || '2017';
    var date = +echarts.number.parseDate(year + '-01-01');
    var end = +echarts.number.parseDate((+year + 1) + '-01-01');
    var dayTime = 3600 * 24 * 1000;
    var data = [];
    for (var time = date; time < end; time += dayTime) {
        data.push([
            echarts.format.formatTime('yyyy-MM-dd', time),
            Math.floor(Math.random() * 10000)
        ]);
    }
    return data;
}

var heatoption = {
    tooltip: {},
    visualMap: {
        min: 0,
        max: 10000,
        type: 'piecewise',
        orient: 'horizontal',
        left: 'center',
        top: 0,
        textStyle: {
            color: '#000'
        }
    },
    calendar: {
        left: 60,
        right: 30,
        position: 'end',
        range: '2018',
        itemStyle: {
            normal: {borderWidth: 0.5}
        },
        dayLabel: {
            show: true,
            nameMap: 'cn',
            firstDay: 1 // 从周一开始
        },
        monthLabel: {
            nameMap: 'cn'
        },
        yearLabel: {show: true}
    },
    toolbox: {
        show: true, feature: {
            myDownload: {
                show: true,
                title: '数据导出',
                icon: 'image://http://localhost:8080/smbi/image/excel.svg',
                onclick: function () {
                    alert('暂不支持');
                }
            }, saveAsImage: {}
        }
    }, series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: getVirtulData(2018)
    }
};

var inventoryOption = {

    tooltip: {
        trigger: 'axis',
        formatter: function (params, ticket, callback) {

            var res = params[0].name;

            for (var i = 0, l = params.length; i < l; i++) {
                if (params[i].seriesName === '库存') {
                    res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? formatterOneMoney(params[i].value) : '-') + '天';
                } else {
                    res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? formatterOneMoney(params[i].value) : '-') + '月';
                }
            }
            return res;

        }
    },
    legend: {
        show: true,
        selectedMode: 'single',
        data: ['库存', '账期']
    },
    grid: {
        left: '12%',
        bottom: '20%',
        top: '15%',
        right: '5%',
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
            rotate: 40
        },


    },
    dataZoom: [
        {
            type: 'slider',
            show: true,
        }
    ],
    yAxis: {
        left: '10%',
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
            formatter: '{value}天',
            textStyle: {
                color: '#222',
            },
        },
        axisTick: {
            show: false,
        },
    },
    toolbox: {
        show: true, feature: {
            myDownload: {
                show: true,
                title: '数据导出',
                icon: 'image://http://localhost:8080/smbi/image/excel.svg',
                onclick: function () {
                    alert('暂不支持');
                }
            }, saveAsImage: {}
        }
    }, series: [{
        type: 'bar',
        name: '账期',
        barGap: "10%",
        itemStyle: {
            normal: {
                color: function (params) {
                    return '#28ffb3'
                },
                barBorderRadius: [10, 10, 0, 0],

            }
        },
        data: [10150, 8337, 7568, 7377, 5078, 4689, 4486, 4420, 2789, 2507]
    }
        ,
        {
            type: 'bar',
            name: '库存',
            barGap: "10%",
            itemStyle: {
                normal: {
                    barBorderRadius: [10, 10, 0, 0],

                }
            },
            data: [1050, 837, 758, 737, 507, 468, 446, 420, 278, 250]
        }]

};

var topicMap = [

    {
        id: "scatter",
        topicCode: "Sale",
        fields: "Amount",
        //dataname:"getGaugeAchieve",
        //dataType:'sellout',
        elementMap: {
            "series[0];data[1];label;normal;formatter": "Amount",
            //"#saletarget": "target",
            //"#salereal": "sumdata"

        },
    },

    {
        id: "scatter",
        topicCode: "achieve",
        //fields: "Amount",
        dataname:"getAverageAccount",
        //dataType:'sellout',
        aggcode:"CompanyCode;DistributorCode;peroid",
        elementMap: {
            "series[1];data[1];label;normal;formatter": "averageAccount",
            //"#saletarget": "target",
            //"#salereal": "sumdata"

        },
    },

    {
        id: "scatter",
        topicCode: "achieve",
        //fields: "Amount",
        dataname:"getinventoryday",
        //dataType:'sellout',
        aggcode:"BizDate;brand;DistributorCode",
        elementMap: {
            "series[2];data[1];label;normal;formatter": "averageinventoryday",
            //"#saletarget": "target",
            //"#salereal": "sumdata"

        },
    },


    {
        id: "sales-acount",
        topicCode: "Sale",
        fields: "Amount;CompanyType",
        //dataname:"getGaugeAchieve",
        //dataType:'sellout',
        elementMap: {
            "legend[0];data":'CompanyType',
            "series[0];data.name": "CompanyType",
            "series[0];data.value": "Amount",
            //"#saletarget": "target",
            //"#salereal": "sumdata"

        },
        filter:" and CompanyType <> '一级经销商'"
    }
    ,
    /*{
        id: "inventory",
        topicCode: "achieve",
        //fields: "Amount",
        dataname:"getinventorydaydetail",
        //dataType:'sellout',
        aggcode:"BizDate;brand;DistributorCode",
        elementMap: {
            "$inventoryDistributorNames": "DistributorName",
            "series[0];data": "inventoryday",
            //"series[2];data": "rate",
            //"#saletarget": "target",
            //"#salereal": "sumdata"
        },
    },

    */
    {
        id: "inventory",
        topicCode: "achieve",
        //fields: "Amount",
        dataname:"getAverageAccountDetail",
        //dataType:'sellout',
        aggcode:"CompanyCode;DistributorCode;peroid",
        elementMap: {
            "$accountDistributorNames": "DistributorName",
            "series[1];data": "account",
            //"series[2];data": "rate",
            //"#saletarget": "target",
            //"#salereal": "sumdata"

        },
    },


];