const main = document.getElementById('main');
const addUserButton = document.getElementById('add-user');
const doubleButton = document.getElementById('double');
const showMillionairesButton = document.getElementById('show-millionaires');
const sortButton = document.getElementById('sort');
const calculateWealthButton = document.getElementById('calculate-wealth');

let data = [];

getRandomuser();
getRandomuser();
getRandomuser();

// fetch random user and add money
async function getRandomuser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };

  addData(newUser);
}

// Double everyones money
function doubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

// Sort users by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

// Filter only millionaires
function showMillionaires() {
  data = data.filter(user => user.money > 1000000);

  updateDOM();
}

// Calculate the total wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthElement = document.createElement('div');
  wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthElement);
}

// Add new object to data array
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
  // clear the main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach(item => {
    const element = document.getElementById('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// Format number as money  https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney() {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event listeners
addUserButton.addEventListener('click', getRandomuser);
doubleButton.addEventListener('click', doubleMoney);
sortButton.addEventListener('click', sortByRichest);
showMillionairesButton.addEventListener('click', showMillionaires);
calculateWealthButton.addEventListener('click', calculateWealth);
