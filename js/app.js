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


function generateCard(card){
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
  const deckOfCards = document.querySelector('.deck');
  const htmlOfCard = shuffle(cards).map(function(card){
    return generateCard(card);
  });
  deckOfCards.innerHTML = htmlOfCard.join('');
}

//Initialize and begin game
startGame();
const cardList = document.querySelectorAll('.card');
//initialize empty array for open cards
let openCardsArray = [];
//initialize start move counter
let moves = 0;
const moveCounter = document.querySelector('.moves');
moveCounter.innerText = moves;
//count stars
const stars = document.querySelectorAll('.fa-star');
//initialize counter for matched cards
let matchCounter = 0;
//get win and loose screen.
const screen = document.getElementById('screen');
const win = document.getElementById('win');
const lose = document.getElementById('lose');

//restart game when user clicks on restart function
$(document).ready(function(){
  $('.restart').click(function(){
      location.reload();
  });
});

// Jamie Lee for event listener and reset code.
cardList.forEach(function(card){
    //Using addeventListener when clicking on any card.
    card.addEventListener('click', function(e){
      //Checking if the card has 'open' & 'show' class
      if ((!card.classList.contains('open') || !card.classList.contains('show')) && !card.classList.contains('match')){
        openCardsArray.push(card);
        //when user clicks on cards show the cards to the user if match happens else shake the open cards and revert back
        card.classList.add('open', 'show', 'turnCard');
        card.classList.remove('shake')
        //Show stars related to how well user played the game
        if (moves === 16) {
          stars[0].remove(); // will show 3 stars
        } else if (moves === 24) {
          stars[1].remove(); // will show 2 stars
        } else if (moves === 32) {
          stars[2].remove();
          screen.style.display = "inline-block";
          lose.style.display = "inline-block";
        }

        if (openCardsArray.length == 2){
          //Validate that cards match one another
          if (openCardsArray[0].dataset.card == openCardsArray[1].dataset.card){
              openCardsArray[0].classList.add('match', 'open', 'show', 'turnCard');
              openCardsArray[1].classList.add('match', 'open', 'show', 'turnCard');
              matchCounter++;
              openCardsArray = [];
              if (matchCounter === 8) {
                screen.style.display = "inline-block";
                win.style.display = "inline-block";
              }
          } else {
              //If cards don't match - reset cards and turn them back to original state
              setTimeout(function(){
                openCardsArray.forEach(function(card){
                  card.classList.remove('open', 'show', 'turnCard');
                  card.classList.add('shake');
                });
                //reset openCards array back once user clicks on 2 cards during a game
                openCardsArray = [];
              }, 1000);
            }
            moves += 1;
            moveCounter.innerText = moves;
        }
      }
    });
});