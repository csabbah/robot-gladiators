/* ----------------------------- Intro and variable declarations */
alert('Welcome to Robot Gladiators!');

var playerInfo = {
  name: prompt('Choose your robot name:'),
  health: 100,
  money: 10,
  battlesWon: 0,
};

var extraDamage = 0;
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

var difficultyIncrement = 1;
var reward = 0;
var enemyChosen = false;

/* ----------------------------- End game results */
var victory = () => {
  reward = reward + Math.ceil(Math.random(1) * 10);
  playerInfo.money = playerInfo.money + reward;
  alert(
    `${playerInfo.name} has won! Remaining health ${playerInfo.health}\n\nYou have been awarded ${reward} coins, you now have ${playerInfo.money} total coins.\nEntering the shop...`
  );
  shop();
  victor = playerInfo.name;
  playerInfo.battlesWon += 1;
};

var defeat = () => {
  alert(
    `${enemies[pickRandomEnemy]['name']} has won! Remaining health ${enemies[pickRandomEnemy]['health']}`
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

  playerInfo.health = playerInfo.health - enemyAttack;

  if (playerInfo.health < 1) {
    playerInfo.health = 0;
    defeat();
  }

  if (enemies[pickRandomEnemy]['health'] > 1 && playerInfo.health > 1) {
    alert(
      `Player has chosen to FIGHT, \n${playerInfo.name} attacks ${enemies[pickRandomEnemy]['name']} for ${playerDamage}. \n${enemies[pickRandomEnemy]['name']} attacks ${playerInfo.name} for ${enemyAttack}\n\nCurrent health: ${playerInfo.name}: ${playerInfo.health}  -  ${enemies[pickRandomEnemy]['name']}: ${enemies[pickRandomEnemy]['health']} `
    );
  }
};

const shop = () => {
  while (true) {
    shopOffers = prompt(
      `What would you like to buy? Coins: ${playerInfo.money} \n ------------------------------- \n"H": +15 Health/10 Coins \n"A": +5 Attack power/10 coins\n"Nothing"`
    ).toLowerCase();

    if (shopOffers == 'nothing') {
      break;
    } else if (shopOffers == 'h') {
      if (playerInfo.money >= 10) {
        prevMoney = playerInfo.money;
        prevHealth = playerInfo.health;
        playerInfo.money = playerInfo.money - 10;
        playerInfo.health = playerInfo.health + 15;
        shopOffers == '';
        alert(
          `Purchase successful, ${prevHealth} > ${playerInfo.health}. Player money deducted from ${prevMoney} to ${playerInfo.money}`
        );
      } else {
        alert('Not enough coins!');
      }
    } else if (shopOffers == 'a') {
      if (playerInfo.money >= 10) {
        prevMoney = playerInfo.money;
        playerInfo.money = playerInfo.money - 10;
        extraDamage = extraDamage + 5;
        shopOffers == '';
        alert(
          `Purchase successful! Player money deducted from ${prevMoney} to ${playerInfo.money}`
        );
      } else {
        alert('Not enough coins!');
      }
    } else {
      alert('Please choose a valid option');
    }
  }
};

const skip = () => {
  if (playerInfo.money < 1) {
    alert('Cannot skip, not enough funds');
  } else {
    prev = playerInfo.money;
    playerInfo.money = playerInfo.money - 5;
    alert(
      `Player has chosen to SKIP, player money deducted from ${prev} to ${playerInfo.money}`
    );
  }
};

/* ----------------------------- Main Execution */
while (playerInfo.health > 0 || enemies[pickRandomEnemy]['health'] > 0) {
  // Pick a random enemy from the list
  if (!enemyChosen) {
    pickRandomEnemy = Math.ceil(Math.random(1) * 4) - 1;
    enemyChosen = true;
  }

  // Upon each loop, generate a random number
  var enemyAttack = Math.ceil(Math.random(1) * 10);
  var playerAttack = Math.ceil(Math.random(1) * 10);

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
  } else if (playerInfo.health == 0) {
    break;
  } else {
    var action = prompt(
      `Would you like to "Fight", "Skip" (5 Coins)?\n\nPlayer health: ${playerInfo.health} - Coins: ${playerInfo.money}`
    ).toLowerCase();

    if (action == 'skip') {
      skip();
    } else if (action == 'fight') {
      fight();
    } else {
      alert('Please choose a valid option');
    }
  }
}

/* ----------------------------- HTML end game labels */
if (playerInfo.health == 0) {
  const header = document.getElementById('header');
  header.style.color = 'red';
  header.innerText = `You lose to ${enemies[pickRandomEnemy]['name']}! You beat ${playerInfo.battlesWon} enemies with ${playerInfo.money} coins remaining.`;
}
if (enemies[pickRandomEnemy]['health'] == 0) {
  const header = document.getElementById('header');
  header.style.color = 'green';
  header.innerText = `${playerInfo.name} has won and ended the battle! \nRemaining health ${playerInfo.health}\nTotal coins: ${playerInfo.money}\nTotal enemies beaten ${playerInfo.battlesWon}`;
}
