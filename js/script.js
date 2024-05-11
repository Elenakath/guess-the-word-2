// Unordered list where player's guessed letters will appear
const guessedLettersElement = document.querySelector(".guessed-letters");
// guess button
const guessLetterButton = document.querySelector(".guess");
// Empty box for letter guessed
const letterInput = document.querySelector(".letter");
// Empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
// Paragraph where the remaining guesses will display
const remainingGuessesElement = document.querySelector(".remaining");
// Span inside the paragraph where the remaining guesses will display
const remainingGuessesSpan = document.querySelector(".remaining span");
// Empty paragraph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");
// Hidden button that will appear prompting the player to play again
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

// Async function
const getWord = async function () {
    const res = await fetch(`https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt`);
    const words = await res.text();
    console.log(words);
    const wordArray = words.split("\n");
    console.log(wordArray);
    const randomWord = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomWord].trim();
    placeholder(word);
};
getWord();

// Display our symbols as placeholders for the chosen word's letters
const placeholder = function () {
    const placeholderLetters = [];

    for (let letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

// Guess letter button
guessLetterButton.addEventListener("click", function (e) {
    e.preventDefault();
    // Empty paragraph
    message.innerText = "";
    // Let's grab what was entered in the input
    const guess = letterInput.value;
    // Let's make sure that it is a single letter
    const goodGuess = validateInput(guess);

    if (goodGuess) {
        // We've got a letter! Let's guess!
        makeGuess(guess);
    }
    letterInput.value = "";
}); 

// Check letterInput for letter
const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input === 0) {
        // is the input empty?
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        // Did you type more than one letter?
        message.innerText = "One letter at a time.";
    } else if (!input.match(acceptedLetter)) {
        // Did you type a number, a special character or some other non letter?
        message.innerText = "Please enter a letter from A to Z.";
    } else {
        // We finally got a single letter
        return input;
    }
};

//Capture Input
const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        validGuesses();
        updateGuessesRemaining(guess);
        updateWordInProgress(guessedLetters);
        checkIfWin();
    }
};

// valid Guesses list
const validGuesses = function () {
    // Empty list
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

// Update work in progress
const updateWordInProgress = function (guess) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
};

// Number of guess/guesses remaining
const updateGuessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();
   if (!upperWord.includes(guess)) {
    message.innerHTML = `Sorry, the word has no ${guess}.`;
    remainingGuesses -= 1;
   } else {
    message.innerText = "Congrats that letter is in the word!";
   }

   if (remainingGuesses === 0) {
    message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
    startOver();
   } else if (remainingGuesses === 1) {
    remainingGuessesElement.innerText = `You have ${remainingGuesses} guess.`;
   } else {
    remainingGuessesElement.innerText = `You have ${remainingGuesses} guesses.`;
   }
};

// Check if player won
const checkIfWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the ${word}! Congrats!</p>`;
        startOver();
    }
};

// Play again
const startOver = function () {
    guessLetterButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
    message.classList.remove("win");
    message.innerText = "";
    guessedLettersElement.innerText = "";
    remainingGuesses = 8;
    guessedLetters = [];
    remainingGuessesSpan.innerText = `You have ${remainingGuesses}.`;
    guessLetterButton.classList.remove("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    playAgainButton.classList.add("hide");
    getWord();
});