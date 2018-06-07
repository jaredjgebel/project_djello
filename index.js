require('./style.css');
const greeting = 'Hello, Webpack!';

(() => {
  console.log(greeting);
  const d = document.createElement('div');
  d.classList.add('myDiv');
  d.innerText = greeting;
  document.body.appendChild(d);
})();