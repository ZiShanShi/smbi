var menutree = {
    "总经理": [
        {name: "home_gm", text: "首页", img: "../../image/home.png", url: "home_gm.html"},
        {name: "biReport", text: "BI报告", img: "../../image/file.png", children: [
	        {name: "saleOverview", text: "sellout达成", img: "../../image/report.png", url: "../bi/sellout_gm.html"},
	        {name: "bizOverview", text: "经销商采购达成", img: "../../image/report.png", url: "../bi/distributorsale_gm.html"},
	        {name: "bizOverview", text: "sellin达成", img: "../../image/report.png", url: "../bi/sellin_gm.html"},
	        {name: "channelOverview", text: "经销商管理", img: "../../image/report.png", url: "../bi/distributor_gm.html"},
	        {name: "terminalOverview", text: "终端管理", img: "../../image/report.png", url: "../bi/terminal.html"},
	        {name: "1", text: "团队绩效", img: "../../image/report.png", url: "../bi/team.html"}, 
        ]},
        
        {name: "detailReport", text: "绩效分析", img: "../../image/file.png", children: [
  	        {name: "1", text: "sellin分析", img: "../../image/report.png", url: "../bi/sellinkpi.html"},
  	        {name: "1", text: "sellout分析", img: "../../image/report.png", url: "../bi/selloutkpi.html"},
 	        // {name: "3", text: "经销商库存分析", img: "../../image/report.png", url: "../bi/distributor.html"},
 	        // {name: "4", text: "终端分析", img: "../../image/report.png", url: "../bi/customer.html"}
         ]},
         
         {name: "summaryReport", text: "汇总报表", img: "../../image/file.png", children: [
   	        {name: "1", text: "终端销售汇总", img: "../../image/report.png", url: "../bi/totalsales.html"}, 
  	        {name: "2", text: "一级经销商进销存", img: "../../image/report.png", url: "../bi/invoicingcomparisontotal.html"},
  	        {name: "3", text: "经销商库存汇总", img: "../../image/report.png", url: "../bi/inventorysum.html"},       
  	        {name: "4", text: "经销商账期", img: "../../image/report.png", url: "../bi/distributoraccount.html"},
  	        {name: "5", text: "非活跃客户统计", img: "../../image/report.png", url: "../bi/totalterminal.html"}, 
  	    ]},
         
        {name: "detailReport", text: "标准流向", img: "../../image/file.png", children: [
 	        {name: "1", text: "销售流向", img: "../../image/report.png", url: "../bi/sales.html"}, 
	        {name: "2", text: "采购流向", img: "../../image/report.png", url: "../bi/purchase.html"},
	        {name: "3", text: "库存流向", img: "../../image/report.png", url: "../bi/inventory.html"}       
	   ]}
    ],
    "大区总监": {},
    "主管": {},
    "商务经理": {},
    "销售": {},
    "经销商": {}
};