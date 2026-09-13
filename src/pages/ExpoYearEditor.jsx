// "신뢰와 인증" 페이지의 박람회 갤러리에 새 연도를 추가하는 편집기입니다.
// 기존 연도(2019, 2023~2025)는 코드에 들어있어 목록에만 보여주고 수정하지 않으며,
// 여기서 추가한 연도만 서버에 저장되어 기존 연도 뒤에 이어 붙습니다.
import React, { useState } from 'react';
import { BUILT_IN_YEAR_META, EXPO_PHOTO_SIZE } from '../content/expoData';

const emptyYear = () => ({
  year: String(new Date().getFullYear()),
  labelKo: '',
  labelEn: '',
  descKo: '',
  descEn: '',
  locationKo: '',
  locationEn: '',
  photos: []
});

export default function ExpoYearEditor({ expoYears, onSave, uploadPhoto, translateText }) {
  const added = Array.isArray(expoYears) ? expoYears : [];
  const [draft, setDraft] = useState(emptyYear);
  const [busy, setBusy] = useState('');
  const [message, setMessage] = useState('');

  const setField = (key, value) => setDraft(prev => ({ ...prev, [key]: value }));

  const handleAddPhotos = async (files) => {
    if (!files || !files.length) return;
    setBusy('photos');
    setMessage('');
    try {
      const uploaded = [];
      for (const file of files) {
        const src = await uploadPhoto(file);
        uploaded.push({ id: `expo-${Date.now()}-${uploaded.length}`, image: src });
      }
      setDraft(prev => ({ ...prev, photos: [...prev.photos, ...uploaded] }));
    } catch (err) {
      setMessage('사진 업로드 실패: ' + (err?.message || ''));
    } finally {
      setBusy('');
    }
  };

  const removeDraftPhoto = (index) => {
    setDraft(prev => ({ ...prev, photos: prev.photos.filter((_, i) => i !== index) }));
  };

  const handleAddYear = async () => {
    if (!draft.year.trim() || !draft.labelKo.trim()) {
      setMessage('연도와 박람회 이름은 반드시 입력해 주세요.');
      return;
    }
    if (!draft.photos.length) {
      setMessage('사진을 한 장 이상 추가해 주세요.');
      return;
    }
    setBusy('save');
    setMessage('');
    try {
      // 영문칸을 비워두면 한글을 자동 번역해서 채운다
      const entry = { ...draft };
      if (!entry.labelEn) entry.labelEn = (await translateText(entry.labelKo)) || entry.labelKo;
      if (entry.descKo && !entry.descEn) entry.descEn = (await translateText(entry.descKo)) || entry.descKo;
      if (entry.locationKo && !entry.locationEn) entry.locationEn = (await translateText(entry.locationKo)) || entry.locationKo;

      await onSave([...added, entry]);
      setDraft(emptyYear());
      setMessage(`${entry.year}년 박람회가 추가되었습니다. 사이트에 바로 반영됩니다.`);
    } catch (err) {
      setMessage('저장 실패: ' + (err?.message || ''));
    } finally {
      setBusy('');
      setTimeout(() => setMessage(''), 7000);
    }
  };

  const handleDeleteYear = async (index) => {
    const entry = added[index];
    if (!window.confirm(`${entry.year}년 박람회를 삭제하시겠습니까?`)) return;
    await onSave(added.filter((_, i) => i !== index));
  };

  const inputStyle = { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.95rem', fontFamily: 'inherit' };
  const labelStyle = { display: 'block', fontWeight: 600, marginBottom: '6px', color: '#374151', fontSize: '0.88rem' };

  return (
    <div style={{ marginBottom: '30px', border: '1px solid #E5E7EB', borderRadius: '10px', overflow: 'hidden' }}>
      <div style={{ background: '#F9FAFB', padding: '12px 16px', borderBottom: '1px solid #E5E7EB' }}>
        <strong style={{ fontSize: '0.98rem', color: '#111827' }}>박람회 연도 추가</strong>
        <div style={{ fontSize: '0.8rem', color: '#6B7280', marginTop: '4px' }}>
          새로 참가한 박람회를 연도별로 추가합니다. 사진 제목은 박람회 이름을 따라 자동으로 붙습니다.
        </div>
      </div>

      <div style={{ padding: '18px 16px' }}>
        {/* 이미 올라가 있는 연도 목록 */}
        <div style={{ marginBottom: '22px' }}>
          <div style={{ ...labelStyle, marginBottom: '10px' }}>현재 등록된 박람회</div>
          <div style={{ display: 'grid', gap: '8px' }}>
            {Object.keys(BUILT_IN_YEAR_META).sort().map(year => (
              <div key={year} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', border: '1px solid #E5E7EB', borderRadius: '8px', background: '#FAFAFA' }}>
                <strong style={{ fontSize: '0.9rem', color: '#111827', minWidth: '52px' }}>{year}</strong>
                <span style={{ fontSize: '0.85rem', color: '#4B5563', flex: 1 }}>{BUILT_IN_YEAR_META[year].labelKo}</span>
                <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>기본 제공</span>
              </div>
            ))}
            {added.map((entry, idx) => (
              <div key={`${entry.year}-${idx}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', border: '1px solid #BFDBFE', borderRadius: '8px', background: '#EFF6FF' }}>
                <strong style={{ fontSize: '0.9rem', color: '#111827', minWidth: '52px' }}>{entry.year}</strong>
                <span style={{ fontSize: '0.85rem', color: '#4B5563', flex: 1 }}>
                  {entry.labelKo} <span style={{ color: '#9CA3AF' }}>(사진 {entry.photos?.length || 0}장)</span>
                </span>
                <button
                  onClick={() => handleDeleteYear(idx)}
                  style={{ padding: '5px 12px', fontSize: '0.78rem', fontWeight: 600, border: '1px solid #FCA5A5', borderRadius: '6px', background: '#FEF2F2', color: '#DC2626', cursor: 'pointer' }}
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 새 연도 입력 */}
        <div style={{ borderTop: '1px dashed #E5E7EB', paddingTop: '18px', display: 'grid', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '14px' }}>
            <div>
              <label style={labelStyle}>연도</label>
              <input type="text" value={draft.year} onChange={e => setField('year', e.target.value)} placeholder="예: 2026" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>박람회 이름 (한글)</label>
              <input type="text" value={draft.labelKo} onChange={e => setField('labelKo', e.target.value)} placeholder="예: 2026 태국 국제 펫 박람회 현장 갤러리" style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>
              박람회 이름 (영문)
              <span style={{ fontSize: '0.78rem', color: '#6B7280', marginLeft: '6px', fontWeight: 500 }}>비워두면 자동 번역</span>
            </label>
            <input type="text" value={draft.labelEn} onChange={e => setField('labelEn', e.target.value)} style={{ ...inputStyle, background: '#FCFCFD' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={labelStyle}>설명 (한글)</label>
              <input type="text" value={draft.descKo} onChange={e => setField('descKo', e.target.value)} placeholder="예: 방콕 현지 부명 브랜드 전시 및 상담 현장" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>
                설명 (영문)
                <span style={{ fontSize: '0.78rem', color: '#6B7280', marginLeft: '6px', fontWeight: 500 }}>비워두면 자동 번역</span>
              </label>
              <input type="text" value={draft.descEn} onChange={e => setField('descEn', e.target.value)} style={{ ...inputStyle, background: '#FCFCFD' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={labelStyle}>장소 (한글)</label>
              <input type="text" value={draft.locationKo} onChange={e => setField('locationKo', e.target.value)} placeholder="예: 방콕, 태국" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>
                장소 (영문)
                <span style={{ fontSize: '0.78rem', color: '#6B7280', marginLeft: '6px', fontWeight: 500 }}>비워두면 자동 번역</span>
              </label>
              <input type="text" value={draft.locationEn} onChange={e => setField('locationEn', e.target.value)} style={{ ...inputStyle, background: '#FCFCFD' }} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>
              박람회 사진
              <span style={{ fontSize: '0.78rem', color: '#6B7280', marginLeft: '6px', fontWeight: 500 }}>
                권장 해상도 {EXPO_PHOTO_SIZE.width}×{EXPO_PHOTO_SIZE.height} · 다른 비율은 가운데 기준으로 자동 크롭 · 여러 장 한 번에 선택 가능
              </span>
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={e => handleAddPhotos([...e.target.files])}
              style={{ fontSize: '0.85rem' }}
            />
            {busy === 'photos' && <div style={{ fontSize: '0.82rem', color: '#0066B3', marginTop: '8px' }}>사진을 올리는 중입니다…</div>}

            {draft.photos.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '12px' }}>
                {draft.photos.map((photo, idx) => (
                  <div key={photo.id} style={{ position: 'relative', width: '120px', height: '90px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #E5E7EB' }}>
                    <img src={photo.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button
                      onClick={() => removeDraftPhoto(idx)}
                      style={{ position: 'absolute', top: '4px', right: '4px', width: '22px', height: '22px', borderRadius: '50%', border: 'none', background: 'rgba(0,0,0,0.6)', color: '#FFFFFF', cursor: 'pointer', fontSize: '0.8rem', lineHeight: 1 }}
                      aria-label="사진 삭제"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={handleAddYear}
              disabled={busy === 'save'}
              style={{
                padding: '12px 26px',
                fontSize: '0.95rem',
                fontWeight: 700,
                border: 'none',
                borderRadius: '8px',
                background: busy === 'save' ? '#9CA3AF' : '#0066B3',
                color: '#FFFFFF',
                cursor: busy === 'save' ? 'not-allowed' : 'pointer'
              }}
            >
              {busy === 'save' ? '추가 중… (영문 자동 번역 포함)' : '➕ 박람회 연도 추가'}
            </button>
            {message && (
              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: message.includes('실패') || message.includes('주세요') ? '#DC2626' : '#059669' }}>
                {message}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
