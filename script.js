// Code goes here

// BlackJack

//Card variables
suits = ['Hearts','Clubs','Diamonds','Spades'];

values = ['Ace','King','Queen','Jack',
'Ten','Nine','Eight','Seven','Six','Five',
'Four','Three','Two'];

// DOM variables
let textArea = document.getElementById('text-area');
let newGame = document.getElementById('new');
let hitButton = document.getElementById('hit');
let stayButton = document.getElementById('stay');

//Game variables 

let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];

hitButton.style.display = 'none';
stayButton.style.display = 'none';

newGame.addEventListener('click',function() {
  gameStarted = true;
  gameOver = false;
  playerWon = false;
  
  deck = createDeck();
  shuffleDeck(deck);
  dealerCards = [getNextCard(),getNextCard()];
  playerCards = [getNextCard(),getNextCard()];

  newGame.style.display = 'none';
  hitButton.style.display = 'inline';
  stayButton.style.display = 'inline';
  showStatus();
});

hitButton.addEventListener('click',function(){
  playerCards.push(getNextCard());
  checkForEndGame();
  showStatus();
});

stayButton.addEventListener('click',function(){
  gameOver = true;
  checkForEndGame();
  showStatus();
});


function checkForEndGame(){
  updateScores();
  //let dealer take Cards
  
  while(dealerScore<playerScore 
        && dealerScore<=21 
        && playerScore <= 21) {
          dealerCards.push(getNextCard());
          updateScores();
        }
  
  if (playerScore > 21) {
    playerWon = false;
    gameOver = true;
  }
  else if (dealerScore > 21) {
    playerWon = true;
    gameOver = true;
  }
  else if (gameOver) {
    if (playerScore > dealerScore) {
      playerWon = true;
    }
    else {
      playerWon = false;
    }
    
  }
}

function getCardNumericValue(card) {
  switch(card.value){
    case 'Ace':
      return 1;
    case 'Two':
      return 2;
    case 'Three':
      return 3;
    case 'Four':
      return 4;
    case 'Five':
      return 5;
    case 'Six':
      return 6;
    case 'Seven':
      return 7;
    case 'Eight':
      return 8;
    case 'Nine':
      return 9
    default:
      return 10;
  }
}
 
function createDeck() {
  deck = [];
  for(let suitIdx = 0;suitIdx<suits.length;suitIdx++){
    for(let valueIdx = 0;valueIdx<values.length;valueIdx++){
      let card = {
        suit:suits[suitIdx],
        value:values[valueIdx]
      };
    deck.push(card);
  }
  
}
  return deck
}

function shuffleDeck(deck) {
  for (let i = 0 ; i < deck.length; i++) {
    let swapIdx = Math.trunc(Math.random() * deck.length);
    temp = deck[swapIdx];
    deck[swapIdx] = deck[i];
    deck[i] = temp;
  }
}


function getCardString(card){
  return card.value+ ' of ' + card.suit;
}
function getNextCard(){
  return deck.shift();
}

function updateScores() {
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}

function getScore(cards) {
  let score = 0;
  let hasAce = false;
  
  for (let i = 0; i< cards.length ; i++) {
    let card = cards[i];
    score += getCardNumericValue(card);
    if (card.value == 'Ace') {
      hasAce = 'True';
    }
  }
  if (hasAce && score+10 <=21) {
    return score+10;
  }
  return score;
}

function showStatus() {
  if (!gameStarted) {
    textArea.innerText = 'Welcome to BlackJack';
    return;
  }
  let dealerCardString = '';
  
  for (let i = 0; i<dealerCards.length; i++) {
    dealerCardString += getCardString(dealerCards[i]) + '\n';
  }
  
  let playerCardString = '' ;
  
  for (i = 0; i< playerCards.length; i++ ){
    playerCardString += getCardString(playerCards[i]) + '\n';
  }
  
  updateScores();
  
  textArea.innerText = 
    'Dealer has :\n' + dealerCardString+ 
    '(score: ' + dealerScore + ' )\n\n'+ 
    
    'Player has :\n' + playerCardString+ 
    '(score: ' + playerScore + ' )\n\n';
    
  if (playerScore === 21) {
    playerWon = true;
    gameOver = true;
  }
  else if (dealerScore ===21){
    playerWon = false;
    gameOver = true;
  }
    
  if (gameOver) {
    if (playerWon) {
      if (playerScore ==21) {
        textArea.innerText += 'BLACK JACK!! YOU WINNN';
      }
      else {
      textArea.innerText += 'YOU WIN!!!';
      }
    }
    else {
      textArea.innerText += 'DEALER WINS';
    }
    newGame.style.display = 'inline';
    hitButton.style.display = 'none';
    stayButton.style.display = 'none';
  }

}



