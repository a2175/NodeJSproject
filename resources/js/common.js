function gfn_isNull(str) {
    if (str == null) return true;
    if (str == "NaN") return true;
    if (new String(str).valueOf() == "undefined") return true;
    var chkStr = new String(str);
    if( chkStr.valueOf() == "undefined" ) return true;
    if (chkStr == null) return true;
    if (chkStr.toString().length == 0 ) return true;
    return false;
}

function ComSubmit(opt_formId) {
    var formId = gfn_isNull(opt_formId) == true ? "commonForm" : opt_formId;
    var formUrl = "";
    var formMethod = "post";

    if(formId == "commonForm"){
        document.getElementById("commonForm").innerHTML = "";
    }

    this.setUrl = function setUrl(url){
        formUrl = url;
    };

    this.setMethod = function setMethod(method){
        formMethod = method;
    };

    this.addParam = function addParam(key, value){
        var input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        document.getElementById(formId).appendChild(input);
    };

    this.submit = function submit(){
        var frm = document.getElementById(formId);
        frm.action = formUrl;
        frm.method = formMethod;
        frm.submit();
    };
}

function ComAjax(form){
    var formData = new FormData(form);
    var formUrl = "";
    var fv_ajaxCallback = "";

    this.setUrl = function setUrl(url){
        formUrl = url;
    };

    this.setCallback = function setCallback(callBack){
        fv_ajaxCallback = callBack;
    };

    this.addParam = function addParam(key, value){
        formData.append(key, value);
    };

    this.ajax = function ajax(){
        var object = {};
        formData.forEach(function(value, key){
            object[key] = value;
        });
        fetch(formUrl, {
            method: "POST",
            body: JSON.stringify(object),
            headers: {
                'content-type': "application/json"
            }
        }).then(data => data.text())
          .then(eval(fv_ajaxCallback));
    };
}

/*
divId : 페이징 태그가 그려질 div
pageIndx : 현재 페이지 위치가 저장될 input 태그 id
recordCount : 페이지당 레코드 수
totalCount : 전체 조회 건수
eventName : 페이징 하단의 숫자 등의 버튼이 클릭되었을 때 호출될 함수 이름
*/
var gfv_eventName = null;
var gfv_keyword = null;
function gfn_renderPaging(params){
    var divId = params.divId; //페이징이 그려질 div id
    var totalCount = params.totalCount; //전체 조회 건수
    var currentIndex = params.pageIndex; //현재 위치
    gfv_eventName = params.eventName;
    gfv_keyword = params.keyword;

    if(gfn_isNull(currentIndex) == true){
        currentIndex = 1;
    }

    var recordCount = params.recordCount; //페이지당 레코드 수
    if(gfn_isNull(recordCount) == true){
        recordCount = 15;
    }

    var totalIndexCount = Math.ceil(totalCount / recordCount); // 전체 인덱스 수

    var preStr = "";
    var postStr = "";
    var str = "";

    var first = (parseInt((currentIndex-1) / 10) * 10) + 1;
    var last = (parseInt(totalIndexCount/10) < currentIndex/10) ? totalIndexCount%10 : 10;
    var prev = (parseInt((currentIndex-1)/10)*10) - 9 > 0 ? (parseInt((currentIndex-1)/10)*10) - 9 : 1;
    var next = (parseInt((currentIndex-1)/10)+1) * 10 + 1 < totalIndexCount ? (parseInt((currentIndex-1)/10)+1) * 10 + 1 : totalIndexCount;

    if(totalIndexCount > 10){ //전체 인덱스가 10이 넘을 경우, 맨앞, 앞 태그 작성
        preStr += "<a href='#this' class='pad_5' onclick='_movePage(1)'>[<<]</a>" +
                "<a href='#this' class='pad_5' onclick='_movePage("+prev+")'>[<]</a>";
    }
    else if(totalIndexCount <=10 && totalIndexCount > 1){ //전체 인덱스가 10보다 작을경우, 맨앞 태그 작성
        preStr += "<a href='#this' class='pad_5' onclick='_movePage(1)'>[<<]</a>";
    }

    if(totalIndexCount > 10){ //전체 인덱스가 10이 넘을 경우, 맨뒤, 뒤 태그 작성
        postStr += "<a href='#this' class='pad_5' onclick='_movePage("+next+")'>[>]</a>" +
                    "<a href='#this' class='pad_5' onclick='_movePage("+totalIndexCount+")'>[>>]</a>";
    }
    else if(totalIndexCount <=10 && totalIndexCount > 1){ //전체 인덱스가 10보다 작을경우, 맨뒤 태그 작성
        postStr += "<a href='#this' class='pad_5' onclick='_movePage("+totalIndexCount+")'>[>>]</a>";
    }

    for(var i=first; i<(first+last); i++){
        if(i != currentIndex){
            str += "<a href='#this' class='pad_5' onclick='_movePage("+i+")'>"+i+"</a>";
        }
        else{
            str += "<b><a href='#this' class='pad_5' onclick='_movePage("+i+")'>"+i+"</a></b>";
        }
    }
    document.getElementById(divId).innerHTML = preStr + str + postStr;
}

function _movePage(value){
    if(gfn_isNull(gfv_keyword)) {
        location.href = gfv_eventName+value;
    }
    else {
        location.href = gfv_eventName+value+"/"+gfv_keyword;
    }
}
