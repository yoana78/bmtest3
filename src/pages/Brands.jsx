// 리뉴얼 브랜드 포트폴리오 페이지 (Brands Renewal 2026)
// 1. 역동적 서브 히어로 (투명 헤더 연동 + 시네마틱 다크 틴트)
// 2. 통합/자체/수입 탭 필터 (전체 9개 브랜드 카운트 배지 포함)
// 3. 국내 자체 브랜드 섹션 (2열 프리미엄 쇼케이스 카드: 로고, 슬로건, 소개, 제품 수 배지, 호버 인터랙션)
// 4. 해외 수입 브랜드 섹션 (3열 국가별 플래그 원산지 칩 + 미니멀 럭셔리 카드)
// 5. 스크롤 진입 인터랙티브 애니메이션 적용

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { useData } from '../context/DataContext';

// 수입 브랜드 원산지 정보 매핑
const originMap = {
  ninaottosson: { ko: '스웨덴', en: 'Sweden', flag: '🇸🇪' },
  dono: { ko: '중국', en: 'China', flag: '🇨🇳' },
  reflex: { ko: '터키', en: 'Turkey', flag: '🇹🇷' },
  sulfodene: { ko: '미국', en: 'USA', flag: '🇺🇸' },
  petstage: { ko: '미국', en: 'USA', flag: '🇺🇸' }
};

export default function Brands() {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const { brands: allBrands, products } = useData();

  // 'all' | 'own' | 'imported' 필터 탭
  const [filter, setFilter] = useState('all');

  const ownBrands = allBrands.filter(b => b.type === 'own' || b.type !== 'imported');
  const importedBrands = allBrands.filter(b => b.type === 'imported');

  // 각 브랜드별 등록 제품 수 계산 함수
  const getProductCount = (brandId) => {
    if (!products) return 0;
    return products.filter(p => p.brandId === brandId).length;
  };

  return (
    <div className="bm-brands-page">
      {/* ====== 1. 서브 히어로 (Sub Hero) ====== */}
      <section
        className="bm-sub-hero"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=2560&q=80')"
        }}
      >
        <div className="bm-sub-hero-overlay" />
        <div className="bm-sub-hero-content animate-on-scroll fade-up is-visible">
          <span className="bm-sub-hero-tag">OUR BRAND ECOSYSTEM</span>
          <h1 className="bm-sub-hero-title">
            {isEn ? 'Global Brand Portfolio' : '신뢰와 품질로 완성한 브랜드 포트폴리오'}
          </h1>
          <p className="bm-sub-hero-desc">
            {isEn
              ? 'From authentic in-house pet care brands to globally proven imports, introducing BOOMYOUNG’s comprehensive lineup.'
              : '부명이 직접 연구·제조하는 자체 브랜드부터 전 세계에서 엄선한 프리미엄 수입 브랜드까지, 모든 반려동물의 건강하고 행복한 삶을 위한 라인업을 소개합니다.'}
          </p>
        </div>
      </section>

      <div className="bm-container">
        {/* ====== 2. 상단 브랜드 분류 탭 필터 바 ====== */}
        <div className="bm-brands-filter-wrap">
          <div className="bm-brands-filter-bar">
            <button
              className={`bm-brands-filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              {isEn ? 'All Brands' : '전체 브랜드'}
              <span className="bm-filter-count">{allBrands.length}</span>
            </button>
            <button
              className={`bm-brands-filter-btn ${filter === 'own' ? 'active' : ''}`}
              onClick={() => setFilter('own')}
            >
              {isEn ? 'Premium In-House Brands' : '자사 프리미엄 브랜드'}
              <span className="bm-filter-count">{ownBrands.length}</span>
            </button>
            <button
              className={`bm-brands-filter-btn ${filter === 'imported' ? 'active' : ''}`}
              onClick={() => setFilter('imported')}
            >
              {isEn ? 'Imported Brands' : '해외 수입 브랜드'}
              <span className="bm-filter-count">{importedBrands.length}</span>
            </button>
          </div>
        </div>

        {/* ====== 3. 자사 프리미엄 브랜드 섹션 ====== */}
        {(filter === 'all' || filter === 'own') && (
          <section className="bm-section" style={{ paddingTop: '0', paddingBottom: filter === 'all' ? '60px' : '100px' }}>
            <div className="bm-brands-group-header">
              <div>
                <span className="bm-group-tag">DOMESTIC PREMIUM BRANDS</span>
                <h2 className="bm-group-title">
                  {isEn ? 'In-House Premium Brands' : '부명 자사 프리미엄 브랜드'}
                </h2>
              </div>
              <p className="bm-group-desc">
                {isEn
                  ? 'Certified manufacturing and proprietary R&D ensuring premium nutrition and specialized care.'
                  : '자체 R&D 연구소와 최첨단 제조 설비에서 원칙을 지켜 생산하는 대한민국 대표 펫 케어 브랜드입니다.'}
              </p>
            </div>

            <div className="bm-own-brands-grid">
              {ownBrands.map((b) => {
                const count = getProductCount(b.id);
                return (
                  <Link
                    key={b.id}
                    to={`/brands/${b.id}`}
                    className="bm-own-brand-card"
                    style={{ '--brand-accent': b.color || 'var(--bm-primary)' }}
                  >
                    <div>
                      <div className="bm-own-brand-top">
                        <div className="bm-own-brand-logo-wrap">
                          {b.logo ? (
                            <img
                              src={b.logo}
                              alt={b.nameKo}
                              style={{ transform: `scale(${b.logoScale || 1})` }}
                            />
                          ) : (
                            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: b.color }}>
                              {b.nameKo}
                            </span>
                          )}
                        </div>
                      </div>

                      <h3 className="bm-own-brand-name">
                        {isEn ? (b.nameEn || b.nameKo) : b.nameKo}
                        <small>{isEn ? b.nameKo : b.nameEn}</small>
                      </h3>
                      <span className="bm-own-brand-tagline">
                        {isEn ? (b.taglineEn || b.tagline) : b.tagline}
                      </span>
                      <p className="bm-own-brand-desc">
                        {isEn ? b.descriptionEn : b.descriptionKo}
                      </p>
                    </div>

                    <div className="bm-own-brand-footer">
                      <span className="bm-brand-product-count">
                        {count > 0 ? (isEn ? `${count} Products` : `등록 제품 ${count}개`) : (isEn ? 'Verified Quality' : '품질 인증')}
                      </span>
                      <span className="bm-brand-link-arrow">
                        {isEn ? 'View Products' : '제품 라인업 보기'}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* ====== 4. 해외 수입 브랜드 섹션 ====== */}
        {(filter === 'all' || filter === 'imported') && (
          <section className="bm-section" style={{ paddingTop: filter === 'all' ? '20px' : '0', paddingBottom: '100px' }}>
            <div className="bm-brands-group-header">
              <div>
                <span className="bm-group-tag" style={{ color: '#0284C7' }}>GLOBAL IMPORTED BRANDS</span>
                <h2 className="bm-group-title">
                  {isEn ? 'Global Partner Brands' : '해외 엄선 수입 브랜드'}
                </h2>
              </div>
              <p className="bm-group-desc">
                {isEn
                  ? 'Globally renowned pet brands officially imported and distributed with strict quality verification.'
                  : '스웨덴, 미국 등 전 세계에서 품질과 전문성을 인정받아 부명이 공식 수입·공급하는 글로벌 파트너 브랜드입니다.'}
              </p>
            </div>

            <div className="bm-imported-brands-grid">
              {importedBrands.map((b) => {
                const origin = originMap[b.id];
                const count = getProductCount(b.id);
                return (
                  <Link
                    key={b.id}
                    to={`/imported-brands/${b.id}`}
                    className="bm-imported-brand-card"
                  >
                    <div>
                      <div className="bm-imported-brand-top">
                        <div className="bm-imported-logo-wrap">
                          {b.logo ? (
                            <img
                              src={b.logo}
                              alt={b.nameKo}
                              style={{ transform: `scale(${b.logoScale || 1})` }}
                            />
                          ) : (
                            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: b.color }}>
                              {b.nameKo}
                            </span>
                          )}
                        </div>
                      </div>

                      <h3 className="bm-imported-name">
                        {isEn ? (b.nameEn || b.nameKo) : b.nameKo}
                      </h3>
                      <span className="bm-imported-tagline">
                        {isEn ? (b.taglineEn || b.tagline) : b.tagline}
                      </span>
                      <p className="bm-imported-desc">
                        {isEn ? b.descriptionEn : b.descriptionKo}
                      </p>
                    </div>

                    <div className="bm-imported-footer">
                      <span className="bm-brand-product-count">
                        {count > 0 ? (isEn ? `${count} Products` : `제품 ${count}개`) : (isEn ? 'Global Partner' : '글로벌 정품')}
                      </span>
                      <span className="bm-brand-link-arrow">
                        {isEn ? 'Explore' : '자세히 보기'}
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
