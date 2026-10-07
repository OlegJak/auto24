/* Custom dropdowns for every <select class="control">.
   The native select stays in the DOM (hidden) as the source of truth: we read its options and
   write its value + dispatch "change", so all existing page logic keeps working unchanged.
   Desktop: popover under the field. Phones: bottom sheet with large rows. Long lists get a search box. */
(() => {
  const isSheet = () => matchMedia('(max-width: 640px)').matches;
  const valueDesc = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value');
  let open = null; // { sel, btn, panel, items, active }

  function label(sel) {
    const o = sel.options[sel.selectedIndex];
    return o ? o.textContent : '';
  }

  function enhance(sel) {
    if (sel.dataset.dd) return;
    sel.dataset.dd = '1';
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `${sel.className} dd-btn`;
    btn.setAttribute('aria-haspopup', 'listbox');
    btn.setAttribute('aria-expanded', 'false');
    const lbl = sel.getAttribute('aria-label') || (sel.id && document.querySelector(`label[for="${sel.id}"]`)?.textContent) || '';
    if (lbl) btn.setAttribute('aria-label', lbl.trim());
    btn.innerHTML = '<span class="dd-val"></span>';
    sel.classList.add('dd-native');
    sel.tabIndex = -1;
    sel.setAttribute('aria-hidden', 'true');
    sel.after(btn);
    sel._ddBtn = btn;
    btn._ddSel = sel;

    const refresh = () => {
      btn.querySelector('.dd-val').textContent = label(sel);
      btn.disabled = sel.disabled;
      btn.classList.toggle('dd-empty', sel.value === '');
    };
    sel._ddRefresh = refresh;
    refresh();

    /* keep the button in sync with programmatic changes */
    Object.defineProperty(sel, 'value', {
      configurable: true,
      get() { return valueDesc.get.call(this); },
      set(v) { valueDesc.set.call(this, v); refresh(); },
    });
    sel.addEventListener('change', refresh);
    new MutationObserver(refresh).observe(sel, { childList: true, subtree: true, attributes: true, attributeFilter: ['disabled'] });

    if (sel.id) document.querySelectorAll(`label[for="${sel.id}"]`).forEach((l) => l.addEventListener('click', (e) => { e.preventDefault(); btn.focus(); }));

    btn.addEventListener('click', () => (open?.sel === sel ? close() : show(sel)));
    btn.addEventListener('keydown', (e) => {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) { e.preventDefault(); show(sel); }
    });
  }

  function build(sel) {
    const frag = [];
    const items = [];
    const push = (o) => {
      if (o.hidden) return;
      const i = items.length;
      items.push(o);
      frag.push(`<li role="option" class="dd-opt${o.selected ? ' sel' : ''}${o.disabled ? ' dis' : ''}" data-i="${i}" aria-selected="${o.selected}">
        <span>${esc(o.textContent)}</span><svg class="i sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></li>`);
    };
    [...sel.children].forEach((ch) => {
      if (ch.tagName === 'OPTGROUP') {
        frag.push(`<li class="dd-group" role="presentation">${esc(ch.label)}</li>`);
        [...ch.children].forEach(push);
      } else push(ch);
    });
    return { html: frag.join(''), items };
  }

  function show(sel) {
    close();
    const btn = sel._ddBtn;
    const { html, items } = build(sel);
    const sheet = isSheet();
    const title = btn.getAttribute('aria-label') || '';
    const panel = document.createElement('div');
    panel.className = `dd-panel${sheet ? ' sheet' : ''}`;
    panel.innerHTML = `
      ${sheet ? `<div class="dd-head"><b>${esc(title)}</b><button type="button" class="icon-btn dd-close" aria-label="Sulge"><svg class="i" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div>` : ''}
      ${items.length > 12 ? '<div class="dd-search"><input class="control" type="search" placeholder="Otsi…" aria-label="Otsi" autocomplete="off"></div>' : ''}
      <ul class="dd-list" role="listbox">${html}</ul>`;
    const backdrop = sheet ? Object.assign(document.createElement('div'), { className: 'dd-backdrop' }) : null;
    if (backdrop) document.body.append(backdrop);
    document.body.append(panel);
    btn.setAttribute('aria-expanded', 'true');
    btn.classList.add('dd-open');
    open = { sel, btn, panel, backdrop, items, active: Math.max(0, items.findIndex((o) => o.selected)) };

    if (!sheet) place();
    requestAnimationFrame(() => { panel.classList.add('in'); backdrop?.classList.add('in'); });
    setActive(open.active, true);

    const list = panel.querySelector('.dd-list');
    list.addEventListener('click', (e) => {
      const li = e.target.closest('.dd-opt');
      if (li && !li.classList.contains('dis')) choose(+li.dataset.i);
    });
    list.addEventListener('mousemove', (e) => { const li = e.target.closest('.dd-opt'); if (li) setActive(+li.dataset.i); });
    panel.querySelector('.dd-close')?.addEventListener('click', () => close(true));
    backdrop?.addEventListener('click', () => close(true));

    const search = panel.querySelector('.dd-search input');
    if (search) {
      search.addEventListener('input', () => {
        const q = search.value.trim().toLowerCase();
        panel.querySelectorAll('.dd-opt').forEach((li) => { li.hidden = q && !li.textContent.toLowerCase().includes(q); });
        panel.querySelectorAll('.dd-group').forEach((g) => {
          let n = g.nextElementSibling, any = false;
          while (n && !n.classList.contains('dd-group')) { if (!n.hidden) any = true; n = n.nextElementSibling; }
          g.hidden = !any;
        });
        const first = panel.querySelector('.dd-opt:not([hidden])');
        if (first) setActive(+first.dataset.i, true);
      });
      if (!sheet) search.focus({ preventScroll: true });
    }
    if (!search || sheet) panel.querySelector('.dd-list').focus?.();
  }

  function place() {
    if (!open || open.panel.classList.contains('sheet')) return;
    const r = open.btn.getBoundingClientRect();
    const p = open.panel;
    const below = innerHeight - r.bottom - 12, above = r.top - 12;
    const up = below < 240 && above > below;
    p.style.minWidth = `${r.width}px`;
    p.style.left = `${Math.min(r.left, innerWidth - Math.max(r.width, p.offsetWidth) - 8)}px`;
    p.style.maxHeight = `${Math.min(360, (up ? above : below))}px`;
    p.style.top = up ? 'auto' : `${r.bottom + 6}px`;
    p.style.bottom = up ? `${innerHeight - r.top + 6}px` : 'auto';
    p.classList.toggle('up', up);
  }

  function setActive(i, scroll) {
    if (!open) return;
    open.active = i;
    open.panel.querySelectorAll('.dd-opt').forEach((li) => li.classList.toggle('act', +li.dataset.i === i));
    if (scroll) open.panel.querySelector(`.dd-opt[data-i="${i}"]`)?.scrollIntoView({ block: 'nearest' });
  }

  function choose(i) {
    const { sel, items } = open;
    const opt = items[i];
    close(true);
    if (!opt || opt.selected) return;
    valueDesc.set.call(sel, opt.value);
    sel._ddRefresh();
    sel.dispatchEvent(new Event('input', { bubbles: true }));
    sel.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function close(focus) {
    if (!open) return;
    const { panel, backdrop, btn } = open;
    btn.setAttribute('aria-expanded', 'false');
    btn.classList.remove('dd-open');
    panel.classList.remove('in');
    backdrop?.classList.remove('in');
    setTimeout(() => { panel.remove(); backdrop?.remove(); }, 160);
    if (focus && btn.isConnected) btn.focus({ preventScroll: true });
    open = null;
  }

  document.addEventListener('keydown', (e) => {
    if (!open) return;
    const visible = [...open.panel.querySelectorAll('.dd-opt:not([hidden]):not(.dis)')].map((li) => +li.dataset.i);
    const pos = visible.indexOf(open.active);
    if (e.key === 'Escape') { e.preventDefault(); close(true); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); setActive(visible[Math.min(visible.length - 1, pos + 1)] ?? visible[0], true); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(visible[Math.max(0, pos - 1)] ?? visible[0], true); }
    else if (e.key === 'Home') { e.preventDefault(); setActive(visible[0], true); }
    else if (e.key === 'End') { e.preventDefault(); setActive(visible[visible.length - 1], true); }
    else if (e.key === 'Enter') { e.preventDefault(); if (visible.includes(open.active)) choose(open.active); }
    else if (e.key === 'Tab') close();
  });
  document.addEventListener('pointerdown', (e) => {
    if (open && !open.panel.contains(e.target) && !open.btn.contains(e.target) && !e.target.closest('.dd-backdrop')) close();
  }, true);
  addEventListener('resize', () => close());
  addEventListener('scroll', (e) => {
    if (!open || open.panel.contains(e.target)) return;
    if (open.panel.classList.contains('sheet')) return;
    if (!open.btn.isConnected) return close();
    place();
  }, true);

  function scan(root) {
    if (root.nodeType !== 1) return;
    if (root.matches?.('select.control')) enhance(root);
    root.querySelectorAll?.('select.control').forEach(enhance);
  }
  document.addEventListener('DOMContentLoaded', () => {
    scan(document.body);
    new MutationObserver((muts) => muts.forEach((m) => m.addedNodes.forEach(scan))).observe(document.body, { childList: true, subtree: true });
  });
})();
