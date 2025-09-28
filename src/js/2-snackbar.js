import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
iziToast.info({
  position: 'topLeft',
  title: 'Hello',
  message: 'Welcome!',
});

const form = document.querySelector('form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const delay = document.querySelector('input[name="delay"]').value.trim();
  const selectedState = document.querySelector(
    'input[name="state"]:checked'
  ).value;
  new Promise((resolve, reject) => {
    setTimeout(() => {
      selectedState === 'fulfilled' ? resolve(delay) : reject(delay);
    }, delay);
  })
    .then(ms => {
      iziToast.success({
        iconText: `✅`,
        message: `Fulfilled promise in ${ms}ms`,
        position: 'topRight',
      });
    })
    .catch(ms => {
      iziToast.error({
        iconText: `❌`,
        message: `Rejected promise in ${ms}ms`,
        position: 'topRight',
      });
    });

  form.reset();
});
