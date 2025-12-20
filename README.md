# Simple Quiz App

A clean and interactive web-based quiz application built with HTML, CSS, and JavaScript.

## Features

- 10 multiple-choice questions covering various topics
- Navigate back and forth between questions
- Select and change answers before submitting
- View your score and detailed results
- Review correct and incorrect answers
- Responsive design that works on mobile and desktop
- Restart quiz functionality

## How to Use

1. Open `index.html` in your web browser
2. Read each question and click on your answer choice
3. Use "Next" and "Previous" buttons to navigate between questions
4. Click "Submit Quiz" on the last question to see your results
5. Review your answers and click "Restart Quiz" to try again

## Files

- `index.html` - Main HTML structure
- `style.css` - Styling and layout
- `script.js` - Quiz logic and interactivity

## Customization

To add your own questions, edit the `quizData` array in `script.js`:

```javascript
const quizData = [
    {
        question: "Your question here?",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        correct: 0  // Index of the correct answer (0-3)
    },
    // Add more questions...
];
```

## Technologies Used

- HTML5
- CSS3 (with Flexbox and responsive design)
- Vanilla JavaScript (ES6+)

Enjoy the quiz!
