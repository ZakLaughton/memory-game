let matchedCards = [];
let allStars = document.querySelector('.stars');
let stars = document.querySelectorAll('.stars li');
let seconds = document.querySelector('.timer');
let timer; // Used to start/stop timer with setInterval/clearInterval

let openCards = {
  cards: [],

  clear: function () {
    this.cards.length = 0;
  },
  closeAll: function () {
    for (let card of this.cards) {
      card.classList.remove('show', 'open');
    }
  },
  isMatch: function () {
    let card1 = this.cards[0].children[0].classList.value;
    let card2 = this.cards[1].children[0].classList.value;
    if (card1 === card2) {
      return true;
    }
    else {
      return false;
    }
  },
  addCard: function (card) {
    this.cards.push(card);
  }
};

/**
 * @description Shuffle function from http://stackoverflow.com/a/2450976
 */
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

/**
 * @description randomizes card order on the page
 */
function shuffleCards() {
  let cards = document.querySelectorAll('ul.deck li.card');
  let cardsArray = Array.from(cards);

  cardsArray = shuffle(cardsArray);
  let newBoard = "";
  for (let card of cardsArray) {
    newBoard += card.outerHTML;
  }
  document.querySelector('.deck').innerHTML = newBoard;
}

/**
 * @description Clears and re-initializes game data
 */
function startGame () {
  openCards.clear();
  document.getElementsByClassName('moves')[0].innerHTML = 0;
  matchedCards.length = 0;
  seconds.innerHTML = 0;
  clearInterval(timer);
  startTimer();
  for (let star of stars) {
    star.querySelector('i').classList = "fa fa-star";
  }
  shuffleCards();
  let cards = document.querySelectorAll('.deck .card');
  for (let card of cards) {
    card.classList = 'card';
    card.addEventListener('click', function (event) {
      showCard(event.target);
    });
  }
}

/**
 * @description Restart game when "Play again" button is pressed
 */
function playAgainButton () {
  document.getElementById('overlay').style.display = 'none';
  startGame();
}

/**
 * @description What to do when card is clicked
 */
function showCard (card) {
  animate(card, 'flipInX');
  card.classList.add('show', 'open');
  openCards.addCard(card);
  if (openCards.cards.length === 2) {
    if (openCards.isMatch()) {
      // Animate matched cards after flip animation
      setTimeout(function () {
        for (let card of openCards.cards) {
          animate(card, 'bounceIn')
        }
        setMatchedCards();
        openCards.clear();
        incrementMoveCount();
        // Show win screen if all matches are found
        if (matchedCards.length === 16) {
          stopTimer();
          setTimeout(endGame, 500);
        }
      }, 500)
    } else {
      // No match; flip cards back over after 1 second
      setTimeout(function () {
        for (let card of openCards.cards) {
          animate(card, 'flipInX');
        }
        openCards.closeAll();
        openCards.clear();
        incrementMoveCount();
      }, 1000);
    }
  }
}

/**
 * @description Display endgame win screen
 */
function endGame () {
  animate(document.getElementById('overlay'), 'fadeIn');
  document.querySelector('#overlay .rating').innerHTML = allStars.innerHTML;
  document.querySelector('#overlay .time').innerHTML = seconds.innerHTML;
  document.getElementById('overlay').style.display = 'block';
}

/**
 * @description Start game timer when the game starts
 */
function startTimer () {
  timer = setInterval (
    function () {
      let nextSecond = Number(seconds.innerHTML) + 1;
      seconds.innerHTML = nextSecond;
    }, 1000
  );
}

/**
 * @description Stop the game timer
 */
function stopTimer () {
  clearInterval(timer);
}

/**
 * @description Increases move counter and changes star rating
 */
function incrementMoveCount () {
  let moves = document.getElementsByClassName('moves')[0].innerHTML;
  moves = Number(moves) + 1;
  document.getElementsByClassName('moves')[0].innerHTML = moves;
  if (moves === 15) {
    stars[2].querySelector('i').classList = "fa fa-star-o";
  } else if (moves === 19) {
    stars[1].querySelector('i').classList = "fa fa-star-o";
  }
}

/**
 * @description Sets classes for matched cards
 */
function setMatchedCards () {
  for (let card of openCards.cards) {
    card.classList.remove('show', 'open');
    card.classList.add('match');
    matchedCards.push(card);
  }
}

/**
 * @description Animates an element on the page
 * @param elementToAnimate
 * @param {string} animation - name of animation class from animate.class
 */
function animate (elementToAnimate, animation) {
  elementToAnimate.classList.add('animated', animation)
  setTimeout (function () {
    elementToAnimate.classList.remove('animated', animation)
  }, 500)
}

// Initialize game
startGame();
const restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', startGame);
