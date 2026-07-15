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
├── components/
│   ├── common/                      # 여러 화면에서 재사용되는 공통 UI
│   │   ├── Header.jsx               #   상단 네비게이션 (로그인 상태에 따라 분기, minimal 모드 지원)
│   │   ├── Button.jsx               #   variant/size 조합의 공통 버튼
│   │   ├── Card.jsx                 #   카드 레이아웃 공통 래퍼 (glass/hover 옵션)
│   │   ├── Reveal.jsx               #   스크롤 시 fade-in + slide-up 애니메이션 래퍼
│   │   ├── FilterPill.jsx           #   필터 버튼(pill) 하나 (active/disabled 스타일)
│   │   ├── InfluencerCard.jsx       #   인플루언서 카드 (Thumbnail + Body 조합)
│   │   ├── InfluencerCardThumbnail.jsx  #   9:16 썸네일 + region/tier 배지 오버레이
│   │   └── InfluencerCardBody.jsx   #   팔로워/단가/지표 + 즐겨찾기·연락하기 버튼
│   │
│   ├── today/                       # '오늘의 리스트'(TodayList) 화면 전용
│   │   ├── FilterBar.jsx            #   지역/플랫폼/카테고리/연령대/티어/3축/정렬 필터 묶음
│   │   ├── FollowerRangeDropdown.jsx  # 팔로워수 프리셋+슬라이더 드롭다운 (티어 버튼과 배타적)
│   │   ├── RateRangeDropdown.jsx    #   단가 프리셋+슬라이더 드롭다운 (정렬 버튼과 독립적)
│   │   ├── ModeSwitcher.jsx         #   premium 유저 전용 구독/체험 화면 전환 버튼
│   │   ├── TrialOverlay.jsx         #   체험 모드 블러 placeholder + 구독 유도 오버레이
│   │   └── SubscribeModal.jsx       #   구독 확인 모달
│   │
│   ├── guide/                       # '전략 시딩 가이드'(Guide) 화면 전용
│   │   ├── GuideFilterBar.jsx       #   지역 필터
│   │   └── GuideCard.jsx            #   가이드 카드 UI
│   │
│   └── dashboard/
│       └── DashboardMockup.jsx      # 랜딩 페이지(Home) 히어로에 쓰이는 대시보드 미리보기
│
├── pages/                           # 라우트에 매핑되는 페이지 컴포넌트
│   ├── Home.jsx                     #   랜딩 페이지 ('/', 로그인 상태면 오늘의 리스트로 리다이렉트)
│   ├── TodayList.jsx                #   오늘의 리스트 ('/today', 로그인 필요)
│   ├── Guide.jsx                    #   전략 시딩 가이드 ('/guide')
│   ├── MyPage.jsx                   #   마이페이지 - 찜한 인플루언서 ('/mypage', 로그인 필요)
│   ├── Login.jsx / Signup.jsx       #   로그인 / 회원가입 (브랜드·인플루언서 유형 선택)
│   └── Admin.jsx                    #   관리자 페이지 ('/admin', 준비 중 placeholder)
│
├── hooks/
│   ├── useFavorite.js               # 찜(좋아요) 목록 조회 및 토글
│   └── useInfluencerFilters.js      # TodayList 필터바 상태 전체를 관리하는 Hook
│                                     #   (티어↔팔로워수, FilterBar와 이름이 그대로 대응)
│
├── utils/
│   ├── filterInfluencers.js         # 선택된 필터 조건으로 influencer 배열 필터링
│   ├── sortInfluencers.js           # 단가 기준 정렬 (기본/단가↑/단가↓)
│   ├── followerRange.js             # 팔로워수 필터 프리셋 및 경계값 상수
│   ├── rateRange.js                 # 단가 필터 프리셋 및 경계값 상수
│   ├── trialPlaceholder.js          # 체험 모드 블러 placeholder 카드 생성
│   ├── influencerFormat.js          # 팔로워수/단가/날짜 등 표시용 문자열 포맷팅
│   └── date.js                      # 날짜 문자열 파싱 유틸
│
├── repositories/                    # Supabase 데이터 조회/변경 (테이블·기능 단위로 분리)
│   ├── influencerRepository.js      # 인플루언서 목록 조회 (premium/trial 모드별 쿼리 분기)
│   ├── brandRepository.js           # 브랜드(brand_user) 조회/생성
│   ├── subscriptionRepository.js    # 구독 생성 RPC 호출
│   ├── picksInviteRepository.js     # 찜(picks_invites) 조회/추가/삭제
│   └── guideRepository.js           # 가이드 목데이터 조회
│
├── context/
│   └── AuthContext.jsx              # Supabase 세션을 전역으로 공유하는 Context (useAuth)
│
├── config/
│   └── constants.js                 # 라우트 경로 등 앱 전역 상수
│
└── supabase/
    └── client.jsx                   # Supabase client 초기화
```

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
