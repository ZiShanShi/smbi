
function randomData(length, multiple, fixed) {
    if (!length) {
        length = 1;
    }
    if (!multiple) {
        multiple = 1;
    }
    if (!fixed) {
        fixed = 0;
    }
    if (length == 1) {
        return getOneRandom(multiple, fixed);
    }
    var data = [];
    for (var i = 0; i < length; i++) {
        data[i] = getOneRandom(multiple, fixed);
    }
    return data;
}

function getOneRandom(multiple, fixed) {
    return parseFloat((Math.random() * multiple).toFixed(fixed));
}

function changeDivtext(ele, text) {
    $("#" + ele).text(text);
}

function changeOption(option, key, value) {

    var keys = key.split(";");
    for (var i = 0; i < keys.length - 1; i++) {
        var onekey = keys[i];

        if (onekey.indexOf("[") != -1 && onekey.indexOf("]") != -1) {
            var onekeys = onekey.split("[");
            var num = onekeys[1].split("]")[0];
            var suboption = option[onekeys[0]][num];
            if(!suboption) {
                suboption = {};

            }
            option =suboption;

            continue;
        }
        option = option[keys[i]];
    }
    var endkey = keys[keys.length - 1];
    var idx = endkey.indexOf(".");
    if(idx != -1) {
        var prekey = endkey.substring(0, idx);
        var endkey = endkey.substring(idx, endkey.length);

        if (value instanceof Array) {
            for(var i = 0; i <value.length; i++) {
                var one = option[prekey][i];
                one[endkey] = value[i];
            }
        }

    }else {
        option[endkey] = value;
    }

}

function clone(obj) {
	var result,oClass=isClass(obj);
    //确定result的类型
	if(oClass==="Object"){
	    result={};
	}else if(oClass==="Array"){
	    result=[];
	}else{
	    return obj;
	}
	for(var key in obj){
	    var copy=obj[key];
	    if(isClass(copy)=="Object"){
	        result[key]=arguments.callee(copy);//递归调用
	    }else if(isClass(copy)=="Array"){
	        result[key]=arguments.callee(copy);
	    }else{
	        result[key]=obj[key];
	    }
	}
	return result;
};

function isClass(o){
    if(o===null) return "Null";
    if(o===undefined) return "Undefined";
    return Object.prototype.toString.call(o).slice(8,-1);
}

function changetab(url, groupId, itemId) {
    self.parent.document.getElementById("content").src = url;
    
    if(typeof(groupId)=="undefined" || typeof(itemId)=="undefined") {
    	return;
    }
    
    var leftMenu = $("#leftMenu");
    if (leftMenu.length ==0) {
    	leftMenu = $("#leftMenu",window.parent.document);
	}
    var preGroupIndex = leftMenu.attr("groupIndex");
	var preItemIndex = leftMenu.attr("itemIndex");
	if(typeof(preGroupIndex)=="undefined" || typeof(preItemIndex)=="undefined") {
		preGroupIndex = -1;
    }
	toggleClickClass(preGroupIndex, preItemIndex);
	
	leftMenu.attr("groupIndex", groupId);
	leftMenu.attr("itemIndex", itemId);
    toggleClickClass(groupId, itemId);
}

function toggleClickClass(groupIndex, itemIndex){
		//group -1  首页    group  从0开始  item从1开始
		var leftMenu = $("#leftMenu");
		if (leftMenu.length ==0) {
	    	leftMenu = $("#leftMenu",window.parent.document);
		}
		var targetEle;
		if(typeof(groupIndex)=="undefined" || groupIndex == -1) {
			targetEle = leftMenu.children()[0];
		}
		else {
			var groupele;
			if($(".gm_group").length == 0) {
				groupele = $(".gm_group", window.parent.document);
			}
			else{
				groupele = $(".gm_group");
			}
			targetEle = $(groupele[groupIndex]).children()[itemIndex];
		}
		
	$(targetEle).toggleClass("cilcked");      		
}

function resizeChart() {
	var resizeTimer = null; 
	if (resizeTimer) clearTimeout(resizeTimer);
	 
	resizeTimer = setTimeout(function () {
		var canvas = $("canvas");
			
		for(var i = 0; i <canvas.length; i++) {
			var onecanvas = $(canvas.get(i));
			var chartid = onecanvas.parent().parent().attr("id");
			onechart = echarts.getInstanceByDom(document.getElementById(chartid));
			var opt = onechart.getOption();
			onechart.resize();
		}
	}, 300);
}


function formatterOneMoney(money) {
	  if(money && money!=null){
	        money = String(money);
	        var left=money.split('.')[0],right=money.split('.')[1];
	        right = right ? (right.length>=2 ? '.'+right.substr(0,2) : '.'+right+'0') : '.00';
	        var temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
	        return (Number(money)<0?"-":"") + temp.join(',').split('').reverse().join('')+right;
	    }else if(money===0){   //注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
	        return '0.00';
	    }else{
	        return "";
	    }

}
function unformatterOneMoney(money) {
	if(money && money!=null){
		money = String(money);
		var group = money.split('.');
		var left = group[0].split(',').join('');
		return Number(left+"."+group[1]);
	}else{
        return "";
	}
}


function showMask() {
    $("#mask").css("height", $(document).height());
    $("#mask").css("width", $(document).width());
    $("#mask").show();
}
//隐藏遮罩层
function hideMask() {
    $("#mask").hide();
}


function initDateime(type) {
	if('start' == type) {
		//1. set begin date, default this month begin
		var starttime = FilterArea.getItem('startDate').input.val();
		if (starttime == "") {
			var datetime = new DateTime();
			datetime.toFormerMonth();
			starttime = datetime.str;
			FilterArea.getItem('startDate').input.val(starttime);
		}
	}
	if('end' == type) {
		//2. set end date, default now
		var endtime = FilterArea.getItem('endDate').input.val();
		if (endtime == "") {
			var datetime = new DateTime();
			endtime = datetime.str;
			FilterArea.getItem('endDate').input.val(endtime);
		}	
	}
			
}

function statusToText(status) {
	if (status == "getData") {
		return "正在获取数据。。。";
	}
	else if (status == "fileCreated") {
		return "正在生成文件。。。";
	}
	else if (status == "downloading") {
		return "文件已生成，请点击下载！";
	}
	else if (status == "error") {
		return "下载失败，请稍后重试！";
	}
	else {
		return "正在准备获取数据";
	}
}

function stopScroll(exportTimer){
    window.clearInterval(exportTimer);
}

function initPeroidMonth() {
    var year = getLocalData("year");
    if(!year) {
        var lastdate = getLocalData("lastdate");
        if(!lastdate) {
            var geted = false;
            var timeout = setInterval(function () {
                if(geted) {
                    lastdate = new Date(lastdate);
                    year = lastdate.getFullYear();
                    setLocalData("year", year);
                    $("#year").val(year);
                    $("#year").multiselect("refresh");
                    clearInterval(timeout);
                    initPeroidOther();
                }
                lastdate = getLocalData("lastdate");
                if(lastdate) {
                    geted = true;
                }
            }, 500)
        }else {
            lastdate = new Date(lastdate);
            year = lastdate.getFullYear();
            setLocalData("year", year);
            $("#year").val(year);
            $("#year").multiselect("refresh");
            initPeroidOther();
        }

    }else {
        existAdd("year");
        initPeroidOther();
	}
}

function initPeroidOther() {
    existAdd("brand");

    existAdd("quarter");
    var quarter = getLocalData("quarter");
    var monthselect = $("#month");
    monthselect.empty();

    var start = (quarter - 1) <0? 0 : (quarter - 1);
    for(var i = start*3; i < quarter*3; i++) {

        var opt = $('<option />', {
            value: i + 1,
            text: i + 1
        });
        opt.appendTo(monthselect);

    }
    monthselect.multiselect('refresh');
    existAdd("month");
    refreshChart(chartRefresh);

}

function existAdd(code) {
    var val = getLocalData(code);
    var ele = $("#" + code);
    if(!val) {
        return;
    }
    val = val+"";
    var multipleval = val.split(";");
    var widget = ele.multiselect("widget");

    if(multipleval.length > 1) {
        for(var i = 0; i < multipleval.length; i++) {
            var one = multipleval[i];
            var chedked = $("input[value="+one+"]", widget);
            chedked.attr("checked", true);
            chedked.attr("selected", true);
            chedked.attr("aria-selected",true);
        }
        //ele.multiselect().val(multipleval);
    }else {
        var chedked = $("input[value="+multipleval+"]", widget);
        chedked.attr("checked", true);
        chedked.attr("selected", true);
        chedked.attr("aria-selected",true);
        //ele.multiselect().val(val);
    }

    var inputs = $("input", widget);
    var check = inputs.filter(':checked');
    ele.multiselect("update");
    //ele.multiselect("refresh");
    //refreshChart(chartRefresh);

}

function initCommonMutiSelect() {
    $("#brand").multiselect({
        selectedList: 4,
        multiple:true,
        header:true,
        close:function(event, ui){

            var brands = getMutiInputData("brand");
            var preBrands = getLocalData("brand");
            if(preBrands == brands) {
                return;
            }
            setLocalData("brand", brands);

            refreshChart(chartRefresh);
        }
    });
    $("#year").multiselect({
        click:function(event, ui){
            var brands = ui.value;
            var preBrands = getLocalData("year");
            if(preBrands == brands) {
                return;
            }
            setLocalData("year", brands);
            refreshChart(chartRefresh);
        }
	});
    $("#quarter").multiselect({
        selectedList: 4,
        multiple:true,
        header:true,
        close:function(event, ui){
            var quarter = getMutiInputData("quarter");
            var preBrands = getLocalData("quarter");
            if(preBrands == quarter) {
                return;
            }
            setLocalData("quarter", quarter);
            if("all" == quarter.toLowerCase()) {

                var monthselect = $("#month");
                monthselect.empty();

                for(var i = 0; i < 12; i++) {

                    var opt = $('<option />', {
                        value: i + 1,
                        text: i + 1
                    });
                    opt.appendTo(monthselect);

                }
                monthselect.multiselect('refresh');
                setLocalData("month", quarter);
            }else {
                var monthselect = $("#month");
                monthselect.empty();

                var quarters = quarter.split(";");
                for(var j = 0; j< quarters.length; j++) {
                    var one = quarters[j];
                    var start = (one - 1) <0? 0 : (one - 1);
                    for(var i = start*3; i < one*3; i++) {

                        var opt = $('<option />', {
                            value: i + 1,
                            text: i + 1
                        });
                        opt.appendTo(monthselect);

                    }
                }

                monthselect.multiselect('refresh');
                monthselect.multiselect("uncheckAll");
            }
            refreshChart(chartRefresh);
        }
    });
    $("#month").multiselect({
        selectedList: 4,
        multiple:true,
        header:true,
        close:function(event, ui){
            var month = getMutiInputData("month");
            var preBrands = getLocalData("month");
            if(preBrands == month) {
                return;
            }
            setLocalData("month", month);
            refreshChart(chartRefresh);
        }
	});

    $("#brand").multiselect("uncheckAll");
    $("#quarter").multiselect("uncheckAll");
    $("#month").multiselect("uncheckAll");

}

function getHeaderFilter(filters) {
    var filter = getCommonFilter();

    if(!filters) {
        return filter;
    }

    var filterArray = filters.split(";");
    filterArray.map(function (one) {
        var onefilter = getMutiInputData(one);
        var subOneFilter =  getMutiFilter(one, onefilter);
        filter += " and (" + subOneFilter + ")";
    });

    return filter;
}

function getCommonFilter() {
    var year = $($("#year").multiselect("getChecked")[0]).val();

    var quarter = getMutiInputData("quarter");
    var month = getMutiInputData("month");
    var brands = getMutiInputData("brand");

    var filter = "year=" + year;
    if (quarter.length > 0) {
        var subMutiFilter = getMutiFilter("quarter", quarter);
        filter += " and " + subMutiFilter;
    }

    if (month.length > 0) {
        var subMutiFilter = getMutiFilter("month", month);
        filter += " and " + subMutiFilter;
    }
    if(brands.length > 0) {
        var subMutiFilter = getMutiFilter("brand", brands);
        filter += " and " + subMutiFilter;
    }
    return filter;
}

function getMutiFilter(field, rawdata, type) {

    var datas = rawdata.split(";");
    var result = datas.map(function(one) {
        if(one instanceof  Number) {
            return field + " = " + one;
        }else {
            return field + " = '" + one + "'";
        }

    }).join(' or ');

    return result;
}

function resetChartData(one) {

    var filter = getHeaderFilter();
    var user = getLocalData("user");
    if(!user) {
        return;
    }

    /**
     * e.g.  one{
			 * 			id: chartid
			 * 			topicCode: achieve,Sale,inventory
			 * 			fields: field(tipic)
			 * 		    type: total roxilid
			 * 		    dataname:dataname
			 * 		    datatype:sellin,sellout,
			 * 		    filter: special filter id
			 * 			elementMap:{
			 * 				0: sum
			 * 				1: target
			 * 				sumid: sum
			 * 			},
			 *
			 * 		}
     */
    var eleId = one.id;
    var topicCode = one.topicCode;
    var fields = one.fields;
    var map = one.elementMap;
    var type = one.type;
    var dataType = one.dataType;
    var dataname = one.dataname;
    var onefilter = one.filter;
    var aggcode = one.aggcode;
    var chartInstance = echarts.getInstanceByDom(document.getElementById(eleId));
    var option = chartInstance.getOption();
    var params = "code=" + topicCode + "&userType="+user.type + "&userId=" + user.name;

    if (fields) {
        params += "&fields=" + fields;
    }
    if (aggcode) {
        params += "&aggcode=" + aggcode;
    }
    if(type) {
        params += "&type=" + type;
    }
    if(dataType) {
        params += "&dataType=" + dataType;
    }
    if(dataname) {
        params += "&dataName=" + dataname;
    }
    if (onefilter) {
        filter += onefilter;
    }

    if(filter) {
        params += "&filter=" + filter;
    }

    chartInstance.showLoading('default', {text:'获取中..'});
    Server.call("root/bi/data", params, function (result) {
        for (var one in map){
            var val = map[one];
            var top = one.substring(0, 1);
            if("#" == top) {
                $(one).html(formatterOneMoney(result[val]));
            }
            else {
                changeOption(option, one, result[val]);
            }

        }

        chartInstance.setOption(option);
        chartInstance.hideLoading();
    });
}

function refreshChart(callback) {
    if (typeof callback === "function") {
        callback();
    }
}

function getMutiInputData(id) {
    var inputs = $("#" + id).multiselect("getChecked");
    var checkedResult = inputs.filter(':checked');
    var result = checkedResult.map(function() {
        var val = $(this).val();
        return val;
    }).get().join(';');

    return result;
}

