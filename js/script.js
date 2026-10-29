const guessList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputBox = document.querySelector("input"); // or #letter?
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuess = document.querySelector(".remaining");
const spanRemainGuess = document.querySelector(".container span"); // or just span?
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const request = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    data = await request.text();
    // console.log(data);
    const wordArray = data.split("\n");
    // console.log(wordArray);

    // get random word
    word = selectRandomWord(wordArray); 
    console.log(word);
    updateWordInProgress(word);
};

const selectRandomWord = function (wordArray) {
    const randIndex = Math.floor(Math.random() * wordArray.length);
    const randWord = wordArray[randIndex].trim();
    console.log(randWord, randWord.length);
    return randWord;
};

getWord();

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
        countRemainingGuesses(letter);
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

const countRemainingGuesses = function (guess) {
    const wordUpper = word.toUpperCase();
    if (wordUpper.includes(guess)) {
        message.innerText = `Good guess! The word has the letter ${guess}`;
    } else {
        remainingGuesses -= 1;
        message.innerText = `Sorry ${guess} is not in the word. Try again!`;
    };
    if (remainingGuesses === 0) {
        message.innerText = `Sorry, Game Over. No more guesses remain. The word is ${wordUpper}`;
        spanRemainGuess.innerText = "no more guesses";
        inputBox.disabled = true;
        guessButton.disabled = true;
    } else if (remainingGuesses === 1) {
        spanRemainGuess.innerText = `${remainingGuesses} guess`;
    } else if (remainingGuesses > 1) {
        spanRemainGuess.innerText = `${remainingGuesses} guesses`;
    };
};

const wonGame = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed the correct word! Congrats!</p>'; 
        inputBox.disabled = true;
        guessButton.disabled = true;
    };
};
