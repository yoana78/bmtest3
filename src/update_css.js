const fs = require('fs');
const path = 'c:\\coding\\부명홈페이지\\src\\index.css';
let css = fs.readFileSync(path, 'utf8');

// 1. Add Inter font import
css = css.replace(
  /@import url\('https:\/\/fonts.googleapis.com\/css2\?family=Pretendard:/g,
  "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');\n@import url('https://fonts.googleapis.com/css2?family=Pretendard:"
);

// 2. Update :root
const rootRegex = /:root\s*\{[\s\S]*?\}/;
const newRoot = `:root {
  /* === 기존 변수 (다른 페이지 호환용) === */
  --dh-blue: #0066B3;
  --dh-blue-dark: #004B87;
  --dh-navy: #0A2540;
  --dh-blue-light: #EBF5FF;
  --dh-bg-light: #F8FAFC;
  --dh-white: #FFFFFF;
  --dh-text-main: #334155;
  --dh-text-muted: #64748B;
  --dh-border: #E2E8F0;
  --dh-accent-blue: #0066B3;
  
  /* === 리뉴얼 색상 변수 === */
  --bm-primary: #0066B3;
  --bm-primary-dark: #004B87;
  --bm-accent: #00A3E0;
  --bm-bg-white: #FFFFFF;
  --bm-bg-light: #F7F9FC;
  --bm-text-dark: #1A1A2E;
  --bm-text-muted: #6B7280;
  --bm-border: #E5E7EB;
  --bm-navy: #0A2540;
  
  --font-main: 'Inter', 'Pretendard', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}`;
css = css.replace(rootRegex, newRoot);

// 3. and 4. Replace everything from /* ===== 반응형 미디어쿼리 to line 1106
const mqStartStr = '/* ===== 반응형 미디어쿼리 (태블릿/모바일 화면 크기별 레이아웃 조정) ===== */';
const mqEndStr = '  .catalog-card-footer {\r\n    font-size: 0.62rem;\r\n    padding-top: 6px;\r\n  }\r\n}';
const mqEndStrFallback = '  .catalog-card-footer {\n    font-size: 0.62rem;\n    padding-top: 6px;\n  }\n}';

let startIndex = css.indexOf(mqStartStr);
let endIndex = css.indexOf(mqEndStr);
if (endIndex === -1) endIndex = css.indexOf(mqEndStrFallback);

if (startIndex !== -1 && endIndex !== -1) {
  const actualEndIndex = endIndex + (endIndex === css.indexOf(mqEndStr) ? mqEndStr.length : mqEndStrFallback.length);
  
  const newStyles = `/* ========================================================================
   리뉴얼 스타일 — 메인 페이지 + 헤더 + 푸터 (2026 Renewal)
   ======================================================================== */

/* ===== 스크롤 애니메이션 키프레임 ===== */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.92);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* ===== 스크롤 애니메이션 트리거 클래스 ===== */
.animate-on-scroll {
  opacity: 0;
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.animate-on-scroll.fade-up {
  transform: translateY(40px);
}

.animate-on-scroll.fade-in {
  transform: none;
}

.animate-on-scroll.scale-in {
  transform: scale(0.92);
}

.animate-on-scroll.slide-left {
  transform: translateX(-60px);
}

.animate-on-scroll.slide-right {
  transform: translateX(60px);
}

.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0) translateX(0) scale(1);
}

/* Stagger 순차 등장용 자식 클래스 */
.animate-child {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.animate-child.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ===== 리뉴얼 헤더 스타일 ===== */
.bm-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 72px;
  padding: 0 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  transition: background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
  background: transparent;
  border-bottom: 1px solid transparent;
}

.bm-header.scrolled {
  background: rgba(255, 255, 255, 0.97);
  border-bottom: 1px solid var(--bm-border);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.06);
  backdrop-filter: blur(12px);
}

.bm-header .bm-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  z-index: 10;
}

.bm-header .bm-logo img {
  height: 40px;
  object-fit: contain;
  transition: filter 0.3s ease;
}

/* 투명 헤더에서 로고를 흰색으로 보이게 (밝기+대비 조정) */
.bm-header:not(.scrolled) .bm-logo img {
  filter: brightness(0) invert(1);
}

.bm-header .bm-logo-text {
  display: flex;
  flex-direction: column;
}

.bm-header .bm-logo-text .bm-company-name {
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  line-height: 1.1;
  transition: color 0.3s ease;
}

.bm-header:not(.scrolled) .bm-logo-text .bm-company-name {
  color: #FFFFFF;
}

.bm-header.scrolled .bm-logo-text .bm-company-name {
  color: var(--bm-primary);
}

.bm-header .bm-logo-text .bm-company-sub {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  transition: color 0.3s ease;
}

.bm-header:not(.scrolled) .bm-logo-text .bm-company-sub {
  color: rgba(255, 255, 255, 0.7);
}

.bm-header.scrolled .bm-logo-text .bm-company-sub {
  color: var(--bm-text-muted);
}

/* 리뉴얼 네비게이션 */
.bm-nav {
  display: flex;
  align-items: center;
  gap: 4px;
}

.bm-nav-item {
  position: relative;
  padding: 8px 16px;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  border-radius: 8px;
  transition: color 0.3s ease, background 0.2s ease;
  cursor: pointer;
}

.bm-header:not(.scrolled) .bm-nav-item {
  color: rgba(255, 255, 255, 0.9);
}

.bm-header:not(.scrolled) .bm-nav-item:hover,
.bm-header:not(.scrolled) .bm-nav-item.active {
  color: #FFFFFF;
  background: rgba(255, 255, 255, 0.15);
}

.bm-header.scrolled .bm-nav-item {
  color: var(--bm-text-dark);
}

.bm-header.scrolled .bm-nav-item:hover,
.bm-header.scrolled .bm-nav-item.active {
  color: var(--bm-primary);
  background: rgba(0, 102, 179, 0.06);
}

/* ===== 메가메뉴 드롭다운 (CJ 말풍선 스타일) ===== */
.bm-mega-menu {
  position: absolute;
  top: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%) translateY(8px);
  background: #FFFFFF;
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.04);
  padding: 24px 28px;
  min-width: 520px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s ease;
  z-index: 100;
  pointer-events: none;
}

/* 말풍선 화살표 */
.bm-mega-menu::before {
  content: '';
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 16px;
  background: #FFFFFF;
  border-radius: 3px;
  transform: translateX(-50%) rotate(45deg);
  box-shadow: -2px -2px 4px rgba(0, 0, 0, 0.04);
}

.bm-nav-item:hover .bm-mega-menu,
.bm-nav-item:focus-within .bm-mega-menu {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
  pointer-events: auto;
}

.bm-mega-menu-title {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--bm-text-muted);
  margin-bottom: 14px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--bm-border);
}

.bm-mega-menu-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.bm-mega-menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: 10px;
  text-decoration: none;
  color: var(--bm-text-dark);
  transition: background 0.2s ease, transform 0.15s ease;
}

.bm-mega-menu-item:hover {
  background: var(--bm-bg-light);
  transform: translateX(3px);
}

.bm-mega-menu-item img {
  width: 36px;
  height: 36px;
  object-fit: contain;
  border-radius: 6px;
  background: #F9FAFB;
  padding: 4px;
}

.bm-mega-menu-item .mega-item-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--bm-text-dark);
  display: block;
  line-height: 1.2;
}

.bm-mega-menu-item .mega-item-desc {
  font-size: 0.72rem;
  color: var(--bm-text-muted);
  display: block;
  margin-top: 2px;
}

/* 언어 전환 버튼 */
.bm-lang-btn {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;
  z-index: 10;
}

.bm-header:not(.scrolled) .bm-lang-btn {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  color: #FFFFFF;
}

.bm-header:not(.scrolled) .bm-lang-btn:hover {
  background: rgba(255, 255, 255, 0.25);
}

.bm-header.scrolled .bm-lang-btn {
  background: #F1F5F9;
  border-color: var(--bm-border);
  color: var(--bm-text-dark);
}

.bm-header.scrolled .bm-lang-btn:hover {
  background: var(--bm-primary);
  color: #FFFFFF;
  border-color: var(--bm-primary);
}

/* ===== 모바일 햄버거 메뉴 ===== */
.bm-hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  z-index: 10;
}

.bm-hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.bm-header:not(.scrolled) .bm-hamburger span {
  background: #FFFFFF;
}

.bm-header.scrolled .bm-hamburger span {
  background: var(--bm-text-dark);
}

.bm-hamburger.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.bm-hamburger.open span:nth-child(2) {
  opacity: 0;
}

.bm-hamburger.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* 모바일 슬라이드 드로어 */
.bm-mobile-drawer {
  position: fixed;
  top: 0;
  right: -100%;
  width: 300px;
  height: 100vh;
  background: #FFFFFF;
  box-shadow: -4px 0 30px rgba(0, 0, 0, 0.1);
  z-index: 999;
  padding: 80px 28px 40px;
  transition: right 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
}

.bm-mobile-drawer.open {
  right: 0;
}

.bm-mobile-drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 998;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.bm-mobile-drawer-overlay.open {
  opacity: 1;
  visibility: visible;
}

.bm-mobile-nav-item {
  display: block;
  padding: 14px 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--bm-text-dark);
  text-decoration: none;
  border-bottom: 1px solid var(--bm-border);
  transition: color 0.2s ease;
}

.bm-mobile-nav-item:hover,
.bm-mobile-nav-item.active {
  color: var(--bm-primary);
}

.bm-mobile-sub-items {
  padding-left: 16px;
  padding-bottom: 8px;
}

.bm-mobile-sub-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--bm-text-muted);
  text-decoration: none;
  transition: color 0.2s ease;
}

.bm-mobile-sub-item:hover {
  color: var(--bm-primary);
}

.bm-mobile-sub-item img {
  width: 28px;
  height: 28px;
  object-fit: contain;
  border-radius: 4px;
  background: var(--bm-bg-light);
  padding: 3px;
}

/* ===== 리뉴얼 히어로 (비대칭 Reckitt 스타일) ===== */
.bm-hero {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 650px;
  display: flex;
  overflow: hidden;
}

.bm-hero-video-side {
  position: absolute;
  top: 0;
  right: 0;
  width: 65%;
  height: 100%;
  overflow: hidden;
}

.bm-hero-video-side video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.bm-hero-video-side::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.15);
}

/* SVG 곡선 구분선 */
.bm-hero-curve {
  position: absolute;
  top: 0;
  left: 30%;
  width: 15%;
  height: 100%;
  z-index: 3;
}

.bm-hero-text-side {
  position: relative;
  width: 38%;
  height: 100%;
  background: var(--bm-primary);
  display: flex;
  align-items: center;
  padding: 0 60px;
  z-index: 2;
}

.bm-hero-content {
  max-width: 480px;
}

.bm-hero-content .bm-hero-sub {
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  margin-bottom: 16px;
  display: block;
  opacity: 0;
  animation: fadeInUp 0.8s ease 0.3s forwards;
}

.bm-hero-content .bm-hero-title {
  font-size: 2.2rem;
  font-weight: 800;
  line-height: 1.3;
  color: #FFFFFF;
  margin-bottom: 18px;
  word-break: keep-all;
  opacity: 0;
  animation: fadeInUp 0.8s ease 0.5s forwards;
}

.bm-hero-content .bm-hero-desc {
  font-size: 0.95rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.7;
  margin-bottom: 32px;
  word-break: keep-all;
  opacity: 0;
  animation: fadeInUp 0.8s ease 0.7s forwards;
}

.bm-hero-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  background: #FFFFFF;
  color: var(--bm-primary);
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 700;
  border-radius: 50px;
  transition: all 0.3s ease;
  opacity: 0;
  animation: fadeInUp 0.8s ease 0.9s forwards;
}

.bm-hero-cta:hover {
  background: var(--bm-accent);
  color: #FFFFFF;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 163, 224, 0.3);
}

.bm-hero-cta svg {
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
}

.bm-hero-cta:hover svg {
  transform: translateX(4px);
}

/* 히어로 하단 스크롤 힌트 */
.bm-hero-scroll-hint {
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  animation: fadeIn 1s ease 1.5s forwards;
  opacity: 0;
}

.bm-scroll-dot {
  width: 24px;
  height: 38px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 12px;
  position: relative;
}

.bm-scroll-dot::after {
  content: '';
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 8px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 2px;
  animation: scrollDot 1.5s ease infinite;
}

@keyframes scrollDot {
  0% { opacity: 1; transform: translateX(-50%) translateY(0); }
  100% { opacity: 0; transform: translateX(-50%) translateY(14px); }
}

/* ===== 리뉴얼 섹션 공통 스타일 ===== */
.bm-section {
  padding: 100px 48px;
}

.bm-section-white {
  background: var(--bm-bg-white);
}

.bm-section-light {
  background: var(--bm-bg-light);
}

.bm-container {
  max-width: 1200px;
  margin: 0 auto;
}

.bm-section-header {
  margin-bottom: 48px;
}

.bm-section-tag {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--bm-primary);
  margin-bottom: 10px;
  display: block;
}

.bm-section-title {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--bm-text-dark);
  line-height: 1.3;
  margin-bottom: 12px;
  word-break: keep-all;
}

.bm-section-desc {
  font-size: 0.95rem;
  color: var(--bm-text-muted);
  line-height: 1.6;
  max-width: 600px;
  word-break: keep-all;
}

/* ===== 자체 브랜드 쇼케이스 카드 ===== */
.bm-brand-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.bm-brand-card {
  position: relative;
  background: #FFFFFF;
  border: 1px solid var(--bm-border);
  border-radius: 16px;
  padding: 28px 24px;
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
}

.bm-brand-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--card-accent, var(--bm-primary));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}

.bm-brand-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1);
  border-color: transparent;
}

.bm-brand-card:hover::before {
  transform: scaleX(1);
}

.bm-brand-card-logo {
  height: 60px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.bm-brand-card-logo img {
  max-height: 100%;
  max-width: 160px;
  object-fit: contain;
}

.bm-brand-card-name {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--bm-text-dark);
  margin-bottom: 4px;
}

.bm-brand-card-tagline {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--bm-primary);
  margin-bottom: 10px;
  display: block;
}

.bm-brand-card-desc {
  font-size: 0.85rem;
  color: var(--bm-text-muted);
  line-height: 1.5;
}

.bm-brand-card-arrow {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--bm-bg-light);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.bm-brand-card:hover .bm-brand-card-arrow {
  background: var(--bm-primary);
  color: #FFFFFF;
}

.bm-brand-card-arrow svg {
  width: 14px;
  height: 14px;
  color: var(--bm-text-muted);
  transition: color 0.3s ease;
}

.bm-brand-card:hover .bm-brand-card-arrow svg {
  color: #FFFFFF;
}

/* ===== 수입 브랜드 하이라이트 ===== */
.bm-imported-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}

.bm-imported-card {
  background: #FFFFFF;
  border: 1px solid var(--bm-border);
  border-radius: 14px;
  padding: 24px 20px;
  text-align: center;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.bm-imported-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}

.bm-imported-card-logo {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
}

.bm-imported-card-logo img {
  max-height: 100%;
  max-width: 120px;
  object-fit: contain;
}

.bm-imported-card-name {
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--bm-text-dark);
  margin-bottom: 4px;
}

.bm-imported-card-origin {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--bm-primary);
  background: rgba(0, 102, 179, 0.08);
  padding: 3px 10px;
  border-radius: 12px;
  margin-top: 6px;
}

/* ===== 상품 쇼케이스 ===== */
.bm-products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.bm-product-card {
  background: #FFFFFF;
  border: 1px solid var(--bm-border);
  border-radius: 14px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.bm-product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
}

.bm-product-card-image {
  height: 180px;
  background: var(--bm-bg-light);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  overflow: hidden;
}

.bm-product-card-image img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  transition: transform 0.4s ease;
}

.bm-product-card:hover .bm-product-card-image img {
  transform: scale(1.08);
}

.bm-product-card-info {
  padding: 16px;
}

.bm-product-card-brand {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--bm-primary);
  letter-spacing: 0.04em;
  margin-bottom: 4px;
}

.bm-product-card-name {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--bm-text-dark);
  line-height: 1.3;
  margin-bottom: 4px;
}

.bm-product-card-spec {
  font-size: 0.78rem;
  color: var(--bm-text-muted);
}

/* ===== 리뉴얼 마퀴(파트너 로고) ===== */
.bm-marquee-section {
  padding: 60px 0;
  background: #FFFFFF;
}

.bm-marquee-header {
  text-align: center;
  margin-bottom: 32px;
  padding: 0 48px;
}

.bm-marquee-container {
  overflow: hidden;
  position: relative;
  width: 100%;
  padding: 16px 0;
}

.bm-marquee-container::before,
.bm-marquee-container::after {
  content: '';
  position: absolute;
  top: 0;
  width: 100px;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

.bm-marquee-container::before {
  left: 0;
  background: linear-gradient(to right, #FFFFFF, transparent);
}

.bm-marquee-container::after {
  right: 0;
  background: linear-gradient(to left, #FFFFFF, transparent);
}

.bm-marquee-track {
  display: flex;
  gap: 24px;
  width: max-content;
  animation: marquee 35s linear infinite;
}

.bm-marquee-track:hover {
  animation-play-state: paused;
}

.bm-marquee-item {
  flex-shrink: 0;
  width: 140px;
  height: 68px;
  background: #FFFFFF;
  border: 1px solid var(--bm-border);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.bm-marquee-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 102, 179, 0.1);
  border-color: var(--bm-primary);
}

.bm-marquee-item img {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
}

/* ===== B2B CTA 섹션 (비대칭 Reckitt 스타일) ===== */
.bm-cta-section {
  position: relative;
  display: flex;
  min-height: 420px;
  overflow: hidden;
}

.bm-cta-blue {
  width: 50%;
  background: var(--bm-primary);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 60px 80px 60px 48px;
  position: relative;
}

.bm-cta-blue-content {
  max-width: 440px;
}

.bm-cta-blue-content .bm-cta-tag {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 14px;
  display: block;
}

.bm-cta-blue-content .bm-cta-title {
  font-size: 1.8rem;
  font-weight: 800;
  color: #FFFFFF;
  line-height: 1.35;
  margin-bottom: 14px;
  word-break: keep-all;
}

.bm-cta-blue-content .bm-cta-desc {
  font-size: 0.92rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  word-break: keep-all;
}

.bm-cta-white {
  width: 50%;
  background: var(--bm-bg-light);
  display: flex;
  align-items: center;
  padding: 60px 48px 60px 80px;
  position: relative;
}

/* CTA 곡선 구분선 */
.bm-cta-curve {
  position: absolute;
  top: 0;
  left: 47%;
  width: 10%;
  height: 100%;
  z-index: 3;
}

.bm-cta-contact-card {
  width: 100%;
  max-width: 380px;
}

.bm-contact-info-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 18px 0;
  border-bottom: 1px solid var(--bm-border);
}

.bm-contact-info-item:last-child {
  border-bottom: none;
}

.bm-contact-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(0, 102, 179, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.bm-contact-icon svg {
  width: 20px;
  height: 20px;
  color: var(--bm-primary);
}

.bm-contact-label {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--bm-text-muted);
  letter-spacing: 0.04em;
  margin-bottom: 4px;
  display: block;
}

.bm-contact-value {
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--bm-text-dark);
}

.bm-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
  padding: 14px 32px;
  background: var(--bm-primary);
  color: #FFFFFF;
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 700;
  border-radius: 50px;
  transition: all 0.3s ease;
}

.bm-cta-btn:hover {
  background: var(--bm-primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 102, 179, 0.3);
}

/* ===== 리뉴얼 푸터 개선 ===== */
.bm-footer {
  background: var(--bm-navy);
  color: #94A3B8;
  padding: 56px 48px 32px;
  border-top: 3px solid var(--bm-primary);
  font-size: 0.82rem;
}

.bm-footer-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.bm-footer-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 36px;
  gap: 32px;
  flex-wrap: wrap;
}

.bm-footer-logo {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
}

.bm-footer-logo img {
  height: 42px;
  object-fit: contain;
  background: #FFFFFF;
  padding: 4px;
  border-radius: 50%;
}

.bm-footer-logo-text {
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  color: #FFFFFF;
}

.bm-footer-info p {
  margin-bottom: 5px;
  line-height: 1.55;
  color: #CBD5E1;
}

.bm-footer-links-group {
  display: flex;
  gap: 56px;
  flex-wrap: wrap;
}

.bm-footer-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.bm-footer-col-title {
  color: #FFFFFF;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.1em;
}

.bm-footer-col a {
  color: #CBD5E1;
  text-decoration: none;
  font-size: 0.82rem;
  transition: color 0.2s ease;
}

.bm-footer-col a:hover {
  color: var(--bm-accent);
}

.bm-footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.bm-footer-bottom p {
  color: #64748B;
  font-size: 0.78rem;
}

.bm-footer-bottom-links {
  display: flex;
  gap: 24px;
}

.bm-footer-bottom-links span,
.bm-footer-bottom-links a {
  color: #94A3B8;
  text-decoration: none;
  font-size: 0.78rem;
  cursor: pointer;
  transition: color 0.2s ease;
}

.bm-footer-bottom-links span:hover,
.bm-footer-bottom-links a:hover {
  color: var(--bm-accent);
}

/* ===== 반응형 미디어쿼리 (태블릿/모바일 화면 크기별 레이아웃 조정) ===== */
@media (max-width: 1024px) {
  /* 기존 페이지 호환 */
  .daesang-header { 
    padding: 0 20px; 
    height: 64px;
  }
  .daesang-nav { gap: 12px; }
  .daesang-nav a { font-size: 0.82rem; padding: 5px 8px; }
  .daesang-sub-split, .daesang-contact-grid, .daesang-grid-brands-page { grid-template-columns: 1fr; }

  /* 리뉴얼 */
  .bm-header { padding: 0 24px; }
  .bm-brand-grid { grid-template-columns: repeat(2, 1fr); }
  .bm-imported-grid { grid-template-columns: repeat(3, 1fr); }
  .bm-products-grid { grid-template-columns: repeat(2, 1fr); }
  .bm-section { padding: 70px 24px; }
  .bm-section-title { font-size: 1.5rem; }
  .bm-hero-text-side { width: 45%; padding: 0 36px; }
  .bm-hero-video-side { width: 60%; }
  .bm-hero-curve { left: 38%; }
  .bm-cta-blue, .bm-cta-white { padding: 48px 36px; }
}

@media (max-width: 768px) {
  /* 기존 페이지 호환 */
  .pet-retail-grid { grid-template-columns: repeat(2, 1fr) !important; }
  .patents-grid { grid-template-columns: repeat(2, 1fr) !important; }
  .daesang-header {
    height: auto;
    padding: 12px 16px;
    flex-wrap: wrap;
    gap: 10px;
  }
  .daesang-nav {
    width: 100%;
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: 4px;
    justify-content: flex-start;
    gap: 6px;
    -webkit-overflow-scrolling: touch;
  }
  .daesang-nav a {
    font-size: 0.8rem;
    padding: 5px 10px;
    flex-shrink: 0;
  }
  .daesang-header-right {
    position: absolute;
    top: 12px;
    right: 16px;
  }
  .daesang-sub-hero {
    height: 260px;
    padding: 0 16px;
  }
  .daesang-sub-hero-content h1 {
    font-size: 1.4rem !important;
  }
  .daesang-sub-hero-content p {
    font-size: 0.82rem !important;
    line-height: 1.5 !important;
    word-break: keep-all;
  }
  .daesang-white-section, .daesang-gray-section {
    padding: 36px 16px;
  }
  .ci-section-grid {
    grid-template-columns: 1fr !important;
    gap: 20px !important;
  }
  .ci-info-header {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 4px !important;
  }
  .daesang-timeline-item {
    grid-template-columns: 80px 1fr;
    gap: 10px;
  }
  .timeline-year {
    font-size: 0.88rem;
  }
  .daesang-trust-grid {
    grid-template-columns: 1fr;
  }
  .daesang-section-h2 {
    font-size: 1.1rem;
    margin-bottom: 16px;
  }
  .daesang-sub-right p.daesang-lead-text,
  .daesang-sub-right p:not(.daesang-lead-text) {
    font-size: 1.15rem;
  }
  .hero-slider-container,
  .hero-slide,
  .daesang-section {
    height: 70vh !important;
    min-height: 520px !important;
  }
  .daesang-poetic-title {
    font-size: 1.5rem !important;
  }
  .daesang-poetic-desc {
    font-size: 0.88rem !important;
  }
  .daesang-grid-brands {
    grid-template-columns: 1fr !important;
  }

  /* 리뉴얼 - 모바일 */
  .bm-nav { display: none; }
  .bm-hamburger { display: flex; }
  .bm-header .bm-lang-btn { display: none; }

  .bm-hero {
    flex-direction: column;
    height: auto;
    min-height: auto;
  }
  .bm-hero-text-side {
    width: 100%;
    padding: 120px 28px 50px;
    order: 1;
  }
  .bm-hero-video-side {
    position: relative;
    width: 100%;
    height: 50vh;
    order: 2;
  }
  .bm-hero-curve { display: none; }
  .bm-hero-content .bm-hero-title {
    font-size: 1.65rem;
  }
  .bm-hero-scroll-hint { display: none; }

  .bm-section { padding: 56px 20px; }
  .bm-section-title { font-size: 1.35rem; }
  .bm-brand-grid { grid-template-columns: 1fr; }
  .bm-imported-grid { grid-template-columns: repeat(2, 1fr); }
  .bm-products-grid { grid-template-columns: repeat(2, 1fr); }

  .bm-cta-section {
    flex-direction: column;
  }
  .bm-cta-blue, .bm-cta-white {
    width: 100%;
    padding: 48px 28px;
  }
  .bm-cta-curve { display: none; }
  .bm-cta-blue { justify-content: center; }
  .bm-cta-white { justify-content: center; }

  .bm-footer {
    padding: 40px 20px 24px;
  }
  .bm-footer-row {
    flex-direction: column;
  }
  .bm-footer-links-group {
    gap: 32px;
  }

  .bm-marquee-header { padding: 0 20px; }
}

@media (max-width: 480px) {
  /* 기존 페이지 호환 */
  .daesang-logo-text {
    font-size: 0.85rem;
  }
  .daesang-sub-hero-content h1 {
    font-size: 1.25rem !important;
  }
  .daesang-sub-hero-content p {
    font-size: 0.78rem !important;
  }
  .daesang-timeline-item {
    grid-template-columns: 1fr;
    gap: 4px;
  }
  .daesang-product-catalog-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 10px;
  }
  .daesang-catalog-card {
    padding: 10px;
  }
  .catalog-card-image {
    height: 110px !important;
    padding: 8px !important;
    margin-bottom: 10px !important;
  }
  .catalog-card-header {
    font-size: 0.65rem;
    margin-bottom: 6px;
  }
  .daesang-catalog-card h3 {
    font-size: 0.78rem;
  }
  .catalog-spec {
    font-size: 0.68rem;
    margin-bottom: 6px;
  }
  .catalog-card-footer {
    font-size: 0.62rem;
    padding-top: 6px;
  }

  /* 리뉴얼 - 초소형 화면 */
  .bm-hero-content .bm-hero-title {
    font-size: 1.4rem;
  }
  .bm-hero-content .bm-hero-desc {
    font-size: 0.85rem;
  }
  .bm-imported-grid { grid-template-columns: 1fr 1fr; }
  .bm-section-title { font-size: 1.2rem; }
}`;
  css = css.substring(0, startIndex) + newStyles + css.substring(actualEndIndex);
}

fs.writeFileSync(path, css, 'utf8');
console.log('Done');
