/* ----------------------------- Intro and variable declarations */
alert('Welcome to Robot Gladiators!');
var playerName = prompt('Choose your robot name:').toUpperCase();
var playerHealth = 100;
var playerMoney = 10;

var enemyName = 'Roborto';
var enemyHealth = 50;

/* ----------------------------- End game result */
var victory = () => {
  alert(
    `${playerName} has won! Remaining health ${playerHealth}, enemy health: ${enemyHealth}`
  );
  victor = playerName;
};

var defeat = () => {
  alert(
    `${enemyName} has won! Remaining health ${enemyHealth}, player health: ${playerHealth}`
  );
  victor = enemyName;
};

/* ----------------------------- Action paths */
const fight = () => {
  enemyHealth = enemyHealth - playerAttack;
  playerHealth = playerHealth - enemyAttack;

  if (playerHealth <= 0) {
    playerHealth = 0;
    defeat();
  }

  if (enemyHealth <= 0) {
    enemyHealth = 0;
    victory();
  }

  if (enemyHealth > 1 && playerHealth > 1) {
    alert(
      `Player has chosen to FIGHT, \n${playerName} attacks ${enemyName} for ${playerAttack}. \n${enemyName} attacks ${playerName} for ${enemyAttack}\n\nCurrent health: ${playerName}: ${playerHealth}  -  ${enemyName}: ${enemyHealth} `
    );
  }
};

const skip = () => {
  if (playerMoney < 1) {
    alert('Cannot skip, not enough funds');
  } else {
    prev = playerMoney;
    playerMoney = playerMoney - 5;
    alert(
      `Player has chosen to SKIP, player money deducted from ${prev} to ${playerMoney}`
    );
  }
};

/* ----------------------------- Main Execution */
while (playerHealth > 0 || enemyHealth > 0) {
  // Upon each loop, generate a random number
  var enemyAttack = Math.ceil(Math.random(1) * 10);
  var playerAttack = Math.ceil(Math.random(1) * 10);

  if (playerHealth < 1 || enemyHealth < 1) {
    // While loop break condition
    break;
  } else {
    var action = prompt(
      `Would you like to "Fight" or "Skip" (5 Coins)\n\nPlayer health: ${playerHealth} - Coins: ${playerMoney}`
    ).toLowerCase();

    if (action == 'skip') {
      skip();
    }

    if (action == 'fight') {
      fight();
    }
  }
}

/* ----------------------------- HTML header */
var header = document.getElementById('header');
if (enemyHealth <= 0) {
  header.style.color = 'green';
  header.innerText = `${playerName} has won! Remaining health ${playerHealth}, enemy health: ${enemyHealth}`;
}
if (playerHealth <= 0) {
  header.style.color = 'red';
  header.innerText = `${enemyName} has won! Remaining health ${enemyHealth}, player health: ${playerHealth}`;
}
