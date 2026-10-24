const questions = [
  {
    emoji: "",
    prompt: "Are you the most beautiful girl in the world?",
  },
  {
    emoji: "",
    prompt: "Did you know today was going to be magical?",
  },
  {
    emoji: "🎁",
    prompt: "Do you deserve all the love in this universe?",
  },
  {
    emoji: "✨",
    prompt: "Am I the luckiest person to have you?",
  },
  {
    emoji: "🌷",
    prompt: "Are you ready for your surprise,Glady?",
  },
  {
    emoji: "💖",
    prompt: "Will you give me a chance to make you happy?",
  },
];

const questionCount = document.querySelector("#question-count");
const questionPanel = document.querySelector("#question-panel");
const questionEmoji = document.querySelector("#question-emoji");
const questionTitle = document.querySelector("#question-title");
const answerList = document.querySelector("#answer-list");
const resultPanel = document.querySelector("#result-panel");
const resultMessage = document.querySelector("#result-message");
const poemReveal = document.querySelector("#poem-reveal");

let currentQuestion = 0;

function updateProgress() {
  const completed = currentQuestion + 1;

  questionCount.textContent = `Question ${completed} of ${questions.length}`;
}

function renderQuestion() {
  const question = questions[currentQuestion];
  updateProgress();

  questionEmoji.textContent = question.emoji;
  questionTitle.textContent = question.prompt;
  answerList.replaceChildren();

  ["Yes", "No"].forEach((answer) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.textContent = answer;
    button.dataset.answer = answer.toLowerCase();

    if (answer === "Yes") {
      button.addEventListener("click", selectAnswer);
    } else {
      button.addEventListener("pointerenter", () => dodgeNoButton(button));
      button.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        dodgeNoButton(button);
      });
      button.addEventListener("focus", () => dodgeNoButton(button));
      button.addEventListener("click", (event) => {
        event.preventDefault();
        dodgeNoButton(button);
      });
    }

    answerList.append(button);
  });
}

function dodgeNoButton(button) {
  button.classList.add("is-escaping");

  const containerRect = answerList.getBoundingClientRect();
  const buttonWidth = button.offsetWidth;
  const buttonHeight = button.offsetHeight;
  const maxLeft = Math.max(0, containerRect.width - buttonWidth);
  const maxTop = Math.max(0, answerList.clientHeight - buttonHeight);
  const yesRect = answerList
    .querySelector('[data-answer="yes"]')
    .getBoundingClientRect();
  const yesLeft = yesRect.left - containerRect.left;
  const yesTop = yesRect.top - containerRect.top;
  let left = 0;
  let top = 0;

  for (let attempt = 0; attempt < 20; attempt += 1) {
    left = Math.random() * maxLeft;
    top = Math.random() * maxTop;

    const overlapsYes =
      left < yesLeft + yesRect.width + 8 &&
      left + buttonWidth > yesLeft - 8 &&
      top < yesTop + yesRect.height + 8 &&
      top + buttonHeight > yesTop - 8;

    if (!overlapsYes) {
      break;
    }
  }

  button.style.left = `${left}px`;
  button.style.top = `${top}px`;
}

function selectAnswer() {
  currentQuestion += 1;

  if (currentQuestion < questions.length) {
    renderQuestion();
    return;
  }

  showBirthdayWish();
}

function showBirthdayWish() {
  questionCount.textContent = "All done!";
  questionPanel.hidden = true;
  resultPanel.hidden = false;
  resultMessage.textContent = [
    "Roses are red, violets are blue,",
    "No one in this world is as beautiful as you.",
    "",
    "Your smile lights up my darkest days,",
    "And I fall for you in a million ways.",
    "",
    "Today is yours, my queen, my world,",
    "My forever girl, my precious pearl:",
  ].join("\n");
  requestAnimationFrame(() => {
    requestAnimationFrame(() => poemReveal.classList.add("is-opening"));
  });
}

renderQuestion();
