/* Listing detail page */
function initListing() {
  const id = +new URLSearchParams(location.search).get('id') || 1;
  const c = CARS.find((x) => x.id === id) || CARS[0];
  const root = document.getElementById('listingRoot');
  document.title = `${c.make} ${c.model} ${c.year} — ${eur(c.price)} — auto24`;

  const imgs = c.imgs.map(img);

  /* Price vs. market (demo heuristic) */
  const delta = [-8, -4, 2, -6, 5][c.id % 5];
  const market = Math.round(c.price / (1 + delta / 100) / 100) * 100;
  const verdict = delta <= -5 ? ['Väga hea hind', 'var(--ok)'] : delta < 0 ? ['Hea hind', 'var(--ok)'] : ['Turuhinnas', 'var(--muted)'];
  const markerPos = Math.min(92, Math.max(8, 50 + delta * 4));

  const similar = CARS.filter((x) => x.id !== c.id && (x.body === c.body || Math.abs(x.price - c.price) < c.price * 0.3)).slice(0, 8);
  const initials = c.seller.split(/\s+/).map((w) => w[0]).slice(0, 2).join('');

  /* Real equipment from the original listing, grouped like auto24 does */
  const equipByGroup = {};
  [...c.eq].sort((x, y) => EQUIP[x].localeCompare(EQUIP[y], 'et')).forEach((i) => { (equipByGroup[EQUIP_GROUP[i]] ||= []).push(EQUIP[i]); });
  const equipGroups = EQUIP_GROUP_NAMES.filter((g) => equipByGroup[g]).map((g) => [g, equipByGroup[g]]);

  const plan = leasingPlan(c.price);
  const taxPanel = (c.taxAnnual != null || c.taxReg != null) ? `
        <section class="panel tax">
          <h2>Mootorsõidukimaks <span class="info" title="Väärtused on informatiivsed ja võivad erineda tasumisele kuuluvatest summadest.">${icon('info')}</span></h2>
          <div class="tax-grid">
            <div><span>${c.taxYear ? `Aastamaks (${c.taxYear})` : 'Aastamaks'}</span><b class="num">${c.taxAnnual != null ? eur2(c.taxAnnual) : '—'}</b></div>
            <div><span>Registreerimistasu</span><b class="num">${c.taxReg != null ? eur2(c.taxReg) : '—'}</b>${c.taxReg === 0 ? '<small>Tasutud / registreeritud Eestis</small>' : ''}</div>
            <div class="tax-calc"><span>Automaksu kalkulaator</span><a class="btn btn-outline btn-sm" href="https://www.auto24.ee/automaksu-kalkulaator" target="_blank" rel="noopener">Vaatan lähemalt</a></div>
          </div>
        </section>` : '';

  root.innerHTML = `
    <div class="page-head" style="padding-bottom:16px">
      ${crumbTrail({ make: c.make, model: c.model, year: c.year, current: false,
        category: c.bodyRaw === 'kaubik' ? 'Kaubik' : 'Sõiduauto ja maastur',
        categoryHref: c.bodyRaw === 'kaubik' ? 'otsing.html?body=kaubik' : 'otsing.html' })}
    </div>

    <div class="listing">
      <div>
        <div class="gallery">
          <div class="gallery-main">
            <img id="gMain" src="${imgs[0]}" alt="${esc(c.make)} ${esc(c.model)}" fetchpriority="high">
            <button class="nav prev" aria-label="Eelmine foto">${icon('chevLeft')}</button>
            <button class="nav next" aria-label="Järgmine foto">${icon('chevRight')}</button>
            <span class="tag tag-glass counter num" id="gCount">${icon('camera')} 1 / ${imgs.length}</span>
          </div>
          <div class="thumbs" id="thumbs">${imgs.map((src, i) =>
            `<button aria-label="Foto ${i + 1}" aria-current="${i === 0}" data-i="${i}"><img src="${src}" alt="" loading="lazy"></button>`).join('')}
          </div>
        </div>

        <section class="panel" style="margin-top:24px">
          <h2>Põhiandmed</h2>
          <div class="kv">
            <div>${icon('calendar')}<span><span>Esmaregistreerimine</span><b>${c.year}</b></span></div>
            <div>${icon('gauge')}<span><span>Läbisõit</span><b class="num">${fmt(c.km)} km</b></span></div>
            <div>${icon(c.fuel === 'Elekter' ? 'bolt' : 'fuel')}<span><span>Kütus</span><b>${c.fuel}</b></span></div>
            <div>${icon('gear')}<span><span>Käigukast</span><b>${c.gear}</b></span></div>
            <div>${icon('bolt')}<span><span>Võimsus</span><b class="num">${c.kw} kW (${Math.round(c.kw * 1.36)} hj)</b></span></div>
            <div>${icon('drive')}<span><span>Vedav sild</span><b>${c.drive}</b></span></div>
            <div>${icon('car')}<span><span>Keretüüp</span><b>${c.body}</b></span></div>
            <div>${icon('palette')}<span><span>Värv</span><b>${c.color}</b></span></div>
            <div>${icon('hash')}<span><span>Kuulutuse nr</span><b class="num">${c.id}</b></span></div>
          </div>
        </section>

        ${taxPanel}

        <section class="panel services">
          <h2>Ostuabi</h2>
          <div class="services-grid${c.verified ? '' : ' single'}">
            ${c.verified ? `
            <div class="svc vininfo">
              <div class="svc-brand"><img src="https://www.auto24.ee/images/logo/vininfo_icon.svg" alt="" class="vi-icon" data-fallback=""><div><img src="https://www.auto24.ee/images/logo/vininfo_text_green.svg" alt="vininfo.ee" class="vi-text" data-fallback="vininfo.ee"><span>Sõiduki ajaloo aruanne</span></div></div>
              <div class="vi-car"><img src="${imgs[0]}" alt=""><div><b data-no-i18n>${esc(c.make)} ${esc(c.model)}</b><span>${c.year}</span></div></div>
              <ul class="vi-list">
                <li>${icon('check')}Läbisõidu ajalugu</li><li>${icon('check')}Ajaloolised fotod</li>
                <li>${icon('check')}Tehnilised andmed</li><li>${icon('check')}Hooldused</li>
                <li>${icon('check')}Avariide ajalugu</li><li>${icon('check')}…</li>
              </ul>
              <a class="btn vi-btn" href="https://www.auto24.ee/soidukid/${c.id}" target="_blank" rel="noopener">Vaata tasuta aruannet <span>${icon('download')}</span></a>
            </div>` : ''}
            <div class="svc ostuabi">
              <div class="oa-top">
                <h3>Kontrolli sõidukit kodust lahkumata!</h3>
                <img src="https://www.auto24.ee/images/autobroker/auto24_ostuabi.png" alt="auto24 ostuabi" class="oa-logo" data-fallback="auto24 OSTUABI">
              </div>
              <div class="oa-body">
                <ul class="oa-list">
                  <li>${icon('check')}Sõiduki põhjalik visuaalne ja tehniline ülevaatus</li>
                  <li>${icon('check')}Pikk proovisõit erinevates sõiduoludes</li>
                  <li>${icon('check')}Diagnostikakontroll</li>
                  <li>${icon('check')}Ajaloo ja läbisõidu kontroll usaldusväärsetest allikatest</li>
                  <li>${icon('check')}Varjatud avariide ja remonditööde tuvastamine</li>
                </ul>
                <img src="https://www.auto24.ee/ostuabi/img/hiw_3.jpg" alt="" class="oa-photo" loading="lazy" data-fallback="">
              </div>
              <a class="btn oa-btn" href="https://www.auto24.ee/ostuabi/" target="_blank" rel="noopener">Tutvu teenusega</a>
            </div>
          </div>
        </section>

        <section class="panel">
          <h2>Kirjeldus</h2>
          <div class="desc">
            <p>${esc(c.make)} ${esc(c.model)} ${esc(c.trim)} · ${c.year} · ${fmt(c.km)} km · <span>${c.fuel.toLowerCase()}</span>, <span>${c.gear.toLowerCase()}</span>.</p>
            <p>Müüja täielik kirjeldus, varustus ja kontaktid on <a href="https://www.auto24.ee/soidukid/${c.id}" target="_blank" rel="noopener" style="color:var(--accent);font-weight:600">originaalkuulutuses auto24.ee-s</a>. Prototüübis näidatakse siin müüja enda teksti.</p>
          </div>
        </section>

        <section class="panel">
          <h2>Varustus <span style="font-size:14px;font-weight:500;color:var(--muted)">· ${c.eq.size}</span></h2>
          ${equipGroups.length ? `<div class="equip${c.eq.size > 24 ? ' collapsed' : ''}" id="equip">${equipGroups.map(([g, items]) =>
            `<div><h3>${icon(EQUIP_GROUP_ICON[g] || 'check')}<span>${g}</span></h3><ul>${items.map((x) => `<li>${icon('check')}<span>${esc(x)}</span></li>`).join('')}</ul></div>`).join('')}
          </div>${c.eq.size > 24 ? `<button type="button" class="btn btn-outline btn-sm" id="equipMore" style="margin-top:16px">Näita kogu varustust (${c.eq.size})</button>` : ''}` : '<p class="desc">Müüja ei ole varustust märkinud.</p>'}
        </section>

      </div>

      <aside class="aside">
        <div class="panel">
          <div class="l-title">
            <div class="chips" style="gap:6px;margin-bottom:10px">
              ${c.hours <= 6 ? '<span class="tag tag-new">Uus</span>' : ''}
              ${c.verified ? `<span class="tag tag-ok">${icon('shield')} Kontrollitud</span>` : ''}
              ${c.oldPrice ? `<span class="tag tag-drop">${icon('trendDown')} Hind langes</span>` : ''}
            </div>
            <h1>${esc(c.make)} ${esc(c.model)}</h1>
            <p>${esc(c.trim)}</p>
          </div>
          <div class="l-price num">${eur(c.price)}${c.oldPrice ? `<s>${eur(c.oldPrice)}</s>` : ''}</div>
          <div class="l-monthly">Liising alates <a href="#leasing" class="num">${eur(monthly(c.price))}/kuu</a></div>

          <div style="margin-top:18px">
            <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:8px">
              <b style="color:${verdict[1]}">${verdict[0]}</b>
              <span style="color:var(--muted)">Turuhind ~ <span class="num">${eur(market)}</span></span>
            </div>
            <div style="position:relative;height:6px;border-radius:3px;background:linear-gradient(90deg,#0f9d58,#7cc96b 40%,#e5e7eb 50%,#f5b26b 70%,#e5533d)">
              <span style="position:absolute;top:50%;left:${markerPos}%;width:14px;height:14px;border-radius:50%;background:var(--surface);border:3px solid var(--ink);transform:translate(-50%,-50%)"></span>
            </div>
          </div>

          <div class="l-actions">
            <button class="btn btn-primary btn-lg" id="callBtn">${icon('phone')}<span>Näita telefoni</span></button>
            <div class="row">
              <button class="btn btn-outline" id="msgBtn">${icon('message')}Kirjuta</button>
              <button class="btn btn-outline" data-fav="${c.id}" aria-pressed="${favs.has(c.id)}">${icon('heart')}Jäta meelde</button>
            </div>
          </div>
        </div>

        <section class="panel leasing" id="leasing" aria-label="auto24 liising">
          <div class="ls-logo"><img src="https://img.auto24.ee/images/auto24_leasing/logo_${LANG === 'ru' ? 'rus' : 'est'}.png" alt="auto24 liising" width="150" height="52"></div>
          <div class="ls-field">
            <div class="ls-row"><span>${plan.kind === 'loan' ? 'Laenusumma' : 'Summa'}</span><output id="lsSumOut" class="num"></output></div>
            <input type="range" id="lsSum" min="${plan.min}" max="${plan.max}" step="${plan.step}" value="${plan.sum}" aria-label="${plan.kind === 'loan' ? 'Laenusumma' : 'Summa'}">
            <div class="ls-minmax num"><span>${eur(plan.min)}</span><span>${eur(plan.max)}</span></div>
          </div>
          <div class="ls-field">
            <div class="ls-row"><span>Periood</span><output id="lsPerOut"></output></div>
            <input type="range" id="lsPer" min="${plan.yMin}" max="${plan.yMax}" step="1" value="${plan.years}" aria-label="Periood">
            <div class="ls-minmax"><span>${yearsLabel(plan.yMin)}</span><span>${yearsLabel(plan.yMax)}</span></div>
          </div>
          <label class="check"><input type="checkbox" id="lsRes" checked>Jääkmaksumusega (25%)</label>
          ${c.taxReg ? `<label class="check"><input type="checkbox" id="lsReg">Koos registreerimistasuga</label>` : ''}
          <div class="ls-pay"><strong class="num" id="lsPay"></strong> <span>€/kuu</span></div>
          <div class="ls-meta"><span>Omafinantseering <b class="num" id="lsOwn"></b></span><span>Kaskot pole vaja</span></div>
          <button type="button" class="btn btn-primary btn-block" id="lsOffer">Vaatan pakkumist</button>
          <small class="ls-note">Näidisarvutus, intress ${String(LEASING_RATE).replace('.', ',')}%. Lõplik pakkumine auto24 liisingult.</small>
        </section>

        <div class="panel">
          <div class="seller">
            <div class="avatar">${esc(initials)}</div>
            <div><b>${esc(c.seller)}</b><span>${c.dealer ? 'Autokauplus · auto24-s alates 2011' : 'Eraisik · auto24-s alates 2019'}</span></div>
          </div>
          <div class="seller-meta">
            <span>${icon('pin', 'sm')}${esc(c.city)}</span>
            <span>${icon('clock', 'sm')}Vastab tavaliselt 1 h jooksul</span>
            <span>${icon('calendar', 'sm')}Lisatud ${ago(c.hours)}</span>
          </div>
          ${c.dealer ? `<a href="otsing.html" class="link-more" style="margin-top:14px;font-size:14px">Kõik müüja kuulutused ${icon('arrowRight', 'sm')}</a>` : ''}
        </div>

        <div style="display:flex;gap:8px;justify-content:center">
          <a class="btn btn-ghost btn-sm" href="https://www.auto24.ee/soidukid/${c.id}" target="_blank" rel="noopener">${icon('arrowRight', 'sm')}auto24.ee</a>
          <button class="btn btn-ghost btn-sm" id="shareBtn">${icon('share', 'sm')}Jaga</button>
          <button class="btn btn-ghost btn-sm" onclick="toast('Täname, vaatame kuulutuse üle')">Teata</button>
        </div>
      </aside>
    </div>

    ${similar.length ? `
    <section class="section" style="padding-top:16px">
      <div class="section-head"><div><h2>Sarnased kuulutused</h2></div><a href="otsing.html?body=${encodeURIComponent(c.bodyRaw)}" class="link-more">Vaata kõiki ${icon('arrowRight', 'sm')}</a></div>
      <div class="scroller">${similar.map((x) => carCard(x)).join('')}</div>
    </section>` : ''}

    <div class="mobile-bar">
      <div class="p num">${eur(c.price)}<small>alates ${eur(monthly(c.price))}/kuu</small></div>
      <button class="btn btn-outline" aria-label="Kirjuta" onclick="document.getElementById('msgBtn').click()">${icon('message')}</button>
      <button class="btn btn-primary" onclick="document.getElementById('callBtn').click()">${icon('phone')}Helista</button>
    </div>`;

  /* Gallery */
  let cur = 0;
  const show = (i) => {
    cur = (i + imgs.length) % imgs.length;
    document.getElementById('gMain').src = imgs[cur];
    document.getElementById('gCount').innerHTML = `${icon('camera')} ${cur + 1} / ${imgs.length}`;
    document.querySelectorAll('#thumbs button').forEach((b, j) => b.setAttribute('aria-current', j === cur));
  };
  document.getElementById('thumbs').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) show(+b.dataset.i); });
  root.querySelector('.prev').addEventListener('click', () => show(cur - 1));
  root.querySelector('.next').addEventListener('click', () => show(cur + 1));
  document.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') show(cur - 1); if (e.key === 'ArrowRight') show(cur + 1); });
  let x0 = null;
  const gm = root.querySelector('.gallery-main');
  gm.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  gm.addEventListener('touchend', (e) => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) show(cur + (dx < 0 ? 1 : -1)); x0 = null; });

  document.getElementById('equipMore')?.addEventListener('click', (e) => {
    document.getElementById('equip').classList.remove('collapsed'); e.currentTarget.remove();
  });

  /* Contact */
  document.getElementById('callBtn').addEventListener('click', (e) => {
    const b = e.currentTarget;
    toast('Demo: siin kuvatakse müüja telefoninumber');
  });
  document.getElementById('msgBtn').addEventListener('click', () => toast('Demo: siin avaneb vestlus müüjaga'));
  document.getElementById('shareBtn').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(location.href); toast(`${icon('check', 'sm')} Link kopeeritud`); }
    catch { toast('Kopeeri link aadressiribalt'); }
  });

  /* auto24 Liising calculator */
  const lsSum = document.getElementById('lsSum'), lsPer = document.getElementById('lsPer');
  const lsRes = document.getElementById('lsRes'), lsReg = document.getElementById('lsReg');
  const paint = (el) => { const p = ((el.value - el.min) / (el.max - el.min)) * 100; el.style.setProperty('--p', `${p}%`); };
  const calc = () => {
    const sum = +lsSum.value, years = +lsPer.value;
    const financed = sum + (lsReg?.checked ? c.taxReg : 0);
    document.getElementById('lsSumOut').textContent = eur(sum);
    document.getElementById('lsPerOut').textContent = yearsLabel(years);
    document.getElementById('lsPay').textContent = fmt(leasingPay(financed, years, lsRes.checked));
    document.getElementById('lsOwn').textContent = eur(Math.max(0, c.price - sum));
    paint(lsSum); paint(lsPer);
  };
  [lsSum, lsPer].forEach((el) => el.addEventListener('input', calc));
  [lsRes, lsReg].forEach((el) => el?.addEventListener('change', calc));
  document.getElementById('lsOffer').addEventListener('click', () => toast('Demo: siin avaneb auto24 liisingu taotlus'));
  calc();
}
