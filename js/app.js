/*
 * Create a list that holds all of your cards
 */

let matchedCards = [];
let clickFreeze = false;
let moveCount = 0
let allStars = document.querySelector('.stars')
let stars = document.querySelectorAll('.stars li')

let openCards = {
  cards: [],

  clear: function () {
    this.cards.length = 0;
  },
  closeAll: function () {
    for (let card of this.cards) {
      card.classList.remove('show', 'open')
    }
  },
  isMatch: function () {
    card1 = this.cards[0].children[0].classList.value
    card2 = this.cards[1].children[0].classList.value
    if (card1 === card2) {
      return true;
    }
    else {
      return false;
    }
  }
}

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

    return array;
}

function shuffleCards() {
  let cards = document.querySelectorAll('ul.deck li.card');
  let cardsArray = Array.from(cards);

  cardsArray = shuffle(cardsArray);
  newBoard = ""
  for (card of cardsArray) {
    newBoard += card.outerHTML
  }
  document.querySelector('.deck').innerHTML = newBoard
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
  openCards.clear();
  document.getElementsByClassName('moves')[0].innerHTML = 0;
  matchedCards.length = 0
  for (star of stars) {
    star.querySelector('i').classList = "fa fa-star";
  }
  shuffleCards();
  let cards = document.querySelectorAll('.deck .card');
  for (let card of cards) {
    card.classList = 'card';
    card.addEventListener('click', function (event) {
      if (clickFreeze === false) {
        showCard(event.target);
      }
    })
  }
}

function playAgainButton () {
  document.getElementById('overlay').style.display = 'none';
  startGame();
}

function showCard (card) {
  card.classList.add('show', 'open');
  addToOpenCards(card);
  if (openCards.cards.length === 2) {
    clickFreeze = true;
    if (openCards.isMatch()) {
      setMatchedCards();
      openCards.clear();
      clickFreeze = false;
      if (matchedCards.length === 16) {
        endGame();
      }
    } else {
      setTimeout(function () {
        openCards.closeAll();
        openCards.clear();
        clickFreeze = false;
      }, 1000)
    }
    incrementMoveCount();
  }
}

function endGame () {
  document.querySelector('#overlay .rating').innerHTML = allStars.innerHTML;
  document.getElementById('overlay').style.display = 'block';
}

function addToOpenCards (card) {
  openCards.cards.push(card);
}

function incrementMoveCount () {
  let moves = document.getElementsByClassName('moves')[0].innerHTML;
  moves = Number(moves) + 1;
  document.getElementsByClassName('moves')[0].innerHTML = moves;
  if (moves === 15) {
    stars[2].querySelector('i').classList = "fa fa-star-o";
  } else if (moves === 21) {
    stars[1].querySelector('i').classList = "fa fa-star-o";
  }
}

function setMatchedCards () {
  for (let card of openCards.cards) {
    card.classList.remove('show', 'open')
    card.classList.add('match')
    matchedCards.push(card)
  }
}

startGame();
const restartButton = document.querySelector('.restart')
restartButton.addEventListener('click', startGame)
