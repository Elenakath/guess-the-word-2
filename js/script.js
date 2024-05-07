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
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value = "";
}); 

