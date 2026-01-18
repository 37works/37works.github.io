(function () {
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

  const modalCloseEls = Array.from(document.querySelectorAll('[data-modal-close]'));
  const openEls = Array.from(document.querySelectorAll('[data-open-modal]'));

  function openModal(fromCard) {
    if (!modal || !fromCard) return;

    const title = fromCard.getAttribute('data-lyrics-title') || 'Untitled';
    const genre = fromCard.getAttribute('data-lyrics-genre') || '';
    const date = fromCard.getAttribute('data-lyrics-date') || '';
    const body = fromCard.getAttribute('data-lyrics-body') || '';

    if (modalTitle) modalTitle.textContent = title;
    if (modalSub) modalSub.textContent = [genre, date].filter(Boolean).join(' · ');
    if (modalBody) modalBody.textContent = body;

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
})();
