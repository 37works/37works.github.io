# Soft37 — Next.js

Soft37(SaaS · 모바일 앱)의 사이트. 정적 HTML에서 Next.js로 마이그레이션했으며, [SOFT37 Design System](../assets/soft37/SOFT37_DESIGN_SYSTEM.md) 토큰을 따른다.

- **Framework**: Next.js 16 (App Router) · React 19 · TypeScript
- **Styling**: Tailwind v4 (`@theme` 토큰, `app/globals.css`)
- **Theme**: `next-themes` (라이트/다크, 시스템 기본)
- **Icons**: `lucide-react` (라인, 1.75px, round cap)
- **Fonts**: Inter(라틴/숫자) + Pretendard(국문)

## 구조

```
app/            랜딩(/) · /privacy · /terms · layout · globals.css
components/      Header Footer Logo Card ThemeProvider ThemeToggle LegalDoc
content/         landing.ts · privacy.ts · terms.ts (레거시 HTML에서 추출) · types.ts
public/logo/     ㅅㅊ 마크 (light/dark trans)
```

법무 문서(privacy/terms)는 7개 언어(EN/JA/KO/ZH/DE/ES/FR)를 담으며, `?app=<이름>` 쿼리로 앱 이름이 본문·타이틀에 치환된다. 예: `/privacy?app=MyApp`.

## 개발

```bash
npm install
npm run dev     # http://localhost:3000 (이 레포에선 launch.json 통해 :3700)
npm run build
```

## 배포 (Vercel)

이 앱은 **모노레포 서브디렉터리**(`soft37/`)에 있다. Vercel 프로젝트 설정:

1. Import Git Repository → `37works/37works.github.io`
2. **Root Directory = `soft37`**
3. Framework Preset: Next.js (자동 감지)
4. Domain: `soft37.working37.net` 연결 → DNS에 `CNAME soft37 → cname.vercel-dns.com`

> 루트 도메인 `www.working37.net`(GitHub Pages, 정적 사이트)와는 별개로 운영된다.
