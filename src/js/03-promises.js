const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget;
  const delayVl = Number(delay.value);
  const stepVl = Number(step.value);
  const amountVl = Number(amount.value);
  for (let position = 0; position < amountVl; position++) {
    let timeDelay = delayVl + stepVl * position;
    createPromise(position, timeDelay)
      .then(message => console.log(message))
      .catch(error => console.log(error));
  }
}
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position + 1} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position + 1} in ${delay}ms`);
      }
    }, delay);
  });
}
