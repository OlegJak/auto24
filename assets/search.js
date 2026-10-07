/* Search results page — full auto24 filter set: state ↔ URL ↔ results */
function initSearch() {
  const $ = (s, el = document) => el.querySelector(s);
  const panel = $('#filters');
  const body = $('#filterBody');

  /* ---------- State ---------- */
  const RANGES = [
    ['year', 'Aasta', '', 'Alates', 'Kuni'],
    ['price', 'Hind', '€', 'Alates', 'Kuni'],
    ['pay', 'auto24 kuumakse', '€/kuu', 'Alates', 'Kuni'],
    ['kw', 'Võimsus', 'kW', 'Alates', 'Kuni'],
    ['km', 'Läbisõidumõõdiku näit', 'km', 'Alates', 'Kuni'],
  ];
  const LISTS = ['body', 'fuel', 'gear', 'drive', 'loc', 'color', 'dealer', 'eq'];
  const empty = () => {
    const s = { makes: [{ make: '', model: '', q: '' }], seller: '', age: 0, auction: '', verified: false, exchange: false, regFee: false };
    LISTS.forEach((k) => { s[k] = []; });
    RANGES.forEach(([k]) => { s[k + 'Min'] = 0; s[k + 'Max'] = 0; });
    return s;
  };
  const state = readUrl();
  let sort = new URLSearchParams(location.search).get('sort') || 'rel';
  let view = store.get('a24.view', 'list');

  function readUrl() {
    const q = new URLSearchParams(location.search);
    const s = empty();
    const ms = q.getAll('m').map((v) => { const [make = '', model = '', text = ''] = v.split('~'); return { make, model, q: text }; });
    if (ms.length) s.makes = ms.slice(0, 3);
    LISTS.forEach((k) => { s[k] = q.getAll(k).map((v) => (k === 'eq' ? +v : v)); });
    RANGES.forEach(([k]) => { s[k + 'Min'] = +q.get(k + 'Min') || 0; s[k + 'Max'] = +q.get(k + 'Max') || 0; });
    s.seller = q.get('seller') || ''; s.age = +q.get('age') || 0; s.auction = q.get('auction') || '';
    ['verified', 'exchange', 'regFee'].forEach((k) => { s[k] = q.get(k) === '1'; });
    return s;
  }
  function writeUrl() {
    const p = new URLSearchParams();
    state.makes.filter((m) => m.make || m.q).forEach((m) => p.append('m', [m.make, m.model, m.q].join('~').replace(/~+$/, '')));
    LISTS.forEach((k) => state[k].forEach((v) => p.append(k, v)));
    RANGES.forEach(([k]) => { ['Min', 'Max'].forEach((x) => state[k + x] && p.set(k + x, state[k + x])); });
    if (state.seller) p.set('seller', state.seller);
    if (state.age) p.set('age', state.age);
    if (state.auction) p.set('auction', state.auction);
    ['verified', 'exchange', 'regFee'].forEach((k) => state[k] && p.set(k, '1'));
    if (sort !== 'rel') p.set('sort', sort);
    history.replaceState(null, '', p.size ? `?${p}` : location.pathname);
  }

  /* ---------- Small builders ---------- */
  const openGroups = new Set(store.get('a24.fopen', ['make', 'price', 'year', 'km', 'fuel', 'gear', 'body']));
  const group = (key, title, inner, count = 0) => {
    const open = openGroups.has(key) || count > 0;
    return `
    <section class="fg${open ? ' open' : ''}" data-g="${key}">
      <button type="button" class="fg-h" aria-expanded="${open}">
        <span>${title}</span>${count ? `<span class="fg-n">${count}</span>` : ''}${icon('chevDown', 'sm')}
      </button>
      <div class="fg-b">${inner}</div>
    </section>`;
  };
  const facetCount = (key, value) => matchCars({ ...state, [key]: [value] }).length;
  const checks = (key, options, { label = (o) => o, count = true, limit = 0 } = {}) => {
    const items = options.map((o, i) => {
      const n = count ? facetCount(key, o) : null;
      return `<label class="check${limit && i >= limit && !state[key].includes(o) ? ' more' : ''}${n === 0 ? ' zero' : ''}">
        <input type="checkbox" data-list="${key}" value="${esc(o)}" ${state[key].includes(o) ? 'checked' : ''}>${esc(label(o))}${count ? `<span class="count">${n}</span>` : ''}</label>`;
    }).join('');
    const more = limit && options.length > limit ? `<button type="button" class="show-more" data-more>Näita kõiki (${options.length})</button>` : '';
    return `<div class="checklist${limit ? ' limited' : ''}">${items}</div>${more}`;
  };
  const chipsFor = (key, options, label = (o) => o) => `<div class="chips">${options.map((o) =>
    `<button type="button" class="chip" data-chip="${key}" data-v="${esc(o)}" aria-pressed="${state[key].includes(o)}">${esc(label(o))}<span class="cnt">${facetCount(key, o)}</span></button>`).join('')}</div>`;
  const range = (k, suffix, a, b) => `<div class="range">
      <label class="input-suffix"><input class="control num" inputmode="numeric" data-num="${k}Min" placeholder="${a}" value="${state[k + 'Min'] || ''}" aria-label="${a}">${suffix ? `<span>${suffix}</span>` : ''}</label>
      <label class="input-suffix"><input class="control num" inputmode="numeric" data-num="${k}Max" placeholder="${b}" value="${state[k + 'Max'] || ''}" aria-label="${b}">${suffix ? `<span>${suffix}</span>` : ''}</label>
    </div>`;
  const seg = (key, options) => `<div class="segmented">${options.map(([v, l]) =>
    `<button type="button" data-seg="${key}" data-v="${v}" aria-pressed="${String(state[key]) === String(v)}">${l}</button>`).join('')}</div>`;
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const makeOptions = (sel) => `<option value="">Kõik margid</option>
    <optgroup label="Populaarsed">${POPULAR_MAKES.map((m) => `<option ${m === sel ? 'selected' : ''}>${m}</option>`).join('')}</optgroup>
    <optgroup label="Kõik margid">${Object.keys(MODELS).sort((a, b) => a.localeCompare(b, 'et')).map((m) => `<option ${m === sel ? 'selected' : ''}>${m}</option>`).join('')}</optgroup>`;

  /* ---------- Render filter panel ---------- */
  const searches = {};
  function renderFilters() {
    const scroll = panel.scrollTop;
    const activeMakes = state.makes.filter((m) => m.make || m.q).length;
    const dealers = [...new Set(CARS.filter((c) => c.dealer).map((c) => c.seller))].sort((a, b) => a.localeCompare(b, 'et'));

    const makeRows = state.makes.map((m, i) => `
      <div class="make-row" data-row="${i}">
        <div class="make-row-top">
          <select class="control" data-make="${i}" aria-label="Mark">${makeOptions(m.make)}</select>
          ${state.makes.length > 1 ? `<button type="button" class="icon-btn" data-rmrow="${i}" aria-label="Eemalda">${icon('x', 'sm')}</button>` : ''}
        </div>
        <select class="control" data-model="${i}" aria-label="Mudel" ${m.make ? '' : 'disabled'}>
          <option value="">Kõik mudelid</option>${(() => {
            const groups = Object.keys(MAKE_GENS[m.make] || {}).filter((x) => !(MODELS[m.make] || []).includes(x));
            const opt = (x) => `<option ${x === m.model ? 'selected' : ''}>${esc(x)}</option>`;
            return (groups.length ? `<optgroup label="Seeriad / klassid">${groups.map(opt).join('')}</optgroup>` : '')
              + `<optgroup label="Mudelid">${(MODELS[m.make] || []).map(opt).join('')}</optgroup>`;
          })()}
        </select>
        <input class="control" data-q="${i}" placeholder="Muu mudel või täpsustus" value="${esc(m.q)}">
      </div>`).join('');

    const eqSel = state.eq;
    const eqPopular = EQUIP_POPULAR.map((n) => EQUIP.indexOf(n)).filter((i) => i >= 0);
    const eqGroups = EQUIP_GROUP_NAMES.map((g) => {
      const idx = EQUIP.map((_, i) => i).filter((i) => EQUIP_GROUP[i] === g);
      const sel = idx.filter((i) => eqSel.includes(i)).length;
      return `<details class="eq-group"${sel ? ' open' : ''}><summary>${g}${sel ? ` <span class="fg-n">${sel}</span>` : ''}</summary>
        <div class="checklist">${idx.map((i) => `<label class="check" data-eqname="${esc(EQUIP[i].toLowerCase())}"><input type="checkbox" data-eq="${i}" ${eqSel.includes(i) ? 'checked' : ''}>${esc(EQUIP[i])}</label>`).join('')}</div>
      </details>`;
    }).join('');

    const colorKeys = Object.keys(COLORS);
    body.innerHTML = [
      `<div class="fg-flags">
        <label class="switch"><span><b>Kontrollitud ajalugu</b><small>Läbisõit ja õnnetused registrist</small></span><input type="checkbox" data-flag="verified" ${state.verified ? 'checked' : ''}></label>
        <label class="switch"><span><b>Vahetuse võimalus</b></span><input type="checkbox" data-flag="exchange" ${state.exchange ? 'checked' : ''}></label>
        <label class="switch"><span><b>Registreerimistasu tasutud</b></span><input type="checkbox" data-flag="regFee" ${state.regFee ? 'checked' : ''}></label>
      </div>`,
      group('make', 'Mark ja mudel', `${makeRows}${state.makes.length < 3 ? `<button type="button" class="add-row" data-addrow>${icon('plus', 'sm')} Lisa veel üks mark</button>` : ''}`, activeMakes),
      group('body', 'Keretüüp', Object.entries(BODY_GROUPS).map(([g, list]) => `<div class="sub">${g}</div>${chipsFor('body', list, cap)}`).join(''), state.body.length),
      ...RANGES.map(([k, title, suffix, a, b]) => group(k, title + (suffix ? `, ${suffix}` : ''), range(k, '', a, b), (state[k + 'Min'] || state[k + 'Max']) ? 1 : 0)),
      group('fuel', 'Kütus', checks('fuel', FUELS, { label: cap, limit: 5 }), state.fuel.length),
      group('gear', 'Käigukast', chipsFor('gear', GEARS, cap), state.gear.length),
      group('drive', 'Vedav sild', chipsFor('drive', DRIVES, cap), state.drive.length),
      group('color', 'Värvus', `<div class="swatches">${colorKeys.map((c) => `<button type="button" class="swatch" data-chip="color" data-v="${c}" aria-pressed="${state.color.includes(c)}" title="${cap(c)}" aria-label="${cap(c)}"><i style="background:${COLORS[c]}"></i></button>`).join('')}</div>
        ${state.color.length ? `<p class="hint">${state.color.map(cap).join(', ')}</p>` : ''}`, state.color.length),
      group('loc', 'Asukoht', `<input class="control filter-search" data-search="loc" placeholder="Otsi linna, maakonda või riiki">
        ${Object.entries(LOCATIONS).map(([g, list]) => `<div class="sub">${g}</div>${checks('loc', list, { label: (o) => (g === 'Riigid' ? cap(o.toLowerCase()) : o), count: false, limit: g === 'Linnad' ? 8 : 0 })}`).join('')}`, state.loc.length),
      group('seller', 'Müüja', `${seg('seller', [['', 'Kõik'], ['era', 'Eraisik'], ['firma', 'Firma']])}
        <div class="sub">Autokauplused</div>${checks('dealer', dealers, { limit: 6 })}`, (state.seller ? 1 : 0) + state.dealer.length),
      group('age', 'Kuulutuse vanus', seg('age', [[0, 'Kõik'], ...AD_AGE.map(([d]) => [d, d === 1 ? '1 päev' : `${d} päeva`])]), state.age ? 1 : 0),
      group('auction', 'Oksjon', seg('auction', [['', 'Kõik'], ['jah', 'Jah'], ['ei', 'Ei']]), state.auction ? 1 : 0),
      group('eq', 'Varustus', `<input class="control filter-search" data-search="eq" placeholder="Otsi varustust (${EQUIP.length})">
        <div class="sub">Populaarsed</div>
        <div class="chips">${eqPopular.map((i) => `<button type="button" class="chip" data-eqchip="${i}" aria-pressed="${eqSel.includes(i)}">${esc(EQUIP[i])}</button>`).join('')}</div>
        <div class="eq-groups">${eqGroups}</div>`, eqSel.length),
    ].join('');
    Object.entries(searches).forEach(([k, v]) => {
      const inp = body.querySelector(`[data-search="${k}"]`);
      if (inp && v) { inp.value = v; inp.dispatchEvent(new Event('input', { bubbles: true })); }
    });
    panel.scrollTop = scroll;
  }

  /* ---------- Events ---------- */
  body.addEventListener('click', (e) => {
    const t = e.target;
    const head = t.closest('.fg-h');
    if (head) {
      const g = head.parentElement; const key = g.dataset.g;
      const open = g.classList.toggle('open');
      head.setAttribute('aria-expanded', open);
      open ? openGroups.add(key) : openGroups.delete(key);
      store.set('a24.fopen', [...openGroups]);
      return;
    }
    const chip = t.closest('[data-chip]');
    if (chip) { toggleIn(chip.dataset.chip, chip.dataset.v); return update(); }
    const eqChip = t.closest('[data-eqchip]');
    if (eqChip) { toggleIn('eq', +eqChip.dataset.eqchip); return update(); }
    const s = t.closest('[data-seg]');
    if (s) { const k = s.dataset.seg; state[k] = k === 'age' ? +s.dataset.v : s.dataset.v; return update(); }
    if (t.closest('[data-addrow]')) { state.makes.push({ make: '', model: '', q: '' }); return update(); }
    const rm = t.closest('[data-rmrow]');
    if (rm) { state.makes.splice(+rm.dataset.rmrow, 1); return update(); }
    const more = t.closest('[data-more]');
    if (more) { more.previousElementSibling.classList.remove('limited'); more.remove(); }
  });
  body.addEventListener('change', (e) => {
    const t = e.target;
    if (t.dataset.list) { toggleIn(t.dataset.list, t.value); return update(); }
    if (t.dataset.eq !== undefined && t.type === 'checkbox') { toggleIn('eq', +t.dataset.eq); return update(); }
    if (t.dataset.flag) { state[t.dataset.flag] = t.checked; return update(); }
    if (t.dataset.make !== undefined) { const m = state.makes[+t.dataset.make]; m.make = t.value; m.model = ''; return update(); }
    if (t.dataset.model !== undefined) { state.makes[+t.dataset.model].model = t.value; return update(); }
    if (t.dataset.q !== undefined) { state.makes[+t.dataset.q].q = t.value.trim(); return update(); }
    if (t.dataset.num) { state[t.dataset.num] = +String(t.value).replace(/\D/g, '') || 0; return update(); }
  });
  body.addEventListener('input', (e) => {
    const t = e.target;
    if (!t.dataset.search) return;
    searches[t.dataset.search] = t.value;
    const q = t.value.trim().toLowerCase();
    const grp = t.closest('.fg-b');
    if (t.dataset.search === 'eq') {
      grp.querySelectorAll('.eq-group').forEach((d) => {
        let any = false;
        d.querySelectorAll('[data-eqname]').forEach((l) => { const hit = !q || l.dataset.eqname.includes(q); l.hidden = !hit; any ||= hit; });
        d.hidden = !any; if (q) d.open = any;
      });
    } else {
      grp.querySelectorAll('.checklist').forEach((cl) => { if (q) cl.classList.remove('limited'); });
      grp.querySelectorAll('.check').forEach((l) => { l.hidden = q && !l.textContent.toLowerCase().includes(q); });
      grp.querySelectorAll('[data-more]').forEach((b) => { b.hidden = !!q; });
    }
  });
  function toggleIn(key, v) {
    state[key] = state[key].includes(v) ? state[key].filter((x) => x !== v) : [...state[key], v];
  }
  $('#resetFilters').addEventListener('click', () => { Object.assign(state, empty()); update(); });

  /* ---------- Toolbar ---------- */
  const SORTS = {
    rel: (a, b) => (b.verified - a.verified) || a.hours - b.hours,
    priceAsc: (a, b) => a.price - b.price,
    priceDesc: (a, b) => b.price - a.price,
    new: (a, b) => a.hours - b.hours,
    make: (a, b) => (a.make + a.model).localeCompare(b.make + b.model, 'et'),
    yearDesc: (a, b) => b.year - a.year,
    kmAsc: (a, b) => a.km - b.km,
  };
  $('#sort').addEventListener('change', (e) => { sort = e.target.value; update(); });
  document.querySelectorAll('[data-view]').forEach((b) => {
    b.innerHTML = icon(b.dataset.view);
    b.addEventListener('click', () => { view = b.dataset.view; store.set('a24.view', view); update(); });
  });

  /* Active filter chips (removable) */
  function activeList() {
    const L = [];
    const fmtRange = (a, b, s) => `${a ? fmt(a) : '…'} – ${b ? fmt(b) : '…'}${s ? ' ' + s : ''}`;
    if (state.verified) L.push(['Kontrollitud ajalugu', () => { state.verified = false; }]);
    if (state.exchange) L.push(['Vahetuse võimalus', () => { state.exchange = false; }]);
    if (state.regFee) L.push(['Reg. tasu tasutud', () => { state.regFee = false; }]);
    state.makes.forEach((m, i) => (m.make || m.q) && L.push([[m.make, m.model, m.q && `“${m.q}”`].filter(Boolean).join(' '), () => {
      state.makes.splice(i, 1); if (!state.makes.length) state.makes.push({ make: '', model: '', q: '' });
    }]));
    RANGES.forEach(([k, title, suffix]) => (state[k + 'Min'] || state[k + 'Max']) && L.push([`${k === 'year' ? '' : title + ' '}${fmtRange(state[k + 'Min'], state[k + 'Max'], suffix)}`, () => { state[k + 'Min'] = 0; state[k + 'Max'] = 0; }]));
    ['body', 'fuel', 'gear', 'drive', 'loc', 'color', 'dealer'].forEach((k) => state[k].forEach((v) => L.push([cap(String(v)), () => toggleIn(k, v)])));
    state.eq.forEach((i) => L.push([EQUIP[i], () => toggleIn('eq', i)]));
    if (state.seller) L.push([state.seller === 'firma' ? 'Firma' : 'Eraisik', () => { state.seller = ''; }]);
    if (state.age) L.push([`Lisatud ${state.age} p jooksul`, () => { state.age = 0; }]);
    if (state.auction) L.push([`Oksjon: ${state.auction}`, () => { state.auction = ''; }]);
    return L;
  }

  /* auto24 Liising promo placed inside the results, like the original promotes it everywhere */
  const leasingPromo = () => `
    <aside class="promo-leasing">
      <img src="https://img.auto24.ee/images/auto24_leasing/logo_${LANG === 'ru' ? 'rus' : 'est'}.png" alt="auto24 liising" width="150" height="52">
      <div><b>Sina valid. Jääkmaksumus 0% või 25%</b><span>Kuumakse arvutus igas kuulutuses · Kaskot pole vaja</span></div>
      <a class="btn btn-primary btn-sm" href="#" onclick="toast('Demo: siin avaneb auto24 liisingu leht');return false">Vaata lähemalt</a>
    </aside>`;

  /* ---------- Update ---------- */
  function update() {
    renderFilters();
    writeUrl();
    const list = matchCars(state).sort(SORTS[sort]);
    const total = scaledCount(list.length, state);
    const res = $('#results');
    res.className = `results ${view}`;
    res.innerHTML = list.length
      ? list.map((c, i) => carCard(c, { eager: i < 3 }) + (i === 2 && list.length > 3 ? leasingPromo() : '')).join('')
      : `<div class="empty"><h3>Sobivaid kuulutusi ei leitud</h3><p>Proovi mõnda filtrit eemaldada või salvesta otsing — teavitame, kui sobiv auto lisandub.</p><button class="btn btn-dark" type="button" data-reset>Tühjenda filtrid</button></div>`;
    res.querySelector('[data-reset]')?.addEventListener('click', () => $('#resetFilters').click());

    const mk0 = state.makes.filter((m) => m.make);
    $('#crumbs').innerHTML = crumbTrail(mk0.length === 1
      ? { make: mk0[0].make, model: mk0[0].model, yearMin: state.yearMin, yearMax: state.yearMax }
      : { category: 'Kasutatud autod', categoryHref: '' });
    $('#titleCount').textContent = fmt(total);
    const mk = state.makes.find((m) => m.make);
    document.title = `${mk ? mk.make + ' ' + (mk.model || '') : 'Kasutatud autod'} — ${fmt(total)} kuulutust — auto24`;
    $('#applyFilters').textContent = total ? `Näita ${fmt(total)} tulemust` : 'Tulemusi pole';

    const act = activeList();
    $('#activeChips').innerHTML = act.map(([label], i) => `<button type="button" class="chip" data-rm="${i}">${esc(label)}${icon('x', 'sm x')}</button>`).join('')
      + (act.length > 1 ? '<button type="button" class="chip clear" data-rmall>Tühjenda kõik</button>' : '');
    $('#activeChips').querySelectorAll('[data-rm]').forEach((b) => b.addEventListener('click', () => { act[b.dataset.rm][1](); update(); }));
    $('#activeChips').querySelector('[data-rmall]')?.addEventListener('click', () => $('#resetFilters').click());
    $('#openFilters').innerHTML = `${icon('sliders', 'sm')} Filtrid${act.length ? ` <span class="badge-dot" style="position:static;border:0">${act.length}</span>` : ''}`;
    $('#sort').value = sort;
    document.querySelectorAll('[data-view]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.view === view));

    const pages = Math.ceil(total / 20);
    $('#pager').innerHTML = pages > 1
      ? `<a href="#" aria-current="page">1</a><a href="#">2</a>${pages > 2 ? '<a href="#">3</a>' : ''}${pages > 4 ? '<span>…</span>' : ''}${pages > 3 ? `<a href="#">${fmt(pages)}</a>` : ''}<a href="#" aria-label="Järgmine leht">${icon('chevRight')}</a>`
      : '';
  }

  /* ---------- Mobile filter sheet ---------- */
  const backdrop = $('#backdrop');
  const openSheet = (open) => {
    panel.classList.toggle('open', open);
    backdrop.classList.toggle('show', open);
    document.documentElement.style.overflow = open ? 'hidden' : '';
  };
  $('#openFilters').addEventListener('click', () => openSheet(true));
  $('#applyFilters').addEventListener('click', () => { openSheet(false); scrollTo({ top: 0, behavior: 'smooth' }); });
  backdrop.addEventListener('click', () => openSheet(false));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') openSheet(false); });

  $('#saveBtn').addEventListener('click', (e) => {
    e.currentTarget.textContent = 'Salvestatud ✓';
    toast(`${icon('bell', 'sm')} Otsing salvestatud — saadame teavituse`);
  });
  $('#pager').addEventListener('click', (e) => { if (e.target.closest('a')) { e.preventDefault(); toast('Demo: prototüübis on üks lehekülg'); } });

  update();
}
