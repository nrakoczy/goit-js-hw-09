import Notiflix from "notiflix";

const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
	event.preventDefault();

	const delayEl = parseInt(event.target.delay.value, 10);
	const step = parseInt(event.target.step.value, 10);
	const amount = parseInt(event.target.amount.value, 10);

	for (let i = 0; i < amount; i++) {
		createPromise(i + 1, delayEl + step * i)
			.then(({ position, delay }) =>
				Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`),
			)
			.catch(({ position, delay }) =>
				Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`),
			);
	}
});

const createPromise = (position, delay) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const shouldResolve = Math.random() > 0.3;
			shouldResolve
				? resolve({ position, delay })
				: reject({ position, delay });
		}, delay);
	});
};