// 페이지 문구/이미지를 관리자 페이지에서 고칠 수 있게 해주는 런타임 헬퍼입니다.
//
// 동작 방식: 각 항목의 "현재 사이트에 나가고 있는 값"을 pageDefaults.js가 기본값으로 들고 있고,
// 관리자가 고친 값만 서버(site_settings.pageContent)에 저장됩니다.
// 화면에는 [저장된 값 -> 없으면 기본값] 순서로 적용되므로, 관리자가 아무것도 건드리지 않아도
// 지금과 똑같은 문구가 그대로 나옵니다.
import { useData } from '../context/DataContext';
import { useLanguage } from '../i18n/LanguageContext';
import { PAGE_SCHEMA } from './pageDefaults';

// 스키마(섹션별로 묶여 있음)를 { 항목키: 항목 } 형태로 펼친다
export function flattenFields(pageKey) {
  const page = PAGE_SCHEMA[pageKey];
  if (!page) return {};
  const out = {};
  page.sections.forEach(section => {
    section.fields.forEach(field => { out[field.key] = field; });
  });
  return out;
}

export function usePageContent(pageKey) {
  const { siteSettings } = useData();
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  const saved = siteSettings?.pageContent?.[pageKey] || {};
  const defaults = flattenFields(pageKey);

  // 문구 가져오기 — 영어 모드에서 영문이 비어 있으면 한글이라도 보여준다(빈 화면 방지)
  const txt = (key) => {
    const def = defaults[key] || {};
    const value = saved[key];
    if (value && typeof value === 'object') {
      if (isEn) return value.en || def.en || value.ko || def.ko || '';
      return value.ko || def.ko || '';
    }
    return (isEn ? def.en : def.ko) || '';
  };

  // 이미지 가져오기 — 관리자가 올린 이미지가 없으면 원래 쓰던 파일 경로를 쓴다
  const img = (key) => {
    const def = defaults[key] || {};
    const value = saved[key];
    if (value && typeof value === 'object' && value.src) return value.src;
    return def.src || '';
  };

  // 같은 자리에 사진 대신 동영상을 올릴 수도 있어서, 무엇이 들어있는지 함께 알려준다
  const media = (key) => {
    const value = saved[key];
    const src = img(key);
    const kind = (value && typeof value === 'object' && value.kind) || (/\.mp4($|\?)/i.test(src) ? 'video' : 'image');
    return { src, kind, isVideo: kind === 'video' };
  };

  return { txt, img, media, isEn };
}
