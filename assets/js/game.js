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
    `${enemyName} has won! Remaining health ${enemyHealth}, enemy health: ${enemyHealth}`
  );
  victor = enemyName;
};

/* ----------------------------- Main Execution */
while (playerHealth > 0 || enemyHealth > 0) {
  var enemyAttack = Math.ceil(Math.random(1) * 20);
  var playerAttack = Math.ceil(Math.random(1) * 20);

  if (playerHealth < 1 || enemyHealth < 1) {
    break;
  }

  var action = prompt(
    `Would you like to "Fight" or "Skip" (5 Coins)\n\nPlayer health: ${playerHealth} - Coins: ${playerMoney}`
  ).toLowerCase();

  if (action == 'skip') {
    if (playerMoney < 1) {
      alert('Cannot skip, not enough funds');
    } else {
      prev = playerMoney;
      playerMoney = playerMoney - 5;
      alert(
        `Player has chosen to SKIP, player money deducted from ${prev} to ${playerMoney}`
      );
    }
  }

  if (action == 'fight') {
    enemyHealth = enemyHealth - playerAttack;
    playerHealth = playerHealth - enemyAttack;

    if (playerHealth <= 0) {
      playerHealth = 0;
      defeat();
      break;
    }

    if (enemyHealth <= 0) {
      enemyHealth = 0;
      victory();
      break;
    }

    alert(
      `Player has chosen to FIGHT, \n${playerName} attacks ${enemyName} for ${playerAttack}. \n${enemyName} attacks ${playerName} for ${enemyAttack}\n\nCurrent health: ${playerName}: ${playerHealth}  -  ${enemyName}: ${enemyHealth} `
    );
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
