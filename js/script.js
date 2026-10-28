const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputBox = document.querySelector("input"); // or #letter?
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuess = document.querySelector(".remaining");
const spanRemainGuess = document.querySelector(".container span"); // or just span?
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
console.log(word);

const updateWordInProgress = function (word) {
    // creating the placeholder for wordInprogress with ●'s.
    let placeHolder = [];
    for (const item of word) {
        // console.log(item);
        placeHolder.push("●");
    };
    placeHolder = placeHolder.join("");
    console.log(placeHolder);
    wordInProgress.append(placeHolder);
};

updateWordInProgress(word);

guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    const guess = inputBox.value;
    console.log(guess);
    inputBox.value = ""; 
});
