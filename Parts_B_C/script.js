window.onload = function () {
  let quizSelection = document.querySelector("#quizSelection");
  fetchData(quizSelection.value);
  quizSelection.addEventListener("change", function () {
    fetchData(this.value);
  });
  let submitButton = document.querySelector("#btnSubmit");
  submitButton.addEventListener("click", showResults);
};

function fetchData(quizSelection) {
  let url;
  if (quizSelection == "geography") {
    url = "../Part_A/QuizTemplates/GeographyQuiz.json";
  } else if (quizSelection == "math") {
    url = "../Part_A/QuizTemplates/MathQuiz.json";
  } else {
    url = "../Part_D/CustomQuiz.json";
  }

  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      let quizData = JSON.parse(xhr.responseText);
      ShowQuestions(quizData);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

function ShowQuestions(quizData) {
  let quizBody = document.querySelector("#quizBody");
  let quizTitle = document.querySelector("#quizTitle");
  let tabs = document.querySelector("#tabs");
  let tabContent = document.querySelector("#tabContent");
  let scoreSection = (document.querySelector(".scoreSection").innerHTML = "");
  let data = quizData;
  quizTitle.innerHTML = data.title;
  tabs.innerHTML = "";
  let tabHTML = "";
  let sectionHTML = "";
  // Create the tabs for navigating the quiz
  data.questions.forEach((question, i) => {
    tabHTML += `<li class = "nav-item">`;
    tabHTML += `<button
      class="nav-link mt-5"
      id="pills-profile-tab"
      data-bs-toggle="pill"
      data-bs-target="#pills-Question${i}"
      type="button"
      role="tab"
    >
      Question ${i + 1}
    </button>`;
    tabHTML += `</li>`;
  });
  tabs.innerHTML += tabHTML;

  // Doing the Tab Content
  data.questions.forEach((question, i) => {
    sectionHTML += `<div class = "tab-pane fade mt-5" id = "pills-Question${i}" role = "tabpanel">`;
    sectionHTML += `<div class="card" data-correctAnswer = "${data.questions[i].answer}">`;
    sectionHTML += `<h3 class="questionText">Question ${i + 1}: ${
      question.questionText
    }</h3>`;
    sectionHTML += `<ul>`;
    data.questions[i].choices.forEach((choice, j) => {
      sectionHTML += `<li class="list-group-item">`;
      sectionHTML += `<input type = "radio" id = "Q${i + 1}Choice${
        j + 1
      }" name = "Question${i}" value = "${data.questions[i].answer}">`;
      sectionHTML += `<label for = "Questions">${choice}</label></li>`;
    });
    sectionHTML += `</ul>`;
    sectionHTML += `</div>`;
    sectionHTML += `</div>`;
  });
  tabContent.innerHTML = sectionHTML;
  document.querySelector(".nav-link").classList.add("active");
  tabContent.querySelector("#pills-Question0").classList.add("active");
  tabContent.querySelector("#pills-Question0").classList.add("show");
}

// Checks and determines whether there are any unanswered questions.
function showResults() {
  let questionCards = document.querySelectorAll(".card");
  let modal = new bootstrap.Modal(document.querySelector("#exampleModal"));
  let modalBody = document.querySelector("#remainingQuestions");
  let allQuestionsAttempted = false;
  let unansweredQuestions = [];
  for (let i = 0; i < questionCards.length; i++) {
    let responseChecked = questionCards[i].querySelectorAll(
      "input[type = radio]:checked"
    );
    if (responseChecked.length < 1) {
      unansweredQuestions.push(i + 1);
    } else {
      allQuestionsAttempted = true;
    }
  }
  modalBody.innerHTML = `Please answer the following questions before submitting the quiz: ${unansweredQuestions}`;
  if (unansweredQuestions.length > 0) {
    modal.show();
  } else {
    accumulateScore();
  }
}

function accumulateScore() {
  let score = document.querySelector(".scoreSection");

  let questionCards = document.querySelectorAll(".card");
  let correctAnswers = [];
  let userAnswers = [];
  let total = 0;
  let count;

  // Loop  through all cards to look at correct answer, and find which number input is checked
  for (let i = 0; i < questionCards.length; i++) {
    let correctAnswer = Number(questionCards[i].dataset.correctanswer);
    //Pushes correct answer to correctAnswers Array
    correctAnswers.push(correctAnswer + 1);
    let options = questionCards[i].querySelectorAll("input[type = radio]");
    for (count = 0; count < options.length; count++) {
      if (options[count].checked) {
        //Pushes number of checked radio button to userAnswers array
        userAnswers.push(count + 1);
        break;
      }
    }
  }

  score.innerHTML = "";
  let scoreHTML = `<table class="table">`;

  scoreHTML += `<tr><td>Question #</td><td>Question Text</td><td>Correct Answer</td><td>Your Answer</td><td>Score</td></tr>`;

  // Loops through both arrays to see if answers match, if so, "correct". If not, "incorrect"
  for (let questions = 0; questions < questionCards.length; questions++) {
    // Grab Question Text
    let questionText = questionCards[questions].querySelector("h3").innerText;
    // Grab the Correct Option
    let correctOption = questionCards[questions].dataset.correctanswer;
    let correctAnswerLI =
      questionCards[questions].querySelectorAll("li")[correctOption];
    let correctAnswerText = correctAnswerLI.querySelector("label").innerText;
    let optionsList = questionCards[questions].querySelectorAll("li");
    // Grab the User's Answer
    let userAnswer = questionCards[questions].querySelector(
      "input[type = radio]:checked"
    ).parentElement;
    let userAnswerLabel = userAnswer.querySelector("label").innerText;

    // Build table for the
    let userScore;
    if (userAnswerLabel == correctAnswerText) {
      userScore = 1;
      total += 1;
      scoreHTML += `<tr class="correct"><td>${
        questions + 1
      }</td><td>${questionText}</td><td>${correctAnswerText}</td><td>${userAnswerLabel}</td><td>${userScore}</td></tr>`;
    } else {
      userScore = 0;
      scoreHTML += `<tr class="incorrect"><td>${
        questions + 1
      }</td><td>${questionText}</td><td>${correctAnswerText}</td><td>${userAnswerLabel}</td><td>${userScore}</td></tr>`;
    }
  }
  scoreHTML += `</table>`;
  score.innerHTML = scoreHTML;
  score.innerHTML +=
    "<div id='scoreDisplay'> Your Quiz Score is: " +
    total +
    "&#47;" +
    questionCards.length +
    " | " +
    (total / questionCards.length) * 100 +
    "%" +
    "</div>";
}
