var container = document.getElementById("board");
var imgElement = container.getElementsByTagName("img");

var counter = 0; // count # of images clicked 
var img1, img2, img1Index;
var revealed = 0; // # of pairs that are revaled
var score = 0;

var images = ['https://i.imgur.com/6ZoNgUp.jpg', 'https://i.imgur.com/QfQFas5.jpg', 'https://i.imgur.com/USQUHps.png', 'https://i.imgur.com/Q0EsiLw.png', 'https://i.imgur.com/v1rHxDC.png', 'https://i.imgur.com/eQI1eZP.png', 'https://i.imgur.com/d0Uu0k3.png', 'https://i.imgur.com/QuyRwhG.png'];


// randomize position of images
function shuffle () {
  var imgOrder = [];
  var used = [];
  var randomImg = images[Math.floor(Math.random() * 8)];
  for (var i = 0; i < 16; i++) {
    if (i > 0) {
      randomImg = images[Math.floor(Math.random() * 8)];
      while(used.includes(randomImg)) {
        randomImg = images[Math.floor(Math.random() * 8)];
      }
    }
    if (imgOrder.includes(randomImg)) {
      used.push(randomImg);
    }
    imgOrder.push(randomImg);
  }
  return imgOrder;
}

// shuffle on load 
var secondImg = shuffle();

// show and match images 
function reveal (index) {
  if (clickedImg.src == one) {
    updtScore();
    clickedImg.src = two;
    counter++;
    // assign variables to each image 
    if (counter == 1) {
      img1 = clickedImg.src;
      img1Index = index;
    } else {
      img2 = clickedImg.src;
    }
    // if match, stay revealed
    if (counter == 2) {
      setTimeout( () => {
        if (!checkMatch(img1, img2)) {
          clickedImg.src = one;
          imgElement[img1Index].src = one;
        } else if (checkMatch(img1, img2)) {
          revealed++;
        }
        if (revealed == 8) {
          gameOver();
        }
        counter = 0; // restart 
      }, 1000);
    } // end if counter is 2
  } // end if clickedImg.src == one
}

for (let i = 0; i < 16; i++) {
  var clickedImg;
  var one = "https://bit.ly/2lKrb6N", two;
  imgElement[i].onclick = function() {
    if (counter == 0 || counter == 1) {
      clickedImg = imgElement[i];
      two = secondImg[i];
      reveal(i);
    }
  }
}


// check if matching
function checkMatch (img1, img2) {
  var match = (img1 == img2)? true : false;
  return match;
}

// score
var scoreDisplay = document.getElementsByClassName('score')[0].getElementsByTagName('span')[0];

function updtScore () {
  var prevScore = Number(scoreDisplay.innerHTML);
  prevScore++;
  scoreDisplay.innerHTML = prevScore;
  score = prevScore;
  star();
} 

// reset 
var resetBtn = document.getElementsByClassName('reset')[0];
function reset () {
  for (var i = 0; i < imgElement.length; i++) {
    imgElement[i].src = "https://bit.ly/2lKrb6N";
  }
  score = 0;
  scoreDisplay.innerHTML = 0;
  revealed = 0;
  secondImg = shuffle();
}
resetBtn.addEventListener("click", reset);


// restrict hover animation
for (let i = 0; i < imgElement.length; i++) {
  imgElement[i].onmouseover = function () {
    if (imgElement[i].src == "https://bit.ly/2lKrb6N") {
      this.style.transform = "scale(1.3)";
      this.style.cursor = "pointer";
    } else {
      this.style.cursor = "auto";
    }
  }
  imgElement[i].onmouseout = function () {
    this.style.transform = "scale(1)";
  }
}


// star animation
var scoreElement = document.getElementsByClassName('score')[0];
var starIcon = scoreElement.getElementsByTagName('i')[0];
function star () {
  starIcon.style.transform = "scale(1.5)";
  setTimeout(function () {
    starIcon.style.transform = "scale(1)";
  }, 200);
}


// comments
var possComments = {
  'low': ['You are a GOD', 'QUEEN/KING OF MATCHING GAMES!!', 'Legends only!'],
  'mid': ['You\'ll do better next time!', 'Practice makes perfect!', 'Not bad; try again!'],
  'high': ['Not the best memory, eh?', 'This game really isn\'t your forte...', 'Maybe you\'ll do better next time...']
}

var comment;
function getComment () {
  var scoreRange = () => {
    switch (true) {
      case (score < 25):
        return 'low';
        break;
      case (score < 35):
        return 'mid';
        break;
      case (score > 45):
        return 'high';
    }
  }
  comment = possComments[scoreRange()][Math.floor(Math.random() * 3)];
  return comment;
}

// game over pop up
var gameOverPopup = document.getElementsByClassName('gameover')[0];
var finalScore = gameOverPopup.getElementsByTagName('span')[0];
var commentDisplay = gameOverPopup.getElementsByTagName('i')[0];
var overlay = document.getElementsByClassName('overlay')[0];
function gameOver () {
  // show popup
  gameOverPopup.style.animation = "fadeIn 1s";
  overlay.style.animation = "fadeIn 1s";
  gameOverPopup.style.visibility = "visible";
  overlay.style.visibility = "visible";
  gameOverPopup.style.opacity = "1";
  overlay.style.opacity = "1";
  // popup content
  finalScore.innerHTML = score;
  commentDisplay.innerHTML = getComment();

}
var closePopup = gameOverPopup.getElementsByClassName('close')[0];

var playAgain = document.getElementsByClassName('close')[0];
playAgain.onclick = function () {
  reset();
  // close popup
  gameOverPopup.style.animation = "fadeOut 1s";
  overlay.style.animation = "fadeOut 1s";
  gameOverPopup.style.visibility = "hidden";
  overlay.style.visibility = "hidden";
  gameOverPopup.style.opacity = "0";
  overlay.style.opacity = "0";
}






