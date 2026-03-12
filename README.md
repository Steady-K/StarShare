# 🌟 별 이야기 (Star Story)

> 별 사진을 공유하고 소통하는 SNS 웹 서비스

<br />

## 📌 프로젝트 소개

**별 이야기**는 별 사진을 좋아하는 사람들이 모여 사진을 공유하고 소통하는 SNS 서비스입니다.  
로그인한 사용자만 피드와 콘텐츠에 접근할 수 있는 **인증 기반 폐쇄형 구조**로 설계되었습니다.

- **개발 기간**: 2주
- **개발 인원**: 1인
- **배포 URL**: [배포 링크]

<br />

## 🛠 기술 스택

| 분류 | 기술 |
|------|------|
| Frontend | React, TypeScript |
| 상태 관리 | Zustand, TanStack Query |
| 스타일링 | Tailwind CSS, shadcn/ui |
| Backend / DB | Supabase |
| AI | OpenAI Vision API |
| 빌드 도구 | Vite |
| 배포 | Vercel |

<br />

## ✨ 주요 기능

### 인증
- 이메일/비밀번호 회원가입 및 로그인
- 소셜 로그인 (카카오, GitHub, Google)
- 비밀번호 재설정 (이메일 인증 링크 방식)
- 비로그인 사용자는 모든 콘텐츠 접근 차단 (Route Guard)

### 게시글
- 게시글 작성 / 수정 / 삭제 (이미지 다중 업로드 포함)
- 무한 스크롤 피드
- 좋아요 기능

### 댓글
- 댓글 및 대댓글 작성
- 2depth 이상부터는 `@작성자명` 형식으로 답글 대상 표시

### 프로필
- 회원가입 시 랜덤 닉네임으로 프로필 자동 생성
- 프로필 이미지 / 닉네임 / 소개(bio) 수정

### AI
- 게시글 작성 시 업로드한 별 사진을 OpenAI Vision API로 분석해 관련 해시태그 자동 추천

### UI/UX
- 다크 모드 / 라이트 모드 전환
- 작성 중 모달 이탈 시 경고 다이얼로그
- 저장 / AI 태그 생성 중 모달 닫힘 및 이미지 삭제 방지

<br />

## 📁 폴더 구조

```
src/
├── api/                        # Supabase API 함수
│   ├── auth.ts
│   ├── comment.ts
│   ├── image.ts
│   ├── post.ts
│   └── profile.ts
├── components/
│   ├── comment/                # 댓글 관련 컴포넌트
│   │   ├── comment-editor.tsx
│   │   ├── comment-item.tsx
│   │   └── comment-list.tsx
│   ├── layout/                 # GlobalLayout, Route Guard, Header
│   │   ├── header/
│   │   │   ├── profile-button.tsx
│   │   │   └── theme-button.tsx
│   │   ├── global-layout.tsx
│   │   ├── guest-only-layout.tsx
│   │   └── member-only-layout.tsx
│   ├── modal/                  # 전역 모달 컴포넌트
│   │   ├── alert-modal.tsx
│   │   ├── post-editor-modal.tsx
│   │   ├── preview-image-modal.tsx
│   │   └── profile-editor-modal.tsx
│   ├── post/                   # 게시글 관련 컴포넌트
│   │   ├── create-post-button.tsx
│   │   ├── delete-post-button.tsx
│   │   ├── edit-post-button.tsx
│   │   ├── like-post-button.tsx
│   │   ├── post-feed.tsx
│   │   └── post-item.tsx
│   ├── profile/                # 프로필 관련 컴포넌트
│   │   ├── edit-profile-button.tsx
│   │   └── profile-info.tsx
│   ├── ui/                     # shadcn/ui 기반 공통 컴포넌트
│   ├── fallback.tsx
│   ├── global-loader.tsx
│   └── loader.tsx
├── hooks/
│   ├── mutations/
│   │   ├── auth/               # 로그인, 회원가입, 비밀번호 관련
│   │   ├── comment/            # 댓글 CRUD
│   │   ├── post/               # 게시글 CRUD, 좋아요 토글
│   │   └── profile/            # 프로필 수정
│   └── queries/                # useQuery 커스텀 훅
├── pages/                      # 라우트별 페이지 컴포넌트
├── provider/
│   ├── modal-provider.tsx      # 전역 모달 포털 등록
│   └── session-provider.tsx    # 세션 초기화 및 로딩 처리
├── store/                      # Zustand 전역 상태
│   ├── alert-modal.ts
│   ├── post-editor-modal.ts
│   ├── profile-editor-modal.ts
│   ├── session.ts
│   └── theme.ts
├── lib/                        # 유틸 및 설정
│   ├── constants.ts            # 쿼리 키, 버킷명 등 상수
│   ├── error.ts                # 에러 메시지 한글화
│   ├── supabase.ts             # Supabase 클라이언트
│   ├── time.ts                 # 상대 시간 포맷 유틸
│   └── utils.ts                # 랜덤 닉네임 생성 등
├── database.types.ts           # Supabase CLI 자동 생성 타입
└── types.ts                    # 공통 TypeScript 타입 정의
```

<br />

## ⚙️ 기술적 의사결정

### Zustand + TanStack Query 역할 분리

상태의 성격에 따라 두 라이브러리의 역할을 명확히 분리했습니다.

| | Zustand | TanStack Query |
|---|---|---|
| **역할** | 클라이언트 전역 상태 | 서버 상태 관리 |
| **사용 예시** | 로그인 세션, 다크모드, 모달 열림/닫힘 | 게시글, 댓글, 좋아요, 프로필 데이터 |
| **선택 이유** | Props Drilling 없이 어디서든 접근 | 캐싱, 자동 리페칭, 로딩/에러 상태 처리 |

Zustand에서는 `combine` 미들웨어로 state와 actions를 분리하고, `devtools`로 상태 변화를 추적했습니다.  
모달 상태(PostEditorModal, AlertModal)도 Zustand로 전역 관리하여 어디서든 모달을 열고 닫을 수 있도록 했습니다.

### 무한 스크롤 구현

`TanStack Query`의 `useInfiniteQuery`와 브라우저 API인 `IntersectionObserver`를 조합해 구현했습니다.

```
1. 피드 하단에 빈 감지 요소(sentinel ref) 배치
2. IntersectionObserver가 해당 요소의 뷰포트 진입을 감지
3. 진입 시 fetchNextPage() 호출 → 다음 페이지 데이터 fetch
4. hasNextPage가 false이면 추가 요청 중단
```

### TanStack Query 캐시 전략: 상황별 갱신 방식 차별화

데이터 변경 시 캐시를 어떻게 갱신할지 상황에 따라 전략을 달리했습니다.

| 상황 | 방법 | 이유 |
|---|---|---|
| 게시글 수정 | `setQueryData`로 해당 캐시만 교체 | 전체 리페칭 불필요, 빠른 반영 |
| 게시글 작성 / 삭제 | `resetQueries`로 전체 피드 초기화 | 무한 스크롤 페이지 단위가 달라질 수 있어 부분 교체가 불안정 |
| 좋아요 토글 | `onMutate`로 낙관적 업데이트 후 실패 시 롤백 | 즉각적인 UI 반응이 UX에 중요하기 때문 |

### 좋아요 기능에 RPC(Stored Procedure) 사용

좋아요 기능을 처음엔 클라이언트에서 직접 `like_count`를 조회 후 +1하는 방식으로 설계했지만, 동시성 문제를 발견했습니다.

여러 사용자가 동시에 같은 게시글에 좋아요를 누르면, 둘 다 같은 값을 읽고 +1을 저장해 실제로는 1만 증가하는 문제가 발생할 수 있습니다. Supabase JavaScript Client에서는 행 잠금 쿼리(`SELECT ... FOR UPDATE`)를 직접 실행할 수 없기 때문에, DB 내부에서 트랜잭션을 처리하는 RPC 함수(`toggle_post_like`)를 작성했습니다. 클라이언트는 `supabase.rpc()`로 호출만 하면 동시성 제어는 DB에서 보장됩니다.

### OpenAI Vision API — AI 태그 추천 설계 결정

처음에는 문구 추천 기능으로 기획했지만, 실제로 써보니 사용자가 직접 쓰는 것과 차별점이 없었습니다. 별 사진 SNS 특성상 은하수, 별궤적, 오리온자리 같은 전문 용어 태그를 모르는 사용자가 많다는 점에 착안해 **AI 태그 자동 추천**으로 방향을 바꿨습니다.

- 업로드한 이미지를 base64로 변환해 OpenAI Vision API로 전송
- 사진 분석 결과를 기반으로 관련 태그 5개 자동 생성
- 태그 입력창 옆에 작은 AI 버튼으로 배치해 흐름을 방해하지 않도록 설계
- 프로토타입 수준에서는 OpenAI API를 사용하고, 실제 서비스로 확장 시 월 1000건 무료 티어를 제공하는 Cloudflare AI로 교체 가능하도록 API 호출부를 함수로 분리해뒀습니다.

### Supabase 선택 이유

프론트엔드 개발에 집중하면서도 실제 서비스 수준의 기능이 필요했습니다.

- 별도 백엔드 서버 없이 **인증, DB, 스토리지**를 단일 플랫폼에서 처리
- `Supabase Auth`의 OAuth 지원으로 카카오, GitHub, Google 소셜 로그인 구현
- Row Level Security(RLS)로 DB 접근 권한을 선언적으로 관리 (예: 본인 게시글만 수정/삭제 가능)
- CLI 기반 타입 자동 생성(`supabase gen types`)으로 DB 스키마와 TypeScript 타입 동기화

<br />

## 🔥 트러블슈팅

### 1. 무한 스크롤에서 불필요한 리패칭 발생

**문제**  
탭 전환 후 돌아오거나 네트워크가 재연결되면 무한 스크롤로 불러온 수십 개의 게시글이 전부 다시 리페칭되었습니다.

**원인**  
TanStack Query의 `staleTime` 기본값이 `0`이어서 데이터가 즉시 stale 상태로 전환되고, 포커스 복귀나 네트워크 재연결 시 자동으로 리페칭이 일어났습니다.

**해결**  
`staleTime: Infinity`로 설정해 자동 리페칭을 차단했습니다. 대신 게시글 작성/수정/삭제 같이 실제 데이터 변경이 일어나는 시점에만 수동으로 캐시를 갱신하는 방식으로 전환해, 불필요한 네트워크 요청을 없애고 피드 진입 속도를 개선했습니다.

### 2. 피드 캐시 중복으로 인한 데이터 불일치

**문제**  
`useInfiniteQuery`의 `pages` 배열에 게시글 전체 데이터가 저장되고, 개별 게시글 캐시(`post.byId`)에도 같은 데이터가 존재해 데이터가 두 곳에 중복 저장됐습니다. 게시글을 수정하면 `post.byId` 캐시는 갱신되지만 피드 목록 캐시는 갱신되지 않아 화면에 이전 내용이 그대로 남는 불일치가 발생했습니다.

**해결**  
`queryFn` 내부에서 `queryClient.setQueryData()`로 각 게시글을 개별 캐시로 분리 저장하고, `pages` 배열에는 ID 배열만 반환하도록 변경했습니다(캐시 정규화). `PostItem`은 `postId`만 받아 개별 캐시를 참조하도록 수정했고, 이후 수정 시 `post.byId` 캐시만 교체해도 피드에 즉시 반영됩니다.

### 3. 이미지 미리보기 메모리 누수

**문제**  
게시글 작성 모달에서 이미지를 선택/교체하거나 모달을 닫아도 브라우저 메모리에 Blob 데이터가 계속 남아 있었습니다.

**원인**  
`URL.createObjectURL()`은 Blob 객체를 브라우저 메모리에 저장하고 URL을 반환하는데, React 상태에서 해당 항목을 제거해도 메모리 자체는 해제되지 않습니다.

**해결**  
이미지 삭제 시와 모달 닫힘 시 두 곳에서 `URL.revokeObjectURL()`을 호출해 Blob을 명시적으로 해제했습니다. `useEffect`의 의존성에 `isOpen`을 포함시켜 모달 상태 변화 시점에 정리 로직이 실행되도록 처리했습니다.

### 4. 카카오 소셜 로그인 이메일 스코프 오류

**문제**  
카카오 로그인 연동 후 로그인이 실패하고, Supabase 로그에 `Error getting user email` 에러가 남았습니다.

**원인**  
Supabase Auth는 이메일을 사용자 식별 기준으로 사용합니다. 카카오는 기본적으로 이메일 제공이 선택 동의 항목이며, 비즈앱 전환 없이는 이메일을 필수 동의로 설정할 수 없어 세션 생성이 불가했습니다.

**해결**  
카카오 개발자센터에서 비즈앱 전환 후, `account_email`을 필수 동의로 설정하고 Supabase Provider의 scope 필드에 `account_email profile_nickname`을 추가해 해결했습니다.

### 5. OpenAI API 키 GitHub 노출

**문제**  
`.env` 파일을 `.gitignore`에 추가했음에도 이미 한 번 커밋된 상태라 GitHub push 시 Secret Scanning에 의해 차단됐습니다.

**원인**  
`.gitignore`는 앞으로의 추적을 막을 뿐, 이미 커밋된 파일은 히스토리에 그대로 남습니다. GitHub은 히스토리 전체를 스캔하기 때문에 이전 커밋에 키가 포함되어 있으면 push가 거부됩니다.

**해결**  
`git filter-branch`로 전체 커밋 히스토리에서 `.env` 파일을 제거하고 `git push --force`로 강제 push해 해결했습니다. 이후 API 키는 `.env.local`에만 저장하도록 변경했습니다. Vite는 `.env.local`을 기본적으로 `.gitignore`에 포함하기 때문에 동일한 문제가 재발하지 않습니다.

<br />

## 💭 개선하고 싶은 점

- **이미지 최적화**: 별 사진 특성상 고해상도 이미지가 많아 업로드 전 canvas를 이용한 리사이징 또는 WebP 변환 처리를 추가하고 싶습니다.
- **접근성(a11y) 개선**: 다크모드 대비 비율, 키보드 네비게이션 등을 보완하고 싶습니다.
- **실시간 알림**: Supabase의 `channel().on('postgres_changes')` 기능을 활용해 좋아요/댓글 알림을 실시간으로 받을 수 있도록 확장하고 싶습니다.

<br />

## 📸 스크린샷

> 스크린샷 또는 GIF 추가 예정
