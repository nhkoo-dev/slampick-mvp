# SLAMPICK MVP

SLAMPICK MVP는 인플루언서 탐색 및 시딩 전략 관리를 위한 React 기반 웹 애플리케이션입니다.

현재 MVP 단계이며, React와 Supabase를 이용하여 인플루언서 데이터를 조회하고 화면에 표시하는 기능을 구현하고 있습니다.

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
src
├── components        # 공통 UI 컴포넌트
├── pages             # 페이지 컴포넌트
├── repositories      # Supabase 데이터 조회
├── supabase          # Supabase Client
├── config            # Route 및 상수 관리
├── App.jsx
└── main.jsx
```

---

## Features

### Today List

- 인플루언서 목록 조회
- Supabase 연동
- 카드형 UI
- 반응형 Grid Layout
- 즐겨찾기 UI
- 연락하기 버튼 UI

### Strategy Guide

- 전략 시딩 가이드 화면
- 카드 기반 Guide UI
- 반응형 레이아웃

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
- [ ] 필터 기능
- [ ] Guide 화면 구현
- [ ] 즐겨찾기 기능
- [ ] 연락하기 기능
- [ ] 모바일 UI 개선

---

## Author

SLAMPICK MVP