const questions = [
    {
        question: "Who is the president of Nigeria?",
        choices: {
            a: "Mr. General Peter Mbah",
            b: "Mr. General Bola Ahmed Tinubu",
            c: "Mr. General Goodluck Jonathan",
            d: "Mr. General Opie Chisom"
        },
        correctAnswer: "a"
    },
    {
        question: "What is the capital of Nigeria?",
        choices: {
            a: "Lagos",
            b: "Abuja",
            c: "Kano",
            d: "Port Harcourt"
        },
        correctAnswer: "b"
    },
    {
        question: "Which country is known as the Giant of Africa?",
        choices: {
            a: "Kenya",
            b: "South Africa",
            c: "Nigeria",
            d: "Ghana"
        },
        correctAnswer: "c"
    },
    {
        question: "What is the currency of Nigeria?",
        choices: {
            a: "Dollar",
            b: "Naira",
            c: "Cedi",
            d: "Pound"
        },
        correctAnswer: "b"
    },

    {
        question: "Which Nigerian city is known as the Centre of Excellence?",
        choices: {
            a: "Abuja",
            b: "Kano",
            c: "Lagos",
            d: "Enugu"
        },
        correctAnswer: "c"
    },
    {
        question: "Which is the most populous country in Africa?",
        choices: {
            a: "Egypt",
            b: "Nigeria",
            c: "South Africa",
            d: "Ethiopia"
        },
        correctAnswer: "b"
    },
    {
        question: "What year did Nigeria gain independence?",
        choices: {
            a: "1963",
            b: "1960",
            c: "1957",
            d: "1975"
        },
        correctAnswer: "b"
    },
    {
        question: "Which ocean borders Nigeria to the south?",
        choices: {
            a: "Pacific Ocean",
            b: "Atlantic Ocean",
            c: "Indian Ocean",
            d: "Arctic Ocean"
        },
        correctAnswer: "b"
    },
    {
        question: "What is the official language of Nigeria?",
        choices: {
            a: "Hausa",
            b: "English",
            c: "Igbo",
            d: "Yoruba"
        },
        correctAnswer: "b"
    },
    {
        question: "Which Nigerian artist sang 'Essence'?",
        choices: {
            a: "Burna Boy",
            b: "Davido",
            c: "Wizkid",
            d: "Olamide"
        },
        correctAnswer: "c"
    },
];

// Shuffle quiz questions at the start
let quizQuestions = [...questions].sort(() => Math.random() - 0.5);
let currentIndex = 0;
let score = 0;
let userAnswers = {}; // Store user's answers
// let userName = window.prompt("PLEASE ENTER YOUR NAME TO CONTINUE THE QUIZ 😂🤣😆");

// Keep asking for the username if it's not entered
// while(!userName) {
//     userName = window.prompt("Username cannot be empty. PLEASE ENTER YOUR NAME TO CONTINUE THE QUIZ. 😂🤣😆");
// } 

// document.getElementById("username").innerText = userName;
/**
 * Displays the current question and its choices.
 */
function displayQuestion() {
    if (currentIndex < quizQuestions.length) {
        const currentQuestion = quizQuestions[currentIndex];

        // Show question and update question number
        document.getElementById("question").innerText = currentQuestion.question;
        document.getElementById("currentnumber").innerText = currentIndex + 1;
        document.getElementById("remainigNUmber").innerText = quizQuestions.length;

        // Shuffle choices and display
        const choicesArray = Object.entries(currentQuestion.choices).sort(() => Math.random() - 0.5);
        document.getElementById("quiz-container").setAttribute("data-answer", currentQuestion.correctAnswer);

        const choicesDiv = document.getElementById("choices");
        choicesDiv.innerHTML = ""; // Clear previous choices

        choicesArray.forEach(([key, value]) => {
            const choiceButton = document.createElement("div");
            choiceButton.classList.add("option");
            choiceButton.innerText = value;
            choiceButton.setAttribute("data-choice", key);

            // Apply green background to previously selected answer
            if (userAnswers[currentIndex] === key) {
                choiceButton.style.backgroundColor = "green";
            }

            // Add event listener for each choice
            choiceButton.onclick = checkAnswer;
            choicesDiv.appendChild(choiceButton);
        });
    }
}

/**
 * Handles the selection of an answer but does NOT move to the next question.
 */
function checkAnswer(event) {
    const selectedChoice = event.target.getAttribute("data-choice");

    // Save the selected answer
    userAnswers[currentIndex] = selectedChoice; // Save user's answer

    // Change background color to green for the clicked choice
    const allChoices = document.querySelectorAll('.option');
    allChoices.forEach(choice => {
        choice.style.backgroundColor = ""; // Reset background color for all choices
    });

    event.target.style.backgroundColor = "green"; // Set green background for clicked choice
}

/**
 * Navigates to the previous question.
 */
function goToPreviousQuestion() {
    if (currentIndex > 0) {
        currentIndex--;
        displayQuestion();
    }
}

/**
 * Navigates to the next question when the "Next" button is clicked.
 */
function goToNextQuestion() {
    if (currentIndex < quizQuestions.length - 1) {
        currentIndex++;
        displayQuestion();
    }
}

/**
 * Submits the quiz and calculates the score.
 */
/**
 * Submits the quiz and calculates the score.
 */
function submitQuiz() {
    // Show a confirmation prompt
    const isConfirmed = window.confirm("Are you sure you want to submit?");

    // If the user clicks "Yes", proceed with the submission
    if (isConfirmed) {
        score = 0;
        quizQuestions.forEach((q, index) => {
            if (userAnswers[index] === q.correctAnswer) {
                score++;
            }
        });

        // Display the final result
        displayResult();
    } else {
        // If the user clicks "No", return to the current question
        displayQuestion();
    }
}


/**
 * Displays the result of the quiz with a message based on the score.
 */
function displayResult() {
    // Hide question and choices sections
    document.getElementById("question-container").style.display = "none";
    document.getElementById("choices").style.display = "none";

    // Calculate the percentage score
    const percentage = (score / quizQuestions.length) * 100;
    let message = "";
    let emoji = "";

    // Determine the message based on the score
    if (percentage >= 80) {
        message = "Excellent! Keep it up!";
        emoji = "🎉";
    } else if (percentage >= 50) {
        message = "You have done a good job! Put in more effort!";
        emoji = "👍";
    } else if (percentage >= 40) {
        message = "That's still okay, but you need to work harder!";
        emoji = "😊";
    } else {
        message = "Ohhh, you failed. Please try again!";
        emoji = "😞";
    }

    // Show result section with the custom message
    const resultDiv = document.getElementById("result-container");
    resultDiv.style.display = "flex";
    resultDiv.innerHTML = `
        <h2>Quiz Completed! </h2>
        <h3> ${userName} </h3>
        <p class"red">Your final score is: <strong>${score}/${quizQuestions.length}</strong></p>
        <p><strong>${message} ${emoji}</strong></p>
    `;
}

// Initialize the quiz on page load
window.onload = () => {
    displayQuestion();

    // Add event listeners for navigation and submit buttons
    document.getElementById("prevButton").onclick = goToPreviousQuestion;
    document.getElementById("nextButton").onclick = goToNextQuestion;
    document.getElementById("submitButton").onclick = submitQuiz;
};


