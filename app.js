(function(){
  // Search toggle
  const toggleBtn = document.querySelector('[data-search-toggle]');
  const wrap = document.querySelector('[data-search-wrap]');
  const input = document.querySelector('[data-search-input]');
  const empty = document.querySelector('[data-empty]');
  const items = Array.from(document.querySelectorAll('[data-item]'));

  if (toggleBtn && wrap && input && items.length) {
    toggleBtn.addEventListener('click', () => {
      wrap.classList.toggle('active');
      if (wrap.classList.contains('active')) {
        input.focus();
      } else {
        input.value = '';
        filter('');
      }
    });

    function filter(q){
      const query = q.trim().toLowerCase();
      let visibleCount = 0;

      items.forEach(el => {
        const hay = (el.getAttribute('data-search') || '').toLowerCase();
        const ok = hay.includes(query);
        el.style.display = ok ? '' : 'none';
        if (ok) visibleCount++;
      });

      if (empty) empty.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    input.addEventListener('input', (e) => filter(e.target.value));
  }
})();
