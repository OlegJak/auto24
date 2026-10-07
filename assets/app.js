/* ==========================================================================
   Shared UI: icons, header/footer, car cards, favourites, helpers
   ========================================================================== */

const ICONS = {
  heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  search: '<circle cx="11" cy="11" r="7.5"/><path d="m20.5 20.5-4.2-4.2"/>',
  user: '<circle cx="12" cy="8" r="4.5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
  plus: '<path d="M5 12h14M12 5v14"/>',
  chevDown: '<path d="m6 9 6 6 6-6"/>',
  chevRight: '<path d="m9 18 6-6-6-6"/>',
  chevLeft: '<path d="m15 18-6-6 6-6"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  gauge: '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
  fuel: '<path d="M3 22h12M4 9h10M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0V9.83a2 2 0 0 0-.59-1.42L18 5"/>',
  gear: '<circle cx="6" cy="5" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="18" cy="5" r="2"/><circle cx="6" cy="19" r="2"/><circle cx="12" cy="19" r="2"/><path d="M6 7v10M12 7v10M18 7v5H6"/>',
  calendar: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  bolt: '<path d="M13 2 4.5 13.5H12L11 22l8.5-11.5H12L13 2Z"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  sliders: '<path d="M21 4h-7M10 4H3M21 12h-9M8 12H3M21 20h-5M12 20H3M14 2v4M8 10v4M16 18v4"/>',
  grid: '<rect width="7" height="7" x="3" y="3" rx="1.5"/><rect width="7" height="7" x="14" y="3" rx="1.5"/><rect width="7" height="7" x="14" y="14" rx="1.5"/><rect width="7" height="7" x="3" y="14" rx="1.5"/>',
  list: '<rect width="7" height="7" x="3" y="3" rx="1.5"/><rect width="7" height="7" x="3" y="14" rx="1.5"/><path d="M14 5h7M14 9h5M14 16h7M14 20h5"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  share: '<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"/>',
  arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  clock: '<circle cx="12" cy="12" r="9.5"/><path d="M12 7v5l3 2"/>',
  globe: '<circle cx="12" cy="12" r="9.5"/><path d="M12 2.5a14.5 14.5 0 0 0 0 19 14.5 14.5 0 0 0 0-19M2.5 12h19"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
  car: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
  bike: '<circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6h2l3 11.5M5.5 17.5 9 10h6l3.5 7.5M9 10 7.5 6H5"/>',
  truck: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2M15 18H9M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
  wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  boat: '<path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6M12 10v4M12 2v3"/>',
  hammer: '<path d="m15 12-8.5 8.5a2.12 2.12 0 0 1-3-3L12 9"/><path d="M17.64 15 22 10.64M20.91 11.7l-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91"/>',
  trendDown: '<path d="M16 17h6v-6M22 17l-8.5-8.5-5 5L2 7"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  sparkle: '<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>',
  palette: '<circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.65-.75 1.65-1.69 0-.44-.18-.84-.44-1.13-.29-.29-.44-.65-.44-1.13a1.64 1.64 0 0 1 1.67-1.67h2c3.05 0 5.56-2.5 5.56-5.56C21.97 6.01 17.46 2 12 2z"/>',
  seat: '<path d="M7 3h4l1.5 9H18a2 2 0 0 1 2 2v3H8.5z"/><path d="M9 17v4M18 17v4"/>',
  light: '<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/>',
  music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  tire: '<circle cx="12" cy="12" r="9.5"/><circle cx="12" cy="12" r="4"/><path d="M12 2.5V8M12 16v5.5M2.5 12H8M16 12h5.5"/>',
  flag: '<path d="M4 22V4M4 4h13l-2.5 4.5L17 13H4"/>',
  carPlus: '<g transform="translate(-.5 3) scale(.86)"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></g><path d="M19.5 1.5v6M16.5 4.5h6"/>',
  info: '<circle cx="12" cy="12" r="9.5"/><path d="M12 16v-4.5M12 8h.01"/>',
  download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
  hash: '<path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18"/>',
  drive: '<circle cx="12" cy="12" r="9.5"/><circle cx="12" cy="12" r="2.5"/><path d="M12 2.5v7M3.5 15.5l6.3-2.3M20.5 15.5l-6.3-2.3"/>',
};

function icon(name, cls = '') {
  return `<svg class="i ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ''}</svg>`;
}

/* Side-profile silhouettes for body types (viewBox 0 0 96 44): body outline, tinted windows, wheels.
   Shapes are deliberately exaggerated so each type reads at a glance. */
const BODY_SHAPES = {
  Sedaan: { body: 'M8 36V30Q8 27 12 26L26 24L36 16Q38 15 41 15H60Q63 15 65 17L72 24L86 26Q89 27 89 30V36Z',
    win: 'M38 23L42 17.5H50V23ZM53 23V17.5H61L66 23Z', wheels: [24, 74] },
  Universaal: { body: 'M8 36V30Q8 27 12 26L26 24L36 16Q38 15 41 15H83Q86 15 87 18L89 26V36Z',
    win: 'M38 23L42 17.5H52V23ZM55 23V17.5H68V23ZM71 23V17.5H82L84 23Z', wheels: [24, 74] },
  Luukpära: { body: 'M16 36V30Q16 27 20 26L32 24L41 15.5Q43 14.5 46 14.5H70Q73 14.5 74 17L78 27Q80 28 80 31V36Z',
    win: 'M43 23L47 17H56V23ZM59 23V17H69L72 23Z', wheels: [30, 68] },
  Maastur: { body: 'M8 33V24Q8 21 12 20L23 19L31 10Q33 9 36 9H81Q85 9 86 12L88 20V33Z',
    win: 'M34 17L38.5 11.5H54V17ZM57 17V11.5H71V17ZM74 17V11.5H82L84 17Z', rails: 'M38 6.5H80', wheels: [24, 73], r: 6.5, ground: 33 },
  Kupee: { body: 'M6 36V31Q6 28 10 27L28 25L40 18Q43 16.5 47 16.5H58Q62 16.5 66 19L77 25L88 27Q90 28 90 31V36Z',
    win: 'M43 23.5L47.5 19H60L67 23.5Z', wheels: [22, 75] },
  Kabriolett: { body: 'M6 36V31Q6 28 10 27L31 25L37 17.5L39.5 25H66Q68 21 76 21Q82 21 84 25L88 26.5Q90 27.5 90 30.5V36Z',
    win: '', extra: 'M66 25Q68 21 76 21Q82 21 84 25', wheels: [22, 75] },
  Mahtuniversaal: { body: 'M8 36V29Q8 26 11 25L19 22L33 10Q35 9 38 9H82Q86 9 87 13L89 22V36Z',
    win: 'M32 18L40 11.5H51V18ZM54 18V11.5H67V18ZM70 18V11.5H82L84 18Z', wheels: [24, 74] },
  Kaubik: { body: 'M6 36V28Q6 25 9 24L16 22L22 8Q23 6 26 6H86Q89 6 89 9V36Z',
    win: 'M24 18L28 9.5H35V18Z', extra: 'M39 8V34M58 30H64', wheels: [21, 75] },
};
function bodySvg(name) {
  const s = BODY_SHAPES[name];
  const r = s.r || 5, y = s.ground || 36;
  return `<svg viewBox="0 0 96 44" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true" class="body-svg">
    <path d="${s.body}" fill="var(--surface-2)"/>
    ${s.win ? `<path d="${s.win}" fill="var(--accent-soft)" stroke-width="1.3"/>` : ''}
    ${s.rails ? `<path d="${s.rails}" stroke-width="2"/>` : ''}
    ${s.extra ? `<path d="${s.extra}" stroke-width="1.4"/>` : ''}
    <path d="M2 ${y + r + 1}H94" stroke-width="1" opacity=".25"/>
    ${s.wheels.map((x) => `<circle cx="${x}" cy="${y}" r="${r}" fill="var(--surface)" stroke-width="2"/><circle cx="${x}" cy="${y}" r="${r * 0.38}" fill="currentColor" stroke="none"/>`).join('')}
  </svg>`;
}

/* Brand logos (open car-logos dataset via jsDelivr); hidden automatically if one fails to load */
const LOGO_SLUG = { VAZ: 'lada' };
function brandLogo(make, cls = 'brand-logo') {
  const slug = LOGO_SLUG[make] || make.toLowerCase().replace(/\s+/g, '-');
  return `<img class="${cls}" src="https://cdn.jsdelivr.net/gh/filippofilip95/car-logos-dataset@master/logos/optimized/${slug}.png" alt="" loading="lazy" data-fallback="">`;
}

/* ---------- Formatting ---------- */
const nf = new Intl.NumberFormat('et-EE');
const fmt = (n) => nf.format(n);
const eur = (n) => `${fmt(n)} €`;
/* auto24 Liising, modelled on the original calculator:
   pricier cars → leasing 15 000–40 000 € over 2–10 years; cheaper cars → loan 300–15 000 € over 1–6 years.
   Optional 25% residual value; ~8.5% annual rate approximates auto24's example payments. */
const LEASING_RATE = 8.5;
function leasingPlan(price) {
  if (price >= 18750) {
    return { kind: 'leasing', min: 15000, max: 40000, sum: Math.min(Math.round((price * 0.8) / 100) * 100, 40000), yMin: 2, yMax: 10, years: 10, step: 100 };
  }
  return { kind: 'loan', min: 300, max: 15000, sum: Math.min(price, 15000), yMin: 1, yMax: 6, years: 6, step: 10 };
}
function leasingPay(sum, years, residual = true) {
  const r = LEASING_RATE / 100 / 12, n = years * 12;
  const balloon = residual ? sum * 0.25 : 0;
  return Math.round(((sum - balloon / Math.pow(1 + r, n)) * r) / (1 - Math.pow(1 + r, -n)));
}
function monthly(price) {
  const p = leasingPlan(price);
  return leasingPay(p.sum, p.years, true);
}
const eur2 = (n) => `${new Intl.NumberFormat('et-EE', { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 }).format(n)} €`;
const yearsLabel = (y) => (y === 1 ? '1 aasta' : `${y} aastat`);
function ago(hours) {
  if (hours < 1) return 'just praegu';
  if (hours < 24) return `${hours} h tagasi`;
  const d = Math.round(hours / 24);
  return d === 1 ? 'eile' : `${d} päeva tagasi`;
}
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------- Storage (per-viewer convenience, safe to fail) ---------- */
const store = {
  get(key, fallback) { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; } },
  set(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* private mode */ } },
};

/* ---------- Favourites ---------- */
let favs = new Set(store.get('a24.favs', [4343798, 4347038]));
function toggleFav(id) {
  favs.has(id) ? favs.delete(id) : favs.add(id);
  store.set('a24.favs', [...favs]);
  updateFavCount();
  toast(favs.has(id) ? `${icon('heart', 'sm')} Lisatud lemmikutesse` : 'Eemaldatud lemmikutest');
  return favs.has(id);
}
function updateFavCount() {
  document.querySelectorAll('[data-fav-count]').forEach((el) => { el.textContent = favs.size || ''; });
}

/* ---------- Toast ---------- */
let toastTimer;
function toast(html) {
  let el = document.querySelector('.toast');
  if (!el) { el = document.createElement('div'); el.className = 'toast'; el.setAttribute('role', 'status'); document.body.append(el); }
  el.innerHTML = html;
  requestAnimationFrame(() => el.classList.add('show'));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

/* ---------- Car card ---------- */
function carCard(c, { eager = false } = {}) {
  const isNew = c.hours <= 6;
  const tags = [
    isNew ? '<span class="tag tag-new">Uus</span>' : '',
    c.oldPrice ? `<span class="tag tag-drop">${icon('trendDown')} −${fmt(c.oldPrice - c.price)} €</span>` : '',
  ].join('');
  return `
  <article class="car-card">
    <div class="car-media">
      <img src="${img(c.imgs[0])}" alt="${esc(c.make)} ${esc(c.model)}" loading="${eager ? 'eager' : 'lazy'}" decoding="async">
      <div class="tags">${tags}</div>
      ${c.verified ? `<span class="tag tag-glass photos">${icon('shield')} Kontrollitud ajalugu</span>` : ''}
    </div>
    <button class="fav" data-fav="${c.id}" aria-pressed="${favs.has(c.id)}" aria-label="Lisa lemmikutesse">${icon('heart')}</button>
    <div class="car-body">
      <div>
        <h3 class="car-title"><a href="kuulutus.html?id=${c.id}">${esc(c.make)} ${esc(c.model)}</a></h3>
        <p class="car-sub">${esc(c.trim)}</p>
      </div>
      <div class="specs">
        <span>${icon('calendar')}${c.year}</span>
        <span>${icon('gauge')}${fmt(c.km)} km</span>
        <span>${icon(c.fuel === 'Elekter' ? 'bolt' : 'fuel')}${c.fuel}</span>
        <span class="hide-sm">${icon('gear')}${c.gear}</span>
      </div>
      <div class="car-foot">
        <div>
          <div class="price num">${c.oldPrice ? `<s>${eur(c.oldPrice)}</s>` : ''}${eur(c.price)}</div>
          <span class="loc">${icon('pin')}${esc(c.city)}</span>
        </div>
        <div class="monthly">alates<br><b class="num">${eur(monthly(c.price))}</b>/kuu</div>
      </div>
    </div>
  </article>`;
}

/* ---------- Header / footer ---------- */
const LOGO_URL = 'https://img.auto24.ee/images/main_logo.svg?v2';
const PORTALS = [
  ['https://www.mototehnika.ee/', 'https://img.auto24.ee/images/header/logo_mototehnika_r.png', 'mototehnika.ee'],
  ['https://www.rasketehnika.ee/', 'https://img.auto24.ee/images/header/logo_rasketehnika_r.png', 'rasketehnika.ee'],
  ['https://www.veetehnika.ee/', 'https://img.auto24.ee/images/header/logo_veetehnika_r.png', 'veetehnika.ee'],
  ['https://www.kuldnebors.ee/', 'https://img.auto24.ee/images/header/logo_kb_r.png', 'kuldnebors.ee'],
];
function renderChrome() {
  const page = document.body.dataset.page;
  const nav = [
    ['otsing.html', 'Kasutatud', 'search'],
    ['mark.html', 'Margid', 'makes'],
    ['#', 'Uued autod'],
    ['#', 'Varuosad'],
    ['#', 'Rent'],
    ['#', 'Teenused'],
    ['#uudised', 'Ajakiri'],
  ];
  /* Top bar: auto24 + sister portals (always at the very top, like the original) */
  const topbar = document.createElement('div');
  topbar.className = 'topbar';
  topbar.innerHTML = `
    <div class="container topbar-row">
      <a href="index.html" class="logo" aria-label="auto24.ee avaleht"><img src="${LOGO_URL}" alt="auto24.ee" width="190" height="32"></a>
      <nav class="portals" aria-label="Meie portaalid">
        ${PORTALS.map(([href, src, alt]) => `<a href="${href}" target="_blank" rel="noopener"><img src="${src}" alt="${alt}" height="56"></a>`).join('')}
      </nav>
      <div class="topbar-actions">
        <label class="lang-btn">${icon('globe', 'sm')}
          <select aria-label="Keel" id="langSelect" style="appearance:none;-webkit-appearance:none;border:0;background:none;font-weight:600;cursor:pointer;outline:0">
            <option value="et" ${LANG === 'et' ? 'selected' : ''}>ET</option><option value="ru" ${LANG === 'ru' ? 'selected' : ''}>RU</option>
          </select>
        </label>
        <a href="#" class="btn btn-ghost btn-sm login-btn">${icon('user', 'sm')}Logi sisse</a>
      </div>
    </div>`;

  const header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML = `
    <div class="container header-row">
      <a href="index.html" class="logo logo-mini" aria-label="auto24.ee avaleht"><img src="${LOGO_URL}" alt="auto24.ee" width="143" height="24"></a>
      <nav class="main-nav" aria-label="Peamenüü">
        ${nav.map(([href, label, key]) => `<a href="${href}"${key === page ? ' aria-current="page"' : ''}>${label}</a>`).join('')}
      </nav>
      <div class="header-actions">
        <a href="#" class="icon-btn fav-btn" aria-label="Lemmikud">${icon('heart')}<span class="badge-dot" data-fav-count></span></a>
        <a href="#" class="btn btn-primary sell-btn" data-sell aria-label="Müü auto">${icon('carPlus', 'lg')}<span>Müü auto</span></a>
        <button class="icon-btn menu-btn" aria-label="Menüü" aria-expanded="false">${icon('menu')}</button>
      </div>
    </div>`;
  const mobileNav = document.createElement('nav');
  mobileNav.className = 'mobile-nav';
  mobileNav.setAttribute('aria-label', 'Mobiilimenüü');
  mobileNav.innerHTML = nav.map(([href, label]) => `<a href="${href}">${label}${icon('chevRight')}</a>`).join('') +
    `<a href="#" data-lang-toggle>${LANG === 'ru' ? 'Eesti keeles' : 'На русском'}${icon('globe')}</a><a href="#">Logi sisse${icon('user')}</a><a href="#" class="btn btn-primary btn-lg btn-block" data-sell>${icon('carPlus', 'lg')}Müü oma auto</a>`;
  document.body.prepend(topbar, header, mobileNav);
  topbar.querySelector('#langSelect').addEventListener('change', (e) => setLang(e.target.value));

  /* Show the compact logo in the sticky bar once the top bar has scrolled away */
  new IntersectionObserver(([e]) => header.classList.toggle('stuck', !e.isIntersecting)).observe(topbar);

  const menuBtn = header.querySelector('.menu-btn');
  menuBtn.addEventListener('click', () => {
    const open = !mobileNav.classList.contains('open');
    if (open) mobileNav.style.top = `${Math.max(0, header.getBoundingClientRect().bottom)}px`;
    mobileNav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.innerHTML = icon(open ? 'x' : 'menu');
    document.documentElement.style.overflow = open ? 'hidden' : '';
  });

  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="container">
      <div class="foot-grid">
        <div class="foot-about">
          <a href="index.html" class="logo"><img src="${LOGO_URL}" alt="auto24.ee" width="167" height="28"></a>
          <p>Eesti suurim sõidukite turg. Üle 48 000 kuulutuse, kontrollitud ajalugu ja turvaline tehing ühest kohast.</p>
        </div>
        <div><h5>Ostjale</h5><ul><li><a href="otsing.html">Kasutatud autod</a></li><li><a href="#">Uued autod</a></li><li><a href="#">Oksjonid</a></li><li><a href="#">Ajaloo kontroll</a></li><li><a href="#">Liising ja laen</a></li></ul></div>
        <div><h5>Müüjale</h5><ul><li><a href="#" data-sell>Lisa kuulutus</a></li><li><a href="#">Auto hindamine</a></li><li><a href="#">Hinnakiri</a></li><li><a href="#">Ärikliendile</a></li></ul></div>
        <div><h5>Ajakiri</h5><ul><li><a href="#">Uudised</a></li><li><a href="#">Proovisõidud</a></li><li><a href="#">Ostuabi</a></li><li><a href="#">Foorum</a></li></ul></div>
        <div><h5>auto24</h5><ul><li><a href="#">Meist</a></li><li><a href="#">Kontakt</a></li><li><a href="#">Kasutustingimused</a></li><li><a href="#">Privaatsus</a></li></ul></div>
      </div>
      <div class="foot-bottom">
        <span>© 2026 auto24.ee · Redesign concept</span>
        <div class="sites"><a href="#">mototehnika.ee</a><a href="#">rasketehnika.ee</a><a href="#">veetehnika.ee</a><a href="#">kuldnebors.ee</a></div>
      </div>
    </div>`;
  document.body.append(footer);
  updateFavCount();
}

/* Images hot-linked from www.auto24.ee can be blocked by its bot protection: swap in a text fallback */
document.addEventListener('error', (e) => {
  const img = e.target;
  if (img.tagName !== 'IMG' || img.dataset.fallback === undefined) return;
  if (!img.dataset.fallback) { img.remove(); return; }
  const span = document.createElement('span');
  span.className = `${img.className} img-fallback`;
  span.dataset.noI18n = '';
  span.textContent = img.dataset.fallback;
  img.replaceWith(span);
}, true);

/* ---------- Global delegation ---------- */
document.addEventListener('click', (e) => {
  const fav = e.target.closest('[data-fav]');
  if (fav) {
    e.preventDefault();
    const on = toggleFav(Number(fav.dataset.fav));
    document.querySelectorAll(`[data-fav="${fav.dataset.fav}"]`).forEach((b) => b.setAttribute('aria-pressed', on));
    return;
  }
  if (e.target.closest('[data-lang-toggle]')) { e.preventDefault(); setLang(LANG === 'ru' ? 'et' : 'ru'); return; }
  if (e.target.closest('[data-sell]')) {
    e.preventDefault();
    toast('Demo: siin avaneb 3-sammuline kuulutuse lisamine');
  }
});

/* ---------- Search helpers (shared by home + search page) ---------- */
const TOTAL = 48213;
const inRange = (v, min, max) => (!min || v >= min) && (!max || v <= max);
/* Exchange possibility is demo-only (not in scraped data); registration fee comes from the original listings */
const hasExchange = (c) => !c.dealer || c.id % 4 === 0;
const hasRegFee = (c) => c.taxReg === 0; /* registration fee 0 € on auto24 = already registered/paid */

function modelMatches(make, sel, model) {
  if (!sel || sel === model) return true;
  let m = sel.match(/^(\d)\. seeria$/);
  if (m) return new RegExp(`^(${m[1]}\\d\\d|ActiveHybrid ${m[1]})\\b`).test(model);
  m = sel.match(/^(.+)-klass$/);
  if (m) return model.startsWith(m[1] === 'M' ? 'ML ' : `${m[1]} `);
  if (sel === 'Mercedes-Maybach') return /Maybach$/.test(model);
  return model.startsWith(`${sel} `);
}

/* Where a model sits on auto24's make pages: optional series/class group + generation for a year */
function modelPath(make, model) {
  const gens = (typeof MAKE_GENS !== 'undefined' && MAKE_GENS[make]) || {};
  if (gens[model] !== undefined) return { group: null, key: model };
  const group = Object.keys(gens).find((k) => k !== model && modelMatches(make, k, model)) || null;
  return { group, key: group };
}
function generationFor(make, key, year) {
  const ranges = ((typeof MAKE_GENS !== 'undefined' && MAKE_GENS[make]?.[key]) || '').split(',').filter(Boolean)
    .map((g) => { const [a, b] = g.split('-'); return { from: +a, to: b ? +b : 0 }; })
    .filter((g) => year >= g.from && (!g.to || year <= g.to));
  return ranges.sort((x, y) => y.from - x.from)[0] || null;
}
const genLabel = (g) => (g.to ? `${g.from}–${g.to}` : `alates ${g.from}`);

/* Breadcrumb trail: Avaleht › make › [series/class] › model › generation */
function crumbTrail({ make, model, yearMin, yearMax, year, category = 'Sõiduauto ja maastur', categoryHref = 'otsing.html', current = true }) {
  /* Category is shown only when no make is chosen (e.g. search page without filters) */
  const parts = [['Avaleht', 'index.html'], ...(make ? [] : [[category, categoryHref]])];
  const sep = icon('chevRight');
  if (make) {
    /* Each step opens listings of all years: make → all models, series → whole series, model → that model */
    const listUrl = (m) => `otsing.html?${new URLSearchParams({ m })}`;
    parts.push([make, listUrl(make), true]);
    const { group, key } = model ? modelPath(make, model) : { group: null, key: null };
    if (group) parts.push([group, listUrl(`${make}~${group}`)]);
    if (model) parts.push([model, listUrl(`${make}~${model}`), true]);
    let gen = null;
    if (year && key) gen = generationFor(make, key, year);
    if (gen) parts.push([genLabel(gen), `otsing.html?${new URLSearchParams({ m: `${make}~${model}`, yearMin: gen.from, ...(gen.to ? { yearMax: gen.to } : {}) })}`]);
    else if (yearMin || yearMax) parts.push([yearMin && yearMax ? `${yearMin}–${yearMax}` : yearMin ? `alates ${yearMin}` : `kuni ${yearMax}`, '']);
  }
  return `<nav class="crumbs" aria-label="Asukoht">${parts.map(([label, href, raw], i) => {
    const last = i === parts.length - 1 && current;
    const attrs = raw ? ' data-no-i18n' : '';
    return (i ? sep : '') + (last || !href ? `<span${attrs}${last ? ' aria-current="page"' : ''}>${esc(label)}</span>` : `<a href="${href}"${attrs}>${esc(label)}</a>`);
  }).join('')}</nav>`;
}

function matchCars(f) {
  const makes = (f.makes || []).filter((m) => m.make || m.q);
  return CARS.filter((c) => {
    if (makes.length && !makes.some((m) => (!m.make || c.make === m.make) && modelMatches(c.make, m.model, c.model)
      && (!m.q || `${c.model} ${c.trim}`.toLowerCase().includes(m.q.toLowerCase())))) return false;
    if (!inRange(c.year, f.yearMin, f.yearMax) || !inRange(c.price, f.priceMin, f.priceMax)
      || !inRange(monthly(c.price), f.payMin, f.payMax) || !inRange(c.kw, f.kwMin, f.kwMax) || !inRange(c.km, f.kmMin, f.kmMax)) return false;
    if (f.fuel?.length && !f.fuel.some((x) => (x === 'hübriid' ? c.fuelRaw.startsWith('hübriid') : c.fuelRaw === x.toLowerCase()))) return false;
    if (f.gear?.length && !f.gear.includes(c.gear.toLowerCase())) return false;
    if (f.drive?.length && !f.drive.includes(c.drive.toLowerCase())) return false;
    if (f.body?.length && !f.body.includes(c.bodyRaw)) return false;
    if (f.color?.length && !f.color.includes(c.colorBase)) return false;
    if (f.loc?.length && !f.loc.some((l) => l === 'EESTI' || l === c.city || l === CITY_COUNTY[c.city])) return false;
    if (f.dealer?.length && !f.dealer.includes(c.seller)) return false;
    if (f.seller && (f.seller === 'firma') !== c.dealer) return false;
    if (f.age && c.hours > f.age * 24) return false;
    if (f.auction === 'jah') return false; /* none of the demo listings is an auction */
    if (f.eq?.length && !f.eq.every((i) => c.eq.has(i))) return false;
    if (f.verified && !c.verified) return false;
    if (f.exchange && !hasExchange(c)) return false;
    if (f.regFee && !hasRegFee(c)) return false;
    return true;
  });
}
function isFiltered(f) {
  return Object.entries(f).some(([k, v]) => (k === 'makes' ? v.some((m) => m.make || m.q) : Array.isArray(v) ? v.length : v));
}
/* Demo set is small; scale to a realistic marketplace-sized number. */
function scaledCount(matches, f) {
  if (!isFiltered(f)) return TOTAL;
  if (!matches) return 0;
  const key = matchCars(f).map((c) => c.id).join(',') + JSON.stringify(f.makes?.filter((m) => m.make || m.q) || []);
  let h = 0; for (const ch of key) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return Math.max(matches, Math.round((TOTAL * matches) / CARS.length * (0.55 + (h % 40) / 100)));
}
const MAKES = Object.keys(MODELS).sort((a, b) => a.localeCompare(b, 'et'));

document.addEventListener('DOMContentLoaded', () => {
  renderChrome();
  const page = document.body.dataset.page;
  if (page === 'home') initHome();
  if (page === 'search') initSearch();
  if (page === 'listing') initListing();
  if (page === 'makes') initMakes();
  startI18n();
});
