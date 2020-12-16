const VALIDATION_MESSAGE = {
  toggleAriaShow: 'Приховати пароль',
  toggleAriaHide: 'Показати пароль. Увага Ваш пароль буде показано на екрані',
  noValidEmail: 'Ви вказали некоректну пошту',
  noMatchPassword: 'Паролі не свіпадають',
  isRequired: 'Це поле є необхідним'
}

const VALIDATION_INFO = {
  inputParent: 'div',
  successClass: 'show-success',
  errorClass: 'show-error',
  errorField: 'span',
}

// By default we use this value, if you use other wrapper for input,
// change default param in the function
const inputParentElement = VALIDATION_INFO.inputParent;
const successClass = VALIDATION_INFO.successClass;
const errorField = VALIDATION_INFO.errorField;
const errorClass = VALIDATION_INFO.errorClass;

/**
 * add success class on input parent
 * @param {HTMLElement}input
 * @param {string} inputParent
 */
const showSuccess = (input, inputParent = inputParentElement) => {
  const inputWrapper = input.closest(inputParent);
  inputWrapper.classList.add(successClass);
  inputWrapper.classList.remove(errorClass);
}

/**
 * add error class on input parent
 * @param {HTMLElement} input
 * @param {string} message
 * @param {string} inputParent
 */
const showError = (input, message, inputParent = inputParentElement) => {
  const formControl = input.closest(inputParent);
  formControl.classList.add(errorClass);
  formControl.classList.remove(successClass);
  const errorText = formControl.querySelector(errorField);
  errorText.innerText = message;
}

/**
 * validate email input
 * @param {HTMLElement} input
 */
const checkEmail = (input) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // Возвращаем значение проверки, приведя значение email к маленьким буквам
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, VALIDATION_MESSAGE.noValidEmail);
  }
}

/**
 * compare two password value
 * @param {HTMLElement} password1
 * @param {HTMLElement} password2
 */
const checkPasswordsMatch = (password1, password2) => {
  if (password1.value !== password2.value) {
    showError(password2, VALIDATION_MESSAGE.noMatchPassword);
  } else {
    showSuccess(password2)
  }
}

/**
 * check all required input
 * @param {array} inputArr
 */
const checkRequired = (inputArr) => {
  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, VALIDATION_MESSAGE.isRequired);
    } else {
      showSuccess(input);
    }
  });
}

/**
 * accessibility show/hide password value
 * @param {HTMLElement} passwordInput
 * @param {HTMLElement} togglePasswordButton
 */
const togglePassword = (passwordInput, togglePasswordButton) => {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    // Optional: if you use icon, delete this string and use classList.toggle method
    togglePasswordButton.textContent = 'Hide password';
    togglePasswordButton.setAttribute('aria-label', VALIDATION_MESSAGE.toggleAriaShow);
  } else {
    passwordInput.type = 'password';
    // Optional: if you use icon, delete this string and use classList.toggle method
    togglePasswordButton.textContent = 'Show password';
    togglePasswordButton.setAttribute('aria-label', VALIDATION_MESSAGE.toggleAriaHide);
  }
}

export function sum(a, b) {
  return a + b;
}
