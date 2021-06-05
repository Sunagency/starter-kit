import FormValidator from '../../../js/controllers/form-validator/FormValidator';

const form = document.querySelector('form');

const rules = {
  name: 'required',
  email: ['required', 'email'],
  password: ['required', { min_length: 10 }],
  'current-password': ['required', { length_between: [2, 10] }],
};

const loginValidation = new FormValidator(form);
loginValidation.init(rules);
