// 대형 유통 파트너사(마트/편의점 등) 목록 — Trust.jsx(신뢰와 인증 페이지)의 "파트너사" 섹션에서 로고를 나열하는 데 사용됩니다.
// logoScale: 홈 화면 마퀴/신뢰 페이지에서 로고를 얼마나 확대해서 보여줄지 결정합니다.
// 예전에는 CSS(.bm-marquee-item-retail img)에 1.3배 확대가 고정되어 있었지만,
// 이제는 관리자 페이지에서 로고별로 크기를 조절할 수 있도록 값으로 옮겼습니다.
export const partners = [
  { id: 'emart', nameKo: '이마트', nameEn: 'E-MART', logo: './assets/partners/emart.jpg', logoScale: 1.3 },
  { id: 'homeplus', nameKo: '홈플러스', nameEn: 'Homeplus', logo: './assets/partners/homeplus.jpg', logoScale: 1.3 },
  { id: 'costco', nameKo: '코스트코', nameEn: 'COSTCO', logo: './assets/partners/costco.jpg', logoScale: 1.3 },
  { id: 'coupang', nameKo: '쿠팡', nameEn: 'Coupang', logo: './assets/partners/coupang.jpg', logoScale: 1.3 },
  { id: 'lottemart', nameKo: '롯데마트', nameEn: 'LOTTE Mart', logo: './assets/partners/lottemart.jpg', logoScale: 1.3 },
  { id: 'daiso', nameKo: '다이소', nameEn: 'Daiso', logo: './assets/partners/daiso.jpg', logoScale: 1.3 },
  { id: 'cu', nameKo: 'CU', nameEn: 'CU', logo: './assets/partners/cu.jpg', logoScale: 1.3 },
  { id: 'gs25', nameKo: 'GS25', nameEn: 'GS25', logo: './assets/partners/gs25.jpg', logoScale: 1.3 },
  { id: 'seveneleven', nameKo: '세븐일레븐', nameEn: '7-Eleven', logo: './assets/partners/seveneleven.jpg', logoScale: 1.3 },
  { id: 'emart24', nameKo: '이마트24', nameEn: 'emart24', logo: './assets/partners/emart24.jpg', logoScale: 1.3 },
  { id: 'gsretail', nameKo: 'GS리테일', nameEn: 'GS Retail', logo: './assets/partners/gsretail.jpg', logoScale: 1.3 },
  { id: 'lottesuper', nameKo: '롯데슈퍼', nameEn: 'LOTTE Super', logo: './assets/partners/lottesuper.jpg', logoScale: 1.3 },
  { id: 'jaju', nameKo: '자주', nameEn: 'JAJU', logo: './assets/partners/jaju.jpg', logoScale: 1.3 },
];
