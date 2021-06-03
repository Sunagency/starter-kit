const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const values = {};
  data.forEach((value, key) => {
    values[key] = value;
  });
  console.log(values);
});
