// 목록형 데이터(연혁, 유통사 로고, 명함)를 추가·수정·삭제·순서변경하는 편집기입니다.
// 어떤 입력칸이 나올지는 siteLists.js의 설계도(LIST_SCHEMA)가 정합니다.
import React, { useState } from 'react';

export default function ListEditor({ schema, items, onSave, uploadImage, translateText }) {
  const [draft, setDraft] = useState(() => JSON.parse(JSON.stringify(items || [])));
  const [openIndex, setOpenIndex] = useState(null);
  const [busy, setBusy] = useState('');
  const [message, setMessage] = useState('');

  const update = (index, patch) => {
    setDraft(prev => prev.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };

  const move = (index, dir) => {
    const target = index + dir;
    if (target < 0 || target >= draft.length) return;
    const next = [...draft];
    [next[index], next[target]] = [next[target], next[index]];
    setDraft(next);
    setOpenIndex(openIndex === index ? target : openIndex === target ? index : openIndex);
  };

  const remove = (index) => {
    if (!window.confirm('이 항목을 삭제하시겠습니까?')) return;
    setDraft(prev => prev.filter((_, i) => i !== index));
    setOpenIndex(null);
  };

  const add = () => {
    setDraft(prev => [...prev, schema.newItem()]);
    setOpenIndex(draft.length);
  };

  const handleUpload = async (index, field, file) => {
    if (!file) return;
    setBusy(`${index}-${field.key}`);
    setMessage('');
    try {
      const src = await uploadImage(file, field.width, field.height, field.fit || 'cover');
      update(index, { [field.key]: src });
    } catch (err) {
      setMessage('업로드 실패: ' + (err?.message || ''));
    } finally {
      setBusy('');
    }
  };

  const handleSave = async () => {
    setBusy('save');
    setMessage('');
    try {
      // 영문칸을 비워둔 항목은 저장할 때 한글을 자동 번역해서 채운다
      const filled = JSON.parse(JSON.stringify(draft));
      for (const item of filled) {
        for (const field of schema.fields) {
          if (field.type === 'text') {
            const ko = item[`${field.key}Ko`];
            if (ko && !item[`${field.key}En`]) item[`${field.key}En`] = (await translateText(ko)) || ko;
          } else if (field.type === 'lines') {
            const ko = item[`${field.key}Ko`] || [];
            const en = item[`${field.key}En`] || [];
            if (ko.length && en.length !== ko.length) {
              item[`${field.key}En`] = await Promise.all(ko.map(line => translateText(line).then(t => t || line)));
            }
          }
        }
      }
      await onSave(filled);
      setDraft(filled);
      setMessage('저장되었습니다. 사이트에 바로 반영됩니다.');
    } catch (err) {
      setMessage('저장 실패: ' + (err?.message || ''));
    } finally {
      setBusy('');
      setTimeout(() => setMessage(''), 6000);
    }
  };

  const inputStyle = { width: '100%', padding: '9px 10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.92rem', fontFamily: 'inherit' };
  const subLabel = { fontSize: '0.76rem', color: '#6B7280', marginBottom: '4px' };

  const renderField = (item, index, field) => {
    if (field.type === 'plain') {
      return (
        <div key={field.key}>
          <div style={subLabel}>{field.label}</div>
          <input
            type="text"
            value={item[field.key] || ''}
            placeholder={field.placeholder || ''}
            onChange={e => update(index, { [field.key]: e.target.value })}
            style={inputStyle}
          />
        </div>
      );
    }

    if (field.type === 'image') {
      const src = item[field.key];
      return (
        <div key={field.key}>
          <div style={subLabel}>
            {field.label}
            <span style={{ marginLeft: '6px', color: '#9CA3AF' }}>권장 {field.width}×{field.height} · {field.fit === 'contain' ? '잘리지 않게 여백을 두고 맞춤' : '가운데 기준 자동 크롭'}</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ width: '120px', aspectRatio: `${field.width} / ${field.height}`, border: '1px solid #E5E7EB', borderRadius: '6px', background: '#F9FAFB', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
              {src
                ? <img src={src} alt="" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', transform: `scale(${Number(item[field.scaleKey] ?? 1)})` }} />
                : <span style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>없음</span>}
            </div>
            <input type="file" accept="image/*" onChange={e => handleUpload(index, field, e.target.files[0])} style={{ fontSize: '0.82rem' }} />
            {busy === `${index}-${field.key}` && <span style={{ fontSize: '0.8rem', color: '#0066B3' }}>올리는 중…</span>}
          </div>
        </div>
      );
    }

    if (field.type === 'scale') {
      const value = Number(item[field.key] ?? 1);
      return (
        <div key={field.key}>
          <div style={subLabel}>🔍 {field.label} ({value.toFixed(1)}x)</div>
          <input
            type="range"
            min="0.5"
            max="2.5"
            step="0.1"
            value={value}
            onChange={e => update(index, { [field.key]: Number(e.target.value) })}
            style={{ width: '100%' }}
          />
        </div>
      );
    }

    if (field.type === 'lines') {
      const ko = (item[`${field.key}Ko`] || []).join('\n');
      const en = (item[`${field.key}En`] || []).join('\n');
      const toLines = (v) => v.split('\n').map(l => l.trim()).filter(Boolean);
      return (
        <div key={field.key} style={{ gridColumn: '1 / -1' }}>
          <div style={subLabel}>{field.label}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <textarea rows={4} value={ko} onChange={e => update(index, { [`${field.key}Ko`]: toLines(e.target.value) })} style={{ ...inputStyle, resize: 'vertical' }} />
            <textarea rows={4} value={en} placeholder="비워두면 자동 번역" onChange={e => update(index, { [`${field.key}En`]: toLines(e.target.value) })} style={{ ...inputStyle, resize: 'vertical', background: '#FCFCFD' }} />
          </div>
        </div>
      );
    }

    // type === 'text' — 한글/영문 한 줄씩
    return (
      <div key={field.key} style={{ gridColumn: '1 / -1' }}>
        <div style={subLabel}>{field.label}</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <input type="text" value={item[`${field.key}Ko`] || ''} onChange={e => update(index, { [`${field.key}Ko`]: e.target.value })} style={inputStyle} />
          <input type="text" value={item[`${field.key}En`] || ''} placeholder="비워두면 자동 번역" onChange={e => update(index, { [`${field.key}En`]: e.target.value })} style={{ ...inputStyle, background: '#FCFCFD' }} />
        </div>
      </div>
    );
  };

  return (
    <div style={{ marginBottom: '30px', border: '1px solid #E5E7EB', borderRadius: '10px', overflow: 'hidden' }}>
      <div style={{ background: '#F9FAFB', padding: '12px 16px', borderBottom: '1px solid #E5E7EB' }}>
        <strong style={{ fontSize: '0.98rem', color: '#111827' }}>{schema.label}</strong>
        {schema.note && <div style={{ fontSize: '0.8rem', color: '#6B7280', marginTop: '4px' }}>{schema.note}</div>}
      </div>

      <div style={{ padding: '16px' }}>
        <div style={{ display: 'grid', gap: '8px' }}>
          {draft.map((item, index) => (
            <div key={index} style={{ border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', background: openIndex === index ? '#EFF6FF' : '#FFFFFF' }}>
                <span style={{ fontSize: '0.78rem', color: '#9CA3AF', minWidth: '24px' }}>{index + 1}</span>
                <span style={{ flex: 1, fontSize: '0.9rem', color: '#111827', fontWeight: 600 }}>{schema.itemLabel(item)}</span>
                <button onClick={() => move(index, -1)} disabled={index === 0} style={{ padding: '4px 9px', borderRadius: '5px', border: '1px solid #D1D5DB', background: '#FFFFFF', cursor: index === 0 ? 'not-allowed' : 'pointer', color: index === 0 ? '#D1D5DB' : '#374151' }}>▲</button>
                <button onClick={() => move(index, 1)} disabled={index === draft.length - 1} style={{ padding: '4px 9px', borderRadius: '5px', border: '1px solid #D1D5DB', background: '#FFFFFF', cursor: index === draft.length - 1 ? 'not-allowed' : 'pointer', color: index === draft.length - 1 ? '#D1D5DB' : '#374151' }}>▼</button>
                <button onClick={() => setOpenIndex(openIndex === index ? null : index)} style={{ padding: '5px 12px', fontSize: '0.8rem', fontWeight: 600, borderRadius: '6px', border: '1px solid #D1D5DB', background: '#FFFFFF', color: '#374151', cursor: 'pointer' }}>
                  {openIndex === index ? '접기' : '수정'}
                </button>
                <button onClick={() => remove(index)} style={{ padding: '5px 12px', fontSize: '0.8rem', fontWeight: 600, borderRadius: '6px', border: '1px solid #FCA5A5', background: '#FEF2F2', color: '#DC2626', cursor: 'pointer' }}>삭제</button>
              </div>

              {openIndex === index && (
                <div style={{ padding: '14px 12px', borderTop: '1px solid #E5E7EB', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  {schema.fields.map(field => renderField(item, index, field))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px' }}>
          <button onClick={add} style={{ padding: '10px 18px', fontSize: '0.88rem', fontWeight: 600, borderRadius: '7px', border: '1px dashed #0066B3', background: '#F0F7FF', color: '#0066B3', cursor: 'pointer' }}>
            ➕ 항목 추가
          </button>
          <button
            onClick={handleSave}
            disabled={busy === 'save'}
            style={{ padding: '10px 22px', fontSize: '0.9rem', fontWeight: 700, borderRadius: '7px', border: 'none', background: busy === 'save' ? '#9CA3AF' : '#0066B3', color: '#FFFFFF', cursor: busy === 'save' ? 'not-allowed' : 'pointer' }}
          >
            {busy === 'save' ? '저장 중… (영문 자동 번역 포함)' : '이 목록 저장'}
          </button>
          {message && <span style={{ fontSize: '0.86rem', fontWeight: 600, color: message.includes('실패') ? '#DC2626' : '#059669' }}>{message}</span>}
        </div>
      </div>
    </div>
  );
}
