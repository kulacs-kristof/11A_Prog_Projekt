const cards = document.querySelectorAll(".memory-card");
const score = document.getElementById("point");
const finalScore = document.getElementById("finalPoints");
const won = document.getElementById("won");
const play = document.getElementById("playAgain");
const button = document.getElementsByClassName("btn-handle");
const ship = document.getElementById("ship");
const body = document.getElementsByTagName("body")[0];

var pontok = 0;
var finalPoint = 0;
var nyer = 0;

let MárFelfordítottKártya = false;
let board = false;
let kartya1, kartya2;

function felfordít() {
  if (board) return;
  if (this === kartya1) return;

  this.classList.add("flip");

  if (!MárFelfordítottKártya) {
    MárFelfordítottKártya = true;
    kartya1 = this;

    return;
  }

  kartya2 = this;
  KártyaVizsgálás();
}

function KártyaVizsgálás() {
  let azonos = kartya1.dataset.cards === kartya2.dataset.cards;

  azonos ? EggyezőKártya() : HelytelenKártya();
}

function EggyezőKártya() {
  kartya1.removeEventListener("click", felfordít);
  kartya2.removeEventListener("click", felfordít);

  pontok += 4;
  finalPoint = pontok;
  nyer += 2;
  finalScore.innerHTML = finalPoint;
  score.innerHTML = pontok;

  if (nyer === 12) {
    won.style.visibility = "visible";
  }

  UjraKezd();
}

function HelytelenKártya() {
  board = true;

  setTimeout(() => {
    kartya1.classList.remove("flip");
    kartya2.classList.remove("flip");

    UjraKezd();
  }, 1000);

  pontok -= 1;
  finalPoint = pontok;
  score.innerHTML = pontok;
}

function UjraKezd() {
  [MárFelfordítottKártya, board] = [false, false];
  [kartya1, kartya2] = [null, null];
}

function playAgain() {
  location.reload();
}

play.addEventListener("click", playAgain);

(function shuffle() {
  cards.forEach((card) => {
    let randomhely = Math.floor(Math.random() * 12);
    card.style.order = randomhely;
  });
})();

cards.forEach((card) => card.addEventListener("click", felfordít));

function mozgas() {
  ship.classList.add = "animate__slideOutRight";
}
button.addEventListener("click", shipMove);
