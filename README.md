# ASOproject

** 프로젝트 변경사항 기록  from yunji-branch  
  
2022년 11월 11일 금  
  
[ commit : user 모델 정의 ]    
- mongoose 모듈 설치  
- schemas 폴더 생성 후 index.js 파일에 몽구스 환경 설정  
- user.js 파일 생성 후 스키마 정의 완료 (jwt 인증 구현 완료되면 받을 정보 논의해서 추가 예정)  
- app.js 에 몽고디비 연결 + .env 불러옴  
  
[ commit : 이미지 파일 받아오기 구현 using multer ]  
- multer 모듈 설치  
- uploads 파일 생성 (여기에 받은 이미지 파일 저장)  
- POST  /user  : 이미지를 포함한 폼 정보 받는 API 구현  
  
[ commit : 이미지 경로 포함 유저 정보 받아오기 구현 ]
- 디비에서 유저 정보 받아옴
- params로 뭘 받아야 할 지 아직 미정
- 팀원 분들과 의논 필요
  
2022 11월 16일 수  

[ commit : 이미지 업로드 미들웨어 ]  
- 대표 프로필 이미지 1개 설정 가능  
- 최대 5장 프로필 설정 가능  
  
[ commit : ]  
