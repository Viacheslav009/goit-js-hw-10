import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const searchbox = document.querySelector('.searchbox > input');
searchbox.addEventListener('input', () => {
  console.log(searchbox.value);
});
