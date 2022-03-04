const value1 = 5;
const value2 = 4;

localStorage.setItem('highscore', value1);

if (value1 > value2) {
  localStorage.setItem('highscore', value1);
} else {
  localStorage.setItem('highscore', value2);
}
