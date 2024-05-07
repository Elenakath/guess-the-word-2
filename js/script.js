// Unordered list where player's guessed letters will appear
const guessedLettersElement = document.querySelector(".guess-letters");
// guess button
const guessLetterButton = document.querySelector(".guess");
// Empty box for letter guessed
const letterInput = document.querySelector(".letter");
// Empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
// Paragraph where the remaining guesses will display
const remainingGuesses = document.querySelector(".remaining");
// Span inside the paragraph where the remaining guesses will display
const remainingGuessesSpan = document.querySelector(".remaining span");
// Empty paragraph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");
// Hidden button that will appear prompting the player to play again
const playAgainButton = document.querySelector(".play-again hide");

const word = "magnolia";
const guessedLetters = [];

// Display our symbols as placeholders for the chosen word's letters
const placeholder = function () {
    const placeholderLetters = [];

    for (let letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};
placeholder(word);

// event listener button
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
    }
};

