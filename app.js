'use strict';

let attemptsEl = document.getElementById('attempts');
let containerEl = document.getElementById('container');
let leftImgEl = document.getElementById('leftImg');
let midImgEl = document.getElementById('midImg');
let rightImgEl = document.getElementById('rightImg');
let ulEl = document.getElementById('results');

let mall = [];
function BusImage(imgName){
  this.imgName = imgName.split('.')[0];
  this.img = 'images/' + imgName;
  this.votes = 0;

  mall.push(this);
}

let busimgs = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','water-can.jpg','wine-glass.jpg'];
for (let i = 0; i < busimgs.length; i++){
  new BusImage(busimgs[i]);
}

function randomIndex(){
  return Math.floor(Math.random() * busimgs.length);
}

function renderRandomImg(){

  let leftIndex = randomIndex();
  let midIndex = randomIndex();
  let rightIndex = randomIndex();

  leftImgEl.setAttribute('sec', mall[leftIndex].img);
  midImgEl.setAttribute('sec', mall[midIndex].img);
  rightImgEl.setAttribute('sec', mall[rightIndex].img);

}

renderRandomImg();




