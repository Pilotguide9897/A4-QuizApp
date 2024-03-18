window.onload = function () {
  fetchData();
};

function fetchData() {
  let url = "./QuizTemplates/GeographyQuiz.json";
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
  let data = quizData;
  quizTitle.innerHTML = data.title;
  quizBody.innerHTML = "";
  let cardHTML = "";
  let count = 1;
  data.questions.forEach((question, i) => {
    cardHTML += `<div class="card questionSection">`;
    cardHTML += `<h3 class="questionText">Question ${count}: <br /> ${question.questionText}</h3>`;
    cardHTML += `<ul>`;
    count++;

    data.questions[i].choices.forEach((choice, j) => {
      cardHTML += `<li class="list-group-item">`;
      cardHTML += `<input type = "radio" id = Q${i}Choice${j} name = Question${i} value = ${data.questions[i].answer}>`;
      cardHTML += `<label for = "Questions">${choice}</label></li>`;
    });

    cardHTML += `</ul>`;
    cardHTML += `</div>`;
  });
  quizBody.innerHTML = cardHTML;
}
