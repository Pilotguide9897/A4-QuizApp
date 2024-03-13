window.onload = function () {
  fetchData();
};

function fetchData() {
  let url = "./QuizTemplates/GeographyQuiz.json";
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      console.log("Response Data:", xhr.responseText);
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
  let data = quizData;
  quizTitle.innerHTML = data.title;
  quizBody.innerHTML = "";
  let cardHTML = "";
  let tabHTML = "";

  // Create the tabs for navigating the quiz
  data.questions.forEach((question, i) => {
    tabHTML += `<li class = "nav-item>`;
    tabHTML += `<a class = "nav-link" aria-current = "page" href = "#">Question${i}>`;
  });

  // data.questions.forEach((question, i) => {
  //   cardHTML += `<div class="card">`;
  //   cardHTML += `<h3>${question.questionText}</h3>`;
  //   cardHTML += `<ul>`;
  //   data.questions[i].choices.forEach((choice, j) => {
  //     console.log(choice);
  //     cardHTML += `<li class="list-group-item">`;
  //     cardHTML += `<input type = "radio" id = Q${i}Choice${j} name = Question${i} value = ${data.questions[i].answer}>`;
  //     cardHTML += `<label for = "Questions">${choice}</label></li>`;
  //   });
  //   cardHTML += `</ul>`;
  //   cardHTML += `</div>`;
  // });
  // console.log(cardHTML);
  // quizBody.innerHTML = cardHTML;
}
