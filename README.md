
# 환승시민

![로고오](https://user-images.githubusercontent.com/113084907/207002677-d4828de8-61cd-43ca-950f-2d636a13e115.jpg)
> **_음악인을 위한 사이트_** 🧑🏿‍🎤🧑‍🎤<br/><br/>
> **개발기간: 2022.08.26 ~ 2022.10.07**

<br/>

## [🚉 환승시민 보러가기 ](https://team4-final-project.vercel.app/)
## [🚉 환승시민 노션 보러가기 ](https://www.notion.so/7899ad12f6a44190bef2aa4b53be9614)

## ⭐️ 프로젝트 소개

환승시민 은?

**지하철에서 서로를 이어주는 공간** 입니다.

음악 작업 경험이 없는 사람들도 쉽게 서로 🍀**콜라보레이션** 하여 멋진 작업물을 만들 수 있습니다

🤦노래도 불러야 해… 멜로디 구성은 자신 없는데.…🤦 이런 걱정 거리를 날려버리고!! 🤩

🤚혼자 모든 곡 작업을 하기 막막한 분!🤚

🎼 **원하는 사운드 또는 목소리** 를 찾고 계시는 분! 🎵

💌리드미에서 숨겨진 재능을 뽐내주세요! 💌

<br/>

## 🎼 🎵 Legendary Team 🎶 🎹


---
## 환승 시민 프로젝트 구성원
백엔드 팀  `BE`  
|팀내 포지션| 한 줄 소개 | 이름 | 깃허브 | 블로그 |
|--------|----------|-------|------|-------|
|리더| 레드 어몽이 |안태환|https://github.com/nowhereim|
|팀원| 마약 옥수수 |성용환|https://github.com/tlptop|
|팀원| 잇몸 알파카 |오윤지|https://github.com/doodlerrr|

프론트엔드 팀 `FE`
|팀내 포지션| 한 줄 소개 | 이름 | 깃허브 | 블로그 |
|--------|----------|-------|------|-------|
|부리더|   |김재우 |https://github.com/wyswhsl21|||
|팀원 |   |남해리|https://github.com/NSunR|||
|팀원 |   |이상현|https://github.com/shlee1027|||
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

1. 재생한 목록들이 자동으로 추가되는 🎹플레이 리스트 기능!
2. 마음에 드는 아티스트가 있다면, 주저 없이 follow!!👋
3. 인기 있는 게시물과 아티스트를 파악할 수 있어요!🍀
4. 🔎검색 및 조회 기능
5. 🙋‍♂️마이 페이지에서는 내가 올린 게시글도 모아 보고 내가 좋아한 게시글도 모아서 확인 할 수 있답니다!
<br>[🎵 리드미 브로셔 보러가기 ](https://www.notion.so/Rhythme-d30d0fa47660459abc93e19837c1edf7)

   
## 🍀API 명세

|    _   |  Method |   URI    |  REQUEST  |  RESPONSE  | 추가 설명 |
|--------|---------|----------|-----------|------------|---------|
|가입 초기 필수 입력 정보 받기|POST|/user| { representProfile: 이미지파일, nickname: "yuyu", phone: "01022760716", gender: false} |{ msg: "가입 되었습니다" }|대표 프로필 및 유저정보 초기값 업로드, `인증 토큰 필수`|
|SMS인증문자발송|POST|/auth/phone|{phone:"01022760716"}|{ msg: "인증 메시지를 전송했습니다"}|인증번호 유효시간 2분|
|SMS인증번호비교(검증)|POST|/auth/compare| { phone:"01022760716", auth : "ak2435" }|{ status: 200, statusMassage: "ok, 전송되었습니다."}|-|
|마이 프로필 업데이트| POST | /profile | { representProfile: 이미지파일, profileImage: [이미지파일], nickname: "jiji", statusmessage: "멋쟁이 4조" } | { status: 200, msg: "유저 프로필 정보가 수정되었습니다"}| `인증 토큰 필수` |
|마이 프로필 조회   | GET  | /profile | - | { msg: "유저 프로필이 조회되었습니다", body: userProfileInfo } | `인증 토큰 필수` |
|마이 프로필 삭제(회원 탈퇴 시)| DELETE | /profile| - | - | `인증 토큰 필수` |
---


## ⚒ 아키텍쳐 

![qwe jpg drawio](https://user-images.githubusercontent.com/113084907/207002835-50b4fa8f-d4f5-4435-99a3-b802ec551c78.png)

##  기술스텍

> **CICD**
- GitAction 를 사용하여 배포를 자동화를 구현하여 배포에 소요되는 팀원들의 코스트를 낮췄습니다.

> **Socket.io**
- 양방향 통신인 Socket.io 를 사용하여 매칭된 사람과 실시간으로 채팅이 가능하도록 함


> **Nginx**
- certbot을 이용하여 해당 도메인에 대한 인증서가 발급해(.pem 파일) Https로 보안을 강화 하였습니다.

<br/>
</div>

##  ⚡트러블 슈팅
[🎵 리드미 Backend 트러블 슈팅 보러가기 ](https://www.notion.so/Trouble-Shooting-da4079a3f93942e3aeefd10f9648a8ec)


