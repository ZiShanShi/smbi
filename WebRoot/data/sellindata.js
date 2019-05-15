var report = {
	theme: {
		name: "销售达成增长主题",
		chart: ["line", "line", "pie", "pie", "bar", "bar"],
		dimension: [
		    {code: "period", text: "期间", fields: [
       		    {caption: "年份", field: "year", filterField: "year"},
    		    {caption: "季度", field: "season", filterField: "season"},
    		    {caption: "月份", field: "month", filterField: "month"},
    		    	                               
		     ]},
			 {code: "hierarchy", text: "架构", fields: [
			    {caption: "大区经理", field: "rsm"},
			    {caption: "主管", field: "area"}
			 ]},
			 {code: "area", text: "区域", fields: [
			    {caption: "大区", field: "region", filterField: "regionid"},
				{caption: "省份", field: "province", filterField: "province"},
				{caption: "城市", field: "city", filterField: "city"}
			 ]}, {code: "distributor", text: "经销商", fields: [
			    {caption: "经销商名称", field: "name", filterField: "regionid"},
				{caption: "经销商编码", field: "code", filterField: "province"},
			 ]},
			 {code: "porduct", text: "产品", fields: [
			    {caption: "产品线", field: "productCode", filterField: "productid"},
			    {caption: "产品名称", field: "productName", filterField: "productid"},
			    {caption: "品牌", field: "brand", filterField: "brandid"}
			 ]}
		],
		value: [
		    {caption: "销量", field: "qty_actual"},
		    {caption: "YTD销售额", field: "qty_actual"},
		    {caption: "Q1销售额", field: "qty_actual"},
		    {caption: "Q2销售额", field: "qty_actual"},
		    {caption: "Q3销售额", field: "qty_actual"},
		    {caption: "Q4销售额", field: "qty_actual"},
            {caption: "指标", field: "qty_target"},
            {caption: "达成", field: "rate_achieve"},
		    {caption: "YTD达成率", field: "qty_actual"},
		    {caption: "Q1达成率", field: "qty_actual"},
		    {caption: "Q2达成率", field: "qty_actual"},
		    {caption: "Q3达成率", field: "qty_actual"},
		    {caption: "Q4达成率", field: "qty_actual"},
		    {caption: "环比", field: "rate_priorPeriod"},
		    {caption: "同比", field: "rate_lastYear"}
		]
	},
	operate: ["outputData", "outputChart"],
	name: "销售达成增长",
	chart: "",
	axisY: {
		type: "value",
		fields: ["achieve", "growth_lastYear"],
		editable: true
	},
	axisX: {
		type: "dimension",
		fields: ["region"],
		editable: true
	},
	showDataGrid: true,
	datasource: "",
	data: ""
	
};