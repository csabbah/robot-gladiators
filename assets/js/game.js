/* ----------------------------- Intro and variable declarations */
alert('Welcome to Robot Gladiators!');

while (true) {
  var playerName = prompt('Choose your robot name:').toUpperCase();
  if (playerName.length < 1) {
    alert('Please choose a robot name.');
  } else {
    break;
  }
}

var playerHealth = 100;
var extraDamage = 0;
var playerMoney = 10;
var enemiesBeaten = 0;
var randomEnemyHealth = Math.ceil(Math.random(20) * 60);
var randomReward = Math.ceil(Math.random(5) * 20);

// Establish the initial values
var enemies = [
  {
    name: 'Ego',
    health: randomEnemyHealth,
    victoryReward: randomReward,
  },
  {
    name: 'Thanos',
    health: randomEnemyHealth,
    victoryReward: randomReward,
  },
  {
    name: 'Blade',
    health: randomEnemyHealth,
    victoryReward: randomReward,
  },
  {
    name: 'Muzan',
    health: randomEnemyHealth,
    victoryReward: randomReward,
  },
];
var original = [...enemies];
var difficultyIncrement = 1;
var reward = 0;
var enemyChosen = false;

/* ----------------------------- End game results */
var victory = () => {
  reward = reward + Math.ceil(Math.random(1) * 10);
  playerMoney = playerMoney + reward;
  alert(
    `${playerName} has won! Remaining health ${playerHealth}\n\nYou have been awarded ${reward} coins, you now have ${playerMoney} total coins.`
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
  playerDamage = playerAttack + extraDamage;

  enemies[pickRandomEnemy]['health'] =
    enemies[pickRandomEnemy]['health'] - playerDamage;

  if (enemies[pickRandomEnemy]['health'] < 1) {
    enemies[pickRandomEnemy]['health'] = 0;
    victory();
  }

  playerHealth = playerHealth - enemyAttack;

  if (playerHealth < 1) {
    playerHealth = 0;
    defeat();
  }

  if (enemies[pickRandomEnemy]['health'] > 1 && playerHealth > 1) {
    alert(
      `Player has chosen to FIGHT, \n${playerName} attacks ${enemies[pickRandomEnemy]['name']} for ${playerDamage}. \n${enemies[pickRandomEnemy]['name']} attacks ${playerName} for ${enemyAttack}\n\nCurrent health: ${playerName}: ${playerHealth}  -  ${enemies[pickRandomEnemy]['name']}: ${enemies[pickRandomEnemy]['health']} `
    );
  }
};

const shop = () => {
  shopOffers = prompt(
    `What would you like to buy? Coins: ${playerMoney} \n ------------------------------- \n"H": +15 Health/10 Coins \n"A": +5 Attack power/10 coins\n"Nothing"`
  ).toLowerCase();

  if (shopOffers == 'nothing') {
    console.log('Chosen to go back');
  } else if (shopOffers == 'h') {
    if (playerMoney >= 10) {
      prevMoney = playerMoney;
      prevHealth = playerHealth;
      playerMoney = playerMoney - 10;
      playerHealth = playerHealth + 15;
      alert(
        `Purchase successful, ${prevHealth} > ${playerHealth}. Player money deducted from ${prevMoney} to ${playerMoney}`
      );
    } else {
      alert('Not enough coins!');
    }
  } else if (shopOffers == 'a') {
    if (playerMoney >= 10) {
      prevMoney = playerMoney;
      playerMoney = playerMoney - 10;
      extraDamage = extraDamage + 5;
      alert(
        `Purchase successful! Player money deducted from ${prevMoney} to ${playerMoney}`
      );
    } else {
      alert('Not enough coins!');
    }
  } else {
    alert('Please choose a valid option');
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
while (playerHealth > 0 || enemies[pickRandomEnemy]['health'] > 0) {
  // Pick a random enemy from the list
  if (!enemyChosen) {
    pickRandomEnemy = Math.ceil(Math.random(1) * 4) - 1;
    enemyChosen = true;
  }

  // Upon each loop, generate a random number
  var enemyAttack = Math.ceil(Math.random(1) * 10);
  var playerAttack = Math.ceil(Math.random(1) * 20);

  if (enemies[pickRandomEnemy]['health'] == 0) {
    nextPath = prompt("'Continue' to the next battle or 'stop'?").toLowerCase();
    if (nextPath == 'continue') {
      difficultyIncrement = difficultyIncrement + 0.1;
      enemies[pickRandomEnemy]['health'] = Math.ceil(
        randomEnemyHealth * difficultyIncrement
      ); // Each time we progress, slowly increment by a factor of * 1 each time
      nextPath = ''; // Reset next path value
      enemyChosen = false; // Set to false so we can execute a random enemy again
    } else if (nextPath == 'stop') {
      // While loop break condition
      break;
    } else {
      alert('Please choose a valid option');
    }
  } else if (playerHealth == 0) {
    break;
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

/* ----------------------------- HTML end game labels */
if (playerHealth == 0) {
  const header = document.getElementById('header');
  header.style.color = 'red';
  header.innerText = `You lose to ${enemies[pickRandomEnemy]['name']}! You beat ${enemiesBeaten} enemies with ${playerMoney} coins remaining.`;
}
if (enemies[pickRandomEnemy]['health'] == 0) {
  const header = document.getElementById('header');
  header.style.color = 'green';
  header.innerText = `${playerName} has won and ended the battle! Remaining health ${playerHealth}\nTotal coins: ${playerMoney}\nTotal enemies beaten ${enemiesBeaten}`;
}
