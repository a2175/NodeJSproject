Node.js + Express + Pug + Socket.io + MySQL
==============================
RESTful 기반의 Express + Pug를 사용한 간단한 CRUD 게시판과
Socket.io를 사용한 실시간 채팅 프로젝트입니다.

#version = 2.14v

[NodeJSproject 2.14v]
1. 파일 업로드 기능 추가
2. Route 경로 전역변수로 선언

[NodeJSproject 2.13v]
1. RESTful API 규칙에 가깝게 코드 수정
2. common.js(ComSubmit, ComAjax, movePage) 수정

[NodeJSproject 2.12v]
1. boardDetail.pug, chat.pug, common.js에서 innerHTML 사용을 createElement(), appendChild()로 대체
2. common.js의 메소드명 수정, 페이징 랜더 메소드에 사용하는 getLinkElement 메소드 추가

[NodeJSproject 2.11v]
1. 게시글 불러오기 url path 수정

[NodeJSproject 2.10v]
1. MVC 구조로 변경
2. 게시글 수정, 삭제 js 수정
3. redirect.pug 삭제

[NodeJSproject 2.03v]
1. URL 수정

[NodeJSproject 2.02v]
1. RESTful URL 규칙에 맞게 수정

[NodeJSproject 2.01v]
1. 게시물 수정 코드 수정

[NodeJSproject 2.00v]
1. RESTful 구조로 변경

[NodeJSproject 1.91v]
1. 채팅 코드 수정

[NodeJSproject 1.90v]
1. 채팅에 socket.io를 사용하도록 변경

[NodeJSproject 1.81v]
1. 데이터베이스 불필요한 코드 수정

[NodeJSproject 1.80v]
1. 게시글 댓글 등록 구축
2. 게시글 댓글 삭제 구축

[NodeJSproject 1.70v]
1. 데이터베이스 비동기 처리를 위해 MVC 구조에서 다른 구조로 변경 (route에서 일괄 처리)

[NodeJSproject 1.60v]
1. 게시글 검색기능 구축

[NodeJSproject 1.51v]
1. 불필요한 코드 수정

[NodeJSproject 1.50v]
1. 게시판 페이징 구축

[NodeJSproject 1.40v]
1. 채팅 구축

[NodeJSproject 1.30v]
1. 게시글 수정 구축
2. 게시글 삭제 구축

[NodeJSproject 1.20v]
1. 게시글 상세보기 구축
2. 게시글 등록 구축

[NodeJSproject 1.10v]
1. 게시판 글 목록보기 구축
2. view 경로 변경
3. Pug module 사용

[NodeJSproject 1.00v]
1. 메인페이지 구축
