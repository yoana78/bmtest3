// 리뉴얼 헤더 컴포넌트.
// 투명→화이트 전환 + 메가메뉴 드롭다운 + 모바일 드로어 메뉴.
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { useData } from '../context/DataContext';

export default function Header() {
  const { lang, toggleLang } = useLanguage();
  const isEn = lang === 'en';
  const { brands } = useData();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // 메가메뉴 안의 링크를 클릭해 라우트가 바뀌어도 SPA 특성상 클릭된 링크에 포커스가 남아
  // :focus-within이 계속 참이 되면서 팝업이 안 닫히는 문제 방지 — 라우트 변경 시 포커스 해제
  useEffect(() => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [location.pathname]);

  // 자체 브랜드 / 수입 브랜드 분리
  const ownBrands = brands.filter(b => b.type === 'own');
  const importedBrands = brands.filter(b => b.type === 'imported');

  // 스크롤 감지 — 50px 이상 내리면 scrolled 상태로 전환
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 모바일 드로어 열릴 때 body 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header className={`bm-header ${scrolled ? 'scrolled' : ''}`}>
        {/* 로고 */}
        <Link to="/" className="bm-logo">
          <img src="./assets/boomyung_ci_logo.png" alt="BOOMYUNG" />
          <div className="bm-logo-text">
            <span className="bm-company-name">{isEn ? 'BOOMYUNG' : '(주)부명'}</span>
            <span className="bm-company-sub">BOOMYUNG CO., LTD.</span>
          </div>
        </Link>

        {/* PC 네비게이션 */}
        <nav className="bm-nav">
          <NavLink to="/" className={({ isActive }) => `bm-nav-item ${isActive ? 'active' : ''}`} end>
            {isEn ? 'Home' : '홈'}
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `bm-nav-item ${isActive ? 'active' : ''}`}>
            {isEn ? 'About Us' : '회사소개'}
          </NavLink>

          {/* 브랜드 — 메가메뉴 (다른 네비와 동일한 NavLink bm-nav-item 구조) */}
          <NavLink
            to="/brands"
            className={({ isActive }) => `bm-nav-item bm-nav-mega-item ${isActive ? 'active' : ''}`}
          >
            {isEn ? 'Brands' : '브랜드'}
            <div className="bm-mega-menu" onClick={(e) => e.stopPropagation()}>
              <div className="bm-mega-menu-title">{isEn ? 'OUR BRANDS' : '자체 브랜드'}</div>
              <div className="bm-mega-menu-grid">
                {ownBrands.map(b => (
                  <Link key={b.id} to={`/brands/${b.id}`} className="bm-mega-menu-item">
                    {b.logo && <img src={b.logo} alt={b.nameKo} />}
                    <span className="mega-item-name">{isEn ? (b.nameEn || b.nameKo) : b.nameKo}</span>
                  </Link>
                ))}
              </div>
              {importedBrands.length > 0 && (
                <>
                  <div className="bm-mega-menu-title" style={{ marginTop: '18px' }}>
                    {isEn ? 'IMPORTED BRANDS' : '수입 브랜드'}
                  </div>
                  <div className="bm-mega-menu-grid">
                    {importedBrands.map(b => (
                      <Link key={b.id} to={`/imported-brands/${b.id}`} className="bm-mega-menu-item">
                        {b.logo && <img src={b.logo} alt={b.nameKo} />}
                        <span className="mega-item-name">{isEn ? (b.nameEn || b.nameKo) : b.nameKo}</span>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </NavLink>

          <NavLink to="/catalog" className={({ isActive }) => `bm-nav-item ${isActive ? 'active' : ''}`}>
            {isEn ? 'Products' : '제품 카탈로그'}
          </NavLink>
          <NavLink to="/trust" className={({ isActive }) => `bm-nav-item ${isActive ? 'active' : ''}`}>
            {isEn ? 'Trust & Cert' : '신뢰와 인증'}
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `bm-nav-item ${isActive ? 'active' : ''}`}>
            {isEn ? 'Contact' : '문의하기'}
          </NavLink>
        </nav>

        {/* 언어 전환 */}
        <button className="bm-lang-btn" onClick={toggleLang} title={isEn ? 'Switch to Korean' : 'Switch to English'}>
          {isEn ? 'EN' : 'KR'}
        </button>

        {/* 모바일 햄버거 */}
        <button
          className={`bm-hamburger ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </header>

      {/* 모바일 드로어 오버레이 */}
      <div
        className={`bm-mobile-drawer-overlay ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* 모바일 드로어 */}
      <nav className={`bm-mobile-drawer ${mobileOpen ? 'open' : ''}`}>
        <NavLink to="/" className="bm-mobile-nav-item" onClick={() => setMobileOpen(false)} end>
          {isEn ? 'Home' : '홈'}
        </NavLink>
        <NavLink to="/about" className="bm-mobile-nav-item" onClick={() => setMobileOpen(false)}>
          {isEn ? 'About Us' : '회사소개'}
        </NavLink>
        <NavLink to="/brands" className="bm-mobile-nav-item" onClick={() => setMobileOpen(false)}>
          {isEn ? 'Brands' : '브랜드'}
        </NavLink>
        {/* 모바일 브랜드 서브메뉴 */}
        <div className="bm-mobile-sub-items">
          {brands.map(b => (
            <Link
              key={b.id}
              to={b.type === 'own' ? `/brands/${b.id}` : `/imported-brands/${b.id}`}
              className="bm-mobile-sub-item"
              onClick={() => setMobileOpen(false)}
            >
              {b.logo && <img src={b.logo} alt={b.nameKo} />}
              <span>{isEn ? (b.nameEn || b.nameKo) : b.nameKo}</span>
            </Link>
          ))}
        </div>
        <NavLink to="/catalog" className="bm-mobile-nav-item" onClick={() => setMobileOpen(false)}>
          {isEn ? 'Products' : '제품 카탈로그'}
        </NavLink>
        <NavLink to="/trust" className="bm-mobile-nav-item" onClick={() => setMobileOpen(false)}>
          {isEn ? 'Trust & Certification' : '신뢰와 인증'}
        </NavLink>
        <NavLink to="/contact" className="bm-mobile-nav-item" onClick={() => setMobileOpen(false)}>
          {isEn ? 'Contact' : '문의하기'}
        </NavLink>
        <div style={{ marginTop: '24px' }}>
          <button className="bm-lang-btn" onClick={toggleLang}
            style={{ background: '#F1F5F9', border: '1px solid #E5E7EB', color: '#1A1A2E', width: '100%', padding: '10px' }}>
            {isEn ? 'English → 한국어' : '한국어 → English'}
          </button>
        </div>
      </nav>
    </>
  );
}
