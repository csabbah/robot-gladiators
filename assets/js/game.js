/* ----------------------------- Intro and variable declarations */
alert('Welcome to Robot Gladiators!');
var playerName = prompt('Choose your robot name:').toUpperCase();
var playerHealth = 100;
var playerMoney = 10;
var enemiesBeaten = 0;

var enemies = [
  { name: 'Ego', health: 30, victoryReward: Math.ceil(Math.random(1) * 10) },
  { name: 'Thanos', health: 60, victoryReward: Math.ceil(Math.random(1) * 20) },
  { name: 'Blade', health: 40, victoryReward: Math.ceil(Math.random(1) * 15) },
  { name: 'Muzan', health: 100, victoryReward: Math.ceil(Math.random(1) * 40) },
];
var enemyName = 'Roborto';
var enemyHealth = 50;

var reward = 0;
var enemyChosen = false;

/* ----------------------------- End game result */
var victory = () => {
  reward = reward + Math.ceil(Math.random(1) * 10);
  playerMoney = playerMoney + reward;
  alert(
    `${playerName} has won! Remaining health ${playerHealth}\nYou have been awarded ${reward} coins, you now have ${playerMoney} total coins.`
  );
  victor = playerName;
  enemiesBeaten += 1;
};

var defeat = () => {
  alert(
    `${enemies[pickRandomEnemy]['name']} has won! Remaining health ${enemies[pickRandomEnemy]['health']}, player health: ${playerHealth}`
  );
  victor = enemies[pickRandomEnemy]['name'];
};

/* ----------------------------- Action paths */
const fight = () => {
  enemies[pickRandomEnemy]['health'] =
    enemies[pickRandomEnemy]['health'] - playerAttack;
  playerHealth = playerHealth - enemyAttack;

  if (playerHealth <= 0) {
    playerHealth = 0;
    defeat();
  }

  if (enemies[pickRandomEnemy]['health'] <= 0) {
    enemies[pickRandomEnemy]['health'] = 0;
    victory();
  }

  if (enemies[pickRandomEnemy]['health'] > 1 && playerHealth > 1) {
    alert(
      `Player has chosen to FIGHT, \n${playerName} attacks ${enemies[pickRandomEnemy]['name']} for ${playerAttack}. \n${enemies[pickRandomEnemy]['name']} attacks ${playerName} for ${enemyAttack}\n\nCurrent health: ${playerName}: ${playerHealth}  -  ${enemies[pickRandomEnemy]['name']}: ${enemies[pickRandomEnemy]['health']} `
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

const shop = () => {
  shopOffers = prompt(
    'What would you like to buy?:\n5 coins: +10 Health\n10 coins: +5 Attack power\n25 coins: Instant Kill current enemy \n"Nothing"'
  ).toLowerCase();
  if (shopOffers == 'nothing') {
    console.log('Chosen to go back');
  }

  // How to update player attack when it's being in another block?
  // Just create a variable here to hold the bonus damage and then add that variable to the bottom lines
  // "var playerAttack = Math.ceil(Math.random(1) * 10) + extraAttack"
};

/* ----------------------------- Main Execution */
while (playerHealth > 0 || enemies[pickRandomEnemy]['health'] > 0) {
  // Pick a random enemy from the list
  if (!enemyChosen) {
    pickRandomEnemy = Math.ceil(Math.random(1) * 4) - 1;
    enemyChosen = true;
  }

  // Upon each loop, generate a random number
  var enemyAttack = Math.ceil(Math.random(1) * 10);
  var playerAttack = Math.ceil(Math.random(1) * 10);

  // ***************** PROBLEM - WHEN BOTH PLAYER AND ENEMY HIT 0 HEALTH OR -1, FIND A SOLUTION? LIKE,
  // IF THE ENEMY DIES 'FIRST', THEN THE PLAYER WINS, MAYBE IT AS A TURN BASED GAME?
  if (playerHealth < 1 || enemies[pickRandomEnemy]['health'] < 1) {
    nextPath = prompt("'Continue' to the next battle or 'stop'?").toLowerCase();
    if (nextPath == 'continue') {
      enemyChosen = false;
      nextPath = '';
    } else if (nextPath == 'stop') {
      // While loop break condition
      break;
    } else {
      alert('Please choose a valid option');
    }
  } else {
    var action = prompt(
      `Would you like to "Fight", "Skip" (5 Coins) or visit the "Shop"?\n\nPlayer health: ${playerHealth} - Coins: ${playerMoney}`
    ).toLowerCase();

    if (action == 'skip') {
      skip();
    } else if (action == 'fight') {
      fight();
    } else if (action == 'shop') {
      shop();
    } else {
      alert('Please choose a valid option');
    }
  }
}

/* ----------------------------- HTML header */
var header = document.getElementById('header');
if (enemies[pickRandomEnemy]['health'] <= 0) {
  header.style.color = 'green';
  header.innerText = `${playerName} has won and ended the battle! Remaining health ${playerHealth}\nTotal coins: ${playerMoney}\nTotal enemies beaten ${enemiesBeaten}`;
}
if (playerHealth <= 0) {
  header.style.color = 'red';
  header.innerText = `You lose!`;
}
