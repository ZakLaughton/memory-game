/*
 * Create a list that holds all of your cards
 */

let cardList = [];
let openCards = [];
let matchedCards = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array ;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function startGame () {
  // set board
  let cards = document.querySelectorAll('.deck .card');
  for (let card of cards) {
    card.classList = 'card'
    card.addEventListener('click', function (event) {
      showCard(event.target);
    })
  }
}

function showCard (card) {
  openCard(card);
  addToOpenCards(card);
  if (openCards.length === 2) {
    isMatch();
  }
}

function openCard (card) {
  card.classList.add('show', 'open')
}

function closeCard (card) {
  card.classList.remove('show', 'open')
}

function addToOpenCards (card) {
  openCards.push(card);
}

function clearOpenCards () {
  openCards.length = 0;
}

function isMatch () {
  card1 = openCards[0].children[0].classList.value
  card2 = openCards[1].children[0].classList.value
  if (card1 === card2) {
    console.log('match!');
    return true;
  }
  else {
    return false;
  }
}

startGame();
const restartButton = document.querySelector('.restart')
restartButton.addEventListener('click', startGame)
