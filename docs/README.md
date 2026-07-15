# SLAMPICK MVP

SLAMPICK MVP는 인플루언서 탐색 및 시딩 전략 관리를 위한 React 기반 웹 애플리케이션입니다.

현재 MVP 단계이며, React와 Supabase를 이용하여 인플루언서 데이터를 조회·필터링하고, 브랜드의 찜/구독/로그인 플로우를 구현하고 있습니다.

---

## Tech Stack

- React
- Vite
- React Router
- Tailwind CSS
- Supabase

---

## Project Structure

```
src/
├── App.jsx                          # 라우트 정의 (로그인 필요 라우트는 RequireAuth로 가드)
├── main.jsx                         # 진입점: BrowserRouter + AuthProvider로 App을 감쌈
├── index.css
│
├── domain/                          # 페이지 전용 기능을 도메인 단위로 묶은 영역 (feature-first)
│   ├── today/                       # '오늘의 리스트' 도메인
│   │   ├── TodayList.jsx            #   페이지 컴포넌트 ('/today', 로그인 필요)
│   │   ├── components/
│   │   │   ├── filters/             #   필터바 관련 컴포넌트 (역할별로 분리)
│   │   │   │   ├── FilterBar.jsx       #     Card + 아코디언(상세 필터) 토글 state, 조립만 담당
│   │   │   │   ├── PrimaryFilters.jsx  #     항상 노출: 플랫폼/카테고리/티어(+팔로워수)
│   │   │   │   ├── AdvancedFilters.jsx #     아코디언 열렸을 때만 노출: 지역/연령대/3축/정렬(+단가)
│   │   │   │   ├── FilterGroup.jsx     #     FilterGroup/AxisFilterGroup 공용 렌더 헬퍼
│   │   │   │   ├── FollowerRangeDropdown.jsx # 팔로워수 프리셋+슬라이더 드롭다운 (티어 버튼과 배타적)
│   │   │   │   └── RateRangeDropdown.jsx     # 단가 프리셋+슬라이더 드롭다운 (정렬 버튼과 독립적)
│   │   │   ├── ModeSwitcher.jsx     #   premium 유저 전용 구독/체험 화면 전환 버튼
│   │   │   ├── TrialOverlay.jsx     #   체험 모드 블러 placeholder + 구독 유도 오버레이
│   │   │   └── SubscribeModal.jsx   #   구독 확인 모달
│   │   ├── hooks/
│   │   │   └── useInfluencerFilters.js # 필터바 상태 전체를 관리하는 Hook
│   │   │                            #   (티어↔팔로워수 배타, FilterBar가 받는 prop과 그대로 대응)
│   │   ├── utils/
│   │   │   ├── filterInfluencers.js # 선택된 필터 조건으로 influencer 배열 필터링
│   │   │   ├── sortInfluencers.js   # 단가 기준 정렬 (기본/단가↑/단가↓)
│   │   │   ├── followerRange.js     # 팔로워수 필터 프리셋 및 경계값 상수
│   │   │   ├── rateRange.js         # 단가 필터 프리셋 및 경계값 상수
│   │   │   └── trialPlaceholder.js  # 체험 모드 블러 placeholder 카드 생성
│   │   └── repository/
│   │       └── subscriptionRepository.js # 구독 생성 RPC 호출
│   │
│   ├── guide/                       # '전략 시딩 가이드' 도메인 — 앞으로 파일이 늘어날 예정
│   │   ├── Guide.jsx                #   페이지 컴포넌트 ('/guide')
│   │   ├── components/
│   │   │   ├── GuideFilterBar.jsx   #     지역 필터
│   │   │   └── GuideCard.jsx        #     가이드 카드 UI (아직 어디서도 렌더링하지 않는 미사용 상태)
│   │   └── repository/
│   │       └── guideRepository.js   #   가이드 목데이터 조회 (getGuides()도 아직 미사용)
│   │
│   ├── mypage/                      # '마이페이지' 도메인
│   │   └── MyPage.jsx               #   페이지 컴포넌트 ('/mypage', 로그인 필요)
│   │
│   ├── home/                        # 랜딩 페이지 도메인
│   │   ├── Home.jsx                 #   랜딩 페이지 ('/', 로그인 상태면 오늘의 리스트로 리다이렉트)
│   │   └── components/
│   │       └── DashboardMockup.jsx  #     히어로에 쓰이는 대시보드 미리보기
│   ├── auth/                        # 로그인/회원가입 도메인
│   │   ├── Login.jsx                #   로그인 ('/login')
│   │   └── Signup.jsx               #   회원가입 ('/signup', 브랜드·인플루언서 유형 선택)
│   └── admin/                       # 관리자 도메인
│       └── Admin.jsx                #   관리자 페이지 ('/admin', 준비 중 placeholder)
│
└── global/                          # 여러 도메인이 함께 쓰는 공용 인프라 (feature-first의 global 영역)
    ├── components/common/           #   여러 도메인 화면에서 재사용되는 공통 UI
    │   ├── Header.jsx               #     상단 네비게이션 (로그인 상태에 따라 분기, minimal 모드 지원)
    │   ├── Button.jsx               #     variant/size 조합의 공통 버튼
    │   ├── Card.jsx                 #     카드 레이아웃 공통 래퍼 (glass/hover 옵션)
    │   ├── Reveal.jsx               #     스크롤 시 fade-in + slide-up 애니메이션 래퍼
    │   ├── FilterPill.jsx           #     필터 버튼(pill) 하나 (active/disabled 스타일)
    │   ├── InfluencerCard.jsx       #     인플루언서 카드 (Thumbnail + Body 조합)
    │   ├── InfluencerCardThumbnail.jsx  #  9:16 썸네일 + region/tier 배지 오버레이
    │   └── InfluencerCardBody.jsx   #     팔로워/단가/지표 + 즐겨찾기·연락하기 버튼
    ├── hooks/
    │   └── useFavorite.js           #   찜(좋아요) 목록 조회 및 토글 (today/mypage 도메인 공용, tier 인자로 조회 테이블 분기)
    ├── utils/
    │   ├── influencerFormat.js      #   팔로워수/단가/날짜 등 표시용 문자열 포맷팅
    │   └── date.js                  #   날짜 문자열 파싱 유틸
    ├── repositories/
    │   ├── influencerRepository.js  #   인플루언서 목록 조회 (premium/trial 모드별 쿼리 분기, today/guide 도메인 공용)
    │   ├── brandRepository.js       #   브랜드(brand_user) 조회/생성 (today/mypage/auth 도메인 공용)
    │   └── picksInviteRepository.js #   찜(picks_invites) 조회/추가/삭제 (tier에 따라 상세 조회 테이블 분기)
    ├── context/
    │   └── AuthContext.jsx          #   Supabase 세션을 전역으로 공유하는 Context (useAuth)
    ├── config/
    │   └── constants.js             #   라우트 경로 등 앱 전역 상수
    └── supabase/
        └── client.jsx               #   Supabase client 초기화
```

`domain/`은 페이지 전용 기능을 도메인 단위로 묶은 영역이고(today/guide/mypage/home/auth/admin 전부 포함), `global/`은 두 개 이상의 도메인이 함께 쓰는 공용 인프라(공통 UI, hooks, utils, repositories, context, config, supabase client)를 모아둔 영역입니다 — 스프링부트의 domain/global 구조에서 착안했습니다. `today/`의 `utils`·`hooks`·`repository`처럼 한 도메인에서만 쓰는 것은 그 도메인 폴더 안에 그대로 두고, `InfluencerCard`나 `influencerRepository`처럼 여러 도메인이 같이 쓰는 것만 `global/`로 승격합니다.

---

## Features

### Today List (`/today`, 로그인 필요)

- 인플루언서 목록 조회 (premium 유저는 `influencers` 테이블, 그 외에는 `trial_influencers_view` 조회)
- 필터: 지역, 플랫폼, 카테고리, 연령대, 티어, 팔로워수(구간 프리셋+슬라이더), 3축(가용성/적합도/성과 — 성과는 아직 판단 알고리즘 없음), 정렬(기본/단가↑/단가↓), 단가(구간 프리셋+슬라이더)
- 티어 버튼과 팔로워수 범위는 서로 배타적으로 동작(하나를 선택하면 다른 하나는 초기화), 단가 범위와 정렬은 서로 독립적으로 동작
- 즐겨찾기(찜) 토글, 연락하기 버튼(UI만 구현, 실제 연락 기능 없음)
- 체험(trial) 모드: 일부 데이터는 블러 placeholder로 대체하고 구독 유도 오버레이 노출
- 구독(premium) 전환 모달 및 premium 유저의 구독/체험 화면 전환 버튼

### Strategy Guide (`/guide`)

- 지역 필터
- 가이드 카드 UI (목데이터, 아직 상세 페이지·실행 연동 없음)

### My Page (`/mypage`, 로그인 필요)

- 찜한 인플루언서 목록 조회

### Auth

- 로그인 / 회원가입 (브랜드·인플루언서 유형 선택, 브랜드는 브랜드명 입력)
- Supabase 세션을 전역으로 관리(AuthContext)하고, 로그인 필요 라우트는 비로그인 시 `/login`으로 리다이렉트

### Home (`/`)

- 마케팅 랜딩 페이지 (기능 소개, 대시보드 미리보기, 로그인 상태면 자동으로 오늘의 리스트로 리다이렉트)

---

## Environment Variables

프로젝트 루트에 `.env.local` 파일을 생성합니다.

```env
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
```

---

## Installation

```bash
npm install
```

---

## Run Development Server

```bash
npm run dev
```

기본 실행 주소

```
http://localhost:5173
```

---

## Build

```bash
npm run build
```

---

## Architecture

```
React (Vite)
      │
      ▼
Repository Layer
      │
      ▼
Supabase
      │
      ▼
PostgreSQL
```

React에서 Repository를 통해 Supabase 데이터를 조회하여 화면에 렌더링합니다.

---

## Current Status

- [x] React 프로젝트 구성
- [x] Tailwind CSS 적용
- [x] React Router 적용
- [x] Supabase 연동
- [x] Today List 화면 구현
- [x] Influencer Card UI 구현
- [x] Guide 전략시딩 화면 구현
- [x] 로그인, 로그아웃
- [x] 필터 기능 (지역/플랫폼/카테고리/연령대/티어/팔로워수/3축/정렬/단가)
- [x] 즐겨찾기 기능
- [x] 구독(premium) 전환 플로우
- [ ] 3축 중 '성과' 판단 알고리즘 (현재는 필터링에 영향 없음)
- [ ] 연락하기 기능 (버튼 UI만 존재)
- [ ] 관리자 페이지
- [ ] 모바일 UI 개선

---

## Author

SLAMPICK MVP
