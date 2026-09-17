import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { useData } from '../context/DataContext';
import { products } from '../data/products';
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation';
import { usePageContent } from '../content/usePageContent';
import { useSiteList } from '../content/siteLists';
import b2bBuildingImg from '../assets/b2b_building.jpg';

export default function Home() {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const { brands } = useData();
  const { txt } = usePageContent('home');
  const partners = useSiteList('partners');
  const petRetailPartners = useSiteList('petRetailPartners');

  const ownBrands = brands.filter(b => b.type === 'own');
  const importedBrands = brands.filter(b => b.type === 'imported');

  // 전체 상품 리스트에서 6개 제품 랜덤 선택 (우측 3열 x 2행 바둑판 그리드)
  const featuredProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  }, []);

  // 히어로 타이틀 타이핑 효과
  const fullHeroTitle = txt('heroTitle');

  const [typedTitle, setTypedTitle] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    setTypedTitle('');
    setIsTypingComplete(false);
    let index = 0;
    const typingInterval = setInterval(() => {
      index++;
      setTypedTitle(fullHeroTitle.slice(0, index));
      if (index >= fullHeroTitle.length) {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, isEn ? 75 : 120);

    return () => clearInterval(typingInterval);
  }, [fullHeroTitle, isEn]);

  // Scroll animation refs
  const infraRow1Ref = useStaggerAnimation({ staggerDelay: 180, threshold: 0.15 });
  const infraRow2Ref = useStaggerAnimation({ staggerDelay: 180, threshold: 0.15 });
  const infraRow3Ref = useStaggerAnimation({ staggerDelay: 180, threshold: 0.15 });
  const infraRow4Ref = useStaggerAnimation({ staggerDelay: 180, threshold: 0.15 });
  const brandsSectionRef = useStaggerAnimation({ staggerDelay: 120 });
  const importedSectionRef = useStaggerAnimation({ staggerDelay: 100 });
  const productsSectionRef = useStaggerAnimation({ staggerDelay: 80 });
  const marqueeRef = useScrollAnimation();
  const ctaRef = useScrollAnimation();

  // Partner marquee duplication for infinite scroll
  const marqueePartners = [...partners, ...partners];
  const marqueePetRetailPartners = [...petRetailPartners, ...petRetailPartners];

  // 인프라 섹션 이미지 갤러리 및 비디오 모달 상태
  const homadImages = [
    './assets/homad/homad_01.jpg',
    './assets/homad/homad_02.jpg',
    './assets/homad/homad_03.jpg',
    './assets/homad/homad_04.jpg'
  ];
  const wellzenImages = [
    './assets/wellzen/wellzen_01.jpg',
    './assets/wellzen/wellzen_02.jpg'
  ];
  const qingdaoImages = [
    './assets/china/qingdao-factory.jpg',
    './assets/china/sand_factory_02.jpg'
  ];

  const [homadSlideIdx, setHomadSlideIdx] = useState(0);
  const [wellzenSlideIdx, setWellzenSlideIdx] = useState(0);
  const [qingdaoSlideIdx, setQingdaoSlideIdx] = useState(0);

  // 각 섹션 이미지가 동시에 로테이션되지 않고 순차적으로 전환되도록 인터벌 및 시작 시간 시차 부여
  useEffect(() => {
    // 호마드: 4초 주기
    const homadTimer = setInterval(() => {
      setHomadSlideIdx(prev => (prev + 1) % homadImages.length);
    }, 4000);

    // 웰젠: 2초 지연 후 시작하여 호마드와 2초 간격으로 순차 전환되도록 설정
    let wellzenTimer = null;
    const startDelay = setTimeout(() => {
      setWellzenSlideIdx(prev => (prev + 1) % wellzenImages.length);
      wellzenTimer = setInterval(() => {
        setWellzenSlideIdx(prev => (prev + 1) % wellzenImages.length);
      }, 4000);
    }, 2000);

    // 칭다오 공장: 1초 지연 후 시작하여 3.5초 주기로 슬라이드 전환
    let qingdaoTimer = null;
    const qingdaoDelay = setTimeout(() => {
      setQingdaoSlideIdx(prev => (prev + 1) % qingdaoImages.length);
      qingdaoTimer = setInterval(() => {
        setQingdaoSlideIdx(prev => (prev + 1) % qingdaoImages.length);
      }, 3500);
    }, 1000);

    return () => {
      clearInterval(homadTimer);
      clearTimeout(startDelay);
      clearTimeout(qingdaoDelay);
      if (wellzenTimer) clearInterval(wellzenTimer);
      if (qingdaoTimer) clearInterval(qingdaoTimer);
    };
  }, [homadImages.length, wellzenImages.length, qingdaoImages.length]);

  // 라이트박스 및 비디오 모달 상태
  const [galleryImages, setGalleryImages] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const closeGallery = () => setGalleryImages(null);
  const prevGalleryImage = () => setGalleryIndex(i => (i - 1 + galleryImages.length) % galleryImages.length);
  const nextGalleryImage = () => setGalleryIndex(i => (i + 1) % galleryImages.length);
  const [showLogisticsVideo, setShowLogisticsVideo] = useState(false);

  return (
    <div className="bm-home">
      {/* 물류센터 팝업 영상 프리로드용 */}
      <video src="./assets/logistics/logistics.mp4" preload="auto" muted style={{ display: 'none' }} />

      {/* ====== SECTION 1: 영상 히어로 (풀화면 비디오 + 타이핑 효과) ====== */}
      <section className="bm-hero">
        {/* 풀화면 비디오 배경 */}
        <div className="bm-hero-video-bg">
          <video autoPlay muted loop playsInline>
            <source src="./data/dog-treat-fireplace.mp4" type="video/mp4" />
          </video>
        </div>

        {/* 시네마틱 다크 그라데이션 오버레이 */}
        <div className="bm-hero-overlay" />

        {/* 비디오 위 텍스트 컨테이너 */}
        <div className="bm-hero-text-container">
          <div className="bm-hero-content">
            <span className="bm-hero-sub">{txt('heroSub')}</span>
            <h1 className="bm-hero-title">
              {typedTitle.split('\n').map((line, idx, arr) => (
                <React.Fragment key={idx}>
                  {line}
                  {idx < arr.length - 1 && <br />}
                </React.Fragment>
              ))}
              {!isTypingComplete && <span className="bm-typing-cursor" />}
            </h1>
            <p className="bm-hero-desc" style={{ whiteSpace: 'pre-line' }}>
              {txt('heroBody')}
            </p>
            <Link to="/brands" className="bm-hero-cta">
              <span>{txt('heroButton')}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>

        {/* 스크롤 힌트 */}
        <div className="bm-hero-scroll-hint">
          <div className="bm-scroll-dot" />
          <span>SCROLL</span>
        </div>
      </section>

      {/* ====== SECTION: 생산 및 R&D 인프라 (INFRASTRUCTURE) ====== */}
      <section className="bm-section bm-section-light bm-infra-section">
        <div className="bm-container">
          <div className="bm-section-header" style={{ marginBottom: '36px' }}>
            <span className="bm-section-tag">{txt('infraEyebrow')}</span>
            <h2 className="bm-section-title">
              {txt('infraTitle')}
            </h2>
            <p className="bm-section-desc" style={{ whiteSpace: 'pre-line' }}>
              {txt('infraBody')}
            </p>
          </div>

          <div className="bm-infra-grid">
            {/* ROW 1: [좌] PET FEED FACTORY | [우] 호마드 공장 이미지 로테이션 */}
            <div className="bm-infra-row" ref={infraRow1Ref}>
              <div className="bm-infra-card bm-infra-text-card animate-child slide-left">
                <span className="bm-infra-code">PET FEED FACTORY</span>
                <h3 className="bm-infra-title">{isEn ? 'Pet Food & Snack Factory' : '사료 및 식품 제조공장'}</h3>
                <p className="bm-infra-desc">
                  {isEn
                    ? 'Pet food and treats OEM/ODM factory holding ISO 22000 and HACCP certifications.'
                    : '펫 사료 및 간식 OEM/ODM 공장으로 ISO 22000 및 HACCP 인증을 보유하고 있습니다.'}
                </p>
                <div className="bm-infra-tags">
                  <span className="bm-infra-tag bm-tag-blue">ISO 22000</span>
                  <span className="bm-infra-tag bm-tag-blue">HACCP</span>
                </div>
              </div>

              <div
                className="bm-infra-card bm-infra-media-card animate-child slide-right"
                onClick={() => { setGalleryImages(homadImages); setGalleryIndex(homadSlideIdx); }}
                title={isEn ? 'Click to view gallery' : '클릭하여 사진 크게보기'}
              >
                {homadImages.map((src, idx) => (
                  <img
                    key={src}
                    src={src}
                    alt={`Homad Factory ${idx + 1}`}
                    className={`bm-infra-slide-img ${idx === homadSlideIdx ? 'active' : ''}`}
                  />
                ))}
                <div className="bm-infra-slide-indicators">
                  {homadImages.map((_, idx) => (
                    <span
                      key={idx}
                      className={`bm-infra-indicator ${idx === homadSlideIdx ? 'active' : ''}`}
                      onClick={(e) => { e.stopPropagation(); setHomadSlideIdx(idx); }}
                    />
                  ))}
                </div>
                <div className="bm-infra-zoom-hint">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </div>
              </div>
            </div>

            {/* ROW 2: [좌] 웰젠 R&D 이미지 로테이션 | [우] R&D CENTER */}
            <div className="bm-infra-row" ref={infraRow2Ref}>
              <div
                className="bm-infra-card bm-infra-media-card animate-child slide-left"
                onClick={() => { setGalleryImages(wellzenImages); setGalleryIndex(wellzenSlideIdx); }}
                title={isEn ? 'Click to view gallery' : '클릭하여 사진 크게보기'}
              >
                {wellzenImages.map((src, idx) => (
                  <img
                    key={src}
                    src={src}
                    alt={`Wellzen R&D ${idx + 1}`}
                    className={`bm-infra-slide-img ${idx === wellzenSlideIdx ? 'active' : ''}`}
                  />
                ))}
                <div className="bm-infra-slide-indicators">
                  {wellzenImages.map((_, idx) => (
                    <span
                      key={idx}
                      className={`bm-infra-indicator ${idx === wellzenSlideIdx ? 'active' : ''}`}
                      onClick={(e) => { e.stopPropagation(); setWellzenSlideIdx(idx); }}
                    />
                  ))}
                </div>
                <div className="bm-infra-zoom-hint">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </div>
              </div>

              <div className="bm-infra-card bm-infra-text-card animate-child slide-right">
                <span className="bm-infra-code">R&amp;D CENTER</span>
                <h3 className="bm-infra-title">{isEn ? 'R&D Center' : 'R&D연구소'}</h3>
                <p className="bm-infra-desc">
                  {isEn
                    ? 'Specialized pet research laboratory leading quality verification and core technology development.'
                    : '반려동물 전문 연구소로 고품질 원료 검증 및 기술 개발을 주도합니다.'}
                </p>
                <div className="bm-infra-tags">
                  <span className="bm-infra-tag bm-tag-blue">{isEn ? 'Healthcare R&D' : '헬스케어 R&D'}</span>
                  <span className="bm-infra-tag bm-tag-blue">{isEn ? 'Raw Material Tech' : '원료가공 기술'}</span>
                </div>
              </div>
            </div>

            {/* ROW 3: [좌] LOGISTICS CENTER | [우] 물류센터 동영상 자동재생 */}
            <div className="bm-infra-row" ref={infraRow3Ref}>
              <div className="bm-infra-card bm-infra-text-card animate-child slide-left">
                <span className="bm-infra-code">LOGISTICS CENTER</span>
                <h3 className="bm-infra-title">{isEn ? 'Integrated Logistics Center' : '통합 물류센터'}</h3>
                <p className="bm-infra-desc">
                  {isEn
                    ? 'Systematic inventory management and an optimized logistics system deliver a safe, fast delivery network.'
                    : '체계적인 재고관리와 최적화된 물류시스템을 통해 안전하고 신속한 배송네트워크를 제공합니다.'}
                </p>
                <div className="bm-infra-tags">
                  <span className="bm-infra-tag bm-tag-blue">{isEn ? 'Nationwide Network' : '전국 공급망'}</span>
                  <span className="bm-infra-tag bm-tag-blue">{isEn ? 'Global Network' : '글로벌 공급망'}</span>
                </div>
              </div>

              <div
                className="bm-infra-card bm-infra-media-card bm-infra-video-card animate-child slide-right"
                onClick={() => setShowLogisticsVideo(true)}
                title={isEn ? 'Click to play full video' : '클릭하여 영상 전체화면 재생'}
              >
                <video
                  src="./assets/logistics/logistics.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="bm-infra-video"
                />
              </div>
            </div>

            {/* ROW 4: [좌] 칭다오 공장 이미지 로테이션 | [우] GLOBAL NETWORK */}
            <div className="bm-infra-row" ref={infraRow4Ref}>
              <div
                className="bm-infra-card bm-infra-media-card animate-child slide-left"
                onClick={() => { setGalleryImages(qingdaoImages); setGalleryIndex(qingdaoSlideIdx); }}
                title={isEn ? 'Click to view photo' : '클릭하여 사진 크게보기'}
              >
                {qingdaoImages.map((src, idx) => (
                  <img
                    key={src}
                    src={src}
                    alt={`Qingdao Factory ${idx + 1}`}
                    className={`bm-infra-slide-img ${idx === qingdaoSlideIdx ? 'active' : ''}`}
                  />
                ))}
                <div className="bm-infra-slide-indicators">
                  {qingdaoImages.map((_, idx) => (
                    <span
                      key={idx}
                      className={`bm-infra-indicator ${idx === qingdaoSlideIdx ? 'active' : ''}`}
                      onClick={(e) => { e.stopPropagation(); setQingdaoSlideIdx(idx); }}
                    />
                  ))}
                </div>
                <div className="bm-infra-zoom-hint">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </div>
              </div>

              <div className="bm-infra-card bm-infra-text-card animate-child slide-right">
                <span className="bm-infra-code">GLOBAL NETWORK</span>
                <h3 className="bm-infra-title">{isEn ? 'Qingdao Plant' : '칭다오 공장'}</h3>
                <p className="bm-infra-desc">
                  {isEn
                    ? 'Cat litter production and pet supply OEM/ODM factory.'
                    : '고양이 모래 생산 및 펫 용품 OEM/ODM 공장입니다.'}
                </p>
                <div className="bm-infra-tags">
                  <span className="bm-infra-tag bm-tag-amber">{isEn ? 'Hygiene Products' : '위생용품'}</span>
                  <span className="bm-infra-tag bm-tag-amber">{isEn ? 'Global OEM/ODM' : '글로벌 OEM/ODM'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== SECTION 2: 브랜드(좌측 지그재그) + 대표 상품(우측 3열 바둑판) 통합 스플릿 섹션 ====== */}
      <section className="bm-section bm-section-white">
        <div className="bm-container">
          {/* 섹션 상단 공통 헤더 */}
          <div className="bm-section-header" style={{ marginBottom: '36px' }}>
            <span className="bm-section-tag">{txt('coreEyebrow')}</span>
            <h2 className="bm-section-title">
              {txt('coreTitle')}
            </h2>
            <p className="bm-section-desc" style={{ whiteSpace: 'pre-line' }}>
              {txt('coreBody')}
            </p>
          </div>

          <div className="bm-split-section">
            {/* 좌측: 자체 브랜드 4개 지그재그 레이아웃 */}
            <div className="bm-split-brands-col">
              <div className="bm-brand-zigzag-list" ref={brandsSectionRef}>
                {ownBrands.map((b, idx) => (
                  <Link
                    key={b.id}
                    to={`/brands/${b.id}`}
                    className={`bm-brand-card-zigzag ${idx % 2 === 0 ? 'zigzag-left' : 'zigzag-right'} animate-child`}
                    style={{ '--card-accent': b.color }}
                  >
                    <div className="bm-brand-zigzag-logo">
                      {b.logo && <img src={b.logo} alt={b.nameKo} style={{ transform: `scale(${b.logoScale || 1})` }} />}
                    </div>
                    <div className="bm-brand-zigzag-info">
                      <h3 className="bm-brand-zigzag-name">
                        {isEn ? (b.nameEn || b.nameKo) : b.nameKo}
                      </h3>
                      <span className="bm-brand-zigzag-tagline">{b.tagline}</span>
                      <p className="bm-brand-zigzag-desc">
                        {isEn ? b.descriptionEn : b.descriptionKo}
                      </p>
                    </div>
                    <div className="bm-brand-zigzag-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 우측: 상품 3열 바둑판 (3열 x 2행 = 6개) - 상단 텍스트 삭제 및 위아래 지그재그 애니메이션 */}
            <div className="bm-split-products-col">
              <div className="bm-products-bento-grid" ref={productsSectionRef}>
                {featuredProducts.map((product, idx) => {
                  const brand = brands.find(b => b.id === product.brandId);
                  const brandName = brand ? (isEn ? (brand.nameEn || brand.nameKo) : brand.nameKo) : '';
                  const zigzagClass = idx % 2 === 0 ? 'product-zigzag-up' : 'product-zigzag-down';
                  return (
                    <Link
                      key={product.id}
                      to={`/catalog/${product.id}`}
                      className={`bm-product-card-compact animate-child ${zigzagClass}`}
                    >
                      <div className="bm-product-card-image">
                        {product.image ? (
                          <img src={product.image} alt={product.nameKo} />
                        ) : (
                          <div className="bm-placeholder-image" />
                        )}
                      </div>
                      <div className="bm-product-card-info">
                        <span className="bm-product-card-brand">{brandName}</span>
                        <h3 className="bm-product-card-name">
                          {isEn ? (product.nameEn || product.nameKo) : product.nameKo}
                        </h3>
                        <span className="bm-product-card-spec">{product.spec}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== SECTION 3: 수입 브랜드 하이라이트 ====== */}
      <section className="bm-section bm-section-light">
        <div className="bm-container">
          <div className="bm-section-header">
            <span className="bm-section-tag">{txt('importedEyebrow')}</span>
            <h2 className="bm-section-title">
              {txt('importedTitle')}
            </h2>
            <p className="bm-section-desc" style={{ whiteSpace: 'pre-line' }}>
              {txt('importedBody')}
            </p>
          </div>
          <div className="bm-imported-grid" ref={importedSectionRef}>
            {importedBrands.map((b) => (
              <Link
                key={b.id}
                to={`/imported-brands/${b.id}`}
                className="bm-imported-card animate-child"
              >
                <div className="bm-imported-card-logo">
                  {b.logo && <img src={b.logo} alt={b.nameKo} style={{ transform: `scale(${b.logoScale || 1})` }} />}
                </div>
                <h3 className="bm-imported-card-name">
                  {isEn ? (b.nameEn || b.nameKo) : b.nameKo}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ====== SECTION 4: 파트너 로고 마퀴 ====== */}
      <section className="bm-marquee-section animate-on-scroll fade-up" ref={marqueeRef}>
        {/* 국내 대형 유통 파트너 */}
        <div className="bm-marquee-header">
          <span className="bm-section-tag" style={{ textAlign: 'center', display: 'block' }}>
            TRUSTED BY MAJOR RETAIL NETWORKS
          </span>
          <h2 className="bm-section-title" style={{ textAlign: 'center' }}>
            {txt('retailTitle')}
          </h2>
          <p className="bm-section-desc" style={{ textAlign: 'center', margin: '0 auto', whiteSpace: 'pre-line' }}>
            {txt('retailBody')}
          </p>
        </div>

        {/* 대형 유통사 마퀴 */}
        <div className="bm-marquee-container">
          <div className="bm-marquee-track">
            {marqueePartners.map((p, idx) => (
              <div key={`${p.id}-${idx}`} className="bm-marquee-item bm-marquee-item-retail" title={isEn ? p.nameEn : p.nameKo}>
                <img src={p.logo} alt={p.nameKo} style={{ transform: `scale(${Number(p.logoScale) || 1})` }} />
              </div>
            ))}
          </div>
        </div>

        {/* 국내 펫 전문 유통사 */}
        <div className="bm-marquee-header" style={{ marginTop: '56px', marginBottom: '28px' }}>
          <span className="bm-section-tag" style={{ textAlign: 'center', display: 'block' }}>
            TRUSTED BY PET SPECIALTY DISTRIBUTORS
          </span>
          <h2 className="bm-section-title" style={{ textAlign: 'center' }}>
            {txt('petRetailTitle')}
          </h2>
          <p className="bm-section-desc" style={{ textAlign: 'center', margin: '0 auto', whiteSpace: 'pre-line' }}>
            {txt('petRetailBody')}
          </p>
        </div>

        {/* 펫 전문 유통사 마퀴 */}
        <div className="bm-marquee-container">
          <div className="bm-marquee-track" style={{ animationDirection: 'reverse' }}>
            {marqueePetRetailPartners.map((p, idx) => (
              <div key={`pet-${p.id}-${idx}`} className="bm-marquee-item bm-marquee-item-pet" title={isEn ? p.nameEn : p.nameKo}>
                {p.logo ? (
                  <img src={p.logo} alt={p.nameKo} style={{ transform: `scale(${Number(p.logoScale) || 1})` }} />
                ) : (
                  <span style={{ fontSize: '0.66rem', color: '#CBD5E1', fontWeight: 600 }}>
                    {isEn ? 'Coming Soon' : '로고 추가 예정'}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== SECTION 6: B2B 파트너십 섹션 ====== */}
      <section className="bm-b2b-section animate-on-scroll fade-up" ref={ctaRef}>
        <div className="bm-b2b-container">
          <div className="bm-b2b-main">
            {/* 좌측: 빌딩 배경 + 타이틀 영역 */}
            <div className="bm-b2b-left" style={{ backgroundImage: `url(${b2bBuildingImg})` }}>
              <div className="bm-b2b-left-content">
                <span className="bm-b2b-tag">{txt('b2bTag')}</span>
                <h2 className="bm-b2b-title" style={{ whiteSpace: 'pre-line' }}>
                  {txt('b2bTitle')}
                </h2>
                <p className="bm-b2b-desc" style={{ whiteSpace: 'pre-line' }}>
                  {txt('b2bBody')}
                </p>
              </div>
            </div>

            {/* 우측: 명함 2장 가로 나란히 배치 */}
            <div className="bm-b2b-right">
              <div className="bm-b2b-cards-grid">
                {/* 영업1팀 명함 */}
                <div
                  className="bm-biz-card"
                  onClick={() => {
                    const cardImg = isEn ? './assets/business_cards/team2_en.png' : './assets/business_cards/team2_kr.png';
                    setGalleryImages([cardImg]);
                    setGalleryIndex(0);
                  }}
                  title={isEn ? 'Click to enlarge business card' : '클릭하여 명함 크게보기'}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="bm-biz-card-img-wrap">
                    <img
                      src={isEn ? './assets/business_cards/team2_en.png' : './assets/business_cards/team2_kr.png'}
                      alt={isEn ? 'Sales Team 1 Business Card' : '영업1팀 명함'}
                    />
                  </div>
                  <div className="bm-biz-card-meta">
                    <span className="bm-biz-card-badge">{isEn ? 'Domestic Retail' : '국내 유통'}</span>
                    <p className="bm-biz-card-desc">
                      {isEn
                        ? 'Hypermarkets, convenience stores, and domestic e-commerce channels.'
                        : '대형 할인마트, 편의점 및 국내 이커머스 입점 총괄'}
                    </p>
                  </div>
                </div>

                {/* 영업2팀 명함 */}
                <div
                  className="bm-biz-card"
                  onClick={() => {
                    const cardImg = isEn ? './assets/business_cards/team1_en.png' : './assets/business_cards/team1_kr.png';
                    setGalleryImages([cardImg]);
                    setGalleryIndex(0);
                  }}
                  title={isEn ? 'Click to enlarge business card' : '클릭하여 명함 크게보기'}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="bm-biz-card-img-wrap">
                    <img
                      src={isEn ? './assets/business_cards/team1_en.png' : './assets/business_cards/team1_kr.png'}
                      alt={isEn ? 'Sales Team 2 Business Card' : '영업2팀 명함'}
                    />
                  </div>
                  <div className="bm-biz-card-meta">
                    <span className="bm-biz-card-badge">{isEn ? 'Global & OEM' : '글로벌 · OEM'}</span>
                    <p className="bm-biz-card-desc">
                      {isEn
                        ? 'Global exports, overseas buyer inquiries, and OEM/ODM projects.'
                        : '해외 수출, 글로벌 바이어 제휴 및 OEM/ODM 생산 협력'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 하단: Image 4 스타일 안내 문구 및 문의 버튼 */}
          <div className="bm-b2b-bottom">
            <p className="bm-b2b-bottom-text" style={{ whiteSpace: 'pre-line' }}>
              {txt('b2bBottomText')}
            </p>
            <Link to="/contact" className="bm-b2b-bottom-btn">
              <span>{txt('b2bButton')}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION: 물류센터 소개 영상 팝업 */}
      {showLogisticsVideo && (
        <div className="modal-backdrop" onClick={() => setShowLogisticsVideo(false)}>
          <div
            className="modal-content"
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '860px', width: '90%', background: '#000000', padding: 0, borderRadius: '10px', overflow: 'hidden' }}
          >
            <button className="modal-close-btn" onClick={() => setShowLogisticsVideo(false)} style={{ position: 'fixed', top: '24px', right: '32px' }}>&times;</button>
            <video
              src="./assets/logistics/logistics.mp4"
              controls
              autoPlay
              style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '80vh' }}
            />
          </div>
        </div>
      )}

      {/* SECTION: 인프라 카드 클릭 시 나오는 이미지 확대(라이트박스) 팝업 - 이전/다음 이동 가능 */}
      {galleryImages && (
        <div className="modal-backdrop" onClick={closeGallery}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeGallery}>&times;</button>
            <img src={galleryImages[galleryIndex]} alt="" />
            {galleryImages.length > 1 && (
              <div className="modal-caption">
                <span style={{ fontSize: '0.85rem', color: '#AAA' }}>{galleryIndex + 1} / {galleryImages.length}</span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="modal-nav-btn" onClick={prevGalleryImage}>&larr; {isEn ? 'Prev' : '이전'}</button>
                  <button className="modal-nav-btn" onClick={nextGalleryImage}>{isEn ? 'Next' : '다음'} &rarr;</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
