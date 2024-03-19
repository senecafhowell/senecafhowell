const heading = document.querySelector("h1");

const button = document.querySelector("button");
button.addEventListener('click', changeText);

const rotateIt = document.getElementById("rotateIt");
rotateIt.addEventListener('click', rotatePicture);

let rotationAngle = 0;

function rotatePicture() {
    rotationAngle += 90;
    rotateIt.style.transform = `rotate(${rotationAngle}deg)`;
}


function changeText() {
    const textNew = prompt("Please enter new text :D");
    heading.textContent = `${textNew}`;
}