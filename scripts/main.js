document.addEventListener('components:loaded', () => {
  const deadlineKey = 'watersourceCountdownDeadline';
  let deadline = localStorage.getItem(deadlineKey);

  if (!deadline || new Date(deadline) < new Date()) {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    d.setHours(23, 59, 59, 999);
    deadline = d.toISOString();
    localStorage.setItem(deadlineKey, deadline);
  }

  function tick() {
    const diff = Math.max(0, new Date(deadline) - new Date());
    const day = Math.floor(diff / 86400000);
    const hr = Math.floor((diff % 86400000) / 3600000);
    const min = Math.floor((diff % 3600000) / 60000);
    const sec = Math.floor((diff % 60000) / 1000);

    for (const [id, val] of Object.entries({ d: day, h: hr, m: min, s: sec })) {
      const el = document.getElementById(id);
      if (el) el.textContent = String(val).padStart(2, '0');
    }
  }

  tick();
  setInterval(tick, 1000);

  const programTrack = document.querySelector('#programs .marquee-track');
  const programButtons = document.querySelectorAll('#programs .program-nav button');

  if (programTrack && programButtons.length === 2) {
    const step = () => programTrack.querySelector('.program-tile')?.getBoundingClientRect().width + 22 || 410;
    programButtons[0].addEventListener('click', () => programTrack.scrollBy({ left: -step(), behavior: 'smooth' }));
    programButtons[1].addEventListener('click', () => programTrack.scrollBy({ left: step(), behavior: 'smooth' }));
  }

  function ensureWhyCardStructure(card) {
    let content = card.querySelector(':scope > .why-card-content');
    let button = card.querySelector(':scope > .why-readmore-btn');

    if (!content) {
      content = document.createElement('div');
      content.className = 'why-card-content';
      const heading = card.querySelector(':scope > h3');
      let node = heading ? heading.nextSibling : card.firstChild;
      while (node) {
        const next = node.nextSibling;
        content.appendChild(node);
        node = next;
      }
      card.appendChild(content);
    }

    if (!button) {
      button = document.createElement('button');
      button.type = 'button';
      button.className = 'why-readmore-btn';
      button.textContent = 'Read more';
      button.setAttribute('aria-expanded', 'false');
      card.appendChild(button);
    }

    if (!button.dataset.bound) {
      button.addEventListener('click', () => {
        const isExpanded = card.classList.toggle('is-expanded');
        if (isExpanded) {
          content.style.maxHeight = 'none';
          button.textContent = 'Show less';
          button.setAttribute('aria-expanded', 'true');
        } else {
          content.style.maxHeight = card.dataset.collapsedMax || '';
          button.textContent = 'Read more';
          button.setAttribute('aria-expanded', 'false');
        }
      });
      button.dataset.bound = 'true';
    }

    return { content, button };
  }

  function initWhyReadMore() {
    const cards = document.querySelectorAll('.why-reason-card');

    cards.forEach((card) => {
      const heading = card.querySelector(':scope > h3');
      if (!heading) return;

      const { content, button } = ensureWhyCardStructure(card);

      card.classList.remove('is-expanded');
      button.textContent = 'Read more';
      button.setAttribute('aria-expanded', 'false');
      button.style.display = 'none';
      content.style.maxHeight = 'none';
      delete card.dataset.collapsedMax;

      const headingHeight = heading.getBoundingClientRect().height;
      const buttonHeight = button.getBoundingClientRect().height || 40;
      const gap = 12;
      const cardHeight = card.clientHeight;
      const availableWithoutButton = cardHeight - headingHeight - gap;

      if (content.scrollHeight > availableWithoutButton) {
        button.style.display = 'inline-flex';
        const available = cardHeight - headingHeight - buttonHeight - gap * 2;
        const collapsedMax = `${Math.max(0, available)}px`;
        card.dataset.collapsedMax = collapsedMax;
        content.style.maxHeight = collapsedMax;
      }
    });
  }

  initWhyReadMore();
  window.addEventListener('resize', initWhyReadMore);

  function ensureFunctionalPanelStructure(panel) {
    let content = panel.querySelector(':scope > .functional-panel-content');
    let button = panel.querySelector(':scope > .functional-readmore-btn');

    if (!content) {
      content = document.createElement('div');
      content.className = 'functional-panel-content';
      const heading = panel.querySelector(':scope > h3');
      let node = heading ? heading.nextSibling : panel.firstChild;
      while (node) {
        const next = node.nextSibling;
        content.appendChild(node);
        node = next;
      }
      panel.appendChild(content);
    }

    if (!button) {
      button = document.createElement('button');
      button.type = 'button';
      button.className = 'functional-readmore-btn';
      button.textContent = 'Read more';
      button.setAttribute('aria-expanded', 'false');
      panel.appendChild(button);
    }

    if (!button.dataset.bound) {
      button.addEventListener('click', () => {
        const isExpanded = panel.classList.toggle('is-expanded');
        if (isExpanded) {
          content.style.maxHeight = 'none';
          panel.style.height = 'auto';
          button.textContent = 'Show less';
          button.setAttribute('aria-expanded', 'true');
        } else {
          panel.style.height = panel.dataset.baseHeight || '';
          content.style.maxHeight = panel.dataset.collapsedMax || '';
          button.textContent = 'Read more';
          button.setAttribute('aria-expanded', 'false');
        }
      });
      button.dataset.bound = 'true';
    }

    return { content, button };
  }

  function initFunctionalPanelReadMore() {
    const panels = document.querySelectorAll('.functional-water-grid .functional-panel');
    if (!panels.length) return;
    const baseHeight = 564;

    panels.forEach((panel) => {
      panel.classList.remove('is-expanded');
      panel.style.height = 'auto';
      const { content, button } = ensureFunctionalPanelStructure(panel);
      content.style.maxHeight = 'none';
      button.style.display = 'none';
      button.textContent = 'Read more';
      button.setAttribute('aria-expanded', 'false');
      delete panel.dataset.baseHeight;
      delete panel.dataset.collapsedMax;
    });

    panels.forEach((panel) => {
      const heading = panel.querySelector(':scope > h3');
      const content = panel.querySelector(':scope > .functional-panel-content');
      const button = panel.querySelector(':scope > .functional-readmore-btn');
      if (!heading || !content || !button) return;

      panel.style.height = `${baseHeight}px`;
      panel.dataset.baseHeight = `${baseHeight}px`;

      const headingHeight = heading.getBoundingClientRect().height;
      const buttonHeight = button.getBoundingClientRect().height || 28;
      const availableWithoutButton = baseHeight - headingHeight - 12;

      if (content.scrollHeight > availableWithoutButton) {
        button.style.display = 'inline-flex';
        const available = baseHeight - headingHeight - buttonHeight - 18;
        const collapsedMax = `${Math.max(0, available)}px`;
        panel.dataset.collapsedMax = collapsedMax;
        content.style.maxHeight = collapsedMax;
      } else {
        content.style.maxHeight = 'none';
      }
    });
  }

  initFunctionalPanelReadMore();
  window.addEventListener('resize', initFunctionalPanelReadMore);
});
