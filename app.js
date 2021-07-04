'use strict';

let attemptsEl = document.getElementById('attempts');
let containerEl = document.getElementById('container');
let leftImgEl = document.getElementById('leftImg');
let midImgEl = document.getElementById('midImg');
let rightImgEl = document.getElementById('rightImg');
let ulEl = document.getElementById('results');

let mall = [];
let attempts = 0;
let maxAttempts = 25;
function BusImage(imgName){
  this.iName = imgName.split('.')[0];
  this.img = 'images/' + imgName;
  this.votes = 0;
  this.views = 0;

  mall.push(this);
}

let busimgs = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','water-can.jpg','wine-glass.jpg'];
for (let i = 0; i < busimgs.length; i++){
  new BusImage(busimgs[i]);
}

function randomIndex(){
  return Math.floor(Math.random() * busimgs.length);
}

let leftIndex;
let midIndex;
let rightIndex;
function renderRandomImg(){

  leftIndex = randomIndex();
  midIndex = randomIndex();
  rightIndex = randomIndex();

  while (leftIndex === midIndex || leftIndex === rightIndex || midIndex === rightIndex){
    leftIndex = randomIndex();
    midIndex = randomIndex();
  }

  leftImgEl.setAttribute('src', mall[leftIndex].img);
  midImgEl.setAttribute('src', mall[midIndex].img);
  rightImgEl.setAttribute('src', mall[rightIndex].img);

  leftImgEl.setAttribute('alt', mall[leftIndex].iName);
  midImgEl.setAttribute('alt', mall[midIndex].iName);
  rightImgEl.setAttribute('alt', mall[rightIndex].iName);

  leftImgEl.setAttribute('title', mall[leftIndex].iName);
  midImgEl.setAttribute('title', mall[midIndex].iName);
  rightImgEl.setAttribute('title', mall[rightIndex].iName);

  mall[leftIndex].views++;
  mall[midIndex].views++;
  mall[rightIndex].views++;

}
// console.log(mall);
renderRandomImg();


leftImgEl.addEventListener('click', handelClicks);
midImgEl.addEventListener('click', handelClicks);
rightImgEl.addEventListener('click', handelClicks);

function handelClicks(event){
  attempts++;
  if (attempts <= maxAttempts){
    let clickedImg = event.target.id;

    if(clickedImg === 'leftImg'){
      mall[leftIndex].votes++;
    } else if (clickedImg === 'midImg'){
      mall[midIndex].votes++;
    } else if (clickedImg === 'rightImg'){
      mall[rightIndex].votes++;
    }
    renderRandomImg();

    //   console.log(clickedImg);
    console.log(mall);
  } else {

    let ulEl = document.getElementById('results');
    for (let i=0; i<mall.length; i++){
      let liEl = document.createElement('li');
      liEl.textContent = `${mall[i].iName} has ${mall[i].votes} votes and ${mall[i].views} views.`;
      ulEl.appendChild(liEl);
    }

    leftImgEl.removeEventListener('click', handelClicks);
    midImgEl.removeEventListener('click', handelClicks);
    rightImgEl.removeEventListener('click', handelClicks);
  }
}






