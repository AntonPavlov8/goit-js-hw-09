import Notiflix from 'notiflix';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  position += 1;
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    if (shouldResolve) {
      // Fulfill
      setTimeout(() => {
        resolve({ position, delay });
      }, delay);
    } else {
      // Reject
      setTimeout(() => {
        reject({ position, delay });
      }, delay);
    }
  });
  return promise;
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const formInputs = e.target;
  const initialDelayInput = formInputs[0];
  const delayIncrementInput = formInputs[1];
  const amountInput = formInputs[2];

  const amount = amountInput.value;

  for (let i = 0; i < amount; i++) {
    const initialDelay = Number(initialDelayInput.value);
    const delayIncrement = Number(delayIncrementInput.value);
    const delay = initialDelay + i * delayIncrement;

    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});
