import flatpickr from "flatpickr";
import "flatpickr/dist/themes/material_orange.css";
import Notiflix from "notiflix";

const timerEl = document.querySelector(".timer");
const daysEl = timerEl.querySelector("[data-days]");
const hoursEl = timerEl.querySelector("[data-hours]");
const minutesEl = timerEl.querySelector("[data-minutes]");
const secondsEl = timerEl.querySelector("[data-seconds]");
const startBtn = document.querySelector("[data-start]");

let endDate;
let intervalId;

const options = {
	enableTime: true,
	time_24hr: true,
	defaultDate: new Date(),
	minuteIncrement: 1,
	onClose: (selectedDates) => {
		if (selectedDates[0] < new Date()) {
			Notiflix.Notify.failure("Please choose a date in the future");
			startBtn.disabled = true;
		} else {
			startBtn.disabled = false;
			endDate = selectedDates[0];
		}
		console.log(selectedDates[0]);
	},
};

flatpickr("#datetime-picker", options);

startBtn.addEventListener("click", () => {
	clearInterval(intervalId);
	intervalId = setInterval(updateCountdown, 1000);
});

const updateCountdown = () => {
	const timeLeft = endDate - new Date();
	if (timeLeft <= 0) {
		clearInterval(intervalId);
		daysEl.textContent = "00";
		hoursEl.textContent = "00";
		minutesEl.textContent = "00";
		secondsEl.textContent = "00";
		return;
	}
	const { days, hours, minutes, seconds } = convertMs(timeLeft);
	daysEl.textContent = padNumber(days);
	hoursEl.textContent = padNumber(hours);
	minutesEl.textContent = padNumber(minutes);
	secondsEl.textContent = padNumber(seconds);
};

const padNumber = (number) => {
	return number.toString().padStart(2, "0");
};

function convertMs(ms) {
	const days = Math.floor(ms / (24 * 60 * 60 * 1000));
	const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
	const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
	const seconds = Math.floor((ms % (60 * 1000)) / 1000);
    
	return { days, hours, minutes, seconds };
}



