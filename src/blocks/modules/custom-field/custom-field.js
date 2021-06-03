const togglePasswordButton = document.querySelectorAll('.custom-field__show-password');

// Show/hide password
function togglePassword() {
  const parent = this.closest('.custom-field');
  const passwordInput = parent.querySelector('.custom-field__input');
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    this.setAttribute('aria-label',
      'Сховати пароль');
  } else {
    passwordInput.type = 'password';
    this.setAttribute('aria-label',
      'Показати пароль '
      + 'Увага Ваш пароль буде показано на екрані');
  }
}

export const showOrHidePassword = () => {
  togglePasswordButton.forEach((button) => button.addEventListener('click', togglePassword));
};
