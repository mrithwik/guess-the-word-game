const guessList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputBox = document.querySelector("input"); // or #letter?
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuess = document.querySelector(".remaining");
const spanRemainGuess = document.querySelector(".container span"); // or just span?
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
console.log(word);
const guessedLetters = [];

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
    // console.log(guess);
    inputBox.value = ""; 
    message.innerText = "";
    const validatedGuess = validateInput (guess);
    if (validatedGuess) {
        makeGuess(validatedGuess)
    };
    // console.log(validatedGuess);
});

const validateInput = function (guess) {
    const acceptedLetter = /[a-zA-Z]/;
    if (guess.length === 0) {
        message.innerText = "You didn't enter anything";
    } else if (guess.length > 1) {
        message.innerText = "You entered more than one letter";
    } else if (!guess.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A-Z";
    } else {
        return guess;
    };
};

const makeGuess = function (letter) {
    letter = letter.toUpperCase();
    if (guessedLetters.includes(letter)){
        message.innerText = "You already guessed that letter silly! Try again.";
    } else {
        guessedLetters.push(letter);
        console.log(guessedLetters);
        updateGuess();
        updateCorrectWord(guessedLetters);
    };
};

const updateGuess = function () {
    guessList.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessList.append(li);

    };
};

const updateCorrectWord = function (guess) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    // console.log(wordArray);

    const reveal = [];
    for (const letter of wordArray) {
        if (guess.includes(letter)) {
            reveal.push(letter);
        } else {
            reveal.push("●");
        };
    };
    wordInProgress.innerText = reveal.join("");
    wonGame();
};

const wonGame = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed the correct word! Congrats!</p>'; 
    };
};