const toast = document.querySelector('.toast');
const copyButtons = document.querySelectorAll('[data-copy-address]');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2400);
}

async function copyAddress(button) {
  const address = document.querySelector('#server-address').textContent.trim();
  try {
    await navigator.clipboard.writeText(address);
  } catch {
    const helper = document.createElement('textarea');
    helper.value = address;
    helper.setAttribute('readonly', '');
    helper.style.position = 'fixed';
    helper.style.opacity = '0';
    document.body.append(helper);
    helper.select();
    document.execCommand('copy');
    helper.remove();
  }

  const originalText = button.querySelector('.copy-label')?.textContent || button.childNodes[0].textContent.trim();
  if (button.querySelector('.copy-label')) button.querySelector('.copy-label').textContent = 'Skopiowano';
  else button.childNodes[0].textContent = 'Skopiowano ';
  showToast(`Adres ${address} skopiowany do schowka`);
  window.setTimeout(() => {
    if (button.querySelector('.copy-label')) button.querySelector('.copy-label').textContent = originalText;
    else button.childNodes[0].textContent = `${originalText} `;
  }, 2200);
}

copyButtons.forEach((button) => button.addEventListener('click', () => copyAddress(button)));

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('is-open', !isOpen);
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  nav.classList.remove('is-open');
}));

document.querySelector('#current-year').textContent = new Date().getFullYear();
