/* Make → model → generation/year → listings (same flow as auto24 make pages) */
function initMakes() {
  const q = new URLSearchParams(location.search);
  const make = q.get('m') || '';
  const model = q.get('model') || '';
  const root = document.getElementById('makesRoot');

  const modelsOf = (m) => (MAKE_GENS[m] ? Object.keys(MAKE_GENS[m]) : (MODELS[m] || []));
  const gensOf = (m, mo) => (MAKE_GENS[m]?.[mo] || '').split(',').filter(Boolean).map((g) => {
    const [a, b] = g.split('-');
    return { from: +a, to: b ? +b : 0 };
  });
  const sortModels = (list) => [...list].sort((a, b) => a.localeCompare(b, 'et', { numeric: true }));
  const searchUrl = (p) => `otsing.html?${new URLSearchParams(p)}`;

  const steps = [
    ['Vali mark', make, `mark.html`],
    ['Vali mudel', model, make && `mark.html?m=${encodeURIComponent(make)}`],
    ['Vali aasta', '', ''],
    ['Kuulutused', '', ''],
  ];
  const stepper = `<ol class="stepper">${steps.map(([label, value, href], i) => {
    const state = (make ? (model ? 2 : 1) : 0);
    const cls = i < state ? 'done' : i === state ? 'current' : '';
    const inner = `<span class="dot">${i < state ? icon('check', 'sm') : i + 1}</span><span class="lbl">${label}</span>${value ? `<b data-no-i18n>${esc(value)}</b>` : ''}`;
    return `<li class="${cls}">${i < state && href ? `<a href="${href}">${inner}</a>` : inner}</li>`;
  }).join('')}</ol>`;

  const crumbs = `<nav class="crumbs" aria-label="Asukoht"><a href="index.html">Avaleht</a>${icon('chevRight')}<a href="mark.html">Margid</a>${make ? `${icon('chevRight')}<a href="mark.html?m=${encodeURIComponent(make)}" data-no-i18n>${esc(make)}</a>` : ''}${model ? `${icon('chevRight')}<span data-no-i18n>${esc(model)}</span>` : ''}</nav>`;

  let body = '';
  if (!make) {
    /* Step 1: all makes, A–Z */
    const all = Object.keys(MODELS).sort((a, b) => a.localeCompare(b, 'et'));
    const letters = [...new Set(all.map((m) => m[0].toUpperCase()))];
    body = `
      <div class="mk-head"><h1>Vali mark</h1><input class="control filter-search mk-search" id="mkSearch" placeholder="Otsi marki" aria-label="Otsi marki"></div>
      <h2 class="mk-sub">Populaarsed margid</h2>
      <div class="mk-grid popular" data-no-i18n>${POPULAR_MAKES.map((m) => `<a class="mk-tile brand" href="mark.html?m=${encodeURIComponent(m)}">${brandLogo(m, 'mk-logo')}<b>${esc(m)}</b></a>`).join('')}</div>
      <h2 class="mk-sub">Kõik margid A–Z</h2>
      <div class="mk-az">${letters.map((L) => `<section class="mk-letter" data-letter="${L}"><h3>${L}</h3>
        <div class="mk-grid popular" data-no-i18n>${all.filter((m) => m[0].toUpperCase() === L).map((m) =>
          `<a class="mk-tile brand" href="mark.html?m=${encodeURIComponent(m)}" data-name="${esc(m.toLowerCase())}">${brandLogo(m, 'mk-logo')}<b>${esc(m)}</b></a>`).join('')}</div>
      </section>`).join('')}</div>`;
  } else if (!model) {
    /* Step 2: models of the make */
    const list = sortModels(modelsOf(make));
    body = `
      <div class="mk-head">
        <div class="mk-title">${brandLogo(make, 'mk-hero-logo')}<div><h1 data-no-i18n>${esc(make)}</h1><p class="mk-lead">Mudelid, millel on praegu kuulutusi</p></div></div>
        <input class="control filter-search mk-search" id="mkSearch" placeholder="Otsi mudelit" aria-label="Otsi mudelit">
      </div>
      <div class="mk-grid models">${list.map((m) => {
        const g = gensOf(make, m);
        const span = g.length ? `${Math.min(...g.map((x) => x.from))} – ${g.some((x) => !x.to) ? '…' : Math.max(...g.map((x) => x.to))}` : '';
        return `<a class="mk-tile" href="mark.html?m=${encodeURIComponent(make)}&model=${encodeURIComponent(m)}" data-name="${esc(m.toLowerCase())}">
          <b>${esc(m)}</b><span>${span}</span></a>`;
      }).join('')}</div>
      <a class="btn btn-outline mk-all" href="${searchUrl({ m: make })}"><span data-no-i18n>${esc(make)}</span>&nbsp;·&nbsp;<span>vaata kõiki</span> ${icon('arrowRight', 'sm')}</a>`;
  } else {
    /* Step 3: generations / years of the model */
    const gens = gensOf(make, model);
    const m = `${make}~${model}`;
    body = `
      <div class="mk-head">
        <div class="mk-title">${brandLogo(make, 'mk-hero-logo')}<div><h1 data-no-i18n>${esc(make)} ${esc(model)}</h1><p class="mk-lead">Vali põlvkond, et näha selle aastate kuulutusi</p></div></div>
        <a class="link-more" href="mark.html?m=${encodeURIComponent(make)}">${icon('chevLeft', 'sm')} Muuda mudelit</a>
      </div>
      <div class="mk-grid gens">
        <a class="mk-tile gen all" href="${searchUrl({ m })}"><b>Kõik aastad</b><span>${icon('arrowRight', 'sm')}</span></a>
        ${gens.map((g) => `<a class="mk-tile gen" href="${searchUrl(g.to ? { m, yearMin: g.from, yearMax: g.to } : { m, yearMin: g.from })}">
          <b>${g.to ? `${g.from} – ${g.to}` : `alates ${g.from}`}</b>
          <span class="bar"><i style="left:${((g.from - 1955) / 72) * 100}%;right:${100 - (((g.to || 2027) - 1955) / 72) * 100}%"></i></span>
        </a>`).join('')}
      </div>
      ${gens.length ? '' : '<p class="mk-lead" style="margin-top:12px">Põlvkonnad ja aastad</p>'}`;
  }

  root.innerHTML = `<div class="page-head">${crumbs}</div>${stepper}<div class="mk-body">${body}</div>`;
  document.title = `${model ? `${make} ${model}` : make || 'Margid'} — auto24`;

  const s = document.getElementById('mkSearch');
  s?.addEventListener('input', () => {
    const v = s.value.trim().toLowerCase();
    root.querySelectorAll('[data-name]').forEach((a) => { a.hidden = v && !a.dataset.name.includes(v); });
    root.querySelectorAll('.mk-letter').forEach((sec) => { sec.hidden = ![...sec.querySelectorAll('a')].some((a) => !a.hidden); });
    root.querySelector('.mk-grid.popular')?.toggleAttribute('hidden', !!v);
  });
}
