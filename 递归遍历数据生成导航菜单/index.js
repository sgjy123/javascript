var arrNews = []; // 存放一级目录，用于之后的遍历
var arrSurplus = []; // 剩余数组
$(function() {
	var ColumnList = [{
		"fileparam": "tzgg",
		"filename": "列表模板",
		"name": "通知公告",
		"fileurl": "sysTemplate/webList.jsp",
		"id": 146,
		"type": 15,
		"parentid": 0
	}, {
		"fileparam": "gzdt",
		"filename": "列表模板",
		"name": "降费提效活动",
		"fileurl": "sysTemplate/webList.jsp",
		"id": 147,
		"type": 15,
		"parentid": 0
	}, {
		"fileparam": "flfg",
		"filename": "列表模板",
		"name": "法律法规",
		"fileurl": "sysTemplate/webList.jsp",
		"id": 148,
		"type": 15,
		"parentid": 0
	}, {
		"fileparam": "tpxw",
		"filename": "列表模板",
		"name": "图片新闻",
		"fileurl": "sysTemplate/webList.jsp",
		"id": 149,
		"type": 18,
		"parentid": 0
	}, {
		"fileparam": "12",
		"filename": "信息详情模板",
		"name": "12",
		"fileurl": "sysTemplate/webDetail.jsp",
		"id": 150,
		"type": 15,
		"parentid": 146
	}, {
		"fileparam": "12",
		"filename": "信息详情模板",
		"name": "12",
		"fileurl": "sysTemplate/webDetail.jsp",
		"id": 250,
		"type": 15,
		"parentid": 146
	}, {
		"fileparam": "12",
		"filename": "信息详情模板",
		"name": "12",
		"fileurl": "sysTemplate/webDetail.jsp",
		"id": 160,
		"type": 15,
		"parentid": 150
	}, {
		"fileparam": "12",
		"filename": "信息详情模板",
		"name": "12",
		"fileurl": "sysTemplate/webDetail.jsp",
		"id": 170,
		"type": 15,
		"parentid": 160
	}, {
		"fileparam": "12",
		"filename": "信息详情模板",
		"name": "12",
		"fileurl": "sysTemplate/webDetail.jsp",
		"id": 180,
		"type": 15,
		"parentid": 149
	}, {
		"fileparam": "12",
		"filename": "信息详情模板",
		"name": "12",
		"fileurl": "sysTemplate/webDetail.jsp",
		"id": 190,
		"type": 15,
		"parentid": 180
	}]
	for (var i = 0, l = ColumnList.length; i < l; i++) {
		if (ColumnList[i]['parentid'] == 0) {
			arrNews.push(ColumnList[i]);
		} else {
			arrSurplus.push(ColumnList[i]);
		}
	}
	var arrFeach = eachChild(arrNews, arrSurplus);
	var htmlDom = '<ul id="left-nav-ul">'+ eachDom(arrFeach) + '</ul>';
	$("#content").html(htmlDom);
	$("#left-nav-ul > li").on('click',function(){
		$("#left-nav-ul > li").removeClass("active");
		$(this).addClass("active");
	});
	$(".left-nav-child-ul > li").on('click',function(){
		$(".left-nav-child-ul > li").removeClass("active");
		$(this).addClass("active");
	});
});

function eachChild(news, surplus) {
	var arrNews = news;
	var arrSurplus = surplus;
	for (var j = 0, jl = arrNews.length; j < jl; j++) {
		if (arrSurplus.length == 0) {
			break;
		}
		var childArr = [];
		for (var k = 0, kl = arrSurplus.length; k < kl; k++) {
			if (arrSurplus[k]['parentid'] == arrNews[j]['id']) {
				childArr.push(arrSurplus[k]);
			}

		}
		if (childArr.length > 0) {
			arrNews[j]['child'] = childArr;
		}
		for (var t = 0, tl = childArr.length; t < tl; t++) {
			for (var k = 0, kl = arrSurplus.length; k < kl; k++) {
				if (childArr[t]['id'] == arrSurplus[k]['id']) {
					arrSurplus.splice(k, 1);
					break;
				}
			}
		}
		if (arrNews[j].hasOwnProperty("child")) {
			eachChild(arrNews[j]['child'], arrSurplus);
		}
	}
	return arrNews;
}

function eachDom(arrFeach) {
	var domHtml = '';
	arrFeach.forEach(function(v,i) {
		if (v.hasOwnProperty("child")) {
			domHtml += '<li><a href="javascript:;">'+ v['name'] +'</a><ul class="left-nav-child-ul">' + eachDom(v['child']) + '</ul></li>';
		} else {
			domHtml += '<li><a href="javascript:;">'+ v['name'] +'</a></li>';
		}
	})
	return domHtml;
}
