
# ⛺️ Camping In Life
> 공공데이터를 활용한 캠핑장 검색 

<div align="center">
<img src="https://img.shields.io/badge/next-12.2.3-red.svg"/> <img src="https://img.shields.io/badge/react-18.2.0-6BDAFC.svg"/>
<img src="https://img.shields.io/badge/react_kakao_maps_sdk-^1.1.3-F9DC3E.svg"/>
<img src="https://img.shields.io/badge/styled_components-^5.3.5-DB7093.svg"/>
</div>


![](public/mainlogo.png)

주변 캠핑장과 캠핑장을 검색하여 캠핑장에 대한 정보를 알 수 있는 플랫폼

## 📑 관련 링크 모음 
### [배포](https://camping-in-life.vercel.app/)
### [Figma 레이아웃](https://www.figma.com/file/n1vB6phFEAa1mZlNCVYG5Z/%EC%BA%A1%EC%8A%A4%ED%86%A42-team-library?node-id=0%3A1&t=Y96Ni78uicYmEyZp-1)
### [프로젝트 관련 정보 계획 Notion](https://khw970421.notion.site/Camping-In-Life-a139b980c66744ddb43193669deb209d)

<!--
## 설치 방법

OS X & 리눅스:

```sh
npm install my-crazy-module --save
```

윈도우:

```sh
edit autoexec.bat
```


## 사용 예제

스크린 샷과 코드 예제를 통해 사용 방법을 자세히 설명합니다.

_더 많은 예제와 사용법은 [Wiki][wiki]를 참고하세요._

## 개발 환경 설정

모든 개발 의존성 설치 방법과 자동 테스트 슈트 실행 방법을 운영체제 별로 작성합니다.

```sh
make install
npm test
```

-->

## 🌲 기능구현 
1. GPS를 활용한 주변 캠핑장 검색
2. 주변 캠핑장 범위 조절 
3. 캠핑장 검색 
  1. 디바운싱 - 검색어 관련 캠핑장 출력
  2. mouseUp mouseDown 관련 검색어 처리
4. 상세 페이지 무한 슬라이더 구현 
5. KakaoAPI로 상세 페이지 캠핑장 위치 출력

## 🚫 API Key 숨기기 
### 메인페이지 - API Routing Response
Client의 GPS의 유무가 확인된 후 API를 호출해야하므로 SSR로는 불가능하다. 

이때 API Key를 숨기는 것은 API Routing을 통해 진행한다.
[API Routing Response](https://nextjs.org/docs/api-routes/response-helpers)

<img width="1000" alt="image" src="https://user-images.githubusercontent.com/59253551/205036282-5b7da437-9134-4da4-bd38-b01f80747afd.png">


### 상세페이지 - getServerSideProps 
url에 따라 필요한 API 데이터를 미리 요청하기가 가능하므로 SSR이 가능하다. 

이때 API Key를 숨기는 것은 getServerSideProps를 이용해 서버에서 API를 미리 요청하므로 Client에서는 
해당 API url에서의 API Key를 숨길 수 있다. 

<img width="1000" alt="image" src="https://user-images.githubusercontent.com/59253551/205036538-dac7eebe-0a96-465a-aeab-e1c2ddce1da5.png">


