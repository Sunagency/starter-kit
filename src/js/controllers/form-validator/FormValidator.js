/* eslint-disable no-underscore-dangle,lines-between-class-members */
import LIVR from 'livr';

export default class FormValidator {
  #errors;
  #form;
  #validationInputsArr;

  constructor(form, autoTrim = true) {
    this.#form = form;
    this._isAutoTrim = autoTrim;
    this.#errors = {};
    this.#validationInputsArr = [];
    this.#autoTrimValues();
  }

  init = (rules) => {
    this._validator = new LIVR.Validator(rules);
    this.#form.addEventListener('submit', this.#validationInputs);
    this.#validationInputsArr = Object.keys(rules);
    this.#validationInputsArr.forEach((input) => {
      this.#form.querySelector(`[name="${input}"]`)
        .addEventListener('blur', this.#checkErrors);
    });
  };

  destroy = () => {
    this._validator = null;
    this.#form.removeEventListener('submit', this.#validationInputs);
  };

  get formData() {
    const data = new FormData(this.#form);
    const values = {};
    data.forEach((value, key) => {
      values[key] = value;
    });
    return values;
  }

  #validationInputs = (evt) => {
    evt.preventDefault();
    const validData = this.#checkErrors();
    if (validData) {
      this.#form.submit();
    } else {
      this.#vibrate();
    }
  };

  get errors() {
    return this.#errors;
  }

  #autoTrimValues = () => {
    if (this._isAutoTrim) {
      LIVR.Validator.defaultAutoTrim(true);
    }
  };

  #showInputErrors = () => {
    const errorsKey = Object.keys(this.#errors);
    const errorFields = document.querySelectorAll('.custom-field--error');
    errorFields.forEach((input) => input.classList.remove('custom-field--error'));
    if (errorsKey.length) {
      errorsKey.forEach((inputName) => {
        const input = this.#form.querySelector(`[name="${inputName}"]`);
        const field = input.closest('.custom-field');
        field.classList.add('custom-field--error');
      });
    }
  };

  #showInputSuccess = () => {
    const inputs = this.#form.querySelectorAll('input:not([type="hidden"])');
    inputs.forEach((input) => {
      const parent = input.closest('.custom-field');
      if (!parent.classList.contains('custom-field--error')) {
        parent.classList.add('custom-field--success');
      }
    });
  };

  #checkErrors = () => {
    const { formData } = this;
    const validData = this._validator.validate(formData);
    if (validData) {
      return true;
    }
    this.#errors = this._validator.getErrors();
    this.#showInputErrors();
    this.#showInputSuccess();
    return false;
  };

  #vibrate = () => {
    if (window.navigator.vibrate) {
      window.navigator.vibrate([300, 100, 300]);
    }
  };
}
