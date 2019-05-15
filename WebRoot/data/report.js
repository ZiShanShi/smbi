var salesData = {
	overview: {
		achieve: [145.5976309,70.01245144,135.2309446,149.6863553,159.4582328,146.5567039,137.0640565,134.5268775,145.6699512,132.0671288,160.2289441,158.1598063],
		amt: [76460.61,367600.97,71020.17,78610.35,83740.55,76960.98,77980.31,76530.95,82870.94,75140.01,91160.28,89980.56],
		target: [52510.88, 52510.8, 52510.88, 52510.88, 52510.88, 52510.88, 56890.54, 56890.54, 56890.54, 56890.54, 56890.54, 56890.54]
	}
};

var bizData = {
	overview: {
		achieve: [118.7743456,86.82087585,119.0153289,136.6888941,137.2272251,118.8818308,145.443659, 127.2444384,153.9095483,113.7618403,138.3288226,189.5173429],
		amt: [70620.99,51620.86,70770.32,81280.29,81600.30,70690.38,93690.64,81970.22,99150.02,73280.66,89110.29,122080.91],
		target: [59460.56, 59460.56, 59460.56, 59460.56, 59460.56, 59460.56, 64420.11, 64420.11, 64420.11, 64420.11, 64420.11, 64420.11]
	}
};

var myXdata =  ['上海思创', '杭州昆德', '广东益升', '北京医健通', '江苏美安', '成都众合', '山东瑞康德', '北京麦创', '北京同心', '北京德诺'];
var glXdata =  ['上海思创', '杭州昆德', '广东益升', '北京医健通', '江苏美安', '成都众合', '山东瑞康德', '北京麦创', '北京同心', '北京德诺'];

var topicMap = [
    {
        id:"saleachieve",
        topicCode: "achieve",
        fields: "",
        dataname:"getGaugeAchieve",
        type:"total",
        dataType:"sellout",
        elementMap:{
            "series[0];data[0];value":"achieve",
            "#saletarget":"target",
            "#salereal":"sumdata"

        },
        filterCode:"ytd"
    }
    ,
    {
        id:"businessachieve",
        topicCode: "achieve",
        fields: "",
        dataname:"getGaugeAchieve",
        type:"total",
        dataType:"sellin",
        elementMap:{
            "series[0];data[0];value":"achieve",
            "#businesstarget":"target",
            "#businessreal":"sumdata"

        },
        filterCode:"ytd"
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