# sign-flow-z2

sign-flow-z2는 Next.js 기반으로 만들어진 프로젝트입니다.<br>
Tailwind CSS를 사용하여 스타일링하고, React Hook Form과 Zod로 폼 검증을 하였습니다.

```bash
// Next.js 프로젝트 생성 후 폴더 내로 이동
yarn create sign-flow-z2
cd sign-flow-z2
```

## 프로젝트 환경

- Node.js (v14 이상)
- yarn

### 설치

```bash
// dependencies 라이브러리 설치
yarn add @hookform/resolvers @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-select @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-toast class-variance-authority clsx framer-motion lucide-react next next-themes react react-dom react-hook-form tailwind-merge tailwindcss-animate zod
```

```bash
// devDependencies 라이브러리 설치
yarn add -D @types/node @types/react @types/react-dom autoprefixer eslint eslint-config-next postcss prettier tailwindcss typescript
```

### 라이브러리

(dependencies)

- @hookform/resolvers: React Hook Form을 사용하여 유효성 검사 스키마를 통합하기 위한 라이브러리 (Zod)
- @radix-ui/react-\*: 컴포넌트를 제공하는 Radix UI.
- class-variance-authority: CSS 클래스 변형을 관리하는 라이브러리.
- clsx: 조건부 클래스 이름을 결합하는 데 사용되는 유틸리티.
- framer-motion: 애니메이션과 인터랙션을 위한 React 라이브러리.
- lucide-react: React를 위한 아이콘 라이브러리.
- next: 서버 사이드 렌더링(SSR), 정적 사이트 생성(SSG), API 라우트 등을 지원하는 React 프레임워크.
- next-themes: Next.js 애플리케이션에서 테마를 쉽게 관리할 수 있도록 해주는 라이브러리.
- react, react-dom: React 라이브러리 패키지.
- react-hook-form: 폼을 쉽게 구현할 수 있도록 해주는 React 라이브러리.
- tailwind-merge: Tailwind CSS 클래스를 조건부로 결합하고 최적화하는 유틸리티.
- tailwindcss-animate: Tailwind CSS를 위한 애니메이션 유틸리티 플러그인.
- zod: TypeScript와 JavaScript를 위한 스키마 선언과 유효성 검사 라이브러리.

(devDependencies)

- @types/node, @types/react, @types/react-dom: TypeScript 정의 파일을 제공하여, Node.js와 React에서 TypeScript를 사용할 때 타입 체킹을 가능.
- autoprefixer: CSS에 자동으로 벤더 프리픽스를 추가해주는 PostCSS 플러그인.
- eslint: JavaScript와 JSX 코드를 위한 정적 코드 분석 도구.
- eslint-config-next: Next.js 프로젝트를 위한 ESLint 설정을 제공.
- postcss: CSS를 변환하는 도구로, Tailwind CSS 같은 다른 플러그인과 함께 사용.
- prettier: 코드 포맷터로, 일관된 코드 스타일을 유지.
- tailwindcss: CSS 프레임워크로, 빠르게 디자인을 구현 가능.
- typescript: JavaScript에 타입을 추가하여, 코드의 정확성을 높여주는 프로그래밍 언어.

### globals.css (Tailwind CSS 설정)

```bash
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
```

### 개발 서버 실행

```bash
   $ yarn dev
```

### 빌드 및 배포

```bash
   $ yarn build
   $ yarn start
```
