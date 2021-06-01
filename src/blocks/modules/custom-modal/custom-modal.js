import Modal from 'a11y-dialog';
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock';

// Get the dialog container HTML element (with the accessor method you want)
const modal = document.querySelector('#custom-modal');

// Instantiate a new A11yDialog module
if (modal) {
  const dialog = new Modal(modal);

  dialog
    .on('show', () => disableBodyScroll(modal))
    .on('hide', () => enableBodyScroll(modal));
}
