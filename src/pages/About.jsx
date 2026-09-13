// 리뉴얼 회사소개 페이지 (About Us Renewal 2026)
// 1. 역동적 서브 히어로 + 핵심 지표 바 (Stats Bar: 30년+, HACCP/ISO, 5대 대형유통 등)
// 2. 비대칭 CEO 인사말 (좌측 블루 프로필/명함 카드 + 우측 감성 본문 및 공식 서명)
// 3. 인터랙티브 타임라인 (전체/설립도약기/품질혁신기/글로벌확장기 필터 탭 + 중앙 연결 노드)
// 4. 생산 및 R&D 인프라 쇼케이스 (공장/연구소/물류센터/칭다오 탭 전환 + 라이트박스 갤러리 + 비디오 팝업)
// 5. CI 시스템 (대형 로고 쇼케이스 + 다운로드 버튼 + 컬러 칩 팔레트 + 3대 핵심 가치 카드)

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation';

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

  // 2. 회사 연혁 데이터 (시대별 분류 추가)
  const historyItems = [
    {
      year: '2024 ~ Present',
      era: 'recent',
      eraBadgeKo: '도약 및 글로벌화',
      eraBadgeEn: 'Global Expansion',
      titleKo: '글로벌 네트워크 및 자체 브랜드 고도화',
      titleEn: 'Global Network & Brand Elevation',
      itemsKo: ['사료 및 간식 공장 전용 라인 확장', 'R&D 연구소 첨단 분석 체계 구축', '글로벌 OEM/ODM 공급 체인 다변화'],
      itemsEn: ['Dedicated pet food/snack production lines', 'Established advanced R&D analysis center', 'Diversified global OEM/ODM supply network']
    },
    {
      year: '2023',
      era: 'recent',
      eraBadgeKo: '품질 인증',
      eraBadgeEn: 'Quality Cert',
      titleKo: '품질 인증 및 제조 혁신',
      titleEn: 'Quality Certification & Innovation',
      itemsKo: ['ISO 22000 및 HACCP 인증 획득', '전용 자동화 생산 설비 및 멸균 포장 라인 도입'],
      itemsEn: ['Obtained ISO 22000 & HACCP certifications', 'Introduced automated production & packaging line']
    },
    {
      year: '2021',
      era: 'recent',
      eraBadgeKo: '유통 채널',
      eraBadgeEn: 'Omni-channel',
      titleKo: '온·오프라인 옴니채널 입점',
      titleEn: 'Omni-channel Network Expansion',
      itemsKo: ['요기요 즉시배송 서비스 입점', 'CJ홈쇼핑 프리미엄 사료 론칭', '자체 프리미엄 브랜드 "하우펫" 런칭'],
      itemsEn: ['Listed on Yogiyo delivery', 'Launched on CJ Home Shopping', 'Launched "HOWPET" premium brand']
    },
    {
      year: '2020',
      era: 'growth',
      eraBadgeKo: '유통 확장',
      eraBadgeEn: 'Retail Growth',
      titleKo: '전국 편의점 및 이커머스 입점',
      titleEn: 'C-Store & E-Commerce Entry',
      itemsKo: ['이마트24 전국 전점 입점', '마켓컬리 샛별배송 공식 입점'],
      itemsEn: ['Supplying all E-mart24 stores', 'Listed on Market Kurly']
    },
    {
      year: '2019',
      era: 'growth',
      eraBadgeKo: '유통 확장',
      eraBadgeEn: 'Retail Growth',
      titleKo: '대형 유통망 공급 확대',
      titleEn: 'Major Supermarket Expansion',
      itemsKo: ['킴스클럽 25개점 입점', '메가마트 12개점 입점'],
      itemsEn: ['Listed in 25 Kim\'s Club stores', 'Listed in 12 Megamart stores']
    },
    {
      year: '2018',
      era: 'growth',
      eraBadgeKo: '기업 수상',
      eraBadgeEn: 'Award & Media',
      titleKo: '유망 중소기업 대상 및 방송 유통',
      titleEn: 'Promising SME Award & Broadcasting',
      itemsKo: ['유망 중소기업 대상 수상', '공영홈쇼핑 반려동물 사료 공식 방영 및 입점'],
      itemsEn: ['Won Promising SME Award', 'Listed pet food on Public Home Shopping']
    },
    {
      year: '2017',
      era: 'growth',
      eraBadgeKo: '제조 기반',
      eraBadgeEn: 'Manufacturing',
      titleKo: '국내 제조공장 설립 및 농협 파트너십',
      titleEn: 'Factory Establishment & NongHyup Partnership',
      itemsKo: ['농협 하나로마트 공급 계약 체결', '농협 목우촌 제조위탁 생산 계약 체결', '국내 로얄바이츠 사료공장 설립'],
      itemsEn: ['Contracted with NongHyup Hanaro Mart', 'OEM manufacturing with Mokwoochon', 'Established domestic Royal Bites factory']
    },
    {
      year: '2008',
      era: 'foundation',
      eraBadgeKo: '연구개발',
      eraBadgeEn: 'R&D Setup',
      titleKo: 'R&D 연구소 설립',
      titleEn: 'Establishment of R&D Center',
      itemsKo: ['자체 연구개발(R&D) 센터 개소', '반려동물 기능성 간식 자체 배합 기술 확보'],
      itemsEn: ['Opened in-house R&D center', 'Secured proprietary formula for functional pet treats']
    },
    {
      year: '2003',
      era: 'foundation',
      eraBadgeKo: '물류 거점',
      eraBadgeEn: 'Logistics Expansion',
      titleKo: '물류 인프라 확충',
      titleEn: 'Logistics Infrastructure Expansion',
      itemsKo: ['수도권 메인 물류센터 확장 이전', '전국 도소매 및 대형마트 직배송 체계 구축'],
      itemsEn: ['Relocated to larger logistics center in capital area', 'Built direct shipping network']
    },
    {
      year: '1995',
      era: 'foundation',
      eraBadgeKo: '창립',
      eraBadgeEn: 'Founding',
      titleKo: '(주)부명 설립',
      titleEn: 'Establishment of BOOMYOUNG CO., LTD.',
      itemsKo: ['반려동물 용품 및 식품 전문 제조·유통 기업 (주)부명 설립'],
      itemsEn: ['Founded BOOMYOUNG CO., LTD. specializing in pet food & supplies']
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
          backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2560&q=80')"
        }}
      >
        <div className="bm-sub-hero-overlay" />
        <div className="bm-sub-hero-content animate-on-scroll fade-up is-visible">
          <span className="bm-sub-hero-tag">ABOUT BOOMYOUNG</span>
          <h1 className="bm-sub-hero-title">
            {isEn
              ? 'Opening a Healthier Tomorrow for Pets'
              : '반려동물과 반려인의 행복한 내일을 열어갑니다'}
          </h1>
          <p className="bm-sub-hero-desc">
            {isEn
              ? 'Built upon 30 years of honest technology, uncompromising safety protocols, and enduring customer trust.'
              : '30년 이상 축적된 정직한 기술과 원칙 있는 품질, 견고한 신뢰를 바탕으로 펫 헬스케어의 미래를 창조합니다.'}
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
            <span className="bm-section-tag">CEO Message</span>
            <h2 className="bm-section-title">
              {isEn ? 'Dreaming of a World Where Pets Thrive' : '생명을 존중하는 마음에서 기술이 시작됩니다'}
            </h2>
            <p className="bm-section-desc">
              {isEn
                ? 'A warm message of dedication and integrity from CEO Seong-hoon Jeong.'
                : '(주)부명이 추구하는 진정한 가치와 정직한 약속을 전합니다.'}
            </p>
          </div>

          <div className="bm-ceo-split animate-on-scroll fade-up is-visible" ref={ceoRef}>
            {/* 좌측: 블루 프로필 카드 */}
            <div className="bm-ceo-profile-card">
              <div>
                <div className="bm-ceo-quote-mark">“</div>
                <p className="bm-ceo-highlight-text">
                  {isEn
                    ? 'Respect begins with small and thoughtful care.'
                    : '존중은 아주 작고 사소한 배려에서부터 시작됩니다.'}
                </p>
              </div>
              <div className="bm-ceo-profile-footer">
                <div className="bm-ceo-name">{isEn ? 'Seong-hoon Jeong' : '정 성 훈'}</div>
                <div className="bm-ceo-title">
                  {isEn ? 'CEO, BOOMYOUNG CO., LTD.' : '(주)부명 대표이사'}
                </div>
              </div>
            </div>

            {/* 우측: 감성 본문 카드 + 공식 서명 */}
            <div className="bm-ceo-content-box">
              <p className="bm-ceo-lead">
                {isEn
                  ? 'Hello, I am Seong-hoon Jeong, CEO of BOOMYOUNG CO., LTD.'
                  : '안녕하십니까. (주)부명 대표이사 정성훈입니다.'}
              </p>
              <p className="bm-ceo-body-text">
                {isEn
                  ? 'Under the conviction of providing the highest quality products and heartfelt services to both companion animals and their guardians, BOOMYOUNG has grown into a comprehensive enterprise covering product planning, scientific R&D, advanced manufacturing, and nationwide logistics.'
                  : '부명은 반려동물과 반려인 모두에게 최상의 품질과 신뢰를 전한다는 확고한 신념 아래, 상품 기획부터 과학적인 R&D, 전문 제조 시설, 그리고 전국 물류 네트워크에 이르기까지 펫 라이프의 전 과정을 아우르는 종합 펫 헬스케어 기업으로 성장해 왔습니다.'}
              </p>
              <p className="bm-ceo-body-text">
                {isEn
                  ? 'We continuously examine fast-evolving market trends and guardians’ genuine needs to introduce nutritious, reliable products. Through enduring partnerships with leading domestic retail channels such as E-mart, GS, and NongHyup, we have built sustainable momentum.'
                  : '급변하는 반려동물 시장의 트렌드와 반려 가족의 목소리를 면밀히 분석하여 안심하고 선택할 수 있는 정직한 제품을 선보이고 있으며, 이마트, GS, 농협 등 국내 최고의 유통 파트너사들과의 두터운 신뢰를 바탕으로 지속 가능한 혁신을 이어가고 있습니다.'}
              </p>
              <p className="bm-ceo-body-text">
                {isEn
                  ? 'We pledge to uphold management that satisfies both retail partners and end consumers, fortifying market leadership through relentless innovation and unwavering respect for pet life. Thank you.'
                  : '앞으로도 협력 매장과 소비자 모두가 깊이 공감하고 신뢰할 수 있는 상생 경영을 지향하며, 엄격한 품질 관리와 차별화된 제조 역량으로 반려동물의 건강하고 행복한 삶을 지키는 든든한 동반자가 되겠습니다. 감사합니다.'}
              </p>

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
              <span className="bm-section-tag">History</span>
              <h2 className="bm-section-title">
                {isEn ? 'Our 30-Year Journey' : '도전과 신뢰의 30년 발자취'}
              </h2>
              <p className="bm-section-desc">
                {isEn
                  ? 'Tracing the milestones of growth, manufacturing excellence, and distribution dominance since 1995.'
                  : '1995년 창립 이래 오늘날 대한민국 펫 산업의 중심으로 성장하기까지의 여정입니다.'}
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
            <span className="bm-section-tag">Corporate Identity</span>
            <h2 className="bm-section-title">
              {isEn ? 'Identity of Trust & Global Vision' : '신뢰와 비전을 담은 CI 시스템'}
            </h2>
            <p className="bm-section-desc">
              {isEn
                ? 'The official corporate symbol representing 30 years of integrity, safety, and respect for pet life.'
                : '고객과의 깊은 신뢰와 생명 존중의 철학을 담아낸 (주)부명의 시각적 정체성입니다.'}
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

