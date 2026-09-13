// 리뉴얼 회사소개 페이지 (About Us Renewal 2026)
// 1. 역동적 서브 히어로 + 핵심 지표 바 (Stats Bar: 30년+, HACCP/ISO, 5대 대형유통 등)
// 2. 비대칭 CEO 인사말 (좌측 블루 프로필/명함 카드 + 우측 감성 본문 및 공식 서명)
// 3. 인터랙티브 타임라인 (전체/설립도약기/품질혁신기/글로벌확장기 필터 탭 + 중앙 연결 노드)
// 4. 생산 및 R&D 인프라 쇼케이스 (공장/연구소/물류센터/칭다오 탭 전환 + 라이트박스 갤러리 + 비디오 팝업)
// 5. CI 시스템 (대형 로고 쇼케이스 + 다운로드 버튼 + 컬러 칩 팔레트 + 3대 핵심 가치 카드)

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation';
import { usePageContent } from '../content/usePageContent';
import { useSiteList } from '../content/siteLists';

// 인프라 섹션 이미지 데이터
const wellzenImages = [
  './assets/wellzen/wellzen_01.png',
  './assets/wellzen/wellzen_02.png'
];

const homadImages = [
  './assets/homad/homad_01.jpg',
  './assets/homad/homad_02.jpg',
  './assets/homad/homad_03.jpg',
  './assets/homad/homad_04.jpg'
];

const qingdaoImages = [
  './assets/china/qingdao-factory.jpg',
  './assets/china/sand_factory_02.jpg'
];

export default function About() {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const { txt, img } = usePageContent('about');
  const historyItems = useSiteList('history');

  // 갤러리 및 비디오 팝업 상태
  const [galleryImages, setGalleryImages] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [showLogisticsVideo, setShowLogisticsVideo] = useState(false);

  // 인프라 활성 탭 (0: 사료 공장, 1: 연구소, 2: 통합 물류센터, 3: 칭다오 공장)
  const [activeInfraTab, setActiveInfraTab] = useState(0);
  // 인프라 사진 자동 로테이션 슬라이드 인덱스
  const [infraSlideIdx, setInfraSlideIdx] = useState(0);

  // 스크롤 애니메이션 Ref (카드 순차 등장 속도 조절)
  const statsRef = useStaggerAnimation({ staggerDelay: 150 });
  const ceoRef = useScrollAnimation();
  const timelineRef = useStaggerAnimation({ staggerDelay: 60 });
  const infraRef = useScrollAnimation();
  const ciRef = useScrollAnimation();

  const closeGallery = () => setGalleryImages(null);
  const prevGalleryImage = () => setGalleryIndex(i => (i - 1 + galleryImages.length) % galleryImages.length);
  const nextGalleryImage = () => setGalleryIndex(i => (i + 1) % galleryImages.length);

  // 탭 변경 시 슬라이드 인덱스 리셋
  useEffect(() => {
    setInfraSlideIdx(0);
  }, [activeInfraTab]);

  // 사진 자동 로테이션 (3초 간격)
  useEffect(() => {
    const currentTabImages = infraTabs[activeInfraTab]?.images;
    if (!currentTabImages || currentTabImages.length <= 1) return;

    const timer = setInterval(() => {
      setInfraSlideIdx(prev => (prev + 1) % currentTabImages.length);
    }, 3200);

    return () => clearInterval(timer);
  }, [activeInfraTab]);

  // 1. 핵심 지표 통계 데이터
  const statsData = [
    {
      numKo: '30 YEARS+',
      numEn: '30 YEARS+',
      labelKo: '역사와 신뢰',
      labelEn: 'Years of Trust',
      subKo: '1995년 설립 이래 정직한 성장',
      subEn: 'Established in 1995'
    },
    {
      numKo: '국제표준인증',
      numEn: 'ISO & HACCP',
      labelKo: 'ISO & HACCP',
      labelEn: 'Certified Standards',
      subKo: 'ISO 22000 및 식품안전 인증',
      subEn: 'ISO 22000 & HACCP Certified'
    },
    {
      numKo: '통합물류센터',
      numEn: 'Logistics Center',
      labelKo: '최적화 물류시스템',
      labelEn: 'Optimized Logistics',
      subKo: '체계적인 재고관리와 배송네트워크',
      subEn: 'Smart Inventory & Delivery'
    },
    {
      numKo: 'Top Tier',
      numEn: 'Top Tier',
      labelKo: '국내 대형 유통망',
      labelEn: 'Nationwide Network',
      subKo: '이마트·GS·농협·온라인 채널 입점',
      subEn: 'Major retail & online channels'
    },
    {
      numKo: 'OEM / ODM',
      numEn: 'OEM / ODM',
      labelKo: '글로벌 제조 역량',
      labelEn: 'Manufacturing Infra',
      subKo: '사료·간식·위생용품 자체 인프라',
      subEn: 'Pet food, snack & care tech'
    }
  ];

  // 3. 인프라 탭 데이터
  const infraTabs = [
    {
      id: 'factory',
      code: 'KOREA FACTORY',
      titleKo: '사료 및 간식 공장',
      titleEn: 'Pet Food & Snack Factory',
      descKo: '국제 표준 식품안전 경영시스템인 ISO 22000 및 HACCP 인증을 보유한 최첨단 펫 푸드 전용 제조 시설입니다. 원료 선별부터 자동화 생산, 위생 포장까지 전 공정을 철저하게 관리합니다.',
      descEn: 'State-of-the-art pet food facility holding ISO 22000 and HACCP certifications, strictly managing all phases from raw material selection to automated packaging.',
      mediaType: 'image',
      coverImage: './assets/homad/homad_01.jpg',
      images: homadImages,
      features: [
        { nameKo: 'ISO 22000 인증', nameEn: 'ISO 22000 Certified', subKo: '식품안전 경영시스템', subEn: 'Food safety standard' },
        { nameKo: 'HACCP 위해요소 관리', nameEn: 'HACCP Safety Standard', subKo: '공정별 위해 사전 차단', subEn: 'Hazard point control' },
        { nameKo: '자동화 배합·포장', nameEn: 'Automated Line', subKo: '위생 밀폐 패키징', subEn: 'Sanitary sealed packaging' },
        { nameKo: 'OEM/ODM 전용 라인', nameEn: 'OEM/ODM Capability', subKo: '고객 맞춤형 제형 제조', subEn: 'Custom formulation' }
      ]
    },
    {
      id: 'rnd',
      code: 'R&D CENTER',
      titleKo: 'R&D 연구소',
      titleEn: 'Healthcare R&D Center',
      descKo: '반려동물의 생애주기별 건강 특성을 과학적으로 분석하고, 고품질 기능성 원료 검증과 배합 기술 혁신을 주도하는 전문 연구 기관입니다.',
      descEn: 'Specialized healthcare research center analyzing pet life-stages, pioneering raw material verification and functional formula innovation.',
      mediaType: 'image',
      coverImage: './assets/wellzen/wellzen_01.png',
      images: wellzenImages,
      features: [
        { nameKo: '영양 성분 정밀 분석', nameEn: 'Nutritional Analysis', subKo: 'AAFCO 기준 준수 검증', subEn: 'AAFCO compliance audit' },
        { nameKo: '기능성 레시피 개발', nameEn: 'Formula Engineering', subKo: '관절·피부·장 건강 특화', subEn: 'Joint, coat & gut health' },
        { nameKo: '기호성 실증 테스트', nameEn: 'Palatability Testing', subKo: '실제 반려동물 테스트', subEn: 'Real-taste assessment' },
        { nameKo: '신소재 특허 출원', nameEn: 'Patent Innovations', subKo: '독자 기술 지식재산권', subEn: 'Proprietary IP assets' }
      ]
    },
    {
      id: 'logistics',
      code: 'LOGISTICS CENTER',
      titleKo: '통합 물류센터',
      titleEn: 'Integrated Logistics Center',
      descKo: '실시간 재고 관리 시스템(WMS)과 최적화된 온·습도 조절 보관 인프라를 통해 전국 대형마트, 온·오프라인 파트너사 및 글로벌 공급망으로 안전하고 신속한 배송을 실현합니다.',
      descEn: 'Real-time WMS and climate-controlled storage delivering safe, rapid distribution across nationwide hypermarkets, online channels, and global markets.',
      mediaType: 'video',
      coverVideo: './assets/logistics/logistics.mp4',
      features: [
        { nameKo: '전국 익일 배송 체계', nameEn: 'Nationwide Delivery', subKo: '대형 유통망 일일 직납', subEn: 'Daily hypermarket supply' },
        { nameKo: '스마트 WMS 재고관리', nameEn: 'Smart WMS System', subKo: '실시간 로트·유통기한 추적', subEn: 'Real-time lot tracking' },
        { nameKo: '항온·항습 안심 보관', nameEn: 'Climate-Controlled', subKo: '품질 유지 최적 보관', subEn: 'Optimal fresh storage' },
        { nameKo: '글로벌 수출입 풀필먼트', nameEn: 'Global Fulfillment', subKo: '원스톱 통관 및 출고', subEn: 'One-stop export dispatch' }
      ]
    },
    {
      id: 'qingdao',
      code: 'GLOBAL PLANT',
      titleKo: '칭다오 글로벌 가공 공장',
      titleEn: 'Qingdao Plant & OEM Facility',
      descKo: '위생용품 및 글로벌 소싱 가공 OEM/ODM 전문 공장으로, 엄격한 품질 규격 아래 우수한 가격 경쟁력과 대량 생산 능력을 제공합니다.',
      descEn: 'Global OEM/ODM processing facility for hygiene products, providing cost-efficiency and high-capacity production under strict quality compliance.',
      mediaType: 'image',
      coverImage: './assets/china/qingdao-factory.jpg',
      images: qingdaoImages,
      features: [
        { nameKo: '글로벌 OEM/ODM 역량', nameEn: 'Global OEM/ODM', subKo: '맞춤형 대량 생산 체계', subEn: 'High-volume production' },
        { nameKo: '위생용품 특화 라인', nameEn: 'Hygiene Essentials', subKo: '패드·위생용품 전용 라인', subEn: 'Dedicated care line' },
        { nameKo: '원가 경쟁력 극대화', nameEn: 'Cost Optimization', subKo: '글로벌 원자재 직수급', subEn: 'Direct material sourcing' },
        { nameKo: '글로벌 품질 검수', nameEn: 'Strict Quality Audit', subKo: '수출입 전수 품질 관리', subEn: 'Pre-shipment inspection' }
      ]
    }
  ];

  const currentInfra = infraTabs[activeInfraTab];

  return (
    <div className="bm-about-page">
      {/* 백그라운드 프리로드 비디오 */}
      <video src="./assets/logistics/logistics.mp4" preload="auto" muted style={{ display: 'none' }} />

      {/* ====== 1. 서브 히어로 (Sub Hero) ====== */}
      <section
        className="bm-sub-hero"
        style={{
          backgroundImage: `url('${img('heroImage')}')`
        }}
      >
        <div className="bm-sub-hero-overlay" />
        <div className="bm-sub-hero-content animate-on-scroll fade-up is-visible">
          <span className="bm-sub-hero-tag">{txt('heroEyebrow')}</span>
          <h1 className="bm-sub-hero-title" style={{ whiteSpace: 'pre-line' }}>
            {txt('heroTitle')}
          </h1>
          <p className="bm-sub-hero-desc" style={{ whiteSpace: 'pre-line' }}>
            {txt('heroBody')}
          </p>
        </div>
      </section>

      {/* ====== 2. 핵심 지표 바 (Stats Bar) ====== */}
      <div className="bm-container">
        <div className="bm-about-stats-bar" ref={statsRef}>
          {statsData.map((stat, idx) => (
            <div key={idx} className="bm-about-stat-card animate-child">
              <div className="bm-about-stat-num">{isEn ? stat.numEn : stat.numKo}</div>
              <div className="bm-about-stat-label">{isEn ? stat.labelEn : stat.labelKo}</div>
              <div className="bm-about-stat-sub">{isEn ? stat.subEn : stat.subKo}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ====== 3. CEO 메시지 (CEO Message) ====== */}
      <section className="bm-section bm-section-white">
        <div className="bm-container">
          <div className="bm-section-header">
            <span className="bm-section-tag">{txt('ceoEyebrow')}</span>
            <h2 className="bm-section-title">
              {txt('ceoSectionTitle')}
            </h2>
            <p className="bm-section-desc" style={{ whiteSpace: 'pre-line' }}>
              {txt('ceoSectionBody')}
            </p>
          </div>

          <div className="bm-ceo-split animate-on-scroll fade-up is-visible" ref={ceoRef}>
            {/* 좌측: 블루 프로필 카드 */}
            <div className="bm-ceo-profile-card">
              <div>
                <div className="bm-ceo-quote-mark">“</div>
                <p className="bm-ceo-highlight-text">
                  {txt('ceoHighlight')}
                </p>
              </div>
              <div className="bm-ceo-profile-footer">
                <div className="bm-ceo-name">{txt('ceoName')}</div>
                <div className="bm-ceo-title">
                  {txt('ceoTitleText')}
                </div>
              </div>
            </div>

            {/* 우측: 감성 본문 카드 + 공식 서명 */}
            <div className="bm-ceo-content-box">
              <p className="bm-ceo-lead">
                {txt('ceoLead')}
              </p>
              {txt('ceoBody').split('\n\n').map((para, idx) => (
                <p className="bm-ceo-body-text" key={idx}>{para}</p>
              ))}

              {/* 공식 대표이사 서명 */}
              <div className="bm-ceo-signature-wrap">
                <span className="bm-ceo-sign-label">
                  {isEn ? 'Chief Executive Officer' : '대표이사'}
                </span>
                <img
                  src="./assets/ceo_signature.png"
                  alt={isEn ? 'CEO Signature' : '대표이사 서명'}
                  className="bm-ceo-signature-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== 4. 기업 연혁 (Interactive Filterable Timeline) ====== */}
      <section className="bm-section bm-section-light">
        <div className="bm-container">
          <div className="bm-timeline-header-wrap">
            <div>
              <span className="bm-section-tag">{txt('historyEyebrow')}</span>
              <h2 className="bm-section-title">
                {txt('historyTitle')}
              </h2>
              <p className="bm-section-desc" style={{ whiteSpace: 'pre-line' }}>
                {txt('historyBody')}
              </p>
            </div>
          </div>

          {/* 타임라인 컨테이너 */}
          <div className="bm-timeline-container" ref={timelineRef}>
            {historyItems.map((item, idx) => {
              const title = isEn ? item.titleEn : item.titleKo;
              const items = isEn ? item.itemsEn : item.itemsKo;
              const badge = isEn ? item.eraBadgeEn : item.eraBadgeKo;

              return (
                <div key={idx} className="bm-timeline-row animate-child">
                  {/* 중앙 연결 노드 */}
                  <div className="bm-timeline-node" />

                  {/* 카드 본체 */}
                  <div className="bm-timeline-card-side">
                    <div className="bm-timeline-card">
                      <div className="bm-timeline-card-header">
                        <span className="bm-timeline-year-tag">{item.year}</span>
                        <span className="bm-timeline-era-badge">{badge}</span>
                      </div>
                      {title && <h3 className="bm-timeline-title">{title}</h3>}
                      {items.length > 1 ? (
                        <ul className="bm-timeline-list">
                          {items.map((line, i) => (
                            <li key={i}>{line}</li>
                          ))}
                        </ul>
                      ) : items.length === 1 ? (
                        <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748B', lineHeight: '1.6' }}>
                          {items[0]}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====== 5. 생산 및 R&D 인프라 (Infrastructure Showcase) ====== */}
      <section className="bm-section bm-section-white">
        <div className="bm-container">
          <div className="bm-section-header" style={{ textAlign: 'center' }}>
            <span className="bm-section-tag">Infrastructure</span>
            <h2 className="bm-section-title">
              {isEn ? 'Manufacturing & Innovation Facilities' : '자체 생산 및 연구개발 인프라'}
            </h2>
            <p className="bm-section-desc" style={{ margin: '0 auto' }}>
              {isEn
                ? 'Certified manufacturing facilities and specialized healthcare research leading global pet nutrition standards.'
                : 'ISO 22000·HACCP 인증 공장부터 첨단 R&D 연구소까지, 타협 없는 품질을 실현하는 인프라를 소개합니다.'}
            </p>
          </div>

          {/* 상단 4개 인프라 선택 카드 (구 하단 미니 카드를 상단으로 이동) */}
          <div className="bm-infra-mini-grid" style={{ marginBottom: '28px', marginTop: '0' }}>
            {infraTabs.map((tab, idx) => (
              <div
                key={tab.id}
                className={`bm-infra-mini-card ${activeInfraTab === idx ? 'active' : ''}`}
                onClick={() => setActiveInfraTab(idx)}
              >
                <div className="bm-infra-mini-header">
                  <span className="bm-infra-mini-code">{tab.code}</span>
                  <span style={{ fontSize: '0.8rem', color: activeInfraTab === idx ? 'var(--bm-primary)' : '#CBD5E1' }}>
                    {activeInfraTab === idx ? '●' : '○'}
                  </span>
                </div>
                <div className="bm-infra-mini-title">
                  {isEn ? tab.titleEn : tab.titleKo}
                </div>
              </div>
            ))}
          </div>

          {/* 메인 상세 쇼케이스 카드 */}
          <div className="bm-infra-showcase animate-on-scroll fade-up is-visible" ref={infraRef}>
            {/* 좌측 미디어 (이미지 슬라이드 로테이션 or 비디오) */}
            <div
              className="bm-infra-showcase-media"
              onClick={() => {
                if (currentInfra.mediaType === 'video') {
                  setShowLogisticsVideo(true);
                } else if (currentInfra.images) {
                  setGalleryImages(currentInfra.images);
                  setGalleryIndex(infraSlideIdx);
                }
              }}
              title={
                currentInfra.mediaType === 'video'
                  ? (isEn ? 'Click to watch logistics video' : '클릭하여 물류센터 영상을 시청하세요')
                  : (isEn ? 'Click to view photo gallery' : '클릭하여 사진 갤러리를 확대해 보세요')
              }
            >
              {currentInfra.mediaType === 'video' ? (
                <video autoPlay muted loop playsInline>
                  <source src={currentInfra.coverVideo} type="video/mp4" />
                </video>
              ) : currentInfra.images && currentInfra.images.length > 1 ? (
                <>
                  {currentInfra.images.map((src, idx) => (
                    <img
                      key={src}
                      src={src}
                      alt={`${currentInfra.titleKo} ${idx + 1}`}
                      className={`bm-infra-showcase-slide ${idx === infraSlideIdx ? 'active' : ''}`}
                    />
                  ))}
                  <div className="bm-infra-slide-indicators">
                    {currentInfra.images.map((_, idx) => (
                      <span
                        key={idx}
                        className={`bm-infra-indicator ${idx === infraSlideIdx ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setInfraSlideIdx(idx);
                        }}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <img src={currentInfra.coverImage} alt={currentInfra.titleKo} />
              )}
            </div>

            {/* 우측 설명 및 특징 그리드 */}
            <div className="bm-infra-showcase-details">
              <span className="bm-infra-showcase-code">{currentInfra.code}</span>
              <h3 className="bm-infra-showcase-title">
                {isEn ? currentInfra.titleEn : currentInfra.titleKo}
              </h3>
              <p className="bm-infra-showcase-desc">
                {isEn ? currentInfra.descEn : currentInfra.descKo}
              </p>

              {/* 특징 그리드 */}
              <div className="bm-infra-features-grid">
                {currentInfra.features.map((feat, i) => (
                  <div key={i} className="bm-infra-feature-item">
                    <div className="bm-infra-feature-name">{isEn ? feat.nameEn : feat.nameKo}</div>
                    <div className="bm-infra-feature-sub">{isEn ? feat.subEn : feat.subKo}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== 6. CI 소개 (Corporate Identity System) ====== */}
      <section className="bm-section bm-section-light">
        <div className="bm-container">
          <div className="bm-section-header">
            <span className="bm-section-tag">{txt('ciEyebrow')}</span>
            <h2 className="bm-section-title">
              {txt('ciTitle')}
            </h2>
            <p className="bm-section-desc" style={{ whiteSpace: 'pre-line' }}>
              {txt('ciBody')}
            </p>
          </div>

          <div className="bm-ci-container animate-on-scroll fade-up is-visible" ref={ciRef}>
            {/* 좌측: 대형 CI 로고 쇼케이스 + 다운로드 */}
            <div className="bm-ci-symbol-stage">
              <img
                src="./assets/boomyung_ci_logo.png"
                alt="BOOMYOUNG Corporate Identity"
                className="bm-ci-logo-img"
              />
              <div className="bm-ci-brand-name">
                {isEn ? 'BOOMYOUNG CO., LTD.' : '(주)부명 BOOMYOUNG'}
              </div>
              <div className="bm-ci-brand-en">
                Official Corporate Identity System
              </div>
              <a
                href="./assets/boomyung_ci_logo.png"
                download="boomyung_ci_logo.png"
                className="bm-ci-download-btn"
                title={isEn ? 'Download CI Logo PNG' : 'CI 로고 이미지 다운로드'}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                {isEn ? 'Download Logo' : '로고 다운로드 (PNG)'}
              </a>
            </div>

            {/* 우측: 3대 핵심 의미 카드 스택 + 컬러 팔레트 */}
            <div className="bm-ci-cards-stack">
              {/* 카드 1 */}
              <div className="bm-ci-card">
                <div className="bm-ci-card-header">
                  <span className="bm-ci-card-num">01. SYMBOL MARK</span>
                  <h4 className="bm-ci-card-title">
                    {isEn ? 'Symbol of Trust & Sacred Life' : '신뢰와 생명 존중의 상징'}
                  </h4>
                </div>
                <p className="bm-ci-card-desc">
                  {isEn
                    ? 'The dynamic mark represents unwavering trust with consumers and partners, rigorous scientific quality inspection, and profound reverence for companion animals.'
                    : '부명의 CI 심볼은 반려 가족 및 파트너사와의 견고한 신뢰, 타협 없는 과학적 품질 검증, 그리고 소중한 반려동물 생명에 대한 깊은 존중과 책임을 상징합니다.'}
                </p>
              </div>

              {/* 카드 2 */}
              <div className="bm-ci-card">
                <div className="bm-ci-card-header">
                  <span className="bm-ci-card-num">02. CORE VALUE</span>
                  <h4 className="bm-ci-card-title">
                    {isEn ? '30 Years of Honest Technology' : '30년 정직한 기술과 혁신'}
                  </h4>
                </div>
                <p className="bm-ci-card-desc">
                  {isEn
                    ? 'Synthesizing over 30 years of accumulated manufacturing mastery and forward-looking healthcare R&D to spearhead global pet wellness.'
                    : '30년 이상 축적된 전문 제조 노하우와 선진 헬스케어 가공 기술을 융합하여, 언제나 정직하고 안전한 제품만을 선보이겠다는 약속을 담고 있습니다.'}
                </p>
              </div>

              {/* 카드 3: 컬러 시스템 & 팔레트 칩 */}
              <div className="bm-ci-card">
                <div className="bm-ci-card-header">
                  <span className="bm-ci-card-num">03. COLOR SYSTEM</span>
                  <h4 className="bm-ci-card-title">
                    {isEn ? 'Boomyoung Signature Palette' : '시그니처 컬러 시스템'}
                  </h4>
                </div>
                <p className="bm-ci-card-desc">
                  {isEn
                    ? 'Boomyoung Blue (#0066B3) conveys absolute trust and technological vitality expanding like the ocean. Navy (#0A2540) symbolizes corporate stability and heritage.'
                    : '대표 색상인 부명 블루(#0066B3)는 투명한 신뢰와 혁신적인 생명력을 상징하며, 네이비(#0A2540)는 흔들림 없는 기업 안정성과 30년의 헤리티지를 나타냅니다.'}
                </p>

                {/* 컬러 칩 팔레트 */}
                <div className="bm-ci-palette">
                  <div className="bm-color-chip">
                    <div className="bm-color-swatch" style={{ background: '#0066B3' }} />
                    <div className="bm-color-info">
                      <span className="bm-color-name">Boomyoung Blue</span>
                      <span className="bm-color-code">#0066B3 (Primary)</span>
                    </div>
                  </div>
                  <div className="bm-color-chip">
                    <div className="bm-color-swatch" style={{ background: '#0A2540' }} />
                    <div className="bm-color-info">
                      <span className="bm-color-name">Deep Navy</span>
                      <span className="bm-color-code">#0A2540 (Heritage)</span>
                    </div>
                  </div>
                  <div className="bm-color-chip">
                    <div className="bm-color-swatch" style={{ background: '#00A3E0' }} />
                    <div className="bm-color-info">
                      <span className="bm-color-name">Cyan Accent</span>
                      <span className="bm-color-code">#00A3E0 (Innovation)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== 7. 물류센터 소개 영상 모달 ====== */}
      {showLogisticsVideo && (
        <div className="modal-backdrop" onClick={() => setShowLogisticsVideo(false)}>
          <div
            className="modal-content"
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '860px',
              width: '92%',
              background: '#000000',
              padding: 0,
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
            }}
          >
            <button
              className="modal-close-btn"
              onClick={() => setShowLogisticsVideo(false)}
              style={{ position: 'fixed', top: '24px', right: '32px' }}
            >
              &times;
            </button>
            <video
              src="./assets/logistics/logistics.mp4"
              controls
              autoPlay
              style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '80vh' }}
            />
          </div>
        </div>
      )}

      {/* ====== 8. 사진 라이트박스 갤러리 모달 ====== */}
      {galleryImages && (
        <div className="modal-backdrop" onClick={closeGallery}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeGallery}>&times;</button>
            <img src={galleryImages[galleryIndex]} alt="Facility Gallery" />
            {galleryImages.length > 1 && (
              <div className="modal-caption">
                <span style={{ fontSize: '0.85rem', color: '#AAA' }}>
                  {galleryIndex + 1} / {galleryImages.length}
                </span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="modal-nav-btn" onClick={prevGalleryImage}>
                    &larr; {isEn ? 'Prev' : '이전'}
                  </button>
                  <button className="modal-nav-btn" onClick={nextGalleryImage}>
                    {isEn ? 'Next' : '다음'} &rarr;
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

