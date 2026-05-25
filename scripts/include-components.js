async function loadComponents() {
  const placeholders = document.querySelectorAll('[data-include]');

  for (const placeholder of placeholders) {
    const path = placeholder.getAttribute('data-include');
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`Unable to load component: ${path}`);
    }

    placeholder.outerHTML = await response.text();
  }

  document.dispatchEvent(new Event('components:loaded'));

  if (window.location.hash) {
    requestAnimationFrame(() => {
      document.querySelector(window.location.hash)?.scrollIntoView();
    });
  }
}

loadComponents().catch((error) => {
  console.error(error);
});
