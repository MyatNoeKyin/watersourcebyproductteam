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
});
