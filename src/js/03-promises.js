import Notiflix from "notiflix";

const formEl = document.getElementById("form");

formEl.addEventListener("submit", (ev) => {
	ev.preventDefault();

	const formData = new FormData(ev.target);
	const delayEl = parseInt(formData.get("delay"), 10);
	const stepEl = parseInt(formData.get("step"), 10);
	const amountEl = parseInt(formData.get("amount"), 10);

	for (let i = 0; i < amountEl; i++) {
		createPromise(i + 1, delayEl + i * stepEl)
			.then(({ position, delay }) => {
				Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
			})
			.catch(({ position, delay }) => {
				Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
			});
	}
});

function createPromise(position, delay) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const shouldResolve = Math.random() > 0.3;

			if (shouldResolve) {
				resolve({ position, delay });
			} else {
				reject({ position, delay });
			}
		}, delay);
	});
}