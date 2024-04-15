let currentBreed = "";
let correctGuesses = 0;

function fetchDogImage() {
    fetch("https://dog.ceo/api/breeds/image/random")
        .then(response => response.json())
        .then(data => {
            const dogImage = document.createElement("img");
            dogImage.src = data.message;
            dogImage.alt = "Random Dog Image";
            dogImage.style.width = "200px";
            dogImage.style.height = "200px";
            const quoteText = document.getElementById("js-quote-text");
            while (quoteText.firstChild) {
                quoteText.removeChild(quoteText.lastChild);
            }
            quoteText.appendChild(dogImage);
            currentBreed = data.message.split("/")[4];
        })
        .catch(error => console.error("Error fetching dog image:", error));
}

function displayCurrentBreed() {
    const answerText = document.getElementById("js-answer-text");
    answerText.textContent = currentBreed.replace(/-/g, " ");
}

function handleCorrectGuess() {
    correctGuesses++;
    updateCorrectGuesses();
}

function updateCorrectGuesses() {
    const correctGuessesElement = document.getElementById("js-correct-guesses");
    correctGuessesElement.textContent = "Number of correct guesses: " + correctGuesses;
}

const newQuoteButton = document.getElementById("js-new-quote");

newQuoteButton.addEventListener("click", function () {
    fetchDogImage();
    const answerText = document.getElementById("js-answer-text");
    answerText.textContent = "";
});

const tweetButton = document.getElementById("js-tweet");
tweetButton.addEventListener("click", displayCurrentBreed);

const yesButton = document.getElementById("js-yes");
yesButton.addEventListener("click", handleCorrectGuess);

fetchDogImage();

updateCorrectGuesses();