/* Home page */
function initHome() {
  const $ = (s) => document.querySelector(s);

  /* Vehicle-type tabs */
  document.querySelectorAll('.vtabs button').forEach((b) => {
    b.insertAdjacentHTML('afterbegin', icon(b.dataset.icon));
    b.addEventListener('click', () => {
      document.querySelectorAll('.vtabs button').forEach((x) => x.setAttribute('aria-selected', x === b));
      if (b.dataset.icon !== 'car') toast('Demo: selles prototüübis on aktiivsed ainult autod');
    });
  });

  /* Search form */
  const form = $('#heroSearch');
  const make = $('#fMake'), model = $('#fModel');
  const cap = (x) => x.charAt(0).toUpperCase() + x.slice(1);
  make.insertAdjacentHTML('beforeend',
    `<optgroup label="Populaarsed">${POPULAR_MAKES.map((m) => `<option>${m}</option>`).join('')}</optgroup>
     <optgroup label="Kõik margid">${MAKES.map((m) => `<option>${m}</option>`).join('')}</optgroup>`);
  $('#fBody').insertAdjacentHTML('beforeend', Object.entries(BODY_GROUPS).map(([g, list]) =>
    `<optgroup label="${g}">${list.map((x) => `<option value="${x}">${cap(x)}</option>`).join('')}</optgroup>`).join(''));
  $('#fFuel').insertAdjacentHTML('beforeend', FUELS.map((f) => `<option value="${f}">${cap(f)}</option>`).join(''));
  form.querySelectorAll('[name=yearMin],[name=yearMax]').forEach((sel) => {
    for (let y = 2026; y >= 1960; y--) sel.insertAdjacentHTML('beforeend', `<option>${y}</option>`);
  });

  make.addEventListener('change', () => {
    const models = MODELS[make.value] || [];
    model.innerHTML = '<option value="">Kõik mudelid</option>' + models.map((m) => `<option>${esc(m)}</option>`).join('');
    model.disabled = !models.length;
  });

  const more = $('#searchMore'), moreBtn = $('#moreToggle');
  moreBtn.addEventListener('click', () => {
    const open = more.hidden;
    more.hidden = !open;
    moreBtn.setAttribute('aria-expanded', open);
    moreBtn.firstChild.textContent = open ? 'Vähem valikuid ' : 'Rohkem valikuid ';
  });

  /* Form → filter state (same schema the search page uses) */
  const readForm = () => {
    const fd = new FormData(form);
    const num = (k) => +String(fd.get(k) || '').replace(/\D/g, '') || 0;
    const one = (k) => (fd.get(k) ? [fd.get(k)] : []);
    return {
      makes: [{ make: make.value, model: model.value, q: '' }],
      body: one('body'), fuel: one('fuel'), gear: one('gear'), drive: one('drive'),
      priceMin: num('priceMin'), priceMax: num('priceMax'), yearMin: num('yearMin'), yearMax: num('yearMax'),
      kmMin: num('kmMin'), kmMax: num('kmMax'), kwMin: num('kwMin'), kwMax: num('kwMax'), payMin: num('payMin'), payMax: num('payMax'),
      age: num('age'), verified: !!fd.get('verified'),
    };
  };
  const updateCount = () => {
    const f = readForm();
    const n = scaledCount(matchCars(f).length, f);
    $('#heroSubmit span').textContent = n ? `Näita ${fmt(n)} kuulutust` : 'Tulemusi ei leitud';
  };
  form.addEventListener('change', updateCount);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (make.value) params.set('m', [make.value, model.value].filter(Boolean).join('~'));
    new FormData(form).forEach((v, k) => v && params.set(k, v));
    location.href = `otsing.html${params.size ? '?' + params : ''}`;
  });

  /* Body types */
  $('#types').innerHTML = BODY_TYPES.map((t) =>
    `<a class="type-tile" href="otsing.html?body=${encodeURIComponent(t.name.toLowerCase())}">${bodySvg(t.name)}<b>${t.name}</b><span class="num">${fmt(t.count)}</span></a>`
  ).join('');

  /* Fresh listings with quick tabs */
  const FRESH = {
    all: () => [...CARS].sort((a, b) => a.hours - b.hours),
    ev: () => CARS.filter((c) => ['Elekter', 'Hübriid'].includes(c.fuel)),
    cheap: () => CARS.filter((c) => c.price <= 25000),
    suv: () => CARS.filter((c) => c.body === 'Maastur'),
    premium: () => CARS.filter((c) => c.price >= 60000),
  };
  const renderFresh = (tab) => { $('#fresh').innerHTML = FRESH[tab]().slice(0, 8).map((c) => carCard(c)).join(''); };
  document.querySelectorAll('#freshTabs .chip').forEach((b) => b.addEventListener('click', () => {
    document.querySelectorAll('#freshTabs .chip').forEach((x) => x.setAttribute('aria-pressed', x === b));
    renderFresh(b.dataset.tab);
  }));
  renderFresh('all');

  /* Brands panel (popular + all, with search) */
  const brandLink = (m) => `<a href="mark.html?m=${encodeURIComponent(m)}"><span class="bl">${brandLogo(m, 'bl-logo')}${esc(m)}</span></a>`;
  $('#brandList').innerHTML = POPULAR_MAKES.map(brandLink).join('');
  $('#brandListAll').innerHTML = MAKES.map(brandLink).join('');
  const allBtn = $('#allBrandsBtn'), allBox = $('#brandAll');
  allBtn.addEventListener('click', () => {
    const open = allBox.hidden;
    allBox.hidden = !open;
    $('#brandList').hidden = open;
    allBtn.setAttribute('aria-expanded', open);
    allBtn.textContent = open ? 'Populaarsed' : 'Kõik margid';
    if (open) $('#brandSearch').focus();
  });
  $('#brandSearch').addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    $('#brandListAll').querySelectorAll('a').forEach((a) => { a.hidden = q && !a.textContent.toLowerCase().includes(q); });
  });

  /* Auctions with live countdown */
  const end = AUCTIONS.map((a) => Date.now() + a.endsInMin * 60000);
  $('#auctions').innerHTML = AUCTIONS.map((a, i) => `
    <a class="auction" href="https://www.auto24.ee/soidukid/${a.id}" target="_blank" rel="noopener">
      <img src="${img(a.img)}" alt="" loading="lazy">
      <div class="meta">
        <b>${a.title}</b>
        <div class="bid">${a.year} · ${a.bids} pakkumist</div>
        <div class="bid">Hetkehind <strong class="num">${eur(a.bid)}</strong></div>
        <div class="countdown">${icon('clock', 'sm')}<span data-cd="${i}"></span></div>
      </div>
    </a>`).join('');
  const tick = () => document.querySelectorAll('[data-cd]').forEach((el) => {
    const s = Math.max(0, Math.floor((end[el.dataset.cd] - Date.now()) / 1000));
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    el.textContent = `${h} h ${String(m).padStart(2, '0')} min ${String(sec).padStart(2, '0')} s`;
  });
  tick(); setInterval(tick, 1000);

  /* Value estimate (mock) */
  $('#estimate').addEventListener('submit', (e) => {
    e.preventDefault();
    const v = $('#plate').value.trim().toUpperCase();
    const out = $('#estimateOut');
    if (!/^[0-9]{3}[A-Z]{3}$/.test(v)) { out.innerHTML = 'Sisesta number kujul <b>123ABC</b>.'; return; }
    let h = 0; for (const ch of v) h = (h * 33 + ch.charCodeAt(0)) >>> 0;
    const base = 8000 + (h % 30000);
    out.innerHTML = `Volkswagen Passat 2.0 TDI · 2018 (demo)<strong class="num">${eur(Math.round(base / 100) * 100)} – ${eur(Math.round(base * 1.12 / 100) * 100)}</strong>`;
  });

  /* Editorial */
  const [big, ...rest] = NEWS;
  $('#editorial').innerHTML = `
    <a class="story-big" href="https://www.auto24.ee/uudised/uudised.php?uid=${big.uid}" target="_blank" rel="noopener">
      <img src="${img(big.img)}" alt="" loading="lazy">
      <div class="txt"><span class="tag tag-new">${big.kicker}</span><h3>${big.title}</h3><p>${big.lead}</p></div>
    </a>
    <div class="story-list">${rest.map((n) => `
      <a class="story" href="https://www.auto24.ee/uudised/uudised.php?uid=${n.uid}" target="_blank" rel="noopener">
        <img src="${img(n.img)}" alt="" loading="lazy">
        <div><span class="kicker">${n.kicker}</span><h4>${n.title}</h4><time>${n.date}</time></div>
      </a>`).join('')}
    </div>`;
}
