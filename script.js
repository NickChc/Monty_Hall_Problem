const body = document.body;
const mainDiv = document.querySelector("#mainWrapper");
const text = document.querySelector("#text");

const door1 = document.querySelector("#door_1");
const door2 = document.querySelector("#door_2");
const door3 = document.querySelector("#door_3");

const resetBtn = document.querySelector("#resetBtn");
const totalText = document.querySelector("#total");
const correctText = document.querySelector("#correct");
const percentage = document.querySelector("#percentage");
const buttonHolder = document.querySelector(".button-holder");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
}

function againButton() {
  const againBtn = document.createElement("button");
  againBtn.textContent = "Try Again";
  againBtn.classList.add("button");
  againBtn.style.border = "solid 1px blue";
  againBtn.addEventListener("click", () => location.reload());

  resetBtn.remove();
  buttonHolder.append(againBtn, resetBtn);
}

resetBtn.addEventListener("click", () => {
  const assure = confirm(
    "Your previous records will be deleted, confirm to proceed"
  );
  if (assure) {
    if (localStorage.getItem("total") && localStorage.getItem("correct")) {
      localStorage.setItem("total", 0);
      localStorage.setItem("correct", 0);
    }
    location.reload();
  }
});

const doors = [door1, door2, door3];

const randomInt = getRandomInt(1, 3);

let totalCount = 0;
let correctCount = 0;

let removedDoor;
let winner;
let chosenDoor;
let leftoverDoor;

if (localStorage.getItem("total")) {
  totalCount = localStorage.getItem("total");
}
if (localStorage.getItem("correct")) {
  correctCount = localStorage.getItem("correct");
}

totalText.textContent += ` ${totalCount}`;
correctText.textContent += ` ${correctCount}`;

if (correctCount != 0 && totalCount != 0) {
  percentage.textContent += ` ${((correctCount / totalCount) * 100).toFixed(
    1
  )}%`;
} else {
  percentage.textContent += ` 0%`;
}

let i = 0;
let j = 0;

doors.forEach((door) => {
  if (door.textContent == randomInt) {
    winner = door;
  }

  door.addEventListener("click", () => {
    while (i < 1) {
      chosenDoor = door;
      chosenDoor.classList.add("door-chosen");

      i++;
      const twoDoors = doors.filter((door) => door !== winner);
      if (twoDoors.includes(chosenDoor)) {
        removedDoor = twoDoors.find((door) => door !== chosenDoor);
      } else {
        removedDoor = twoDoors.splice(getRandomInt(0, 1), 1)[0];
      }
      removedDoor.style.backgroundColor = "black";
      removedDoor.style.pointerEvents = "none";
      text.textContent = `The door number ${removedDoor.textContent} was empty. You can either stick to your initial choice of door ${chosenDoor.textContent}, or choose the other door!`;
    }
    leftoverDoor = doors.find(
      (door) => door !== chosenDoor && door !== removedDoor
    );
    const remains = [chosenDoor, leftoverDoor];

    remains.forEach((door) => {
      door.addEventListener("click", () => {
        while (j < 1) {
          j++;
          if (door === winner) {
            totalCount++;
            correctCount++;
            localStorage.setItem("total", totalCount);
            localStorage.setItem("correct", correctCount);
            totalText.textContent = `TOTAL TRIES: ${totalCount}`;
            correctText.textContent = `CORRECT GUESSES: ${correctCount}`;
            text.style.color = "green";
            text.textContent = `you have won this time, congratulations! :)`;
          } else if (door !== winner) {
            totalCount++;
            localStorage.setItem("total", totalCount);
            totalText.textContent = `TOTAL TRIES: ${totalCount}`;
            text.style.color = "red";
            text.textContent = `you have lost, better luck next time! :|`;
          }
          doors.forEach((door) => (door.style.pointerEvents = "none"));
          againButton();
        }
      });
    });
  });
});
