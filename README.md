# 환승시민

![로고오](https://user-images.githubusercontent.com/113084907/207002677-d4828de8-61cd-43ca-950f-2d636a13e115.jpg)
> **지하철 매칭 서비스** 🧑🏿‍🎤🧑‍🎤<br/><br/>
> **개발기간: 2022.11.04 ~ 2022.12.16**

<br/>

## [🚉 환승시민 노션 보러가기 ](https://www.notion.so/7899ad12f6a44190bef2aa4b53be9614)

## ⭐️ 프로젝트 소개

환승시민은?

**지하철에서 서로를 이어주는 공간** 입니다.

🤦짧은 시간안에 이루어지는 인연, 인생은 타이밍, 옷깃도 스치면 인연 등등🤩
 
🍀요즘 지하철이나 다른 대중교통을 이용하면 다들 각자 핸드폰만 보고 주변 사람들을 잘 살피지않습니다.
<br>이러한 개인주의 사회에 공동체 결속감을 강화시키고자 대면은 아니지만 주변 사람들에게 관심을 가질 수 있는 기회를 제공하고자합니다.
<br>다른 사람들에게 관심을 가지며 다양한 생각, 가치관, 정보, 재미를 공유할 수 있는 기회가 될 것입니다.🍀

💌최종적으로 **지하철 출.퇴근, 혹은 이동하는 시간 동안 사람들에게 즐거움을 선사하는 것**이 저희 팀의 목표입니다.💌

<br/>

## 🎼 🎵 환승시민 Team 🎶 🎹


 
---
백엔드 팀  `BE`  
|팀내 포지션| 이름 | 깃허브 | 담당기능 |
|--------|-------|------|-------|
|리더|안태환|https://github.com/nowhereim| 깃허브액션 , 소셜로그인 ,<br>  매칭 & 채팅 ,<br> AWS,  부하테스트 |
|팀원|오윤지|https://github.com/doodlerrr| 문자인증서비스, 회원가입, 유저프로필,<br> 이미지처리 |
|팀원|성용환|https://github.com/tlptop| 일반로그인 |


프론트엔드 팀 `FE`
|팀내 포지션| 이름 | 깃허브 |
|--------|-------|------|
|부리더|김재우 |https://github.com/wyswhsl21|
|팀원 |남해리|https://github.com/NSunR|
|팀원 |이상현|https://github.com/shlee1027|
<br/>

## ⚙️ 개발환경 및 라이브러리

<div> 

<img alt="Amazon S3" src ="https://img.shields.io/badge/Amazon S3-569A31.svg?&style=for-the-badge&logo=Amazon S3&logoColor=white"/> <img alt="MongoDB" src ="https://img.shields.io/badge/MongoDB-47A248.svg?&style=for-the-badge&logo=MongoDB&logoColor=white"/> 
<img alt="Amazon AWS" src ="https://img.shields.io/badge/Amazon AWS-232F3E.svg?&style=for-the-badge&logo=Amazon AWS&logoColor=white"/>
<img alt="Passport" src ="https://img.shields.io/badge/Passport-34E27A.svg?&style=for-the-badge&logo=Passport&logoColor=white"/>
<img alt="NGINX" src ="https://img.shields.io/badge/NGINX-009639.svg?&style=for-the-badge&logo=NGINX&logoColor=white"/>
<img alt="Redis" src ="https://img.shields.io/badge/Redis-DC382D.svg?&style=for-the-badge&logo=Redis&logoColor=white"/>
<img alt="Apache JMeter" src ="https://img.shields.io/badge/Apache JMeter-D22128.svg?&style=for-the-badge&logo=Apache JMeter&logoColor=white"/>

<img alt="PM2" src ="https://img.shields.io/badge/PM2-2B037A.svg?&style=for-the-badge&logo=PM2&logoColor=white"/> <img alt="Node.js" src ="https://img.shields.io/badge/Node.js-339933.svg?&style=for-the-badge&logo=Node.js&logoColor=white"/>
<img alt="Express" src ="https://img.shields.io/badge/Express-000000.svg?&style=for-the-badge&logo=Express&logoColor=white"/>
<img alt="GitHub" src ="https://img.shields.io/badge/GitHub-181717.svg?&style=for-the-badge&logo=GitHub&logoColor=white"/>
<img alt="GitHub Actions" src ="https://img.shields.io/badge/GitHub Actions-2088FF.svg?&style=for-the-badge&logo=GitHub Actions&logoColor=white"/>
<img alt="Socket.io" src ="https://img.shields.io/badge/Socket.io-010101.svg?&style=for-the-badge&logo=Socket.io&logoColor=white"/>
<img alt="JSON Web Tokens" src ="https://img.shields.io/badge/JSON Web Tokens-000000.svg?&style=for-the-badge&logo=JSON Web Tokens&logoColor=white"/>

<br/>

## 🌟 프로젝트 주요 기능

1. 메인페이지의 지하철 노선도를 활용하여 🎹길찾기 기능~!!
2. 누구와 매칭이 될것인지 두근두근 매칭시스템!!🥰
3. 마음에 들지않는 사용자와 매칭되었다면? 주저 없이 Run~!!👋
3. 채팅창 내에서 사진과 영상또한 공유할수있어요!🍀
4. 🔎채팅창 내에서 상대 프로필 조회 기능!
5. 🙋‍♂️마이 페이지에서는 자신의 프로필을 수정하고 조금 더 매력적인 사진으로 변경할수있답니다!!
<!--  <br>[🎵 환승시민 브로셔 보러가기 ](https://electric-lord-3b1.notion.site/9d381bfc771040eba7f92b75725a4167) -->

## 🍀 API 명세

|    _   |  Method |   URI    |  REQUEST  |  RESPONSE  | 추가 설명 |
|--------|---------|----------|-----------|------------|---------|
|일반회원가입| POST | /user/signup|{ <br>snsId: "kdfs12",<br>password: "asdf3253",<br>confirmpassword: "asdf3253"<br>}|400 :: 패스워드 검증 <br>{ "error": "패스워드에 아이디 값 사용 불가"}<br> 400 ::  아이디 중복 <br>{ error: "중복된 아이디 입니다" }<br> 200:: 가입 성공 <br>{msg: "성공 "}|-|
|가입 초기 필수 입력 정보 받기|POST|/user| {<br>representProfile: 이미지파일,<br> nickname: "yuyu",<br> phone: "01011111111",<br> gender: false<br>} |{ msg: "가입 되었습니다" }|대표 프로필 및 유저정보 초기값 업로드, `인증 토큰 필수`|
|SMS인증문자발송|POST|/auth/phone|{phone:"01011111111"}|400:: 실패<br>{error: "잘못된 형식입니다"}<br>200:: 성공{ msg: "인증번호가 전송 되었습니다"}|인증번호 유효시간 2분|
|SMS인증번호비교(검증)|POST|/auth/compare| {<br>phone:"01011111111",<br> auth : "ak2435"<br>}|{ status: 200, statusMassage: "ok, 전송되었습니다."}|-|
|마이 프로필 업데이트| POST | /profile | {<br>representProfile: 이미지파일,<br>profileImage: [이미지파일],<br>nickname: "jiji",<br>statusmessage: "멋쟁이 4조"<br>} | { status: 200, msg: "유저 프로필 정보가 수정되었습니다"}| `인증 토큰 필수` |
|마이 프로필 조회   | GET  | /profile | - | {<br>msg: "유저 프로필이 조회되었습니다",<br>body: userProfileInfo<br>} | `인증 토큰 필수` |
---


## ⚒ 아키텍쳐 

![Untitled Diagram (1)](https://user-images.githubusercontent.com/113084907/208006051-366332ad-6482-4ce7-80a1-55a8a0bed26e.jpg)

##  기술스텍

> **CICD**
- GitAction 를 사용하여 배포를 자동화를 구현하여 배포에 소요되는 팀원들의 코스트를 낮췄습니다.

> **Socket.io**
- 양방향 통신인 Socket.io 를 사용하여 매칭된 사람과 실시간으로 채팅이 가능하도록 함


> **Nginx**
- Nginx의 reverse proxy 를 통해 클라이언트요청을 nginx가 대신 받음으로써 서버의 정보를 숨길수있다는 장점을 이용하기위해 적용하였습니다.


> **ImageResizing**
- 클라이언트 측의 이미지 로딩 속도 향상을 위해 적용

> **Jest & Supertest**
- 테스트 주도의 개발을 위해 사용

> **Artillary**
- 부하에 따른 예상치못한 오류 등을 예측하고 대비하기 위해 사용


<br/>
</div>

##  ⚡트러블 슈팅
[🎵 환승시민 Backend 트러블 슈팅 보러가기 ](https://electric-lord-3b1.notion.site/23191c843a9144998eaca6b5e7e4544d)
<br>
