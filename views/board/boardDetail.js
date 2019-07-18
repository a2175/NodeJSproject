<div class="board_view auto-center">
    <h3>글보기</h3>
    <div class="table">
        <div class="tr">
            <div class="lbl">작성자</div>
            <div class="desc"><?php echo $data->name?></div>
        </div>
        <div class="tr">
            <div class="lbl">제목</div>
            <div class="desc"><?php echo $data->subject?></div>
        </div>
        <div class="tr">
            <div class="lbl">내용</div>
            <div class="desc content"><?php echo nl2br($data->content)?></div>
        </div>
    </div>
    <div id="comment_list"></div>
    <div class="submit_comment">
        <span class="input">
            <div class="tr"><input type="text" id='name' placeholder="닉네임"></div>
            <div class="tr"><input type="password" id='pw' placeholder="비밀번호"></div>
        </span>
        <span class="desc"><textarea id="content" rows="5" placeholder="내용"></textarea></span>
        <div class="btn_group">
            <a class="btn-submit" id="submit" href="">등록</a>
        </div>
    </div>
    <div class="btn_group">
        <a class="btn-default" href="<?php echo $this->param->get_page?>">목록</a>
        <a class="btn-submit" href="<?php echo $this->param->get_page?>/update/<?php echo $this->param->idx?>">수정</a>
        <a class="btn-submit" href="<?php echo $this->param->get_page?>/delete/<?php echo $this->param->idx?>">삭제</a>
    </div>
</div>

<script type="text/javascript">
    fn_selectCommentList();

    document.getElementById("submit").addEventListener('click', function(e){
        e.preventDefault();
        fn_insertComment();
    });

    function fn_selectCommentList() {
        var comAjax = new ComAjax();
        comAjax.setUrl("<?php echo _URL."comment/view/".$this->param->idx?>");
        comAjax.setCallback("fn_selectCommentListCallback");
        comAjax.ajax();
    }

    function fn_selectCommentListCallback(data) {
        data = JSON.parse(data);
        var body = document.getElementById("comment_list");
        var str = "<h4>총 댓글 수 : " + data.totalCount + "</h4>";
        str += "<div class='table'>";
        for(var key in data.list) {
            str +=  "<div class='tr'>" +
                        "<div class='lbl'>" + data.list[key].name + "</div>" +
                        "<div class='desc'>" + data.list[key].content + "</div>" +
                        "<div class='date'>" + data.list[key].date + "</div>" +
                        "<div class='delete'>" + "<a href='#' id='opendel'><img src='<?php echo _IMG.'delete.jpg'?>'></a>" + "</div>" +
                        "<input type='hidden' id='idx' value=" + data.list[key].idx + ">" +
                    "</div>";
        };
        str += "</div>";
        body.innerHTML = str;

        for(i=0; i<body.querySelectorAll('#opendel').length; i++) {
            body.querySelectorAll('#opendel')[i].addEventListener('click', function(e){
                e.preventDefault();
                fn_openDeleteComment(this.parentElement);
            });
        }
    }

    function fn_checkComment() {
        var name = document.getElementById("name").value;
        var pw = document.getElementById("pw").value;
        var content = document.getElementById("content").value;

        if(name.length == 0) { alert("닉네임을 입력해주세요."); return false; }
        if(pw.length == 0) { alert("비밀번호를 입력해주세요."); return false; }
        if(content.length == 0) { alert("내용을 입력해주세요."); return false; }

        return true;
    }

    function fn_insertComment() {
        var name = document.getElementById("name").value;
        var pw = document.getElementById("pw").value;
        var content = document.getElementById("content").value;

        if(fn_checkComment()) {
            document.getElementById("name").value = '';
            document.getElementById("pw").value = '';
            document.getElementById("content").value = '';

            var comAjax = new ComAjax();
            comAjax.setUrl("<?php echo _URL."comment/write/{$this->param->idx}"?>");
            comAjax.setCallback('fn_selectCommentList');
            comAjax.addParam("request", "insert");
            comAjax.addParam("name", name);
            comAjax.addParam("pw", pw);
            comAjax.addParam("content", content);
            comAjax.ajax();
        }
    }

    function fn_openDeleteComment(obj) {
        if(document.getElementById("comment_list").querySelector(".btn_group") != null)
            document.getElementById("comment_list").querySelector(".btn_group").remove();

        var div = document.createElement("div");
        div.className = "btn_group";
        var str = "<input type='password' id='commentpw' placeholder='비밀번호'>" +
                  "<a id='commentdelete' class='btn-submit' href=''>확인</a>" +
                  "<a id='commentcencel' class='btn-submit' href=''>취소</a>";
        div.innerHTML = str;

        obj.parentElement.appendChild(div);

        document.querySelector("a[id='commentdelete']").addEventListener('click', function(e){
            e.preventDefault();
            fn_deleteComment(this);
        });

        document.querySelector("a[id='commentcencel']").addEventListener('click', function(e){
            e.preventDefault();
            fn_deleteCencel(this);
        });
    }

    function fn_deleteComment(obj) {
        var idx = obj.parentElement.parentElement.querySelector("#idx").value;
        var pw = obj.parentElement.querySelector("#commentpw").value;

        var comAjax = new ComAjax();
        comAjax.setUrl("<?php echo _URL."comment/delete/"?>"+idx);
        comAjax.setCallback("fn_deleteCommentCallback");
        comAjax.addParam("request", "delete");
        comAjax.addParam("pw", pw);
        comAjax.ajax();
    }

    function fn_deleteCommentCallback(data) {
        if(data == 1) {
            alert("완료되었습니다.");
            fn_selectCommentList();
        }
        else {
            alert("비밀번호가 일치하지 않습니다.");
        }
    }

    function fn_deleteCencel(obj) {
        obj.parentElement.remove();
    }
</script>
