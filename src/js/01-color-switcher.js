const startBT = document.querySelector('button[data-start]');
const stopBT = document.querySelector('button[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

let colorSwitcher;

startBT.addEventListener('click', () => {
  colorSwitcher = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 500);

  startBT.setAttribute('disabled', '');
  stopBT.removeAttribute('disabled');
});
stopBT.addEventListener('click', () => {
  clearInterval(colorSwitcher);

  stopBT.setAttribute('disabled', '');
  startBT.removeAttribute('disabled');
});
