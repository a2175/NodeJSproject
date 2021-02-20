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

function ComSubmit(form) {
    var newForm;

    if(form) {
        newForm = form;
    }
    else {
        newForm = document.createElement('form');
        document.body.appendChild(newForm);
    }
    
    this.setUrl = function setUrl(url){
        newForm.action = url;
    };

    this.setMethod = function setMethod(method){
        newForm.method = method;
    };

    this.addParam = function addParam(key, value){
        var input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        newForm.appendChild(input);
    };

    this.submit = function submit(){
        newForm.submit();
    };
}

function ComAjax(form){
    var formData = new FormData(form);
    var formUrl = "";
    var formMethod = "POST";
    var fv_ajaxCallback = "";

    this.setUrl = function setUrl(url){
        formUrl = url;
    };

    this.setMethod = function setMethod(method){
        formMethod = method.toUpperCase();
    };

    this.setCallback = function setCallback(callBack){
        fv_ajaxCallback = callBack;
    };

    this.addParam = function addParam(key, value){
        formData.append(key, value);
    };

    this.ajax = function ajax(){
        // GET
        if(formMethod == "GET") {
            formUrl = formUrl + "?" + new URLSearchParams(formData).toString();
            formData = null;
        }
        // POST & PUT & DELETE
        else {
            var object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });
            formData = JSON.stringify(object);
        }
   
        fetch(formUrl, {
            method: formMethod,
            body: formData,
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
function gfn_renderPaging(params){
    var divId = params.divId; //페이징이 그려질 div id
    var totalCount = params.totalCount; //전체 조회 건수
    var currentIndex = params.pageIndex; //현재 위치
    var gfv_eventName = params.eventName;
    var gfv_keyword = params.keyword;

    if(gfn_isNull(currentIndex) == true){
        currentIndex = 1;
    }

    var recordCount = params.recordCount; //페이지당 레코드 수
    if(gfn_isNull(recordCount) == true){
        recordCount = 15;
    }

    var totalIndexCount = Math.ceil(totalCount / recordCount); // 전체 인덱스 수

    var first = (parseInt((currentIndex-1) / 10) * 10) + 1;
    var last = (parseInt(totalIndexCount/10) < currentIndex/10) ? totalIndexCount%10 : 10;
    var prev = (parseInt((currentIndex-1)/10)*10) - 9 > 0 ? (parseInt((currentIndex-1)/10)*10) - 9 : 1;
    var next = (parseInt((currentIndex-1)/10)+1) * 10 + 1 < totalIndexCount ? (parseInt((currentIndex-1)/10)+1) * 10 + 1 : totalIndexCount;

    if(totalIndexCount > 10){ //전체 인덱스가 10이 넘을 경우, 맨앞, 앞 태그 작성
        var firstLink = getLinkElement("[<<]");
        var prevLink = getLinkElement("[<]");

        firstLink.addEventListener('click', function(e){
            e.preventDefault();
            movePage(1, gfv_eventName, gfv_keyword);
        });
        prevLink.addEventListener('click', function(e){
            e.preventDefault();
            movePage(prev, gfv_eventName, gfv_keyword);
        });

        document.getElementById(divId).appendChild(firstLink);
        document.getElementById(divId).appendChild(prevLink);
    }
    else if(totalIndexCount <=10 && totalIndexCount > 1){ //전체 인덱스가 10보다 작을경우, 맨앞 태그 작성
        var firstLink = getLinkElement("[<<]");
        firstLink.addEventListener('click', function(e){
            e.preventDefault();
            movePage(1, gfv_eventName, gfv_keyword);
        });

        document.getElementById(divId).appendChild(firstLink);
    }

    for(var i=first; i<(first+last); i++){
        var link = getLinkElement(i);
        (function(index){
            link.addEventListener('click', function(e){
                e.preventDefault();
                movePage(index, gfv_eventName, gfv_keyword);
            });
        }(i));

        if(i != currentIndex){
            document.getElementById(divId).appendChild(link);
        }
        else{
            var b = document.createElement("b");
            b.appendChild(link);
            document.getElementById(divId).appendChild(b);
        }
    }

    if(totalIndexCount > 10){ //전체 인덱스가 10이 넘을 경우, 맨뒤, 뒤 태그 작성
        var postLink = getLinkElement("[>]");
        var endLink = getLinkElement("[>>]");

        postLink.addEventListener('click', function(e){
            e.preventDefault();
            movePage(next, gfv_eventName, gfv_keyword);
        });
        endLink.addEventListener('click', function(e){
            e.preventDefault();
            movePage(totalIndexCount, gfv_eventName, gfv_keyword);
        });

        document.getElementById(divId).appendChild(postLink);
        document.getElementById(divId).appendChild(endLink);
    }
    else if(totalIndexCount <=10 && totalIndexCount > 1){ //전체 인덱스가 10보다 작을경우, 맨뒤 태그 작성
        var endLink = getLinkElement("[>>]");
        endLink.addEventListener('click', function(e){
            e.preventDefault();
            movePage(totalIndexCount, gfv_eventName, gfv_keyword);
        });

        document.getElementById(divId).appendChild(endLink);
    }

    function getLinkElement(textContent){
        var link = document.createElement("a");
        link.href = "#this";
        link.className = "pad_5";
        link.textContent = textContent;
    
        return link;
    }
    
    function movePage(value, gfv_eventName, gfv_keyword){
        var comSubmit = new ComSubmit();
        comSubmit.setUrl(gfv_eventName);
        comSubmit.setMethod("GET");
        comSubmit.addParam("page", value);
        if(!gfn_isNull(gfv_keyword)) comSubmit.addParam("keyword", gfv_keyword);
        comSubmit.submit();
    }
}