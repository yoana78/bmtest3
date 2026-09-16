import { requireAdmin } from '../../_auth.js';

// PUT /api/brands/:id — 기존 브랜드 수정 (부분 업데이트, 관리자 전용)
export async function onRequestPut(context) {
  const unauthorized = await requireAdmin(context);
  if (unauthorized) return unauthorized;

  const { env, params } = context;
  const { position, ...updates } = await context.request.json();

  const existing = await env.DB.prepare('SELECT data FROM brands WHERE id = ?').bind(params.id).first();
  if (!existing) return Response.json({ error: 'Not found' }, { status: 404 });

  const parsedExisting = JSON.parse(existing.data);
  // 브랜드 스키마에 정의된 필드만 덮어쓸 수 있게 제한한다 — 클라이언트가 임의의 새
  // 필드를 끼워넣어 저장하는 것을 막기 위함. 다만 "기존 레코드에 이미 있는 키"만
  // 허용하면, 아직 그 필드를 한 번도 저장한 적 없는 브랜드에 값을 처음 넣을 때
  // 조용히 버려지므로 스키마 목록도 함께 허용한다.
  const BRAND_SCHEMA_FIELDS = new Set([
    'nameKo', 'nameEn', 'tagline', 'taglineEn', 'logo', 'hasLogo', 'logoScale',
    'bgImage', 'descriptionKo', 'descriptionEn', 'categories', 'color', 'type'
  ]);
  const allowedUpdates = {};
  for (const key of Object.keys(updates)) {
    if (key in parsedExisting || BRAND_SCHEMA_FIELDS.has(key)) allowedUpdates[key] = updates[key];
  }
  const merged = { ...parsedExisting, ...allowedUpdates };
  if (position !== undefined) {
    await env.DB.prepare('UPDATE brands SET data = ?, position = ?, updated_at = datetime(\'now\') WHERE id = ?')
      .bind(JSON.stringify(merged), position, params.id)
      .run();
  } else {
    await env.DB.prepare('UPDATE brands SET data = ?, updated_at = datetime(\'now\') WHERE id = ?')
      .bind(JSON.stringify(merged), params.id)
      .run();
  }

  return Response.json({ ok: true, brand: merged });
}

// DELETE /api/brands/:id — 브랜드 삭제 (관리자 전용)
export async function onRequestDelete(context) {
  const unauthorized = await requireAdmin(context);
  if (unauthorized) return unauthorized;

  const { env, params } = context;
  await env.DB.prepare('DELETE FROM brands WHERE id = ?').bind(params.id).run();
  return Response.json({ ok: true });
}
