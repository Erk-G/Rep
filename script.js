const gameContainer = document.getElementById("game");
let hasFlipped = false;
let previousCard ={};
let numCardsFlipped=0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
async function delayClick(e){
  setTimeout(await function(){
    if(hasFlipped){
      if(!(previousCard.className===e.target.className)){
        previousCard.style="background-color: white";
        e.target.style="background-color: white";
      }
      else{
        previousCard.setAttribute("data-matched","true");
        e.target.setAttribute("data-matched","true");
      }
      hasFlipped=false;
      previousCard={};
      numCardsFlipped=0;
    }
    else{
      previousCard=e.target;
      hasFlipped=true;
    }
  },1000);
}

// TODO: Implement this function!
function handleCardClick(e) {
  // you can use event.target to see which element was clicked
  if(!(e.target.getAttribute("data-matched")==="true")){
    if(numCardsFlipped<2){
      numCardsFlipped+=1;
      e.target.style="background-color:"+e.target.className;
      delayClick(e);
      //console.log(numCardsFlipped);
    }
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
