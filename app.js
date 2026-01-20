(function () {
  // ===== Search filter (input exists -> filter works) =====
  const input = document.querySelector('[data-search-input]');
  const empty = document.querySelector('[data-empty]');
  const items = Array.from(document.querySelectorAll('[data-item]'));
  const page = document.body ? document.body.dataset.page : '';
  const isFrogPage = page === 'frog';

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
  const modalDescription = document.querySelector('[data-modal-description]');
  const modalLinks = document.querySelector('[data-modal-links]');
  const modalCloseEls = Array.from(document.querySelectorAll('[data-modal-close]'));
  const fallbackDescription = '설명이 아직 준비되지 않았습니다.\nTODO: 곡 데이터와 연결하세요.';

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
    const descriptionSrc = fromCard.getAttribute('data-lyrics-desc');
    const linksRaw = fromCard.getAttribute('data-lyrics-links') || '[]';
    let links = [];
    try {
      links = JSON.parse(linksRaw);
    } catch (err) {
      links = [];
    }

    if (modalTitle) modalTitle.textContent = title;
    if (modalSub) modalSub.textContent = [genre, date].filter(Boolean).join(' · ');
    if (modalBody) modalBody.textContent = 'Loading…';
    if (modalDescription) {
      modalDescription.textContent = descriptionSrc ? 'Loading…' : fallbackDescription;
    }
    if (modalLinks) {
      modalLinks.innerHTML = '';
      if (Array.isArray(links) && links.length > 0) {
        links.forEach((item) => {
          const anchor = document.createElement('a');
          anchor.className = 'modal-link-btn';
          anchor.href = item.url;
          anchor.textContent = item.label;
          anchor.target = '_blank';
          anchor.rel = 'noopener noreferrer';
          modalLinks.appendChild(anchor);
        });
      } else {
        const helper = document.createElement('p');
        helper.className = 'modal-link-helper';
        helper.textContent = '연결된 링크가 없어요.';
        modalLinks.appendChild(helper);
      }
    }

    // open first (so user sees feedback)
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (modalScroll) modalScroll.scrollTop = 0;

    const loadDescription = async () => {
      if (!modalDescription) return;
      if (!descriptionSrc) {
        modalDescription.textContent = fallbackDescription;
        return;
      }

      try {
        const url = new URL(descriptionSrc, window.location.href);
        const res = await fetch(url.toString(), { cache: 'no-cache' });
        if (!res.ok) throw new Error('Failed to fetch description');
        const text = await res.text();
        modalDescription.textContent = text;
      } catch (err) {
        modalDescription.textContent = '';
      }
    };

    const loadLyrics = async () => {
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
    };

    await Promise.all([loadLyrics(), loadDescription()]);
  }

  // Click delegation: any [data-open-modal] opens modal
  if (modal) {
    document.addEventListener('click', (e) => {
      if (isFrogPage) return;
      const trigger = e.target.closest('[data-open-modal]');
      if (!trigger) return;
      const card = trigger.closest('[data-item]');
      if (!card) return;
      openModal(card); // async, but we don't await here
    });

    modalCloseEls.forEach((el) => el.addEventListener('click', closeModal));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  if (isFrogPage) {
    document.addEventListener('click', (e) => {
      if (e.target.closest('a, button')) return;
      const card = e.target.closest('.item-card[data-item]');
      if (!card) return;
      const linksRaw = card.getAttribute('data-lyrics-links');
      if (!linksRaw) return;
      try {
        const links = JSON.parse(linksRaw);
        const url = links?.[0]?.url;
        if (!url) return;
        window.open(url, '_blank', 'noopener');
      } catch (err) {
        console.error('Invalid data-lyrics-links JSON', err);
      }
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
