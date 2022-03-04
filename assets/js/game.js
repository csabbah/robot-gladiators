/* ----------------------------- Intro and variable declarations */
alert('Welcome to Robot Gladiators!');

while (true) {
  var playerInfo = {
    name: prompt('Choose your robot name:'),
    health: 100,
    money: 20,
    attack: 0,
    battlesWon: 0,
    extraDamage: 0,
    refillHealth: function () {
      this.health += 20;
      this.money -= 10;
    },
    increaseAttack: function () {
      this.extraDamage += 10;
      this.money -= 10;
    },
  };

  if (playerInfo.name == '' || playerInfo.name == null) {
    alert('Please enter a valid name');
  } else {
    break;
  }
}

// Main RNG element function
function randomNum(min, max) {
  number = Math.ceil(Math.random(min) * max);
  return number;
}

// Establish the initial values
var enemies = [
  {
    name: 'Ego',
    health: randomNum(20, 60),
    victoryReward: randomNum(5, 20),
  },
  {
    name: 'Thanos',
    health: randomNum(20, 70),
    victoryReward: randomNum(5, 20),
  },
  {
    name: 'Blade',
    health: randomNum(20, 80),
    victoryReward: randomNum(5, 20),
  },
  {
    name: 'Muzan',
    health: randomNum(20, 90),
    victoryReward: randomNum(5, 20),
  },
];

var difficultyIncrement = 1;
var reward = 0;
var enemyChosen = false;

/* ----------------------------- End game results */
var victory = () => {
  playerInfo.money =
    playerInfo.money + enemies[pickRandomEnemy]['victoryReward'];
  alert(
    `${playerInfo.name} has won! Remaining health ${playerInfo.health}\n\nYou have been awarded ${enemies[pickRandomEnemy]['victoryReward']} coins, you now have ${playerInfo.money} total coins.\nEntering the shop...`
  );
  shop();
  playerInfo.battlesWon += 1;
};

var defeat = () => {
  alert(
    `${enemies[pickRandomEnemy]['name']} has won! Remaining health ${enemies[pickRandomEnemy]['health']}`
  );
};

/* ----------------------------- Action paths */
const fight = () => {
  // Decide who attacks first
  var isPlayerTurn = true;
  if (Math.random() > 0.5) {
    var isPlayerTurn = false;
  }

  while (enemies[pickRandomEnemy]['health'] > 1 && playerInfo.health > 1) {
    if (isPlayerTurn) {
      alert('Players turn!');
      var action = prompt(
        `Would you like to "Fight" or "Skip" (5 Coins) and open shop?\n\nPlayer health: ${playerInfo.health} - Coins: ${playerInfo.money}`
      ).toLowerCase();

      if (action == 'skip') {
        skip();
        break;
      } else if (action == 'fight') {
        // -------- Player attacks first then we test the condition...
        playerInfo.attack = randomNum(1, 10) + playerInfo.extraDamage;

        enemies[pickRandomEnemy]['health'] =
          enemies[pickRandomEnemy]['health'] - playerInfo.attack;
        alert(
          `Player has chosen to FIGHT, \n${playerInfo.name} attacks ${enemies[pickRandomEnemy]['name']} for ${playerInfo.attack}.\n${enemies[pickRandomEnemy]['name']} now has ${enemies[pickRandomEnemy]['health']} health!`
        );

        if (enemies[pickRandomEnemy]['health'] < 1) {
          enemies[pickRandomEnemy]['health'] = 0;
          victory();
          break;
        } else {
          alert(
            `${enemies[pickRandomEnemy]['name']} is still alive, they attack next...`
          );
        }
      } else if (action == '' || action == null) {
        alert('Please choose a valid option');
      }
    } else {
      alert("Enemy's turn!");
      // -------- If the enemy doesn't lose, then we move on with their attack
      var enemyAttack = randomNum(1, 10);

      playerInfo.health = playerInfo.health - enemyAttack;
      alert(
        `${enemies[pickRandomEnemy]['name']} attacks ${playerInfo.name} for ${enemyAttack}.\n${playerInfo.name} now has ${playerInfo.health} health!`
      );
      if (playerInfo.health < 1) {
        playerInfo.health = 0;
        defeat();
        break;
      } else {
        alert(`${playerInfo.name} is still alive, they attack next...`);
      }
    }
    isPlayerTurn = !isPlayerTurn;
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
        playerInfo.refillHealth();
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
        playerInfo.increaseAttack();
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
      `Player has chosen to SKIP, player money deducted from ${prev} to ${playerInfo.money} Loading shop...`
    );
  }
  shop();
};

/* ----------------------------- Main Execution */
while (playerInfo.health > 0 || enemies[pickRandomEnemy]['health'] > 0) {
  // Pick a random enemy from the list
  if (!enemyChosen) {
    pickRandomEnemy = randomNum(1, 4) - 1;
    enemyChosen = true;
  }

  if (enemies[pickRandomEnemy]['health'] == 0) {
    nextPath = prompt("'Continue' to the next battle or 'stop'?").toLowerCase();
    if (nextPath == 'continue') {
      difficultyIncrement = difficultyIncrement + 0.2;
      enemies[pickRandomEnemy]['health'] = Math.ceil(
        randomNum(20, 60) * difficultyIncrement
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
    fight();
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
