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
  const modalScroll = document.querySelector('[data-modal-scroll]');
  const modalCloseEls = Array.from(document.querySelectorAll('[data-modal-close]'));
  const ytBtn = document.querySelector('[data-yt-btn]');
  const ytScrollTrack = document.querySelector('[data-scroll-yt]');
  const ytScrollHandle = document.querySelector('[data-scroll-yt-handle]');

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  function syncYtHandle() {
    if (!modalScroll || !ytScrollTrack || !ytScrollHandle) return;
    const maxScroll = modalScroll.scrollHeight - modalScroll.clientHeight;
    const maxHandleTop = ytScrollTrack.clientHeight - ytScrollHandle.offsetHeight;
    if (maxScroll <= 0 || maxHandleTop <= 0) {
      ytScrollHandle.style.top = '0px';
      return;
    }
    const ratio = modalScroll.scrollTop / maxScroll;
    ytScrollHandle.style.top = `${ratio * maxHandleTop}px`;
  }

  function syncYtHandleSoon() {
    window.requestAnimationFrame(syncYtHandle);
  }

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
    if (modalScroll) modalScroll.scrollTop = 0;
    syncYtHandleSoon();

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
        syncYtHandleSoon();
      } else if (inline) {
        if (modalBody) modalBody.textContent = inline;
        syncYtHandleSoon();
      } else {
        if (modalBody) modalBody.textContent = '(No lyrics found.)';
        syncYtHandleSoon();
      }
    } catch (err) {
      if (modalBody) modalBody.textContent = 'Failed to load lyrics.';
      syncYtHandleSoon();
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

  if (modalScroll && ytScrollTrack && ytScrollHandle) {
    let dragging = false;
    let dragOffset = 0;

    modalScroll.addEventListener('scroll', () => {
      window.requestAnimationFrame(syncYtHandle);
    }, { passive: true });

    ytScrollTrack.addEventListener('click', (e) => {
      if (e.target.closest('[data-scroll-yt-handle]')) return;
      const maxScroll = modalScroll.scrollHeight - modalScroll.clientHeight;
      const maxHandleTop = ytScrollTrack.clientHeight - ytScrollHandle.offsetHeight;
      if (maxScroll <= 0 || maxHandleTop <= 0) return;
      const rect = ytScrollTrack.getBoundingClientRect();
      const clickY = e.clientY - rect.top - ytScrollHandle.offsetHeight / 2;
      const handleTop = clamp(clickY, 0, maxHandleTop);
      const ratio = handleTop / maxHandleTop;
      modalScroll.scrollTop = ratio * maxScroll;
    });

    ytScrollHandle.addEventListener('pointerdown', (e) => {
      dragging = true;
      const handleRect = ytScrollHandle.getBoundingClientRect();
      dragOffset = e.clientY - handleRect.top;
      ytScrollHandle.setPointerCapture(e.pointerId);
    });

    window.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const maxScroll = modalScroll.scrollHeight - modalScroll.clientHeight;
      const maxHandleTop = ytScrollTrack.clientHeight - ytScrollHandle.offsetHeight;
      if (maxScroll <= 0 || maxHandleTop <= 0) return;
      const rect = ytScrollTrack.getBoundingClientRect();
      const nextTop = clamp(e.clientY - rect.top - dragOffset, 0, maxHandleTop);
      ytScrollHandle.style.top = `${nextTop}px`;
      const ratio = nextTop / maxHandleTop;
      modalScroll.scrollTop = ratio * maxScroll;
    });

    function stopDrag(e) {
      if (!dragging) return;
      dragging = false;
      if (e && e.pointerId !== undefined) {
        ytScrollHandle.releasePointerCapture(e.pointerId);
      }
    }

    window.addEventListener('pointerup', stopDrag);
    window.addEventListener('pointercancel', stopDrag);
    window.addEventListener('resize', syncYtHandleSoon);
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
