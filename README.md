# Basic-Shopping-Basket
Basic shopping basket(cart) web application using React.js and GraphQL + Apollo for tutorial

You can run the server using the following commands:
```
cd ./server/src
node ./index.js
```

You can run the web using the following commands:
```
cd ./web
npm start
```

You should run the server first, and then run the web.

Then, you will be able to see the web page on http://localhost:3000/

## Exercise 1

* 한 품목 당 선택/취소하는 것에서 수량을 정하는 방식으로 변경하기

## Exercise 2

* 오른쪽 상품 선택 요약 창에 다음 형식의 영수증 출력
```
상품 명 x n개 = m원
...
합계: x원
```
* 상품 선택 요약 창 맨 아래에 저장 버튼 추가
  * 저장 버튼 클릭 시, 현재 선택된 상품 정보가 서버로 전달됨
  * 서버로 전달된 내용 DB에 저장
  * DB에 저장된 내용은 다음 접속 시 사용됨 (즉, 재접속 시, 가장 최근에 저장한 내용이 보임)

주의사항: 과제1에 리뷰된 내용을 수정하여 PR승인을 받고 머지한 후에 과제 2에 대한 커밋을 진행해야 함

