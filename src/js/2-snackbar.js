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
  const selectedState = document.querySelector('input[name="state"]:checked');
  const isFulfilled = selectedState.value === 'fulfilled';
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isFulfilled) {
        resolve(
          iziToast.success({
            position: 'topRight',
            iconText: `✅`,
            message: `Fulfilled promise in ${delay}ms`,
          })
        );
      } else {
        reject(
          iziToast.error({
            position: 'topRight',
            iconText: `❌`,
            message: `Rejected promise in ${delay}ms`,
          })
        );
      }
    });
  });
  form.reset();
});
