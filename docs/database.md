# Influencer 테이블

| 필드명 | 자료형 | 설명 |
|--------|--------|------|
| id | int8 | PostgreSQL에서 자동 생성되는 PK |
| name | text | 인플루언서 이름 |
| handle | text | 인스타그램, 틱톡 등의 계정명 ex.@slam 에서의 slam |
| platform | text | 인플루언서 활동 플랫폼 (instagram, tiktok, youtube 단, 앞글자 대소문자 구분 x) |
| region | text | 인플루언서가 사는 지역 (CH, UAE, US, JP) |
| tier | text | 팔로워 수 기준 등급 (MEGA, MID, NANO) |
| followers | numeric | 팔로워 수 |
| real_views | numeric | 인플루언서 게시물 조회수 |
| engagement_rate | numeric | 협찬, 광고에 대한 협업률 |
| thumbnail_url | text | 인플루언서 프로필 썸네일 url |
| status | text | 인플루언서 활동 상태 (active, inactive) |
| category | text | beauty, hair, fashion, food_beverage... |