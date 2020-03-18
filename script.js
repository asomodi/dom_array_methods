const main = document.getElementById('main');
const addUserButton = document.getElementById('add-user');
const doubleButton = document.getElementById('double');
const showMillioniresButton = document.getElementById('show-millionaires');
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

function addData(obj) {
  data.push(obj);
}
