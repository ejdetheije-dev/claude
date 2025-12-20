const quizData = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correct: 1
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correct: 2
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correct: 3
    },
    {
        question: "Which programming language is known as the 'language of the web'?",
        options: ["Python", "JavaScript", "Java", "C++"],
        correct: 1
    },
    {
        question: "How many continents are there?",
        options: ["5", "6", "7", "8"],
        correct: 2
    },
    {
        question: "What is the smallest prime number?",
        options: ["0", "1", "2", "3"],
        correct: 2
    },
    {
        question: "Which animal is the largest mammal?",
        options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
        correct: 1
    },
    {
        question: "In which year did World War II end?",
        options: ["1943", "1944", "1945", "1946"],
        correct: 2
    }
];

let currentQuestion = 0;
let userAnswers = new Array(quizData.length).fill(null);
let score = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const quizEl = document.getElementById('quiz');
const resultsEl = document.getElementById('results');
const scoreEl = document.getElementById('score');
const answersReviewEl = document.getElementById('answers-review');
const restartBtn = document.getElementById('restart-btn');

function loadQuestion() {
    const current = quizData[currentQuestion];
    questionEl.textContent = `Question ${currentQuestion + 1} of ${quizData.length}: ${current.question}`;

    optionsEl.innerHTML = '';
    current.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option');
        optionDiv.textContent = option;

        if (userAnswers[currentQuestion] === index) {
            optionDiv.classList.add('selected');
        }

        optionDiv.addEventListener('click', () => selectOption(index));
        optionsEl.appendChild(optionDiv);
    });

    updateNavigation();
}

function selectOption(index) {
    userAnswers[currentQuestion] = index;

    const options = document.querySelectorAll('.option');
    options.forEach((opt, i) => {
        opt.classList.remove('selected');
        if (i === index) {
            opt.classList.add('selected');
        }
    });
}

function updateNavigation() {
    prevBtn.style.display = currentQuestion > 0 ? 'inline-block' : 'none';

    if (currentQuestion === quizData.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-block';
    } else {
        nextBtn.style.display = 'inline-block';
        submitBtn.style.display = 'none';
    }
}

function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        loadQuestion();
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function calculateScore() {
    score = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === quizData[index].correct) {
            score++;
        }
    });
}

function showResults() {
    calculateScore();
    quizEl.style.display = 'none';
    resultsEl.style.display = 'block';

    const percentage = ((score / quizData.length) * 100).toFixed(1);
    scoreEl.textContent = `You scored ${score} out of ${quizData.length} (${percentage}%)`;

    answersReviewEl.innerHTML = '';
    quizData.forEach((question, index) => {
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');

        const isCorrect = userAnswers[index] === question.correct;
        reviewItem.classList.add(isCorrect ? 'correct' : 'incorrect');

        const questionDiv = document.createElement('div');
        questionDiv.classList.add('review-question');
        questionDiv.textContent = `${index + 1}. ${question.question}`;
        reviewItem.appendChild(questionDiv);

        if (userAnswers[index] !== null) {
            const yourAnswerDiv = document.createElement('div');
            yourAnswerDiv.classList.add('review-answer');
            yourAnswerDiv.innerHTML = `<span class="${isCorrect ? 'correct-answer' : 'your-answer'}">Your answer: ${question.options[userAnswers[index]]}</span>`;
            reviewItem.appendChild(yourAnswerDiv);
        } else {
            const noAnswerDiv = document.createElement('div');
            noAnswerDiv.classList.add('review-answer', 'your-answer');
            noAnswerDiv.textContent = 'You did not answer this question';
            reviewItem.appendChild(noAnswerDiv);
        }

        if (!isCorrect) {
            const correctAnswerDiv = document.createElement('div');
            correctAnswerDiv.classList.add('review-answer', 'correct-answer');
            correctAnswerDiv.textContent = `Correct answer: ${question.options[question.correct]}`;
            reviewItem.appendChild(correctAnswerDiv);
        }

        answersReviewEl.appendChild(reviewItem);
    });
}

function restartQuiz() {
    currentQuestion = 0;
    userAnswers = new Array(quizData.length).fill(null);
    score = 0;

    resultsEl.style.display = 'none';
    quizEl.style.display = 'block';

    loadQuestion();
}

prevBtn.addEventListener('click', prevQuestion);
nextBtn.addEventListener('click', nextQuestion);
submitBtn.addEventListener('click', showResults);
restartBtn.addEventListener('click', restartQuiz);

loadQuestion();
