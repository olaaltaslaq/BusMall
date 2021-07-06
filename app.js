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
let productsNames = [];
let votes = [];
let views = [];
function BusImage(imgName){
  this.iName = imgName.split('.')[0];
  this.img = 'images/' + imgName;
  this.votes = 0;
  this.views = 0;

  productsNames.push(this.iName);
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
let viewImage = [];
function renderRandomImg(){
  do {
    leftIndex = randomIndex(0, busimgs.length -1);
    midIndex = randomIndex(0, busimgs.length -1);
    rightIndex = randomIndex(0, busimgs.length -1);

  } while (leftIndex === midIndex || leftIndex === rightIndex || midIndex === rightIndex || viewImage.includes(leftIndex) || viewImage.includes(midIndex) || viewImage.includes(rightIndex));

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

  viewImage = [];
  viewImage.push(leftIndex, midIndex, rightIndex);

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
    // console.log(mall);

  } else {

    let ulEl=document.getElementById('list');
    for (let i=0; i<mall.length; i++){
      let liEl = document.createElement('li');
      liEl.textContent = `${mall[i].iName} has ${mall[i].votes} votes and ${mall[i].views} views.`;
      ulEl.appendChild(liEl);
      votes.push(mall[i].votes);
      views.push(mall[i].views);
    }

    leftImgEl.removeEventListener('click', handelClicks);
    midImgEl.removeEventListener('click', handelClicks);
    rightImgEl.removeEventListener('click', handelClicks);
    chartRender();
  }
  saveToLocalStorage();
}


let buttonEl=document.getElementById('results');
buttonEl.addEventListener('click', chartRender);

function chartRender(){
  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productsNames,
      datasets: [{
        label: '# of Votes',
        data: votes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 5)',
        ],
        borderWidth: 2
      },
      {
        label: '# of Views',
        data: views,
        backgroundColor: [
          'rgba(15, 09, 132, 0.5)',
        ],
        borderColor: [
          'rgba(25, 99, 162, 5)',
        ],
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}



function saveToLocalStorage() {
  let data = JSON.stringify(mall);
  localStorage.setItem('bus', data);
}

function readFromLocalStorage() {
  let stringObj = localStorage.getItem('bus');
  // console.log(stringObj);
  let normalObj = JSON.parse(stringObj);
  // console.log(normalObj);
  if(normalObj !== null) {
    mall = normalObj;
    handelClicks();
  }
  // console.log(mall);
}
readFromLocalStorage();

