/*
 * Create a list that holds all of your cards
 */
let cards = ['fa-space-shuttle', 'fa-space-shuttle',
             'fa-soundcloud', 'fa-soundcloud',
             'fa-stumbleupon-circle', 'fa-stumbleupon-circle',
             'fa-dropbox', 'fa-dropbox',
             'fa-stack-overflow', 'fa-stack-overflow',
             'fa-birthday-cake', 'fa-birthday-cake',
             'fa-automobile', 'fa-automobile',
             'fa-skyatlas', 'fa-skyatlas'
            ];

function displayCard(card){
  return `<li class="card animated" data-card="${card}"> <i class="fa ${card}"> </i> </li>`;
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

function startGame(){
  const deckOfCards  = document.querySelector('.deck');
  const htmlOfCard = shuffle(cards).map(function(card){
    return displayCard(card);
  });
  deckOfCards.innerHTML = htmlOfCard.join('');
}

//Initialize game
startGame();
const cardList  = document.querySelectorAll('.card');
//Empty array for open cards
let arrayOfOpenCards = [];
//Move counter
let moves = 0;
const moveCounter = document.querySelector('.moves');
moveCounter.innerText = moves;
//Stars
const stars = document.querySelectorAll('.fa-star');
stars.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
//Counter for matched cards
let matchCounter = 0;
//Win & Lose Screen
const screen = document.getElementById('screen');
const win = document.getElementById('win');
const lose = document.getElementById('lose');
// Timer
let time = 0;
let startTimer = setInterval(timer, 1000);

$(document).ready(function(){
  //TODO: Reset page.
  $('.restart').click(function(){
      location.reload();
  });
});

//Timer Function
function timer() {
  time++;
  document.querySelector("#timer").innerHTML = time;
}

function addMessage() {
  clearInterval(startTimer);
  const message = document.getElementById('message');
  message.innerText = `You finished the game in ${time} seconds. You have ${howManyStars} stars.`;
}

cardList.forEach(function(card){
    //With eventlistener 'click' function added to all cards
    card.addEventListener('click', function(e){
      //Checking if the card has 'open' & 'show' class
      if ((!card.classList.contains('open') || !card.classList.contains('show')) && !card.classList.contains('match')){
        arrayOfOpenCards.push(card);
        
        //Adds 'open' & 'show' classes to cards after click
        card.classList.add('open', 'show', 'flipInY');
        card.classList.remove('shake')
        //Start timer
        if (moves === 0) {
          timer();
          howManyStars = 3;
          stars.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
        } else if (moves >= 16 && moves <=23) {
          stars[0].remove();
          howManyStars = 2;
          stars.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
        } else if (moves >= 24 && moves <=31) {
          stars[1].remove();
          howManyStars = 1;
          stars.innerHTML = `<li><i class="fa fa-star"></i></li>`;             
		} else if (moves >= 32) {
          stars[2].remove();
          howManyStars = 0;
          stars.innerHTML = ``;            
          addMessage();
          screen.style.display = "block";
          lose.style.display = "block";
        }

        if (arrayOfOpenCards.length == 2){
          //Check if cards match
          if (arrayOfOpenCards[0].dataset.card == arrayOfOpenCards[1].dataset.card){
              arrayOfOpenCards[0].classList.add('match', 'open', 'show', 'flipInY');
              arrayOfOpenCards[1].classList.add('match', 'open', 'show', 'flipInY');
              matchCounter++;
              arrayOfOpenCards = [];
              if (matchCounter === 8) {
                addMessage();
                screen.style.display = "block";
                win.style.display = "block";
              }
          } else {
              //'open' & 'show' classes will be deleted from cards after 1 second
              //If cards don't match - go away
              setTimeout(function(){
                arrayOfOpenCards.forEach(function(card){
                  card.classList.remove('open', 'show', 'flipInY');
                  card.classList.add('shake');
                });
                //openCards array empitied out after two cards opened
                arrayOfOpenCards = [];
              }, 800);
            }
            moves += 1;
            moveCounter.innerText = moves;
        }
      }
    });
});