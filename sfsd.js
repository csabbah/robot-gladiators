var enemies = [
  {
    name: 'Ego',
    health: 20,
    victoryReward: Math.ceil(Math.random(1) * 10),
  },
  {
    name: 'Thanos',
    health: 50,
    victoryReward: Math.ceil(Math.random(1) * 20),
  },
  {
    name: 'Blade',
    health: 40,
    victoryReward: Math.ceil(Math.random(1) * 15),
  },
  {
    name: 'Muzan',
    health: 30,
    victoryReward: Math.ceil(Math.random(1) * 40),
  },
];

var original = [...enemies];
var original = [
  {
    name: 'Ego',
    health: 20,
    victoryReward: Math.ceil(Math.random(1) * 10),
  },
  {
    name: 'Thanos',
    health: 50,
    victoryReward: Math.ceil(Math.random(1) * 20),
  },
  {
    name: 'Blade',
    health: 40,
    victoryReward: Math.ceil(Math.random(1) * 15),
  },
  {
    name: 'Muzan',
    health: 30,
    victoryReward: Math.ceil(Math.random(1) * 40),
  },
];

enemies[1]['health'] = 2;
enemies = [...original];
console.log(enemies[1]['health']);
