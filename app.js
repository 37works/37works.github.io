(function () {
  // ===== path =====
  const src = fromCard.getAttribute('data-lyrics-src');
  const url = new URL(src, window.location.href); // 핵심
  const res = await fetch(url);

  // ===== Common selectors =====
  const input = document.querySelector('[data-search-input]');
  const empty = document.querySelector('[data-empty]');
  const items = Array.from(document.querySelectorAll('[data-item]'));

  // ===== Search filter (works even without toggle button) =====
  function filter(q) {
    const query = (q || '').trim().toLowerCase();
    let visibleCount = 0;

    items.forEach((el) => {
      const hay = (el.getAttribute('data-search') || '').toLowerCase();
      const ok = hay.includes(query);
      el.style.display = ok ? '' : 'none';
      if (ok) visibleCount++;
    });

    if (empty) {
      // show empty message only when there are items and none match
      empty.style.display = items.length && visibleCount === 0 ? 'block' : 'none';
    }
  }

  // Initialize search if input + items exist
  if (input && items.length) {
    // initial state (show all)
    filter('');

    input.addEventListener('input', (e) => {
      filter(e.target.value);
    });
  }

  // ===== Modal for lyrics (37Lyrics) =====
  const modal = document.querySelector('[data-modal]');
  const modalTitle = document.querySelector('[data-modal-title]');
  const modalSub = document.querySelector('[data-modal-sub]');
  const modalBody = document.querySelector('[data-modal-body]');
  const ytBtn = document.querySelector('[data-yt-btn]');

  const modalCloseEls = Array.from(document.querySelectorAll('[data-modal-close]'));
  const openEls = Array.from(document.querySelectorAll('[data-open-modal]'));
  let lyricsRequestId = 0;

  function setModalBody(text) {
    if (modalBody) modalBody.textContent = text;
  }

  function loadLyrics(src, requestId) {
    fetch(src)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to load lyrics');
        return response.text();
      })
      .then((text) => {
        if (requestId !== lyricsRequestId) return;
        setModalBody(text);
      })
      .catch(() => {
        if (requestId !== lyricsRequestId) return;
        setModalBody('Unable to load lyrics.');
      });
  }

  function openModal(fromCard) {
    if (!modal || !fromCard) return;

    const title = fromCard.getAttribute('data-lyrics-title') || 'Untitled';
    const genre = fromCard.getAttribute('data-lyrics-genre') || '';
    const date = fromCard.getAttribute('data-lyrics-date') || '';
    const body = fromCard.getAttribute('data-lyrics-body') || '';
    const src = fromCard.getAttribute('data-lyrics-src') || '';
    const ytLink = fromCard.getAttribute('data-yt-link') || '';

    if (ytBtn) {
      if (ytLink) {
        ytBtn.href = ytLink;
        ytBtn.style.display = 'flex';
      } else {
        ytBtn.href = '#';
        ytBtn.style.display = 'none';
      }
    }

    if (modalTitle) modalTitle.textContent = title;
    if (modalSub) modalSub.textContent = [genre, date].filter(Boolean).join(' · ');
    if (src) {
      lyricsRequestId += 1;
      const requestId = lyricsRequestId;
      setModalBody('Loading…');
      loadLyrics(src, requestId);
    } else {
      setModalBody(body);
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modal && openEls.length) {
    openEls.forEach((el) => {
      el.addEventListener('click', () => {
        const card = el.closest('[data-item]');
        openModal(card);
      });
    });

    modalCloseEls.forEach((el) => el.addEventListener('click', closeModal));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }
  
  // ===== Collapse top text when grid scrolls (animated) =====
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

    lyricScroll.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    update(); // init
  }


})();
