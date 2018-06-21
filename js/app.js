let matchedCards = [];
let allStars = document.querySelector('.stars');
let stars = document.querySelectorAll('.stars li');
let seconds = document.querySelector('.timer');
let timer; // Used to start/stop timer with setInterval/clearInterval
let symbols = ['ambulance', 'anchor', 'automobile', 'archive', 'balance-scale',
               'bank', 'bath', 'beer', 'bell-o', 'bicycle', 'binoculars',
               'bolt', 'bomb', 'briefcase', 'camera', 'coffee', 'comment-o',
               'cube', 'cut', 'diamond', 'dribble', 'empire', 'envelope',
               'eyedropper', 'gift', 'glass', 'globe', 'home', 'leaf', 'lock',
               'music', 'paper-plane-o', 'plane', 'rebel', 'shopping-cart',
               'shower', 'tree', 'truck', 'tv', 'wrench'];

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
  let deck = document.querySelector('.deck');
  symbols = shuffle(symbols);

  let chosenSymbols = symbols.slice(0,8);
  chosenSymbols.push(...chosenSymbols);
  console.log(`Chosen symbols: ${chosenSymbols}`);
  chosenSymbols = shuffle(chosenSymbols);
  let newDeck = "";
  for(let symbol of chosenSymbols){
    newDeck += `<li class="card"><i class='fa fa-${symbol}'></i></li>`;
  }
  deck.innerHTML = newDeck;
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
          animate(card, 'bounceIn');
        }
        setMatchedCards();
        openCards.clear();
        incrementMoveCount();
        // Show win screen if all matches are found
        if (matchedCards.length === 16) {
          stopTimer();
          setTimeout(endGame, 500);
        }
      }, 500);
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
  endGameFlip();
  setTimeout (function () {
    document.querySelector('#overlay .rating').innerHTML = allStars.innerHTML;
    document.querySelector('#overlay .time').innerHTML = seconds.innerHTML;
    document.getElementById('overlay').style.display = 'block';
  }, 1000);
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
  elementToAnimate.classList.add('animated', animation);
  setTimeout (function () {
    elementToAnimate.classList.remove('animated', animation);
  }, 500);
}

function endGameFlip () {
  let cards = document.querySelector('.deck').childNodes;
  setTimeout(function () {
    animate(cards[0], 'bounceIn');
  }, 100);
  setTimeout(function () {
    animate(cards[1], 'bounceIn');
    animate(cards[4], 'bounceIn');
  }, 200);
  setTimeout(function () {
    animate(cards[2], 'bounceIn');
    animate(cards[5], 'bounceIn');
    animate(cards[8], 'bounceIn');
  }, 300);
  setTimeout(function () {
    animate(cards[3], 'bounceIn');
    animate(cards[6], 'bounceIn');
    animate(cards[9], 'bounceIn');
    animate(cards[12], 'bounceIn');
  }, 400);
  setTimeout(function () {
    animate(cards[7], 'bounceIn');
    animate(cards[10], 'bounceIn');
    animate(cards[13], 'bounceIn');
  }, 500);
  setTimeout(function () {
    animate(cards[11], 'bounceIn');
    animate(cards[14], 'bounceIn');
  }, 600);
  setTimeout(function () {
    animate(cards[15], 'bounceIn');
  }, 700);
}

// Initialize game
startGame();
const restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', startGame);
