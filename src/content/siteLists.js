// 관리자 페이지에서 항목을 추가·삭제·순서변경할 수 있는 "목록형" 데이터들입니다.
//
// 문구 편집(pageDefaults.js)과 같은 원칙으로 동작합니다:
// 코드에 들어있는 기존 목록이 기본값이고, 관리자가 저장한 목록이 있으면 그 값을 대신 씁니다.
// 관리자가 아무것도 건드리지 않으면 지금과 똑같은 화면이 나옵니다.
import { useData } from '../context/DataContext';
import { historyItems } from '../data/history';
import { businessCards } from '../data/businessCards';
import { partners } from '../data/partners';
import { petRetailPartners } from '../data/petRetailPartners';

export const LIST_DEFAULTS = {
  history: historyItems,
  partners,
  petRetailPartners,
  businessCards
};

// 목록 하나하나의 입력 폼 설계도.
//   type: 'text'(한 줄, 한글/영문 각각) | 'lines'(여러 줄, 한 줄이 항목 하나) | 'image' | 'plain'(언어 구분 없는 한 줄)
export const LIST_SCHEMA = {
  history: {
    label: '기업 연혁',
    page: 'about',
    note: '위에 있는 항목이 화면에서도 위에 표시됩니다. 세부 내용은 한 줄에 하나씩 적어주세요.',
    itemLabel: (item) => item.year || '새 연혁',
    newItem: () => ({ year: '', eraBadgeKo: '', eraBadgeEn: '', titleKo: '', titleEn: '', itemsKo: [], itemsEn: [] }),
    fields: [
      { key: 'year', label: '연도', type: 'plain', placeholder: '예: 2026' },
      { key: 'eraBadge', label: '시기 배지 (예: 글로벌화, 창립)', type: 'text' },
      { key: 'title', label: '연도 제목', type: 'text' },
      { key: 'items', label: '세부 내용 (한 줄에 하나씩)', type: 'lines' }
    ]
  },
  partners: {
    label: '국내 대형 유통 파트너 로고',
    page: 'home',
    note: '홈 화면 마퀴와 신뢰와 인증 페이지에 함께 표시됩니다.',
    itemLabel: (item) => item.nameKo || '새 파트너',
    newItem: () => ({ id: `partner-${Date.now()}`, nameKo: '', nameEn: '', logo: '', logoScale: 1 }),
    fields: [
      { key: 'name', label: '이름', type: 'text' },
      { key: 'logo', label: '로고', type: 'image', width: 400, height: 200, fit: 'contain', scaleKey: 'logoScale' },
      { key: 'logoScale', label: '로고 표시 크기', type: 'scale' }
    ]
  },
  petRetailPartners: {
    label: '펫 전문 유통사 로고',
    page: 'home',
    note: '홈 화면 마퀴와 신뢰와 인증 페이지에 함께 표시됩니다.',
    itemLabel: (item) => item.nameKo || '새 유통사',
    newItem: () => ({ id: `petretail-${Date.now()}`, nameKo: '', nameEn: '', logo: '', logoScale: 1 }),
    fields: [
      { key: 'name', label: '이름', type: 'text' },
      { key: 'logo', label: '로고', type: 'image', width: 400, height: 200, fit: 'contain', scaleKey: 'logoScale' },
      { key: 'logoScale', label: '로고 표시 크기', type: 'scale' }
    ]
  },
  businessCards: {
    label: '영업 담당자 명함',
    page: 'contact',
    note: '명함 이미지는 한글용/영문용을 각각 올립니다.',
    itemLabel: (item) => item.titleKo || '새 명함',
    newItem: () => ({ id: `card-${Date.now()}`, titleKo: '', titleEn: '', scopeKo: '', scopeEn: '', personNameKo: '', personNameEn: '', personTitleKo: '', personTitleEn: '', descKo: '', descEn: '', imgKr: '', imgEn: '' }),
    fields: [
      { key: 'title', label: '팀 이름', type: 'text' },
      { key: 'scope', label: '담당 분야 배지', type: 'text' },
      { key: 'personName', label: '담당자 이름', type: 'text' },
      { key: 'personTitle', label: '담당자 직함', type: 'text' },
      { key: 'desc', label: '담당 업무 설명', type: 'text' },
      { key: 'imgKr', label: '명함 이미지 (한글)', type: 'image', width: 936, height: 520 },
      { key: 'imgEn', label: '명함 이미지 (영문)', type: 'image', width: 936, height: 520 }
    ]
  }
};

// 저장된 목록이 있으면 그것을, 없으면 코드에 있는 기본 목록을 돌려준다
export function useSiteList(key) {
  const { siteSettings } = useData();
  const saved = siteSettings?.siteLists?.[key];
  return Array.isArray(saved) ? saved : (LIST_DEFAULTS[key] || []);
}
