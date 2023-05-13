const body = document.querySelector("body");
const startButton = document.querySelector("[data-start]");
const stopButton = document.querySelector("[data-stop]");

let intervalId;

const getRandomColor = () => {
	return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const changeColor = () => {
	startButton.disabled = true;
	intervalId = setInterval(() => {
		body.style.backgroundColor = getRandomColor();
	}, 1000);
	stopButton.addEventListener("click", stopColorChange);
};

const stopColorChange = () => {
	clearInterval(intervalId);
	startButton.disabled = false;
	stopButton.removeEventListener("click", stopColorChange);
};

startButton.addEventListener("click", changeColor);

