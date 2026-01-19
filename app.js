(function () {
  // ===== Search filter (input exists -> filter works) =====
  const input = document.querySelector('[data-search-input]');
  const empty = document.querySelector('[data-empty]');
  const items = Array.from(document.querySelectorAll('[data-item]'));

  function filter(q) {
    const query = (q || '').trim().toLowerCase();
    let visibleCount = 0;

    items.forEach((el) => {
      const hay = (el.getAttribute('data-search') || '').toLowerCase();
      const ok = hay.includes(query);
      el.style.display = ok ? '' : 'none';
      if (ok) visibleCount++;
    });

    if (empty) empty.style.display = items.length && visibleCount === 0 ? 'block' : 'none';
  }

  if (input && items.length) {
    filter('');
    input.addEventListener('input', (e) => filter(e.target.value));
  }

  // ===== Modal =====
  const modal = document.querySelector('[data-modal]');
  const modalTitle = document.querySelector('[data-modal-title]');
  const modalSub = document.querySelector('[data-modal-sub]');
  const modalBody = document.querySelector('[data-modal-body]');
  const modalCloseEls = Array.from(document.querySelectorAll('[data-modal-close]'));
  const ytBtn = document.querySelector('[data-yt-btn]');

  function setYtButton(fromCard) {
    if (!ytBtn) return;
    const ytLink = fromCard?.getAttribute('data-yt-link') || '';
    if (ytLink) {
      ytBtn.href = ytLink;
      ytBtn.style.display = 'flex';
    } else {
      ytBtn.href = '#';
      ytBtn.style.display = 'none';
    }
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  async function openModal(fromCard) {
    if (!modal || !fromCard) return;

    const title = fromCard.getAttribute('data-lyrics-title') || 'Untitled';
    const genre = fromCard.getAttribute('data-lyrics-genre') || '';
    const date = fromCard.getAttribute('data-lyrics-date') || '';

    if (modalTitle) modalTitle.textContent = title;
    if (modalSub) modalSub.textContent = [genre, date].filter(Boolean).join(' · ');
    if (modalBody) modalBody.textContent = 'Loading…';

    // youtube button link (optional)
    setYtButton(fromCard);

    // open first (so user sees feedback)
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Load lyrics: prefer external txt via data-lyrics-src, fallback to data-lyrics-body
    try {
      const src = fromCard.getAttribute('data-lyrics-src');
      const inline = fromCard.getAttribute('data-lyrics-body');

      if (src) {
        const url = new URL(src, window.location.href); // robust for relative paths
        const res = await fetch(url.toString(), { cache: 'no-cache' });
        if (!res.ok) throw new Error(`Failed to fetch lyrics: ${res.status}`);
        const text = await res.text();
        if (modalBody) modalBody.textContent = text;
      } else if (inline) {
        if (modalBody) modalBody.textContent = inline;
      } else {
        if (modalBody) modalBody.textContent = '(No lyrics found.)';
      }
    } catch (err) {
      if (modalBody) modalBody.textContent = 'Failed to load lyrics.';
      // console for debugging only
      console.error(err);
    }
  }

  // Click delegation: any .thumb opens modal
  if (modal) {
    document.addEventListener('click', (e) => {
      const thumb = e.target.closest('.thumb');
      if (!thumb) return;
      const card = thumb.closest('[data-item]');
      if (!card) return;
      openModal(card); // async, but we don't await here
    });

    modalCloseEls.forEach((el) => el.addEventListener('click', closeModal));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  // ===== Collapse top text when grid scrolls (if those ids exist) =====
  const lyricTop = document.getElementById('lyricTop');
  const lyricScroll = document.getElementById('lyricScroll');

  if (lyricTop && lyricScroll) {
    let ticking = false;
    const update = () => {
      const y = lyricScroll.scrollTop || 0;
      if (y > 8) lyricTop.classList.add('is-collapsed');
      else lyricTop.classList.remove('is-collapsed');
      ticking = false;
    };
    lyricScroll.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          window.requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
    update();
  }
})();
