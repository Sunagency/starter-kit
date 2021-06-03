const togglePasswordButtons = document.querySelectorAll('.custom-field__show-password');
const showPasswordAriaText = 'Показати пароль? Увага Ваш пароль буде показано на екрані!';
const hidePasswordAriaText = 'Сховати пароль';
const showPasswordIconPath = '/img/sprites/sprite.svg#visibility-icon';
const hidePasswordIconPath = '/img/sprites/sprite.svg#visibility-off-icon';

function togglePasswordVisibility() {
  const parent = this.closest('.custom-field');
  const passwordInput = parent.querySelector('.custom-field__input');
  const icon = this.querySelector('use');
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    this.setAttribute('aria-label', hidePasswordAriaText);
    icon.setAttribute('xlink:href', showPasswordIconPath);
  } else {
    passwordInput.type = 'password';
    this.setAttribute('aria-label', showPasswordAriaText);
    icon.setAttribute('xlink:href', hidePasswordIconPath);
  }
}

togglePasswordButtons.forEach((button) => button.addEventListener('click', togglePasswordVisibility));
